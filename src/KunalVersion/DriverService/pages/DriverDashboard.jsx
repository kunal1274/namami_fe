import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function DriverDashboard() {
  const {
    driverAllocations,
    fetchDriverAllocations,
    acceptAllocation,
    rejectAllocation,
  } = useContext(GlobalContext);

  useEffect(() => {
    // fetch all allocations assigned to the logged-in driver
    fetchDriverAllocations();
  }, [fetchDriverAllocations]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      {driverAllocations.length ? (
        <div className="space-y-4">
          {driverAllocations.map((alloc) => (
            <div key={alloc.id} className="bg-white rounded shadow p-4">
              <p className="font-medium">Allocation ID: {alloc.id}</p>
              <p>Pickup Time: {alloc.pickupTime}</p>
              <p>Pickup Location: {alloc.pickupLocation}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => acceptAllocation(alloc.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectAllocation(alloc.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No allocations assigned.</p>
      )}
    </div>
  );
}

function DriverRideActions({ allocation }) {
  const { updateRideStatus } = useContext(GlobalContext);

  const nextStatuses = [
    "enroute_to_pickup",
    "at_pickup_location",
    "waiting_for_customer",
    "ride_started",
    "ride_paused",
    "ride_completed",
  ];

  return (
    <div className="flex space-x-2 mt-2">
      {nextStatuses.map((status) => (
        <button
          key={status}
          onClick={() => updateRideStatus(allocation.id, status)}
          className="bg-secondary text-white px-3 py-1 rounded"
        >
          {status}
        </button>
      ))}
    </div>
  );
}
