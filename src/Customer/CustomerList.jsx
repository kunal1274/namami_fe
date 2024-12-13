import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";
import CustomerDetail from "./CustomerViewPage";
import { FaFilter } from "react-icons/fa";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0/customer";

function CustomerList({ customer, handleAddCustomer, handleViewCustomer }) {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [viewingCustomerId, setViewingCustomerId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const filterCustomers = (customers, search) => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.code.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Function to reset filters and search input
  const resetFilters = (setSearch, setFilters) => {
    console.log("Resetting filters");
    setSearch("");
    setFilters({ category: "", dateRange: "" });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredCustomers = filterCustomers(customerList, searchTerm);
  const fetchCustomer = async (customerId) => {
    if (!customerId.trim()) {
      setError("Customer ID cannot be empty.");
      return;
    }

    try {
      setError(null); // Clear any previous errors
      const response = await axios.get(`${baseUrl}/${customerId}`, {
        headers: {
          // Authorization: `Bearer ${token}`, // Add token if needed
        },
        withCredentials: false,
      });
      console.log("Fetched Customer:", response.data);
      setSelectedCustomer(response.data.data);
    } catch (err) {
      if (err.response) {
        setError(err.response?.data?.message || "An error occurred.");
      } else if (err.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${err.message}`);
      }
      setSelectedCustomer(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCustomer(id); // Fetch using URL param id
    }
  }, [id]);

  // Fetch Customers
  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const response = await axios.get(baseUrl, {
          withCredentials: false,
        });
        setCustomerList(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Failed to load customer data.");
      }
    }
    loadCustomers();
  }, []);

  // Handle Input Change

  // Go back to customer list view
  const goBack = () => {
    setViewingCustomerId(null);
    window.location.reload();
  };

  const toggleSelectAll = () => {
    if (selectedCustomers.length === customerList.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customerList.map((customer) => customer._id)); // Use _id to match the correct customer ID
    }
  };

  const handleDeleteSelectedCustomers = async () => {
    if (selectedCustomers.length === 0) {
      alert("No customers selected to delete.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete the selected customers?"
    );
    if (!confirmation) return;

    try {
      for (let customerId of selectedCustomers) {
        await axios.delete(`${baseUrl}/${customerId}`, {
          withCredentials: false, // Add if needed
        });
      }

      // Update the state to remove deleted customers
      setCustomerList((prevList) =>
        prevList.filter((customer) => !selectedCustomers.includes(customer._id))
      );

      // Clear the selected customers array
      setSelectedCustomers([]);
      alert("Selected customers deleted successfully!");
    } catch (error) {
      console.error("Error deleting customers:", error);
      alert("Failed to delete selected customers. Please try again.");
    }
  };

  const handleCheckboxChange = (customerId) => {
    console.log("Checkbox toggled for Customer ID:", customerId);
    // Update the selected customers array
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(customerId)
        ? prevSelected.filter((id) => id !== customerId)
        : [...prevSelected, customerId]
    );

    // Find the customer details by customerId and log it
    const customer = customerList.find(
      (customer) => customer._id === customerId
    );
    if (customer) {
      console.log("Customer Details:", customer); // Log customer details to the console
    }
  };

  const importFromExcel = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" }); // Parse the file
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
        const importedData = XLSX.utils.sheet_to_json(worksheet); // Convert sheet data to JSON
        setCustomerList((prevCustomers) => [...prevCustomers, ...importedData]); // Append to the list
        alert("Data imported successfully!");
      } catch (error) {
        console.error("Failed to import data:", error);
        alert("An error occurred while importing the file.");
      }
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };
  const exportToExcel = useCallback(() => {
    if (!customerList.length) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(customerList); // Converts customerList to a worksheet
    const workbook = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers"); // Adds the worksheet to the workbook

    try {
      XLSX.writeFile(workbook, "customer_list.xlsx"); // Exports the workbook to a file
      alert("Export successful!");
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      alert("Failed to export to Excel.");
    }
  }, [customerList]);

  const generatePDF = useCallback(() => {
    console.log("PDF button clicked"); // Debugging log
    try {
      const doc = new jsPDF({
        orientation: "landscape", // Use landscape orientation for better width handling
        unit: "pt", // Set measurement unit to points
        format: "A4", // Set paper size to A4
      });

      const tableColumn = [
        "#",
        "Customer Account",
        "Name",
        "Address",
        "Contact No.",
        "Currency",
        "Registration No.",
        "PAN",
        "Active",
      ];

      const tableRows = customerList.map((customer, index) => [
        index + 1,
        customer.code || "N/A",
        customer.name || "N/A",
        customer.address || "N/A",
        customer.contactNum || "N/A",
        customer.currency || "N/A",
        customer.registrationNum || "N/A",
        customer.panNum || "N/A",
        customer.active ? "Yes" : "No",
      ]);

      // Set title and custom formatting
      doc.setFontSize(18);
      doc.text("Customer List", doc.internal.pageSize.width / 2, 40, {
        align: "center", // Center-align the title
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 60, // Start table below the title
        headStyles: {
          fillColor: [41, 128, 185], // Blue header color
          textColor: [255, 255, 255], // White text color
          halign: "center", // Center-align header text
        },
        bodyStyles: {
          halign: "center", // Center-align body text
          fontSize: 10, // Set font size for better readability
        },
        margin: { top: 50, left: 30, right: 30 }, // Add margins
        columnStyles: {
          0: { halign: "center", cellWidth: 40 }, // Adjust for the index column
          1: { halign: "left", cellWidth: 80 }, // Customer Account
          2: { halign: "left", cellWidth: 100 }, // Name
          3: { halign: "left", cellWidth: 150 }, // Address
          4: { halign: "center", cellWidth: 90 }, // Contact No.
          5: { halign: "center", cellWidth: 70 }, // Currency
          6: { halign: "center", cellWidth: 100 }, // Registration No.
          7: { halign: "center", cellWidth: 70 }, // PAN
          8: { halign: "center", cellWidth: 50 }, // Active
        },
      });

      doc.save("customer_list.pdf");
      console.log("PDF generated successfully.");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("An error occurred while generating the PDF.");
    }
  }, [customerList]);

  console.log(customerList.length);

  const handleCustomerClick = (customerId) => {
    console.log("customer.id");
    setViewingCustomerId(customerId);
  };

  const toggleView = (targetView) => {
    if (view !== targetView) {
      setView(targetView);
      console.log("Toggle function working: View changed to", targetView);
    } else {
      console.log("Error in running function: View did not change");
    }
  };

  return (
    <div className="bg-grey-400 p-8 min-h-screen">
      <div className=" rounded-full mb-5">
        {viewingCustomerId ? (
          <CustomerDetail
            toggleView={toggleView}
            customerId={viewingCustomerId}
            goBack={goBack}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between space-x-3">
              <h1 className="text-2xl font-bold mb-4">Customer Lists</h1>

              <div className="flex justify-between rounded-full mb-5">
                <div className="flex justify-end gap-4">
                 

                  <button
                    onClick={handleAddCustomer}
                    className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                  >
                    + Add
                  </button>
                  <button
                    onClick={handleDeleteSelectedCustomers}
                    disabled={selectedCustomers.length === 0}
                    className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                      selectedCustomers.length > 0
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
                <button className="flex items-center px-3 py-2 bg-gray-200 rounded">
                  <FaFilter className="mr-2" />
                  Filter By
                </button>

                {/* Date Select Dropdown */}
                <select className="outline-none border rounded px-3 py-2">
                  <option>Date</option>
                  <option>Order Type</option>
                </select>

                {/* Order Status Dropdown */}
                <select className="outline-none border rounded px-3 py-2">
                  <option>Order Status</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>

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
                    className="px-2 h-10 border border-green-500 bg-zinc-200 rounded-full py-2"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Right Section: Reset Button */}
              <div className="w-full md:w-auto flex justify-end">
                <button
                  className="text-red-500"
                  onClick={() => resetFilters(setSearch, setFilters)} // Pass setSearch and setFilters
                >
                  Reset Filter
                </button>
              </div>
            </div>
            {/* Action Buttons */}

            {/* Customer Table */}
            <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300 text-left">
                        <input
                          type="checkbox"
                          checked={
                            selectedCustomers.length === customerList.length
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Customer Account
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Registration No.
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Address
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Contact No.
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Currency
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        PAN
                      </th>
                      <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList
                      .filter((customer) =>
                        customer.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((customer) => (
                        <tr key={customer._id} className="hover:bg-gray-50">
                          <td className="border px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCustomers.includes(customer._id)}
                              onChange={() =>
                                handleCheckboxChange(customer._id)
                              }
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => handleCustomerClick(customer._id)}
                            >
                              {customer.code}
                            </button>
                          </td>

                          <td className="px-6 py-3 truncate">
                            {customer.name}
                          </td>
                          <td className="px-6 py-3 whitespace-normal truncate">
                            {customer.contactNum}
                          </td>
                          <td className="px-6 py-3 whitespace-normal truncate">
                            {customer.address}
                          </td>
                          <td className="px-6 py-3 truncate">
                            {customer.currency}
                          </td>
                          <td className="px-6 py-3 truncate">
                            {customer.panNum}
                          </td>
                          <td className="px-6 py-3 truncate">
                            {customer.registrationNum}
                          </td>
                          <td className="px-6 py-3 truncate">
                            {customer.active ? "Yes" : "No"}
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

export default CustomerList;
