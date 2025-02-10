import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function PickupLocationSelect() {
  const handleConfirm = () => {
    alert("Pickup location confirmed!");
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Map background placeholder */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-500 text-sm md:text-base">
          (Map Placeholder)
        </span>
      </div>

      {/* Top bar with back arrow */}
      <div className="absolute top-4 left-4">
        <button className="p-2 bg-white rounded-full shadow">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Bottom sheet */}
      <div
        className="
          absolute bottom-0 w-full 
          bg-white rounded-t-3xl shadow-2xl
          px-4 py-4
        "
      >
        {/* Drag handle */}
        <div className="flex items-center justify-center">
          <div className="w-12 h-1.5 rounded-full bg-gray-300 mb-4"></div>
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          Select pickup location
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Exit the Transit area and proceed to Level 1 Arrival Pick-up Point
        </p>

        {/* List of pickup points */}
        <div className="space-y-2 mb-4">
          <button
            className="
            w-full text-left py-3 px-2 
            bg-gray-100 rounded-lg
            hover:bg-gray-200
          "
          >
            Terminal 1, Level -1
          </button>
          <hr />
          <button
            className="
            w-full text-left py-3 px-2
            hover:bg-gray-50
          "
          >
            Terminal 1, Level -2
          </button>
          <hr />
          <button
            className="
            w-full text-left py-3 px-2
            hover:bg-gray-50
          "
          >
            Terminal 1, Outdoor Gate
          </button>
        </div>

        <button
          onClick={handleConfirm}
          className="
            w-full bg-blue-600 text-white py-3 
            rounded-full text-sm font-semibold 
            hover:bg-blue-700
          "
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
