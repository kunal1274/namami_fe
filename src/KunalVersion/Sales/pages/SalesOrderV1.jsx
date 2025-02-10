import React, { useState } from "react";

const SalesOrder = () => {
  const [customerType, setCustomerType] = useState("regular"); // Regular or Walk-in
  const [orderItems, setOrderItems] = useState([
    { product: "", price: 0, quantity: 1, unit: "pcs", total: 0 },
  ]);
  const [status, setStatus] = useState("pending");

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      { product: "", price: 0, quantity: 1, unit: "pcs", total: 0 },
    ]);
  };

  const removeOrderItem = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  const updateOrderItem = (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;

    // Auto-calculate the total
    if (field === "quantity" || field === "price") {
      updatedItems[index].total =
        updatedItems[index].quantity * updatedItems[index].price;
    }

    setOrderItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Order
        </h1>

        {/* Customer Type */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Customer Type
          </label>
          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="regular">Regular Customer</option>
            <option value="walk-in">Walk-in Customer</option>
          </select>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Items</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-3 text-left">Product</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Quantity</th>
                <th className="border p-3 text-left">Unit</th>
                <th className="border p-3 text-left">Total</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={item.product}
                      onChange={(e) =>
                        updateOrderItem(index, "product", e.target.value)
                      }
                      className="w-full border rounded-lg p-2"
                      placeholder="Enter product name"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateOrderItem(index, "price", Number(e.target.value))
                      }
                      className="w-full border rounded-lg p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateOrderItem(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className="w-full border rounded-lg p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        updateOrderItem(index, "unit", e.target.value)
                      }
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="pcs">Pcs</option>
                      <option value="kg">Kg</option>
                      <option value="box">Box</option>
                    </select>
                  </td>
                  <td className="border p-2">{item.total.toFixed(2)} USD</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => removeOrderItem(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addOrderItem}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Item
          </button>
        </div>

        {/* Order Status */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Status</h2>
          <div className="flex space-x-4">
            {["Pending", "Completed", "Shipped"].map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => setStatus(statusOption.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  status === statusOption.toLowerCase()
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {statusOption}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="text-gray-700">
            <p>Total Items: {orderItems.length}</p>
            <p>
              Total Quantity:{" "}
              {orderItems.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p>
              Total Price: $
              {orderItems.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
