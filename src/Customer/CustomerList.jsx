import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";
import CustomerDetail from "./CustomerViewPage";
import { FaFilter } from "react-icons/fa";
import { Select } from "flowbite-react";



const baseUrl = "https://befr8n.vercel.app/fms/api/v0/customer";

const CustomerList = ({ handleAddCustomer }) => {
    const [customerList, setCustomerList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [selectedOption, setSelectedOption] = useState("All");
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [viewingCustomerId, setViewingCustomerId] = useState(null);
    const [search, setSearch] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState("list");
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
 
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
    // Fetch customers
    const fetchCustomers = useCallback(async () => {
      setLoading(true);
      try {
        const response = await axios.get(baseUrl);
        setCustomerList(response.data.data);
        setFilteredCustomers(response.data.data);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchCustomers();
    }, [fetchCustomers]);
  
    useEffect(() => {
      if (id) fetchCustomerDetails(id);
    }, [id]);
  
    const fetchCustomerDetails = async (customerId) => {
      try {
        const response = await axios.get(`${baseUrl}/${customerId}`);
        setViewingCustomerId(response.data.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };
  
    // Search and Filter Logic
  
    const handleSearchChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
  
      const filtered = customerList.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term.toLowerCase()) ||
          customer.code.toLowerCase().includes(term.toLowerCase()) ||
          customer.contactNum.includes(term) // Add this line to search by phone number
      );
  
      setFilteredCustomers(filtered);
    };

  
    // Import Data from Excel
    const importFromExcel = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const importedData = XLSX.utils.sheet_to_json(worksheet);
        setCustomerList((prev) => [...prev, ...importedData]);
      };
      reader.readAsArrayBuffer(file);
    };
  
    // Export to Excel
    const exportToExcel = useCallback(() => {
      if (!customerList.length) return alert("No data to export");
      const worksheet = XLSX.utils.json_to_sheet(customerList);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
      XLSX.writeFile(workbook, "customer_list.xlsx");
    }, [customerList]);
  
    // Generate PDF
    const generatePDF = useCallback(() => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "A4",
      });
      autoTable(doc, {
        head: [["#", "Customer Code", "Name", "Contact", "Address", "Active"]],
        body: filteredCustomers.map((customer, index) => [
          index + 1,
          customer.code,
          customer.name,
          customer.contactNum,
          customer.address,
          customer.active ? "Yes" : "No",
        ]),
      });
      doc.save("customer_list.pdf");
    }, [filteredCustomers]);
  
    const handleDeleteSelected = async () => {
      if (!selectedCustomers.length) return alert("No customers selected");
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;
      try {
        await Promise.all(
          selectedCustomers.map((id) => axios.delete(`${baseUrl}/${id}`))
        );
        setCustomerList((prev) =>
          prev.filter((cust) => !selectedCustomers.includes(cust._id))
        );
        setSelectedCustomers([]);
      } catch (error) {
        console.error("Error deleting customers:", error);
      }
    };
    const handleFilterChange = (e) => {
      const value = e.target.value;
      setSelectedOption(value);
  
      let filtered = [...customerList];
  
      if (value === "All") {
        setFilteredCustomers(filtered);
      } else if (value === "yes") {
        setFilteredCustomers(
          filtered.filter((customer) => customer.active === true)
        );
      } else if (value === "no") {
        setFilteredCustomers(
          filtered.filter((customer) => customer.active === false)
        );
      } else if (value === "Customer Name") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        setFilteredCustomers(filtered);
      } else if (value === "Customer Account no") {
        filtered = filtered.sort((a, b) => a.code.localeCompare(b.code));
        setFilteredCustomers(filtered);
      } else if (value === "Customer Account no descending") {
        filtered = filtered.sort((a, b) => b.code.localeCompare(a.code));
        setFilteredCustomers(filtered);
      }
    };
    const toggleSelectAll = () => {
        if (selectedCustomers.length === customerList.length) {
          setSelectedCustomers([]);
        } else {
          setSelectedCustomers(customerList.map((customer) => customer._id)); // Use _id to match the correct customer ID
        }
      };


    const filterCustomer = (customers, search) => {
        return customers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.code.toLowerCase().includes(search.toLowerCase())
        );
      };
    
      // Function to reset filters and search input
    
      const filteredCustomer = filterCustomer(customerList, searchTerm);
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
    


    
    
      useEffect(() => {
        fetchCustomers();
      }, [fetchCustomers]);
    
      useEffect(() => {
        if (id) fetchCustomerDetails(id);
      }, [id]);
    
      const resetFilters = () => {
        setSearchTerm("");  
        setSelectedOption("Active Status ");
        setFilteredCustomers(customerList);
      };
    return (
        <div className="bg-grey-400 p-8 min-h-screen">
          <div className="rounded-full mb-5">
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
                    <Select
                      value={selectedOption}
                      onChange={handleFilterChange}
                      className="flex items-center px-3 py-2 bg-gray-200 rounded"
                    >
                      <FaFilter className="mr-2" />
                      <option className="flex items-center px-3 py-2 bg-gray-200 rounded">Filter By</option>
                      <option className="flex items-center px-3 py-2 bg-gray-200 rounded">Customer Name</option>
                      <option className="flex items-center px-3 py-2 bg-gray-200 rounded">Customer Account no</option>
                      <option className="flex items-center px-3 py-2 bg-gray-200 rounded">Customer Account no descending</option>
                    </Select>
    
                    {/* Order Status Dropdown */}
                    <Select
                      value={selectedOption}
                      onChange={handleFilterChange}
                      className="flex items-center px-3 py-2 bg-gray-200 rounded"
                    >
                      <option value="All">Active Status</option>
                      <option value="yes">Active</option>
                      <option value="no">Inactive</option>
                    </Select>
    
                    {/* Search Bar */}
                    <div className="flex items-center space-x-2 w-full md:w-auto">
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
                      onClick={() => resetFilters(setSearch, setFilters)} // Pass setSearch and setFilters
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
    
                {/* Customer Table */}
                <div className="border border-green-500 rounded-lg bg-white p-4 overflow-hidden">
  <div className="max-h-96 overflow-y-auto">
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-300 text-left">
            <input
              type="checkbox"
              onChange={() =>
                setSelectedCustomers(
                  selectedCustomers.length
                    ? []
                    : customerList.map((c) => c._id)
                )
              }
              checked={selectedCustomers.length === customerList.length}
            />
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Customer Account
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Contact No.
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Address
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Currency
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            PAN
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Registration No.
          </th>
          <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
            Active
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => (
          <tr key={customer._id}>
            <td>
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer._id)}
                onChange={() =>
                  setSelectedCustomers((prev) =>
                    prev.includes(customer._id)
                      ? prev.filter((id) => id !== customer._id)
                      : [...prev, customer._id]
                  )
                }
              />
            </td>
            <td>
              <button onClick={() => handleCustomerClick(customer._id)}>
                {customer.code}
              </button>
            </td>
            <td className="px-6 py-3 truncate">{customer.name}</td>
            <td className="px-6 py-3 whitespace-normal truncate">
              {customer.contactNum}
            </td>
            <td className="px-6 py-3 whitespace-normal truncate">
              {customer.address}
            </td>
            <td className="px-6 py-3 truncate">{customer.panNum}</td>
            <td className="px-6 py-3 truncate">{customer.currency}</td>
            <td className="px-6 py-3 truncate">{customer.registrationNum}</td>
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
    };
    
    export default CustomerList;