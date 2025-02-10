// src/components/DriverList.jsx
import React from "react";
import DriverCard from "./DriverCard";

function DriverList({ drivers, onSelectDriver }) {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="p-4 text-gray-600 italic">
        No drivers match your criteria.
      </div>
    );
  }

  return (
    <div className="w-full">
      {drivers.map((driver) => (
        <DriverCard key={driver.id} driver={driver} onSelect={onSelectDriver} />
      ))}
    </div>
  );
}

export default DriverList;
