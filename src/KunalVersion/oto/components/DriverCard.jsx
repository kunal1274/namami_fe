// src/components/DriverCard.jsx
import React from "react";

function DriverCard({ driver, onSelect }) {
  // A small color or label for status
  const statusColors = {
    available: "bg-green-500",
    booked: "bg-red-500",
    in_progress: "bg-yellow-500",
    completing: "bg-purple-500",
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded p-4 mb-2 bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/60"
          alt="driver"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{driver.name}</h3>
          <p className="text-sm text-gray-600">Rating: {driver.rating}</p>
          <p className="text-sm text-gray-600">
            Car Types: {driver.canDriveCarTypes.join(", ")}
          </p>
          <p className="text-sm text-gray-600">
            Transmissions: {driver.canDriveTransmissions.join(", ")}
          </p>
          <p className="text-sm text-gray-600">
            Distance: {driver.distanceKm} km
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2 mb-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              statusColors[driver.status]
            }`}
          />
          <span className="capitalize text-sm">
            {driver.status.replace("_", " ")}
          </span>
        </div>
        <button
          onClick={() => onSelect(driver)}
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default DriverCard;
