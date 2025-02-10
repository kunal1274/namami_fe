import React, { useState } from "react";

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [item, setItem] = useState({ code: "", quantity: 1, price: 0 });

  const handleSubmit = () => {
    onAdd(item);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Line Item</h2>
        <input
          type="text"
          placeholder="Item Code"
          value={item.code}
          onChange={(e) => setItem({ ...item, code: e.target.value })}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={item.quantity}
          onChange={(e) =>
            setItem({ ...item, quantity: Number(e.target.value) })
          }
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="number"
          placeholder="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
