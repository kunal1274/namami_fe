import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";
import { useParams } from "react-router-dom";


const baseUrl = "https://befr8n.vercel.app";
const secondUrl = "/fms/api/v0";
const thirdUrl = "/customer";
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

const CustomerViewPage = ({ customerId, customer, handleAddCustomer,handleSaveCustomer,toggleView  ,handleCancel}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...customer });
  const [error, setError] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const { id } = useParams(); // Use id from URL if needed

  useEffect(() => {
    async function fetchCustomerDetail() {
      try {
        const response = await axios.get(`https://befr8n.vercel.app/fms/api/v0/customer/${customerId|| id}`);
        if (response.status === 200) {
          setCustomerDetail(response.data.data);
          setFormData(response.data.data); // Sync form data
        } else {
          setError(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching customer details", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  
    fetchCustomerDetail();
  }, [customerId, id]);


  const handleUpdate = async () => {
    if (window.confirm("Are you sure you want to update this customer?")) {
      setLoading(true);
      try {
        const response = await axios.put(`${mergedUrl}/${customerId}`, formData, {
          withCredentials: false,
        });
        alert("Customer updated successfully.");
        setCustomerDetail(response.data); // Update customer details with response
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    handleAddCustomer();
    toggleView();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "contactNum") {
      // Allow only numeric values and limit to 10 digits
      const numericValue = value.replace(/[^0-9]/g, "");  // Remove any non-numeric characters
      if (numericValue.length <= 10) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
      }
      return;
    }
  
    if (name === "pan" && value.length > 10) return;
    if (name === "registrationNum" && value.length > 16) return;
  
    if (name === "currency" || name === "pan" || name === "registrationNum") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleSaveCustomer(formData); // Save customer data
    setIsEditing(false); // Exit edit mode
  };
  const back = () => {
    if (toggleView) {
      console.log("toggle function working");
      toggleView(); // Execute the toggleView function
      setView("form");
    } else {
      console.log("error in running function");
    }
  };
 
  return (
    <div className="bg-blue-400 mt-44 p-8 min-h-screen">
      <div className="bg-slate-50 rounded-lg p-6">
      <header className="text-center bg-white py-2 border border-blue-300 rounded-full mb-5">
        <h2 className="text-lg font-bold text-blue-500 ">Customer View Page</h2>
      </header>

        {/* Buttons for Back, Edit, Save, and Add New Customer */}
        <div className="flex space-x-4 mb-5">
      
        <button
  onClick={handleCancel}
  className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
>
  Back
</button>
          <button
            onClick={handleEdit}
            className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
            disabled={isEditing} // Disable if already in edit mode
          >
            Edit
          </button>
          <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-3 border border-green-500 h-10 bg-white rounded-md hover:bg-gray-100"
        >
        {loading ? "Updating..." : "Update Customer"}
      </button>
       
        </div>

        {/* Customer Details Form */}
        {loading ? (
          <div className="text-center text-blue-500">Loading customer details...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="mt-10 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-blue-600">Customer Account No</label>
              <input
                type="text"
                name="customerAccountNo"
                value={formData.code}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled  // Enable only in edit mode
              />
            </div>

            <div>
              <label className="font-semibold text-blue-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing} // Enable when editing
              />
            </div>

            <div>
  <label className="font-semibold text-blue-600">Contact No</label>
  <input
    type="text"
    name="contactNum" // Updated to match formData key
    value={formData.contactNum || ""}
    onChange={handleChange}
    className="border border-green-600 w-full p-2 rounded-lg"
    disabled={!isEditing}
    maxLength={10} // Enforce max length directly on the input
  />
</div>
<div>
  <label className="font-semibold text-blue-600">Currency</label>
  <input
    type="text"
    name="currency"
    value={formData.currency || ""}
    onChange={handleChange}
    className="border border-green-600 w-full p-2 rounded-lg"
    disabled={!isEditing}
  />
</div>
<div>
  <label className="font-semibold text-blue-600">Registration No</label>
  <input
    type="text"
    name="registrationNum" // Updated to match formData key
    value={formData.registrationNum || ""}
    onChange={handleChange}
    className="border border-green-600 w-full p-2 rounded-lg"
    disabled={!isEditing}
    maxLength={16} // Enforce max length directly
  />
</div>

<div>
  <label className="font-semibold text-blue-600">PAN</label>
  <input
    type="text"
    name="panNum" // Updated to match formData key
    value={formData.panNum || ""}
    onChange={handleChange}
    className="border border-green-600 w-full p-2 rounded-lg"
    disabled={!isEditing}
    maxLength={10}
    style={{ textTransform: "uppercase" }} // Force uppercase in UI
  />
</div>

<div>
  <label className="font-semibold text-blue-600">Address</label>
  <textarea
    name="address" // Updated to match formData key
    value={formData.address || ""}
    onChange={handleChange}
    className="border border-green-600 w-full p-2 rounded-lg"
    disabled={!isEditing}
    rows="4"
    required
  />
</div>
            <div>
              <label className="font-semibold text-blue-600">Active</label>
              <Checkbox_with_words
                name="active"
                cls="m-1 text-blue-700"
                checked={formData?.active || false}
                onChange={(e) => {
                  if (isEditing) { // Only allow change if in editing mode
                    setFormData((prevData) => ({
                      ...prevData,
                      active: e.target.checked,
                    }));
                  }
                }}
                disabled={!isEditing} // Disable when not editing
              />
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CustomerViewPage;

