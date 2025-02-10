// ArrivingDetailsPage.jsx
import React, { useState } from "react";
import ArrivingDetails1 from "./ArrivingDetails1";
import ArrivingDetails2 from "./ArrivingDetails2";

/**
 * A page to switch between the two designs.
 */
export default function ArrivingDetailsPage() {
  // "design1" or "design2"
  const [selectedDesign, setSelectedDesign] = useState("design1");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Toggle bar at top */}
      <div className="p-4 flex justify-center space-x-4 bg-gray-100">
        <button
          onClick={() => setSelectedDesign("design1")}
          className={`px-4 py-2 rounded-full font-semibold ${
            selectedDesign === "design1"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Arriving Details 1
        </button>
        <button
          onClick={() => setSelectedDesign("design2")}
          className={`px-4 py-2 rounded-full font-semibold ${
            selectedDesign === "design2"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Arriving Details 2
        </button>
      </div>

      {/* The content area */}
      <div className="flex-1 relative">
        {selectedDesign === "design1" && <ArrivingDetails1 />}
        {selectedDesign === "design2" && <ArrivingDetails2 />}
      </div>
    </div>
  );
}
