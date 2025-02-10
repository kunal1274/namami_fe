import { Select } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PurchaseOrderViewPage from "./PurchaseOrderViewPage";

const PurchaseOrderList = ({ handleAddPurchaseOrder }) => {
  const baseUrl = "https://befr8n.vercel.app/fms/api/v0/purchaseorders";
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [viewingPurchaseId, setViewingPurchaseId] = useState(null);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSortOption, setSelectedSortOption] = useState("All");

  const { id } = useParams();

  // Fetch purchases from the API
  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setPurchases(response.data.data);
      setFilteredPurchases(response.data.data);
    } catch (error) {
      console.error("Failed to load purchases:", error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  // Delete selected purchase orders
  const handleDeleteSelected = async () => {
    if (selectedPurchases.length === 0) {
      alert("No Purchase order selected to delete.");
      return;
    }
    try {
      await Promise.all(
        selectedPurchases.map((itemId) => axios.delete(`${baseUrl}/${itemId}`))
      );
      // Remove deleted items from state
      setPurchases((prev) =>
        prev.filter((purchase) => !selectedPurchases.includes(purchase._id))
      );
      setFilteredPurchases((prev) =>
        prev.filter((purchase) => !selectedPurchases.includes(purchase._id))
      );
      setSelectedPurchases([]);
      alert("Selected items deleted successfully!");
    } catch (error) {
      console.error("Error deleting items:", error);
      alert("Failed to delete selected items.");
    }
  };

  // Search handling
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredPurchases(
      purchases.filter(
        (purchase) =>
          purchase.name?.toLowerCase().includes(value.toLowerCase()) ||
          purchase.code?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Toggle checkbox selection for a purchase
  const handleCheckboxChange = (id) => {
    setSelectedPurchases((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((purchaseId) => purchaseId !== id)
        : [...prevSelected, id]
    );
  };

  // Toggle select all checkboxes
  const toggleSelectAll = () => {
    if (selectedPurchases.length === filteredPurchases.length) {
      setSelectedPurchases([]);
    } else {
      setSelectedPurchases(filteredPurchases.map((purchase) => purchase._id));
    }
  };

  // Handle clicking on a purchase to view details
  const handlePurchaseClick = (id) => {
    setViewingPurchaseId(id);
  };

  // Apply filtering based on status and search term
  const applyFilters = useCallback(() => {
    let filtered = [...purchases];

    if (selectedFilter === "yes") {
      filtered = filtered.filter((purchase) => purchase.active);
    } else if (selectedFilter === "no") {
      filtered = filtered.filter((purchase) => !purchase.active);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (purchase) =>
          purchase.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          purchase.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPurchases(filtered);
  }, [purchases, searchTerm, selectedFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle sorting of purchases
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSortOption(value);
    let sortedPurchases = [...filteredPurchases];
    if (value === "Purchase Name") {
      sortedPurchases.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "Purchase Account no") {
      sortedPurchases.sort((a, b) => a.orderNum.localeCompare(b.orderNum));
    } else if (value === "Purchase Account no descending") {
      sortedPurchases.sort((a, b) => b.orderNum.localeCompare(a.orderNum));
    }
    setFilteredPurchases(sortedPurchases);
  };

  // Generate PDF for selected purchases
  const generatePDF = () => {
    if (!selectedPurchases || selectedPurchases.length === 0) {
      alert("No purchases selected to generate PDF!");
      return;
    }
    const doc = new jsPDF();
    const tableColumn = [
      "#",
      "PurchaseNo.",
      "VendorName",
      "Item Name",
      "Quantity",
      "Price",
      "Discount",
      "Line Amount",
      "Created At",
      "Status",
    ];

    const selectedData = filteredPurchases.filter((purchase) =>
      selectedPurchases.includes(purchase._id)
    );

    const tableRows = selectedData.map((purchase, index) => [
      index + 1,
      purchase.orderNum || "N/A",
      purchase.Vendor?.name || "N/A",
      purchase.item?.name || "N/A",
      purchase.quantity || "N/A",
      purchase.price || "N/A",
      purchase.discount || "N/A",
      purchase.lineAmt || "N/A",
      new Date(purchase.createdAt).toLocaleDateString() || "N/A",
      purchase.status || "N/A",
    ]);

    doc.text("Selected Purchases Order List", 14, 20);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("selected_purchases_order_list.pdf");
  };

  // Export purchases to Excel
  const exportToExcel = () => {
    if (!filteredPurchases || filteredPurchases.length === 0) {
      alert("No purchases to export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredPurchases);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");
    XLSX.writeFile(workbook, "purchases.xlsx");
  };

  // Import purchases from an Excel file
  const importFromExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // Assuming the data format matches your purchase object structure
      setPurchases(data);
      setFilteredPurchases(data);
    };
    reader.readAsBinaryString(file);
  };

  // Reset filters to default
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedFilter("All");
    setSelectedSortOption("All");
    setFilteredPurchases([...purchases]);
  };

  // Return from the PurchaseOrderViewPage
  const goBack = () => {
    setViewingPurchaseId(null);
    // Optionally, you might refetch the purchases here
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="rounded-lg mb-5">
        {viewingPurchaseId ? (
          <PurchaseOrderViewPage purchaseId={viewingPurchaseId} goBack={goBack} />
        ) : (
          <>
            <ToastContainer />
            {/* Header */}
            <div className="flex justify-between items-center space-x-3">
              <h1 className="text-2xl font-bold mb-4">Purchase Order List Page</h1>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleAddPurchaseOrder}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  + Add
                </button>
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedPurchases.length === 0}
                  className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                    selectedPurchases.length > 0
                      ? "hover:bg-gray-100"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>
                <button
                  onClick={generatePDF}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                >
                  Export
                </button>
                <label className="border h-10 border-green-500 bg-white rounded-md py-2 px-4 cursor-pointer">
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    className="hidden"
                    onChange={importFromExcel}
                  />
                  Import
                </label>
              </div>
            </div>
            {/* Filters & Search Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-white rounded-md shadow mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
                <Select
                  value={selectedSortOption}
                  onChange={handleSortChange}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All">Sort By</option>
                  <option value="Purchase Name">Purchase Name</option>
                  <option value="Purchase Account no">Purchase Account No</option>
                  <option value="Purchase Account no descending">
                    Purchase Account No Descending
                  </option>
                </Select>
                <Select
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    applyFilters();
                  }}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All">Filter By Status</option>
                  <option value="yes">Active</option>
                  <option value="no">Inactive</option>
                </Select>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:w-60 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="px-2 h-10 border border-gray-500 bg-zinc-200 rounded-full py-2"
                    onClick={applyFilters}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="w-full md:w-auto flex justify-end">
                <button onClick={resetFilters} className="text-red-500">
                  Reset Filter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Purchase Table */}
      <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      selectedPurchases.length === filteredPurchases.length &&
                      filteredPurchases.length > 0
                    }
                  />
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Purchase Order No
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Vendor Name
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Item Name
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Qty
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Discount
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Line Amount
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Created At
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedPurchases.includes(purchase._id)}
                      onChange={() => handleCheckboxChange(purchase._id)}
                    />
                  </td>
                  <td className="border px-6 py-3">
                    <button
                      onClick={() => handlePurchaseClick(purchase._id)}
                      className="text-blue-600 hover:underline"
                    >
                      {purchase.orderNum}
                    </button>
                  </td>
                  <td className="border px-6 py-3 truncate">
                    {purchase.Vendor?.name}
                  </td>
                  <td className="border px-6 py-3 truncate">
                    {purchase.item?.name}
                  </td>
                  <td className="border px-6 py-3 whitespace-normal truncate">
                    {purchase.quantity}
                  </td>
                  <td className="border px-6 py-3 whitespace-normal truncate">
                    {purchase.price}
                  </td>
                  <td className="border px-6 py-3 truncate">
                    {purchase.discount}
                  </td>
                  <td className="border px-6 py-3 truncate">
                    {purchase.lineAmt}
                  </td>
                  <td className="border px-6 py-3 whitespace-normal truncate">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-6 py-3 truncate">
                    {purchase.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderList;
