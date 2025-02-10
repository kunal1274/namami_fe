import React, { useState } from "react";
import axios from "axios";

const OneTimeOneItemOrder = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [items, setItems] = useState([{ itemId: "", quantity: 1 }]);
  const [loading, setLoading] = useState(false);

  //const baseUrl = "https://befr8n.vercel.app/fms/api/v0";
  const baseUrl = "http://localhost:5050/fms/api/v0";

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
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/salesOrder/oneTimeCustomer`,
        {
          customerDetails,
          items,
        }
      );
      alert("Sales Order created successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create sales order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">One-Time Customer Sales Order</h1>

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
          placeholder="Mobile"
          value={customerDetails.mobile}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, mobile: e.target.value })
          }
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={customerDetails.email}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, email: e.target.value })
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
            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        Submit Order
      </button>
    </div>
  );
};

export default OneTimeOneItemOrder;
