import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function AllocatorDashboard() {
  const { salesOrders, fetchSalesOrders, confirmSalesOrder, createAllocation } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchSalesOrders();
  }, [fetchSalesOrders]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Allocator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesOrders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded p-4">
            <p className="font-medium">Sales Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Qty (Hours): {order.hours}</p>
            <p>Price: {order.salesPrice}</p>
            {/* Confirm & Allocate */}
            {order.status === "DRAFT" && (
              <button
                onClick={() => {
                  confirmSalesOrder(order.id);
                  createAllocation(order.id);
                }}
                className="mt-2 bg-secondary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Confirm & Allocate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
