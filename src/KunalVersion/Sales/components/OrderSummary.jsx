import React from "react";

const OrderSummary = ({ customer, items }) => {
  const calculateTotal = () => {
    return items
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {customer ? (
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Customer Details</h3>
          <p className="text-gray-700">Name: {customer.name}</p>
          <p className="text-gray-700">Contact: {customer.contactNum}</p>
          <p className="text-gray-700">Address: {customer.address}</p>
        </div>
      ) : (
        <p className="text-gray-500 italic">No customer selected</p>
      )}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">Line Items</h3>
        {items.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>
                  {item.code} (x{item.quantity})
                </span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No items added</p>
        )}
      </div>
      <div className="border-t pt-4">
        <h3 className="font-bold text-lg">Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default OrderSummary;
