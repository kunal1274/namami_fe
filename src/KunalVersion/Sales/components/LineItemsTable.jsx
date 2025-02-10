import React from "react";

const LineItemsTable = ({ items, onAddItem, onRemoveItem, onUpdateItem }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Line Items</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Item Code</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.code}
                  onChange={(e) =>
                    onUpdateItem(index, { ...item, code: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    onUpdateItem(index, { ...item, quantity: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </td>
              <td className="border p-2">${item.price}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => onRemoveItem(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onAddItem}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Line Item
      </button>
    </div>
  );
};

export default LineItemsTable;
