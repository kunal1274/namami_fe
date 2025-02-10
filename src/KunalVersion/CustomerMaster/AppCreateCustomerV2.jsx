import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppCreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNum: "",
    currency: "INR",
    registrationNum: "",
    panNum: "",
    address: "",
    isActive: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const { name, contactNum, currency, registrationNum, panNum, address } =
      formData;

    if (!name) return "Name is required.";
    if (!contactNum || !/^\d{10}$/.test(contactNum))
      return "Contact number must be exactly 10 digits.";
    if (!currency) return "Currency is required.";
    if (!registrationNum || registrationNum.length !== 16)
      return "Registration number must be 16 characters.";
    if (!panNum || panNum.length !== 10)
      return "PAN number must be exactly 10 characters.";
    if (!address) return "Address is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://befr8n.vercel.app/fms/api/v0/customer", // Replace with your API endpoint
        formData
      );
      setSuccess("Customer created successfully!");
      setFormData({
        name: "",
        contactNum: "",
        currency: "INR",
        registrationNum: "",
        panNum: "",
        address: "",
        isActive: false,
      });
      setTimeout(() => navigate("/customers"), 2000);
    } catch (err) {
      console.error(
        "Error creating customer:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the customer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">Add New Customer</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter customer name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-gray-600 mb-2">Contact Number</label>
              <input
                name="contactNum"
                type="text"
                placeholder="Enter 10-digit contact number"
                value={formData.contactNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-gray-600 mb-2">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            {/* Registration Number */}
            <div>
              <label className="block text-gray-600 mb-2">
                Registration Number
              </label>
              <input
                name="registrationNum"
                type="text"
                placeholder="Enter 16-character registration number"
                value={formData.registrationNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-gray-600 mb-2">PAN Number</label>
              <input
                name="panNum"
                type="text"
                placeholder="Enter 10-character PAN number"
                value={formData.panNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-600 mb-2">Address</label>
              <textarea
                name="address"
                placeholder="Enter customer address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="border border-gray-300 rounded-lg p-3 w-full"
              ></textarea>
            </div>

            {/* Active */}
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
              <label htmlFor="isActive" className="ml-2 text-gray-700">
                Active
              </label>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-6 py-3 rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Submitting..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppCreateCustomer;
