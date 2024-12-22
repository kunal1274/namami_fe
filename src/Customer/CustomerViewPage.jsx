import React, { useState, useEffect } from "react";
import axios from "axios";
import Checkbox_with_words from "../components/layout/Checkbox_with_words/Checkbox_with_words";
import { useParams } from "react-router-dom";
import Label from "../components/common/Common/Label/Label";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "https://befr8n.vercel.app";
const secondUrl = "/fms/api/v0";
const thirdUrl = "/customer";
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

const CustomerViewPage = ({ customerId, customer, handleAddCustomer, goBack, handleSaveCustomer, toggleView, handleCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [formData, setFormData] = useState({ ...customer });
  const [error, setError] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const { id } = useParams(); // Use id from URL if needed

  useEffect(() => {
    async function fetchCustomerDetail() {
      try {
        const response = await axios.get(`https://befr8n.vercel.app/fms/api/v0/customer/${customerId || id}`);
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
      toast.success("Customer updated successfully!");
      console.log("customer update");
      try {
        const response = await axios.put(`${mergedUrl}/${customerId}`, formData, {
          withCredentials: false,
        });

        setCustomerDetail(response.data); // Update customer details with response
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

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
    setIsEdited(true);
    setIsEditing(true);
  };

  const handleSave = () => {
    handleSaveCustomer(formData); // Save customer data
    setIsEditing(false); // Exit edit mode


    // Save logic here
    console.log("Data saved!");
    setIsEdited(false); // Reset state after saving
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
    <>
      <h1 className="text-2xl  bg-black-400 font-bold mb-4 text-center">  {formData.code || ""} {formData.name || ""}
      </h1>
      <h1 className="text-2xl bg-black-400 font-bold mb-4 text-center">
      </h1>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
          {/* Customer Photo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.761 0-5 2.239-5 5v3h10v-3c0-2.761-2.239-5-5-5z"
                />
              </svg>
            </div>
            <button type="button" className="text-blue-600 mt-2 text-sm hover:underline">
              Customer Photo
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                disabled={!isEditing}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="contactNum" className="block text-gray-600 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactNum"
                value={formData.contactNum || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                disabled={!isEditing}
                maxLength={10}
              />
            </div>




            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-gray-600 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency || ""}
                onChange={handleChange}
                className="border border-green-600 w-full p-2 rounded-lg"
                disabled={!isEditing}
              >
                <option value="">Select Currency</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {/* PAN Number */}
            <div>
              <label htmlFor="panNum" className="block text-gray-600 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                name="panNum"
                value={formData.panNum || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                disabled={!isEditing}
              />
            </div>

            {/* Registration Number */}
            <div>
              <label htmlFor="registrationNum" className="block text-gray-600 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNum"
                value={formData.registrationNum || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Billing Address */}
            <div className="md:col-span-2">
              <label htmlFor="billingAddress" className="block text-gray-600 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
                rows="4"
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center">
            <Label label="Active" className="font-semibold text-blue-600" />
            <Checkbox_with_words
              name="active"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
          </div>
          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleEdit}
              className="bg-zinc-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={goBack}
              className="bg-red-400 text-white px-6 py-3  m-5 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isEdited}
              className={`px-6 py-3 rounded-lg text-white focus:outline-none focus:ring focus:ring-blue-300 ${isEdited
                  ? "bg-zinc-500 hover:bg-blue-600" // Normal active state
                  : "bg-gray-300 cursor-not-allowed opacity-50" // Disabled state
                }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerViewPage;

