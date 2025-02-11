import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Select } from "flowbite-react";
import ItemviewPage from "./ItemviewPage";
import { FaFilter } from "react-icons/fa";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0/items";

function ItemList({ handleAddItem }) {
  const baseUrl = "https://befr8n.vercel.app/fms/api/v0/items";
  const [itemList, setItemList] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [viewingItemId, setViewingItemId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const { id } = useParams();
  const [selectedSortOption, setSelectedSortOption] = useState("All");
  // Fetch all items from the API
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setItems(response.data.data);
      setFilteredItems(response.data.data);
    } catch (error) {
      console.error("Failed to load items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
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
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map((item) => item._id));
    }
  };
  const goBack = () => {
    setViewingItemId(null);
    window.location.reload();
  };
  const handleItemClick = (id) => {
    alert(`Item clicked: ${id}`);
    setViewingItemId(id);
  };
  // Handle filtering logic
  const applyFilters = useCallback(() => {
    let filtered = [...items];

    if (selectedFilter === "yes") {
      filtered = filtered.filter((item) => item.active);
    } else if (selectedFilter === "no") {
      filtered = filtered.filter((item) => !item.active);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle individual item selection

  const generatePDF = useCallback(() => {
    const doc = new jsPDF();
    const tableColumn = [
      "#",
      "Item No.",
      "Item Name",
      "Type",
      "Description",
      "Unit",
      "Price",
      "Active",
    ];
    const tableRows = filteredItems.map((item, index) => [
      index + 1,
      item.itemNo,
      item.itemName,
      item.type,
      item.description,
      item.unit,
      item.price,
      item.active ? "Yes" : "No",
    ]);
    doc.text("Item List", 14, 20);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("item_list.pdf");
  }, [filteredItems]);

  const exportToExcel = useCallback(() => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
    XLSX.writeFile(workbook, "item_list.xlsx");
  }, [filteredItems]);
  const importFromExcel = () => {};
  // Handle "select all" functionality

  // Handle deleting selected items
  const handleDeleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      alert("No customers selected to delete.");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete the selected items?")
    ) {
      return;
    }

    try {
      await Promise.all(
        selectedItems.map((itemId) => axios.delete(`${baseUrl}/${itemId}`))
      );
      setItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item._id))
      );
      setSelectedItems([]);
      alert("Selected items deleted successfully!");
    } catch (error) {
      console.error("Error deleting items:", error);
      alert("Failed to delete selected items.");
    }
  };

  // Reset filters

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  const handleFilterChange = (e) => {
    const value = e.target.value; // Get the selected filter value
    setSelectedFilter(value); // Update the selected filter state

    let filtered = [...items]; // Clone the original items array

    switch (value) {
      case "yes": // Show only active items
        filtered = filtered.filter((item) => item.active === true);
        break;

      case "no": // Show only inactive items
        filtered = filtered.filter((item) => item.active === false);
        break;

      case "All": // Show all items
      default:
        filtered = [...items];
        break;
    }

    setFilteredItems(filtered); // Update the filteredItems state
  };
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSortOption(value);

    let sorted = [...filteredItems];

    switch (value) {
      case "Item Name":
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Item Account no":
        sorted = sorted.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "Item Account no descending":
        sorted = sorted.sort((a, b) => b.code.localeCompare(a.code));
        break;
      case "By unit":
        sorted = sorted.sort((a, b) => a.unit.localeCompare(b.unit));
        break;
      case "All":
      default:
        break;
    }

    setFilteredItems(sorted);
  };
  const handleTypeFilterChange = (e) => {
    const value = e.target.value;

    let filtered;

    switch (value) {
      case "Services":
        filtered = items.filter((item) => item.type === "Services");
        break;
      case "Goods":
        filtered = items.filter((item) => item.type === "Goods");
        break;
      case "All":
        filtered = items; // No filter applied, show all items
        break;
      default:
        filtered = items; // Fallback to show all items
        break;
    }

    setFilteredItems(filtered);
  };
  const resetFilters = () => {
    // Reset all relevant states
    setSearchTerm(""); // Clear search term if any
    setSelectedFilter("All"); // Reset to default option
    setSortOption(""); // Reset sorting to default
    setFilteredItems([...items]); // Restore the original items array

    console.log("Filters reset to default.");
  };
  return (
    <div className="bg-grey-400 min-h-screen">
      <div className=" rounded-full mb-5">
        {viewingItemId ? (
          <ItemviewPage
            toggleView={toggleView}
            itemId={viewingItemId}
            goBack={goBack}
          />
        ) : (
          <>
            <div className="flex justify-between space-x-3">
              <h1 className="text-2xl font-bold mb-4">Item List</h1>
              <div className="flex justify-between rounded-full mb-5">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleAddItem}
                    className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                  >
                    + Add
                  </button>
                  <button
                    onClick={handleDeleteSelectedItems}
                    disabled={selectedItems.length === 0}
                    className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                      selectedItems.length > 0
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
                  <label className="border h-10 border-green-500 bg-white rounded-md py-2 px-4">
                    <input
                      type="file"
                      accept=".xls,.xlsx"
                      onChange={importFromExcel}
                      className="hidden"
                    />
                    Import
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between p-4 bg-white rounded-md shadow mb-6 space-y-4 md:space-y-0 md:space-x-4">
              {/* Left Section: Filters and Search */}
              <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Filter Button */}
                <Select
                  value={selectedSortOption}
                  onChange={handleSortChange}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All" disabled className="text-gray-500">
                    Sort By
                  </option>
                  <option value="All">Sort by </option>
                  <option value="Item Name">Sort by Item Name</option>
                  <option value="Item Account no">By Item No</option>
                  <option value="Item Account no descending">
                    By Item No Descending
                  </option>
                </Select>
                <Select
                  value={selectedType}
                  onChange={handleTypeFilterChange}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All">Sort by Unit</option>
                  <option value="Goods">Goods</option>
                  <option value="Services">Services</option>
                </Select>
                {/* Order Status Dropdown */}

                <Select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All">Status </option>
                  <option value="yes">Active Items</option>
                  <option value="no">Inactive Items</option>
                </Select>
                {/* Search Bar */}
                <div className="flex items-center  space-x-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full md:w-60 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => alert(`Searching for "${searchTerm}"`)}
                    className="px-2 h-10 border border-grey-500 bg-zinc-200 rounded-full py-2"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Right Section: Reset Button */}
              <div className="w-full md:w-auto flex justify-end">
                <button
                  className="text-red-500"
                  onClick={resetFilters} // Attach the reset function here
                >
                  Reset Filter
                </button>
              </div>
            </div>

            <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.length === filteredItems.length
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Item No.
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Item Name
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Description
                      </th>{" "}
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Unit
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Price
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)}
                          />
                        </td>
                        <td>
                          <button onClick={() => handleItemClick(item._id)}>
                            {item.code}
                          </button>
                        </td>
                        <td className="px-6 py-3 truncate">{item.name}</td>
                        <td className="px-6 py-3 truncate">{item.type}</td>
                        <td className="px-6 py-3 whitespace-normal truncate">
                          {item.description}
                        </td>
                        <td className="px-6 py-3 whitespace-normal truncate">
                          {item.unit}
                        </td>
                        <td className="px-6 py-3 truncate">{item.price}</td>
                        <td className="px-6 py-3 truncate">
                          {item.active ? "Yes" : "No"}
                        </td>
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
}

export default ItemList;
