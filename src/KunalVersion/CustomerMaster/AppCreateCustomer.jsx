import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppCreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNum: "",
    email: "",
    currency: "INR",
    panNum: "",
    registrationNum: "",
    billingAddress: "",
    deliveryAddress: "",
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
    const { name, contactNum, panNum, registrationNum, billingAddress } =
      formData;

    if (!name) return "Name is required.";
    if (!contactNum || !/^\d{10}$/.test(contactNum))
      return "Valid contact number is required (10 digits).";
    if (!panNum || panNum.length !== 10)
      return "Valid PAN number is required (10 characters).";
    if (!registrationNum || registrationNum.length !== 16)
      return "Valid registration number is required (16 characters).";
    if (!billingAddress) return "Billing address is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
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
        email: "",
        currency: "INR",
        panNum: "",
        registrationNum: "",
        billingAddress: "",
        deliveryAddress: "",
        isActive: false,
      });
      setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
    } catch (err) {
      console.error("Error creating customer:", err);
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
        <h1 className="text-2xl font-bold mb-4">Add New Customer Later</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter the Customer name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Phone Number</label>
              <input
                name="contactNum"
                type="text"
                placeholder="Enter Customer Mobile Number"
                value={formData.contactNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter the Customer Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

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

            <div>
              <label className="block text-gray-600 mb-2">PAN Number</label>
              <input
                name="panNum"
                type="text"
                placeholder="Enter Customer PAN number"
                value={formData.panNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Registration Number
              </label>
              <input
                name="registrationNum"
                type="text"
                placeholder="Enter Customer Registration Number"
                value={formData.registrationNum}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Billing Address
              </label>
              <textarea
                name="billingAddress"
                placeholder="Enter Customer Billing Address"
                value={formData.billingAddress}
                onChange={handleChange}
                rows="4"
                className="border border-gray-300 rounded-lg p-2 w-full"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Delivery Address
              </label>
              <textarea
                name="deliveryAddress"
                placeholder="Enter Customer Delivery Address"
                value={formData.deliveryAddress}
                onChange={handleChange}
                rows="4"
                className="border border-gray-300 rounded-lg p-2 w-full"
              ></textarea>
            </div>

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
