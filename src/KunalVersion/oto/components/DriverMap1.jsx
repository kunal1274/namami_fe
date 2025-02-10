import React, { useState } from "react";

/**
 * The updated map placeholder:
 * - We show pins for ALL drivers and ALL customers.
 * - Color-coded background for each status.
 * - Basic label: first letter or two letters of name.
 * - Simple zoom in/out by scaling the container.
 */

function DriverMap({ drivers, customers }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => z + 0.1);
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.1));

  // We'll define a function to get color class from status
  const getMarkerColor = (status, type) => {
    // type = 'driver' or 'customer'
    // You can refine logic here for drivers vs. customers.
    if (type === "driver") {
      switch (status) {
        case "available":
          return "bg-green-600";
        case "booked":
        case "in_progress":
          return "bg-indigo-600";
        case "completing":
        case "about_to_complete":
          return "bg-purple-600";
        case "unavailable":
          return "bg-red-600";
        case "rejected":
          return "bg-pink-600";
        default:
          return "bg-gray-600";
      }
    } else {
      // customer
      switch (status) {
        case "waiting":
        case "requested":
          return "bg-orange-600";
        case "about_to_complete":
          return "bg-purple-600";
        default:
          return "bg-gray-600";
      }
    }
  };

  // Utility to place lat/lng on a 400x300 placeholder
  const convertToXY = (lat, lng) => {
    const x = (lng + 180) * (400 / 360);
    const y = (90 - lat) * (300 / 180);
    return { x, y };
  };

  // We generate pins for drivers + customers
  // If conflict in initials, we can track them with a map
  const labelCounts = {}; // tracks how many times a label is used
  const getLabel = (name) => {
    let label = name.substring(0, 2).toUpperCase(); // first two letters
    if (!labelCounts[label]) {
      labelCounts[label] = 0;
    }
    labelCounts[label]++;
    // if used more than once, append a number
    if (labelCounts[label] > 1) {
      label = label + labelCounts[label];
    }
    return label;
  };

  // We'll create a small sub-component for the pin
  const Pin = ({ lat, lng, colorClass, label }) => {
    const { x, y } = convertToXY(lat, lng);
    return (
      <div
        className={`absolute w-8 h-8 flex items-center justify-center text-white rounded-full ${colorClass}`}
        style={{
          top: y - 12,
          left: x - 12,
        }}
      >
        <span className="text-xs font-semibold">{label}</span>
      </div>
    );
  };

  return (
    <div className="w-full border border-gray-300 rounded bg-white shadow-sm p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Map Preview</h2>
        <div className="space-x-2">
          <button
            onClick={handleZoomIn}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Zoom Out
          </button>
        </div>
      </div>
      <div
        className="relative overflow-hidden border border-gray-200"
        style={{ width: "400px", height: "300px" }}
      >
        <div
          className="absolute origin-top-left"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          <div className="bg-gray-100" style={{ width: 400, height: 300 }} />
          {/* Driver pins */}
          {drivers.map((driver) => {
            const color = getMarkerColor(driver.status, "driver");
            const label = getLabel(driver.name);
            return (
              <Pin
                key={`driver-${driver.id}`}
                lat={driver.location.lat}
                lng={driver.location.lng}
                colorClass={color}
                label={label}
              />
            );
          })}
          {/* Customer pins */}
          {customers.map((cust) => {
            const color = getMarkerColor(cust.status, "customer");
            const label = getLabel(cust.name);
            return (
              <Pin
                key={`customer-${cust.id}`}
                lat={cust.location.lat}
                lng={cust.location.lng}
                colorClass={color}
                label={label}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DriverMap;
