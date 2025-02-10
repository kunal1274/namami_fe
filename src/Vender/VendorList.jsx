import React, { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { Select } from "flowbite-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import VendorViewPage from "./VendorViewPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0/vendors";
const VendorList = ({ handleAddVendor }) => {
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [viewingVendorId, setViewingVendorId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("list");
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredVendors, setFilteredVendors] = useState([]);

  // Fetch Vendors
  const fetchVendors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setVendorList(response.data.data);
      setFilteredVendors(response.data.data);
    } catch (error) {
      console.error("Failed to load Vendors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => {
    if (id) fetchVendorDetails(id);
  }, [id]);

  const fetchVendorDetails = async (vendorId) => {
    try {
      const response = await axios.get(`${baseUrl}/${vendorId}`);
      setViewingVendorId(response.data.data);
    } catch (error) {
      console.error("Error fetching Vendor details:", error);
    }
  };

  // Search and Filter Logic

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = vendorList.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(term.toLowerCase()) ||
        vendor.code.toLowerCase().includes(term.toLowerCase()) ||
        vendor.contactNum.includes(term) // Add this line to search by phone number
    );

    setFilteredVendors(filtered);
  };

  const handleDeleteSelected = async () => {
    console.log("Selected Vendors:", selectedVendors);

    if (!selectedVendors.length) {
      toast.info("No Vendors selected to delete.", { autoClose: 1000 });
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete the selected Vendors?")
    ) {
      return;
    }

    try {
      // Perform delete requests for selected Vendors
      const deleteResponses = await Promise.all(
        selectedVendors.map((itemId) => {
          console.log(`Deleting Vendor with ID: ${itemId}`);
          return axios.delete(`${baseUrl}/${itemId}`);
        })
      );

      // Check if all delete requests succeeded
      toast.success("Selected Vendors deleted successfully!", {
        autoClose: 1000,
      });
      console.log("Delete responses:", deleteResponses);

      // Update state to remove deleted Vendors
      setItems((prev) =>
        prev.filter((item) => !selectedVendors.includes(item._id))
      );

      setSelectedVendors([]);

      // Optional: Refresh the page, but try to avoid if state is updated correctly
      console.log("Page refresh triggered after deletion.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error deleting Vendors:", error.response || error.message);
    }
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
      setVendorList((prev) => [...prev, ...importedData]);
    };
    reader.readAsArrayBuffer(file);
  };

  // Export to Excel
  const exportToExcel = useCallback(() => {
    if (!VendorList.length) return alert("No data to export");
    const worksheet = XLSX.utils.json_to_sheet(VendorList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");
    XLSX.writeFile(workbook, "Vendor_list.xlsx");
  }, [vendorList]);

  // Generate PDF
  const generatePDF = useCallback(() => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });
    autoTable(doc, {
      head: [["#", "vendor Code", "Name", "Contact", "Address", "Active"]],
      body: filteredVendors.map((vendor, index) => [
        index + 1,
        vendor.code,
        vendor.name,
        vendor.contactNum,
        vendor.address,
        vendor.active ? "Yes" : "No",
      ]),
    });
    doc.save("vendor_list.pdf");
  }, [filteredVendors]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    let filtered = [...vendorList];

    if (value === "All") {
      setFilteredVendors(filtered);
    } else if (value === "yes") {
      setFilteredVendors(filtered.filter((vendor) => vendor.active === true));
    } else if (value === "no") {
      setFilteredVendors(filtered.filter((vendor) => vendor.active === false));
    } else if (value === "vendor Name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      setFilteredVendors(filtered);
    } else if (value === "Vendor Account no") {
      filtered = filtered.sort((a, b) => a.code.localeCompare(b.code));
      setFilteredVendors(filtered);
    } else if (value === "Vendor Account no descending") {
      filtered = filtered.sort((a, b) => b.code.localeCompare(a.code));
      setFilteredVendors(filtered);
    }
  };

  const filterVendor = (vendors, search) => {
    return vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.code.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Function to reset filters and search input

  const filteredVendor = filterVendor(vendorList, searchTerm);
  const fetchVendor = async (vendorId) => {
    if (!vendorId.trim()) {
      setError("vendor ID cannot be empty.");
      return;
    }

    try {
      setError(null); // Clear any previous errors
      const response = await axios.get(`${baseUrl}/${vendorId}`, {
        headers: {
          // Authorization: `Bearer ${token}`, // Add token if needed
        },
        withCredentials: false,
      });
      console.log("Fetched vendor:", response.data);
      setSelectedVendor(response.data.data);
    } catch (err) {
      if (err.response) {
        setError(err.response?.data?.message || "An error occurred.");
      } else if (err.request) {
        setError("Error: No response from the server.");
      } else {
        setError(`Error: ${err.message}`);
      }
      setSelectedVendor(null);
    }
  };

  useEffect(() => {
    if (id) {
      fetchVendor(id); // Fetch using URL param id
    }
  }, [id]);

  // Fetch Vendors
  useEffect(() => {
    async function loadVendors() {
      try {
        setLoading(true);
        const response = await axios.get(baseUrl, {
          withCredentials: false,
        });
        setVendorList(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Failed to load Vendor data.");
      }
    }
    loadVendors();
  }, []);

  // Handle Input Change

  // Go back to Vendor list view
  const goBack = () => {
    setViewingVendorId(null);
    window.location.reload();
  };

  console.log(vendorList.length);

  const handleVendorClick = (vendorId) => {
    console.log("vendor.id");
    setViewingVendorId(vendorId);
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
    if (id) fetchVendorDetails(id);
  }, [id]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedOption("Active Status ");
    setFilteredVendors(vendorList);
  };
  return (
    <div className="bg-grey-400  min-h-screen">
      <div className="rounded-full mb-5">
        {viewingVendorId ? (
          <VendorViewPage
            toggleView={toggleView}
            vendorId={viewingVendorId}
            goBack={goBack}
          />
        ) : (
          <>
            <ToastContainer />
            {/* Header */}
            <div className="flex justify-between space-x-3">
              <h1 className="text-2xl font-bold mb-4">vendor Lists</h1>
              <div className="flex justify-between rounded-full mb-5">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleAddVendor}
                    className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
                  >
                    + Add
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    disabled={selectedVendors.length === 0}
                    className={`h-10 px-4 py-2 border border-green-500 bg-white rounded-md ${
                      selectedVendors.length > 0
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
                  <option className="flex items-center px-3 py-2 bg-gray-200 rounded">
                    Sort By
                  </option>
                  <option className="flex items-center px-3 py-2 bg-gray-200 rounded">
                    vendor Name
                  </option>
                  <option className="flex items-center px-3 py-2 bg-gray-200 rounded">
                    vendor Account no
                  </option>
                  <option className="flex items-center px-3 py-2 bg-gray-200 rounded">
                    vendor Account no descending
                  </option>
                </Select>

                {/* Order Status Dropdown */}
                <Select
                  value={selectedOption}
                  onChange={handleFilterChange}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded"
                >
                  <option value="All"> Filter By Status</option>
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

            {/* vendor Table */}

            <div className="border border-gray-300 rounded-lg bg-white shadow-md p-4">
              <div className="max-h-[500px] overflow-y-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-gray-700 border-collapse">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr className="text-left text-gray-800 font-semibold uppercase">
                      <th className="px-6 py-3 border border-gray-300">#</th>
                      <th className="px-6 py-3 border border-gray-300">
                        vendor Account
                      </th>
                      <th className="px-6 py-3 border border-gray-300">Name</th>
                      <th className="px-6 py-3 border border-gray-300">
                        Contact No.
                      </th>
                      <th className="px-6 py-3 border border-gray-300">
                        Address
                      </th>
                      <th className="px-6 py-3 border border-gray-300">PAN</th>
                      <th className="px-6 py-3 border border-gray-300">
                        Currency
                      </th>
                      <th className="px-6 py-3 border border-gray-300">
                        Registration No.
                      </th>
                      <th className="px-6 py-3 border border-gray-300">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor._id}>
                        <td>
                          <th className="px-4 py-3 border border-gray-300 text-center">
                            <input
                              type="checkbox"
                              checked={selectedVendors.includes(vendor._id)}
                              onChange={() =>
                                setSelectedVendors((prev) =>
                                  prev.includes(vendor._id)
                                    ? prev.filter((id) => id !== vendor._id)
                                    : [...prev, vendor._id]
                                )
                              }
                            />
                          </th>
                        </td>
                        <td className="px-4 py-3 border border-gray-300 text-center">
                          <button
                            className="text-blue-500 hover:underline"
                            onClick={() => handleVendorClick(vendor._id)}
                          >
                            {vendor.code}
                          </button>
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.name}
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.contactNum}
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.address}
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.panNum}
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.currency}
                        </td>
                        <td className="border px-3 py-2 truncate">
                          {vendor.registrationNum}
                        </td>
                        <td className="px-6 py-3 border border-gray-300">
                          {vendor.active ? "Yes" : "No"}
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

export default VendorList;
