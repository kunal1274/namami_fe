// src/components/AllocationSummary.jsx
import React from "react";

function AllocationSummary({ driver, onConfirm, onCancel }) {
  if (!driver) return null;

  return (
    <div className="border border-gray-300 rounded p-4 mt-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Confirm Allocation</h2>
      <p>
        <strong>Driver:</strong> {driver.name}
      </p>
      <p>
        <strong>Can Drive Car Types:</strong>{" "}
        {driver.canDriveCarTypes.join(", ")}
      </p>
      <p>
        <strong>Transmissions:</strong>{" "}
        {driver.canDriveTransmissions.join(", ")}
      </p>
      <p>
        <strong>Rating:</strong> {driver.rating}
      </p>
      <div className="mt-4 space-x-2">
        <button
          onClick={onConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AllocationSummary;
