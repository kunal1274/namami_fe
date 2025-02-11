import { Select } from "flowbite-react";

import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PurchaseOrderViewPage from "./PurchaseOrderViewPage";
const Pur =  ({ handleAddPurchaseOrder }) => {
    const [selectedPurchases, setSelectedPurchases] = useState([]);
    const [selectedOption, setSelectedOption] = useState("All");
    const [purchases, setPurchases] = useState([]); // Declare purchases first

    const [viewingPurchaseId, setViewingPurchaseId] = useState(null);
  
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("All");
  
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [sortOption, setSortOption] = useState("");
    const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  
    const baseUrl = "https://befr8n.vercel.app/fms/api/v0/purchaseorders";
    const [PurchseList, setPurchseList] = useState([]);
   
    const [view, setView] = useState([]);
    const handleDeleteSelected = async () => {
      if (selectedPurchases.length === 0) {
        alert("No Purchase order selected to delete.");
        return;
      }
    
      try {
        // Perform deletion API calls
        await Promise.all(
          selectedPurchases.map((itemId) => axios.delete(`${baseUrl}/${itemId}`))
        );
    
        // Update the state to remove deleted Purchases
        setFilteredPurchases((prev) =>
          prev.filter((purchase) => !selectedPurchases.includes(purchase._id))
        );
        setPurchases((prev) =>
          prev.filter((purchase) => !selectedPurchases.includes(purchase._id))
        );
    
        setSelectedPurchases([]); // Clear selected items after deletion
        alert("Selected items deleted successfully!");
      } catch (error) {
        console.error("Error deleting items:", error);
        alert("Failed to delete selected items.");
      }
    };
    

  
    const { id } = useParams();
    const [selectedSortOption, setSelectedSortOption] = useState("All");
    // Fetch all purchases from the API
    const fetchPurchases = useCallback(async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseUrl);
        setPurchases(response.data.data);
        console.log(response.data.data);
        setFilteredPurchases(response.data.data);
      } catch (error) {
        console.error("Failed to load Purchases:", error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchPurchases();
    }, [fetchPurchases]);
  
    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setFilteredPurchases(
        purchases.filter((purchase) =>
          purchase.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    };
  
    const toggleView = (targetView) => {
      if (view !== targetView) {
        setView(targetView);
        console.log("Toggle function working: View changed to", targetView);
      } else {
        console.log("Error in running function: View did not change");
      }
    };
    const handleCheckboxChange = (id) => {
      setSelectedPurchases((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((purchaseId) => purchaseId !== id)
          : [...prevSelected, id]
      );
    };
  
    const toggleSelectAll = () => {
      if (selectedPurchases.length === filteredPurchases.length) {
        setSelectedPurchases([]);
      } else {
        setSelectedPurchases(filteredPurchases.map((purchase) => purchase._id));
      }
    };

    const generatePDF = useCallback(() => {
      if (!selectedPurchases || selectedPurchases.length === 0) {
        alert("No purchases selected to generate PDF!");
        return;
      }
    
      const doc = new jsPDF();
    
      const tableColumn = [
        "#",
        "PurchaseNo.",
        "Vendor Name",
        "Item Name",
        "Quantity",
        "Price",
        "Discount",
        "Line Amount",
        "Created At",
        "Status",
      ];
    
      // Filter only the selected purchases
      const selectedData = filteredPurchases.filter((purchase) =>
        selectedPurchases.includes(purchase._id)
      );
    
      // Map the data for table rows
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
    
      // Add title
      doc.text("Selected Purchases Order List", 14, 20);
    
      // Generate table in PDF
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });
    
      // Save as PDF file
      doc.save("selected_purchases_order_list.pdf");
    
      alert("PDF Generated Successfully!");
    }, [selectedPurchases, filteredPurchases]);
    
    const handlePurchaseClick = (id) => {
      alert(`Purchase clicked: ${id}`);
      setViewingPurchaseId(id);
    };
    // Handle filtering logic
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
            purchase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      setFilteredPurchases(filtered);
    }, [purchases, searchTerm, selectedFilter]);
  
    useEffect(() => {
      applyFilters();
    }, [applyFilters]);
  
    // Handle individual purchase selection
  
     
 

  
  
  
 
    const handleFilterChange = (e) => {
        const value = e.target.value; // Get the selected filter value
        setSelectedFilter(value); // Update the selected filter state
      
        let filtered = [...purchases]; // Clone the original purchases array
      
        switch (value) {
          case "yes": // Show only active purchases
            filtered = filtered.filter((purchase) => purchase.active === true);
            break;
      
          case "no": // Show only inactive purchases
            filtered = filtered.filter((purchase) => purchase.active === false);
            break;
      
          case "All": // Show all purchases
          default:
            filtered = [...purchases];
            break;
        }
      
        setFilteredPurchases(filtered); // Update the filteredPurchases state
      };
      
    const handleSortChange = (e) => {
      const value = e.target.value;
      setSelectedSortOption(value);
    
      let sorted = [...filteredPurchases];
    
      switch (value) {
        case "Purchase Name":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Purchase Account no":
          sorted.sort((a, b) => a.code.localeCompare(b.code));
          break;
        case "Purchase Account no descending":
          sorted.sort((a, b) => b.code.localeCompare(a.code));
          break;
        case "By unit":
          sorted.sort((a, b) => a.unit.localeCompare(b.unit));
          break;
        case "All":
        default:
          break;
      }
    
      setFilteredPurchases(sorted);
    };

    const resetFilters = () => {
      // Reset all relevant states
      setSearchTerm(""); // Clear search term if any
      setSelectedFilter("All"); // Reset to default option
      setSortOption(""); // Reset sorting to default
      setFilteredPurchases([...purchases]); // Restore the original purchases array
    
      console.log("Filters reset to default.");
    };
    
    const goBack = () => {
      setViewingPurchaseId(null);
      window.location.reload();
    };
    const handleTypeFilterChange = (e) => {
        const value = e.target.value;
      
        let filtered;
      
        switch (value) {
          case "Services":
            filtered = purchases.filter((purchase) => purchase.type === "Services");
            break;
          case "Goods":
            filtered = purchases.filter((purchase) => purchase.type === "Goods");
            break;
          case "All":
            filtered = purchases; // No filter applied, show all purchases
            break;
          default:
            filtered = purchases; // Fallback to show all purchases
            break;
        }
      
        setFilteredPurchases(filtered);
      };
      
  return (
  <>
  <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
  <div className="max-h-96 overflow-y-auto">
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-300 text-left">
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={selectedPurchases.length === filteredPurchases.length}
            />
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Purchase Order No</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Vendor Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Item Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Qty</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Discount</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Line Amount</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Created At</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
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
            <td className="border px-6 py-3 truncate">{purchase.Vendor?.name || "N/A"}</td>
            <td className="border px-6 py-3 truncate">{purchase.item?.name || "N/A"}</td>
            <td className="border px-6 py-3 whitespace-nowrap truncate">{purchase.quantity || "N/A"}</td>
            <td className="border px-6 py-3 whitespace-nowrap truncate">{purchase.price || "N/A"}</td>
            <td className="border px-6 py-3 truncate">{purchase.discount || "N/A"}</td>
            <td className="border px-6 py-3 truncate">{purchase.lineAmt || "N/A"}</td>
            <td className="border px-6 py-3 whitespace-nowrap truncate">
              {new Date(purchase.createdAt).toLocaleDateString()}
            </td>
            <td className="border px-6 py-3 truncate">{purchase.status || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  </>
  )
}

export default Pur