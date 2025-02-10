// src/components/DriverMap.jsx
import React, { useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

// Utility to compute approximate distance in km between two lat/lng points
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// We'll assume average driving speed, e.g. 40 km/h
// Time (hours) = distance / speed
function calculateTime(distanceKm, speed = 40) {
  const hours = distanceKm / speed;
  // Return something like "xx min" or "x.x hr"
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${hours.toFixed(1)} hr`;
}

// Create a custom color-coded circle icon for each status
function createStatusIcon(label, bgColor) {
  return L.divIcon({
    html: `<div style="
      background-color:${bgColor};
      width:2rem;
      height:2rem;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:50%;
      color:white;
      font-weight:bold;
      font-size:0.8rem;
    ">${label}</div>`,
    className: "", // remove default leaflet styles
  });
}

// Map status to colors for drivers
function getDriverColor(status) {
  switch (status) {
    case "available":
      return "#22c55e"; // Tailwind green-500
    case "booked":
    case "in_progress":
      return "#6366f1"; // Tailwind indigo-500
    case "completing":
    case "about_to_complete":
      return "#a855f7"; // Tailwind purple-500
    case "unavailable":
      return "#ef4444"; // Tailwind red-500
    case "rejected":
      return "#ec4899"; // Tailwind pink-500
    default:
      return "#6b7280"; // gray-500
  }
}

// Map status to colors for customers
function getCustomerColor(status) {
  switch (status) {
    case "waiting":
    case "requested":
      return "#f97316"; // Tailwind orange-500
    case "about_to_complete":
      return "#a855f7"; // purple-500
    default:
      return "#6b7280"; // gray-500
  }
}

// Helper to get label (first two letters). If duplicates exist,
// you might do something fancier, but here is a simple approach.
function getInitials(name) {
  return name.substring(0, 2).toUpperCase();
}

function DriverMap({ drivers, customers }) {
  // Toggles for lines
  const [showDistanceLines, setShowDistanceLines] = useState(false);
  const [showTimeLines, setShowTimeLines] = useState(false);

  // Let's memoize the polylines so we don't recalc on every render
  const lines = useMemo(() => {
    const combos = [];
    drivers.forEach((driver) => {
      customers.forEach((cust) => {
        const distance = haversineDistance(
          driver.location.lat,
          driver.location.lng,
          cust.location.lat,
          cust.location.lng
        );
        const timeStr = calculateTime(distance);
        combos.push({
          positions: [
            [driver.location.lat, driver.location.lng],
            [cust.location.lat, cust.location.lng],
          ],
          distance,
          timeStr,
        });
      });
    });
    return combos;
  }, [drivers, customers]);

  // Center the map on an average point, or pick one
  // We'll do a simple average of all lat/lng to center.
  const allPoints = [...drivers, ...customers];
  const avgLat =
    allPoints.reduce((sum, p) => sum + p.location.lat, 0) / allPoints.length;
  const avgLng =
    allPoints.reduce((sum, p) => sum + p.location.lng, 0) / allPoints.length;

  // We'll define  a default zoom. If your points are scattered widely, you may want to do some bounding box logic.
  const mapCenter = [avgLat || 40.7128, avgLng || -74.006];
  const zoomLevel = 12;

  return (
    <div className="border border-gray-300 rounded bg-white shadow-sm p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Map Preview</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowDistanceLines(!showDistanceLines)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {showDistanceLines ? "Hide Distance Lines" : "Show Distance Lines"}
          </button>
          <button
            onClick={() => setShowTimeLines(!showTimeLines)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {showTimeLines ? "Hide Time Lines" : "Show Time Lines"}
          </button>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom
        style={{ width: "100%", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap
          </a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Driver markers */}
        {drivers.map((driver) => {
          const label = getInitials(driver.name);
          const color = getDriverColor(driver.status);
          const icon = createStatusIcon(label, color);
          const position = [driver.location.lat, driver.location.lng];
          return (
            <Marker key={`driver-${driver.id}`} position={position} icon={icon}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span>
                  <strong>{driver.name}</strong> <br />
                  Status: {driver.status} <br />
                  {driver.canDriveCarTypes.join(", ")} |{" "}
                  {driver.canDriveTransmissions.join(", ")}
                </span>
              </Tooltip>
            </Marker>
          );
        })}

        {/* Customer markers */}
        {customers.map((cust) => {
          const label = getInitials(cust.name);
          const color = getCustomerColor(cust.status);
          const icon = createStatusIcon(label, color);
          const position = [cust.location.lat, cust.location.lng];
          return (
            <Marker key={`cust-${cust.id}`} position={position} icon={icon}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span>
                  <strong>{cust.name}</strong> <br />
                  Status: {cust.status}
                </span>
              </Tooltip>
            </Marker>
          );
        })}

        {/* Polylines for distance/time */}
        {(showDistanceLines || showTimeLines) &&
          lines.map((line, idx) => {
            // if user toggled distance lines, show them,
            // if user toggled time lines, show them,
            // or show both if both toggled.
            const tooltipTextArr = [];
            if (showDistanceLines) {
              tooltipTextArr.push(`Distance: ${line.distance.toFixed(1)} km`);
            }
            if (showTimeLines) {
              tooltipTextArr.push(`Time: ${line.timeStr}`);
            }
            const tooltipText = tooltipTextArr.join(" | ");
            return (
              <Polyline
                key={idx}
                positions={line.positions}
                color={showDistanceLines ? "blue" : "green"}
                weight={2}
              >
                <Tooltip sticky>
                  <span>{tooltipText}</span>
                </Tooltip>
              </Polyline>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default DriverMap;
