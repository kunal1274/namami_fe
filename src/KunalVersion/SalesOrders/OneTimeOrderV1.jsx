import React, { useState } from "react";
import axios from "axios";

const OneTimeOrder = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contactNum: "",
    address: "",
  });
  const [items, setItems] = useState([{ itemId: "", quantity: 1 }]);
  const [isMultipleItems, setIsMultipleItems] = useState(false);

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
    try {
      const endpoint = isMultipleItems
        ? `${baseUrl}/oneTimeOrderMultipleItems`
        : `${baseUrl}/oneTimeOrderSingleItem`;

      const payload = {
        customerDetails,
        items,
      };

      await axios.post(endpoint, payload);

      alert("One-time order created successfully!");
    } catch (error) {
      console.error("Error creating one-time order:", error);
      alert("Failed to create one-time order");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">One-Time Order</h1>

      {/* Customer Details */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Customer Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, name: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
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
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, address: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
      </div>

      {/* Items */}
      <div>
        <h2 className="text-xl font-bold mb-2">Items</h2>
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="Item ID"
              value={item.itemId}
              onChange={(e) =>
                handleItemChange(index, "itemId", e.target.value)
              }
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              className="border p-2 rounded"
            />
            {isMultipleItems && (
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {isMultipleItems && (
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        )}
      </div>

      {/* Toggle Single/Multiple Items */}
      <div className="mt-4">
        <label className="mr-2 font-bold">Order Type:</label>
        <button
          onClick={() => setIsMultipleItems(false)}
          className={`px-4 py-2 rounded mr-2 ${
            !isMultipleItems ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          Single Item
        </button>
        <button
          onClick={() => setIsMultipleItems(true)}
          className={`px-4 py-2 rounded ${
            isMultipleItems ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          Multiple Items
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit Order
      </button>
    </div>
  );
};

export default OneTimeOrder;
