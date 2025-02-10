// src/App.js
import React, { useState } from "react";
import AllocationForm from "./components/AllocationForm";
import DriverList from "./components/DriverList";
import AllocationSummary from "./components/AllocationSummary";
import DriverMatrix from "./components/DriverMatrix"; // If you still want that
import DriverTimeline from "./components/DriverTimeline"; // The new timeline
import DriverMap from "./components/DriverMap";
import { bookingData } from "./data/bookingData"; // (NEW) your multiple bookings

import { driverData } from "./data/driverData";
import { customerData } from "./data/customerData";
import BookingCalendar from "./components/BookingCalendar";
import { findAvailableDrivers } from "./utils/findAvailableDrivers";
import DriverMapGoogle from "./components/DriverMapGoogle";

function AppOto() {
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // For demonstration, we are not filtering customers (though you could)
  const [filteredCustomers] = useState(customerData);
  const [start, setStart] = useState("2024-12-30T12:00:00");
  const [end, setEnd] = useState("2024-12-30T13:30:00");
  const [availableDrivers, setAvailableDrivers] = useState([]);

  const handleSearch = (criteria) => {
    const { startDate, endDate, carType, carTransmission } = criteria;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = driverData.filter((driver) => {
      // check availability
      let isTimeAvailable = false;
      for (let block of driver.availability) {
        const blockStart = new Date(block.start);
        const blockEnd = new Date(block.end);
        if (blockStart <= end && blockEnd >= start) {
          isTimeAvailable = true;
          break;
        }
      }
      const matchesCarType =
        !carType || driver.canDriveCarTypes.includes(carType);
      const matchesTransmission =
        !carTransmission ||
        driver.canDriveTransmissions.includes(carTransmission);

      return isTimeAvailable && matchesCarType && matchesTransmission;
    });

    setFilteredDrivers(result);
    setSelectedDriver(null);
  };

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  const handleConfirmAllocation = () => {
    alert(`Driver ${selectedDriver.name} has been allocated!`);
    // ...
  };

  const handleCancel = () => {
    setSelectedDriver(null);
  };

  const handleCheckAvailability = () => {
    const results = findAvailableDrivers(driverData, bookingData, start, end);
    setAvailableDrivers(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Driver Allocation Dashboard</h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left side: Allocation Form */}
          <div className="md:w-1/3">
            <AllocationForm onSearch={handleSearch} />
          </div>

          {/* Right side: Filtered Drivers, Summary, etc. */}
          <div className="md:w-2/3 space-y-4">
            <DriverList
              drivers={filteredDrivers}
              onSelectDriver={handleSelectDriver}
            />
            <AllocationSummary
              driver={selectedDriver}
              onConfirm={handleConfirmAllocation}
              onCancel={handleCancel}
            />

            {/* Existing text-based matrix grouping drivers by status */}
            <DriverMatrix drivers={driverData} />

            {/* The new timeline (hourly) for driver availability */}
            <DriverTimeline drivers={driverData} date="2024-12-30" />

            {/* PART B: Booking Calendar */}
            <BookingCalendar
              bookings={bookingData}
              drivers={driverData}
              customers={customerData}
            />

            {/* PART C: Check which drivers are free for a new booking */}
            <div className="p-4 bg-white border rounded shadow-sm mt-4">
              <h2 className="font-semibold mb-2">Check Driver Availability</h2>
              <div className="flex space-x-2 mb-2">
                <input
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="border p-1 rounded"
                />
                <input
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="border p-1 rounded"
                />
                <button
                  onClick={handleCheckAvailability}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Find Available Drivers
                </button>
              </div>
              {availableDrivers.length > 0 ? (
                <div>
                  <p>Available Drivers:</p>
                  <ul>
                    {availableDrivers.map((d) => (
                      <li key={d.id}>{d.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No drivers found for that time.</p>
              )}
            </div>

            {/* Map with both drivers + customers displayed */}
            {/* <DriverMap drivers={driverData} customers={filteredCustomers} /> */}
            <DriverMap
              drivers={driverData}
              customers={customerData}
              bookings={bookingData} // pass here
            />

            <DriverMapGoogle
              apiKey={`AIzaSyAyPn2j-knCACTYr1oBdFARHqoOthWDvW8`}
              drivers={driverData}
              customers={customerData}
              bookings={bookingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppOto;
