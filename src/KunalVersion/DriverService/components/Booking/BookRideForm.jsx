import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function BookRideForm() {
  const { createSalesOrder } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    startTime: "",
    endTime: "",
    hours: "",
    carType: "",
    transmission: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call context or API to create sales order
    createSalesOrder(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-md space-y-4"
    >
      <h2 className="text-xl font-bold">Book a Ride</h2>
      <div>
        <label className="block font-medium">Pickup Location</label>
        <input
          type="text"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Enter pickup location"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Start Date & Time</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block font-medium">End Date & Time</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block font-medium">Hours Required</label>
        <input
          type="number"
          name="hours"
          value={formData.hours}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="If no end time is set"
        />
      </div>
      <div>
        <label className="block font-medium">Car Type</label>
        <select
          name="carType"
          value={formData.carType}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="">Select Car Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
        </select>
      </div>
      <div>
        <label className="block font-medium">Transmission Type</label>
        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md"
        >
          <option value="">Select Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Book / Schedule
      </button>
    </form>
  );
}
