// src/components/AllocationForm.jsx
import React, { useState } from "react";

function AllocationForm({ onSearch }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [carTransmission, setCarTransmission] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const criteria = {
      startDate,
      endDate,
      pickupLocation,
      carType,
      carTransmission,
    };
    onSearch(criteria);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm p-4 border border-gray-300 rounded shadow-sm bg-white space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">Start Date/Time</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">End Date/Time</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Pickup Location</label>
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="e.g. New York, NY"
          required
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Car Type</label>
        <select
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Any</option>
          <option value="Sedan">Sedan</option>
          <option value="Luxury">Luxury</option>
          <option value="Compact">Compact</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Car Transmission</label>
        <select
          value={carTransmission}
          onChange={(e) => setCarTransmission(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Any</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search Drivers
      </button>
    </form>
  );
}

export default AllocationForm;
