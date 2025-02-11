import { Select } from "flowbite-react";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SaleorderViewPage from "./SaleorderViewPage";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllocationHistory = ({ handleAddSaleOrder, invoice }) => {
  const baseUrl = "https://befr8n.vercel.app/fms/api/v0/salesorders";
  const [saleList, setSaleList] = useState([]);
  const [sales, setSales] = useState([]);
  const [view, setView] = useState([]);
  const [selectedSaleForInvoice, setSelectedSaleForInvoice] = useState(null);
  const [selectedSales, setSelectedSales] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [viewingSaleId, setViewingSaleId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [filteredSales, setFilteredSales] = useState(sales);

  const handleInvoice = () => {
    if (selectedSales.length === 1) {
      setSelectedSaleForInvoice(selectedSales[0]); // Set the selected sale for invoice
    } else {
      alert("Please select exactly one sale order to generate an invoice.");
    }
  };
  const { id } = useParams();
  const [selectedSortOption, setSelectedSortOption] = useState("All");
  // Fetch all sales from the API
  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setSales(response.data.data);
      console.log(response.data.data);
      setFilteredSales(response.data.data);
    } catch (error) {
      console.error("Failed to load Sales:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredSales(
      sales.filter((sale) =>
        sale.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedSales((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((saleId) => saleId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSales.length === filteredSales.length) {
      setSelectedSales([]);
    } else {
      setSelectedSales(filteredSales.map((sale) => sale._id));
    }
  };

  const handleSaleClick = (id) => {
    alert(`Sale clicked: ${id}`);
    setViewingSaleId(id);
  };
  // Handle filtering logic
  const applyFilters = useCallback(() => {
    let filtered = [...sales];

    if (selectedFilter === "yes") {
      filtered = filtered.filter((sale) => sale.active);
    } else if (selectedFilter === "no") {
      filtered = filtered.filter((sale) => !sale.active);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (sale) =>
          sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSales(filtered);
  }, [sales, searchTerm, selectedFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle individual Sale selection

  const generatePDF = useCallback(() => {
    if (!selectedSales || selectedSales.length === 0) {
      alert("No sales selected to generate PDF!");
      return;
    }

    const doc = new jsPDF();
    const tableColumn = [
      "#",
      "Sale No.",
      "Customer Name",
      "Item Name",
      "Quantity",
      "Price",
      "Discount",
      "Line Amount",
      "Created At",
      "Status",
    ];

    // Filter the data for selected sales
    const selectedData = filteredSales.filter((sale) =>
      selectedSales.includes(sale._id)
    );

    const tableRows = selectedData.map((sale, index) => [
      index + 1,
      sale.orderNum || "N/A",
      sale.customer?.name || "N/A",
      sale.item?.name || "N/A",
      sale.quantity || "N/A",
      sale.price || "N/A",
      sale.discount || "N/A",
      sale.lineAmt || "N/A",
      new Date(sale.createdAt).toLocaleDateString() || "N/A",
      sale.status || "N/A",
    ]);

    doc.text("Selected Sales Order List", 14, 20);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("selected_sales_order_list.pdf");
  }, [filteredSales, selectedSales]);

  const exportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");
    XLSX.writeFile(workbook, "Sale_list.xlsx");
  }, [filteredSales]);

  const importFromExcel = () => {};

  // Handle "select all" functionality

  // Handle deleting selected Sales

  // Reset filters

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  const handleFilterChange = (e) => {
    const value = e.target.value; // Get the selected filter value
    setSelectedFilter(value); // Update the selected filter state

    let filtered = [...sales]; // Clone the original sales array

    switch (value) {
      case "yes": // Show only active sales
        filtered = filtered.filter((sale) => sale.active === true);
        break;

      case "no": // Show only inactive sales
        filtered = filtered.filter((sale) => sale.active === false);
        break;

      case "All": // Show all sales
      default:
        filtered = [...sales];
        break;
    }

    setFilteredSales(filtered); // Update the filteredSales state
  };
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSortOption(value);

    let sorted = [...filteredSales];

    switch (value) {
      case "Sale Name":
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Sale Account no":
        sorted = sorted.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "Sale Account no descending":
        sorted = sorted.sort((a, b) => b.code.localeCompare(a.code));
        break;
      case "By unit":
        sorted = sorted.sort((a, b) => a.unit.localeCompare(b.unit));
        break;
      case "All":
      default:
        break;
    }

    setFilteredSales(sorted);
  };
  const handleTypeFilterChange = (e) => {
    const value = e.target.value;

    let filtered;

    switch (value) {
      case "Services":
        filtered = sales.filter((sale) => sale.type === "Services");
        break;
      case "Goods":
        filtered = sales.filter((sale) => sale.type === "Goods");
        break;
      case "All":
        filtered = sales; // No filter applied, show all sales
        break;
      default:
        filtered = sales; // Fallback to show all sales
        break;
    }

    setFilteredSales(filtered);
  };
  const resetFilters = () => {
    // Reset all relevant states
    setSearchTerm(""); // Clear search term if any
    setSelectedFilter("All"); // Reset to default option
    setSortOption(""); // Reset sorting to default
    setFilteredSales([...sales]); // Restore the original sales array

    console.log("Filters reset to default.");
  };
  const handleDeleteSelected = async () => {
    if (selectedSales.length === 0) {
      alert("No sale order selected to delete.");
      return;
    }

    try {
      // Perform deletion API calls
      await Promise.all(
        selectedSales.map((itemId) => axios.delete(`${baseUrl}/${itemId}`))
      );

      // Update the state to remove deleted sales
      setFilteredSales((prev) =>
        prev.filter((sale) => !selectedSales.includes(sale._id))
      );
      setSales((prev) =>
        prev.filter((sale) => !selectedSales.includes(sale._id))
      );

      setSelectedSales([]); // Clear selected items after deletion
      alert("Selected items deleted successfully!");
    } catch (error) {
      console.error("Error deleting items:", error);
      alert("Failed to delete selected items.");
    }
  };

  const goBack = () => {
    setViewingSaleId(null);
    window.location.reload();
  };
  return (
    <div className="bg-grey-400  min-h-screen">
      <div className="rounded-full mb-5">
        {" "}
        {viewingSaleId ? (
          <SaleViewPage saleId={viewingSaleId} goBack={goBack} />
        ) : selectedSaleForInvoice ? (
          <Invoice saleId={selectedSaleForInvoice} goBack={goBack} />
        ) : (
          <>
            <ToastContainer />
            {/* Header */}
            <div className="flex justify-between space-x-3">
              <h1 className="text-2xl font-bold mb-4">Sale Order List Page</h1>
              <div className="flex justify-between rounded-full mb-5">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleInvoice}
                    className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                      selectedSales.length > 0
                        ? "hover:bg-gray-100"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Invoice
                  </button>{" "}
                  <button
                    onClick={handleAddSaleOrder}
                    className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                  >
                    + Add
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    disabled={selectedSales.length === 0}
                    className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                      selectedSales.length > 0
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
                  <button className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
                    Export
                  </button>
                  <label className="border h-10 border-green-500 bg-white rounded-md py-2 px-4">
                    <input type="file" accept=".xls,.xlsx" className="hidden" />
                    Import
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap Sales-center justify-between p-4 bg-white rounded-md shadow mb-6 space-y-4 md:space-y-0 md:space-x-4">
              {/* Left Section: Filters and Search */}
              <div className="flex flex-wrap Sales-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Filter Button */}
                <Select className="flex Sales-center px-3 py-2 bg-gray-200 rounded">
                  <option className="flex Sales-center px-3 py-2 bg-gray-200 rounded">
                    Sort By
                  </option>

                  <option className="flex Sales-center px-3 py-2 bg-gray-200 rounded">
                    sort
                  </option>
                </Select>

                {/* Order Status Dropdown */}
                <Select className="flex Sales-center px-3 py-2 bg-gray-200 rounded">
                  <option value="All"> Filter By Status</option>
                  <option value="yes">Active</option>
                  <option value="no">Inactive</option>
                </Select>

                {/* Search Bar */}
                <div className="flex Sales-center space-x-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    className="w-full md:w-60 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-2 h-10 border border-grey-500 bg-zinc-200 rounded-full py-2">
                    Search
                  </button>
                </div>
              </div>

              {/* Right Section: Reset Button */}
              <div className="w-full md:w-auto flex justify-end">
                <button className="text-red-500">Reset Filter</button>
              </div>
            </div>

            {/* vendor Table */}
            <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        <input type="checkbox" />
                      </th>
                      <th className="px-6 py-3 w-24 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Sale Order no
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Customer Name
                      </th>{" "}
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Item Name
                      </th>{" "}
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Qty
                      </th>{" "}
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Price
                      </th>{" "}
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Discount
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Line Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        createdAt
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale) => (
                      <tr key={sale._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedSales.includes(sale._id)}
                            onChange={() => handleCheckboxChange(sale._id)}
                          />
                        </td>
                        <td>
                          <button onClick={() => handleSaleClick(sale._id)}>
                            {sale.orderNum}
                          </button>
                        </td>{" "}
                        <td className="px-6 py-3 truncate">
                          {sale.customer?.name}
                        </td>{" "}
                        <td className="px-6 py-3 truncate">
                          {sale.item?.name}
                        </td>{" "}
                        <td className="px-6 py-3 whitespace-normal truncate">
                          {sale.quantity}
                        </td>{" "}
                        <td className="px-6 py-3 whitespace-normal truncate">
                          {sale.price}
                        </td>
                        <td className="px-6 py-3 truncate">{sale.discount}</td>
                        <td className="px-6 py-3 truncate">{sale.lineAmt}</td>
                        <td className="px-6 py-3 whitespace-normal truncate">
                          {sale.createdAt}
                        </td>
                        <td className="px-6 py-3 truncate">{sale.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllocationHistory;
