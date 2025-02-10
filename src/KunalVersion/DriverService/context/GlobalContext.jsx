import React, { createContext, useState, useCallback } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [salesOrders, setSalesOrders] = useState([]);
  const [driverAllocations, setDriverAllocations] = useState([]);

  // 1. Create Sales Order
  const createSalesOrder = (data) => {
    const newOrder = {
      id: Date.now(),
      pickupLocation: data.pickupLocation,
      startTime: data.startTime,
      endTime: data.endTime,
      hours: data.hours,
      carType: data.carType,
      transmission: data.transmission,
      status: "DRAFT",
      salesPrice: 1000, // placeholder
    };
    setSalesOrders((prev) => [...prev, newOrder]);
  };

  // 2. Fetch Sales Orders (placeholder)
  const fetchSalesOrders = useCallback(() => {
    // In real world, do an API call
    // setSalesOrders(response.data);
    console.log("fetching sales orders...");
  }, []);

  // 3. Confirm Sales Order
  const confirmSalesOrder = (orderId) => {
    setSalesOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "CONFIRMED" } : o))
    );
  };

  // 4. Create Allocation
  const createAllocation = (orderId) => {
    // In real world, we’d do an API call
    const order = salesOrders.find((o) => o.id === orderId);
    if (!order) return;
    const newAllocation = {
      id: Date.now(),
      orderId: order.id,
      pickupLocation: order.pickupLocation,
      pickupTime: order.startTime,
      rideStatus: "allocation_processing",
      driverId: null,
      status: "DRAFT", // allocation status
    };
    setDriverAllocations((prev) => [...prev, newAllocation]);
  };

  // 5. Fetch Allocations for this driver
  const fetchDriverAllocations = useCallback(() => {
    // In real world, do an API call with driver ID
    // For now, we’ll just rely on `driverAllocations` state
    console.log("fetching driver allocations...");
  }, []);

  // 6. Accept/Reject Allocation
  const acceptAllocation = (allocationId) => {
    setDriverAllocations((prev) =>
      prev.map((alloc) =>
        alloc.id === allocationId
          ? {
              ...alloc,
              status: "CONFIRMED",
              rideStatus: "driver_assigned",
              driverId: 999,
            } // example driver id
          : alloc
      )
    );
  };

  const rejectAllocation = (allocationId) => {
    setDriverAllocations((prev) =>
      prev.filter((alloc) => alloc.id !== allocationId)
    );
    // Then presumably create a new allocation with another driver or handle logic
  };

  // 7. Update Ride Status
  const updateRideStatus = (allocationId, newStatus) => {
    setDriverAllocations((prev) =>
      prev.map((alloc) =>
        alloc.id === allocationId ? { ...alloc, rideStatus: newStatus } : alloc
      )
    );
  };

  // 8. Payment
  const initiatePayment = async (method) => {
    // In real world, do payment gateway integration
    // Return success or failure
    console.log("Initiate payment via:", method);
    return true;
  };

  return (
    <GlobalContext.Provider
      value={{
        salesOrders,
        driverAllocations,
        createSalesOrder,
        fetchSalesOrders,
        confirmSalesOrder,
        createAllocation,
        fetchDriverAllocations,
        acceptAllocation,
        rejectAllocation,
        updateRideStatus,
        initiatePayment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
