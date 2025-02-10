// src/components/DriverMatrix.jsx
import React from "react";

function DriverMatrix({ drivers }) {
  // Group drivers by status
  const statusGroups = drivers.reduce((acc, driver) => {
    if (!acc[driver.status]) {
      acc[driver.status] = [];
    }
    acc[driver.status].push(driver);
    return acc;
  }, {});

  // Some friendly status labels
  const statuses = ["available", "booked", "in_progress", "completing"];

  const statusLabels = {
    available: "Available",
    booked: "Booked",
    in_progress: "In Progress",
    completing: "Completing",
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded shadow-sm mt-4">
      <h2 className="text-xl font-semibold mb-3">Driver Status Matrix</h2>
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status} className="border border-gray-200 p-2 rounded">
            <h3 className="font-semibold mb-2">{statusLabels[status]}</h3>
            {statusGroups[status] && statusGroups[status].length > 0 ? (
              statusGroups[status].map((driver) => (
                <div key={driver.id} className="text-sm text-gray-700">
                  {driver.name}
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic text-sm">No drivers</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverMatrix;
