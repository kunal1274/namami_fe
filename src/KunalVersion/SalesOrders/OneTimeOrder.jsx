import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OneTimeOrder = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contactNum: "",
    address: "",
  });
  const [items, setItems] = useState([{ itemId: "", quantity: 1 }]);
  const [isMultipleItems, setIsMultipleItems] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://befr8n.vercel.app/fms/api/v0";

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { itemId: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const endpoint = isMultipleItems
        ? `${baseUrl}/oneTimeOrderMultipleItems`
        : `${baseUrl}/oneTimeOrderSingleItem`;

      const payload = {
        customerDetails,
        items,
      };

      await axios.post(endpoint, payload);
      toast.success("One-time order created successfully!");

      // Reset form
      setCustomerDetails({ name: "", contactNum: "", address: "" });
      setItems([{ itemId: "", quantity: 1 }]);
    } catch (error) {
      console.error("Error creating one-time order:", error);
      toast.error("Failed to create one-time order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        One-Time Order
      </h1>

      <div className="bg-white p-6 shadow-lg rounded-lg">
        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Customer Details
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={customerDetails.contactNum}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  contactNum: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  address: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Items</h2>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-4 bg-gray-50 p-4 rounded"
            >
              <input
                type="text"
                placeholder="Item ID"
                value={item.itemId}
                onChange={(e) =>
                  handleItemChange(index, "itemId", e.target.value)
                }
                className="w-1/2 border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                className="w-1/4 border p-2 rounded"
              />
              {isMultipleItems && (
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {isMultipleItems && (
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Item
            </button>
          )}
        </div>

        {/* Toggle Single/Multiple Items */}
        <div className="mb-6">
          <label className="mr-4 font-bold text-gray-700">Order Type:</label>
          <button
            onClick={() => setIsMultipleItems(false)}
            className={`px-4 py-2 rounded mr-2 font-medium ${
              !isMultipleItems
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Single Item
          </button>
          <button
            onClick={() => setIsMultipleItems(true)}
            className={`px-4 py-2 rounded font-medium ${
              isMultipleItems
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Multiple Items
          </button>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-blue-500 text-white px-6 py-3 rounded font-bold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneTimeOrder;
