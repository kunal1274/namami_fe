import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function LocationNotFound() {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-sm text-gray-500">Map placeholder</span>
      </div>

      {/* Menu top left */}
      <div className="absolute top-4 left-4">
        <button className="p-2 bg-white rounded-full shadow">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Bottom card */}
      <div
        className="
          absolute bottom-0 w-full 
          bg-white rounded-t-3xl shadow-2xl
          px-4 py-6
        "
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Sorry, there are no vehicles in this area.
        </h2>
        <button
          className="
            w-full bg-blue-600 text-white 
            py-3 rounded-full text-sm font-semibold
          "
        >
          Choose another location
        </button>
      </div>
    </div>
  );
}
