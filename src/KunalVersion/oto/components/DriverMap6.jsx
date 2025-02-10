import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

/* Utility Functions */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;
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

function calculateTime(distanceKm, speed = 40) {
  const hours = distanceKm / speed;
  return hours < 1 ? `${Math.round(hours * 60)} min` : `${hours.toFixed(1)} hr`;
}

function getDriverColor(status) {
  switch (status) {
    case "available":
      return "#22c55e";
    case "in_progress":
      return "#6366f1";
    case "completed":
      return "#10b981";
    case "requested":
      return "#f97316";
    default:
      return "#6b7280";
  }
}

function getBookingLineColor(status) {
  switch (status) {
    case "in_progress":
      return "#4f46e5"; // Indigo
    case "next_upcoming":
      return "#22c55e"; // Green
    case "completed":
      return "#10b981"; // Teal
    case "requested":
      return "#f97316"; // Orange
    default:
      return "#6b7280"; // Gray
  }
}

function createStatusIcon(label, fillColor) {
  const svgPin = `
    <svg width="40" height="40" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10c0 4.24 2.62 7.86 6.43 9.33L10 30l3.57-10.67C17.38 17.86 20 14.24 20 10c0-5.52-4.48-10-10-10z" fill="${fillColor}" />
      <text x="50%" y="50%" fill="white" font-size="7" font-weight="bold" text-anchor="middle" dy=".3em">${label}</text>
    </svg>
  `;
  return L.divIcon({
    html: svgPin,
    className: "",
    iconAnchor: [10, 30],
    popupAnchor: [0, -30],
  });
}

function DriverMap({ drivers, customers, bookings }) {
  const [viewType, setViewType] = useState("ALL");
  const [selectedValue, setSelectedValue] = useState(null);

  const filteredBookingLines = useMemo(() => {
    if (viewType === "ALL" || !selectedValue) return bookings;

    switch (viewType) {
      case "DRIVER":
        return bookings.filter((b) => b.driverId === selectedValue);
      case "CUSTOMER":
        return bookings.filter((b) => b.customerId === selectedValue);
      case "BOOKING":
        return bookings.filter((b) => b.id === selectedValue);
      default:
        return [];
    }
  }, [viewType, selectedValue, bookings]);

  const labelCounts = {};
  const driverOptions = drivers.map((d) => ({ label: d.name, value: d.id }));
  const customerOptions = customers.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const bookingOptions = bookings.map((b) => ({
    label: `Booking #${b.id}`,
    value: b.id,
  }));

  return (
    <div className="border border-gray-300 rounded bg-white shadow-sm p-4 mt-4 w-full max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="font-semibold text-lg">Driver and Booking Map</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={viewType}
            onChange={(e) => {
              setViewType(e.target.value);
              setSelectedValue(null);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="ALL">All</option>
            <option value="DRIVER">Driver</option>
            <option value="CUSTOMER">Customer</option>
            <option value="BOOKING">Booking</option>
          </select>

          {viewType === "DRIVER" && (
            <select
              className="border rounded px-2 py-1 text-sm"
              onChange={(e) => setSelectedValue(Number(e.target.value))}
            >
              <option value="">--Select Driver--</option>
              {driverOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {viewType === "CUSTOMER" && (
            <select
              className="border rounded px-2 py-1 text-sm"
              onChange={(e) => setSelectedValue(Number(e.target.value))}
            >
              <option value="">--Select Customer--</option>
              {customerOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {viewType === "BOOKING" && (
            <select
              className="border rounded px-2 py-1 text-sm"
              onChange={(e) => setSelectedValue(Number(e.target.value))}
            >
              <option value="">--Select Booking--</option>
              {bookingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div style={{ width: "600px", height: "400px" }}>
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={12}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {drivers.map((driver) => {
            const label = driver.name.substring(0, 2).toUpperCase();
            const icon = createStatusIcon(label, getDriverColor(driver.status));
            const position = [driver.location.lat, driver.location.lng];

            return (
              <Marker
                key={`driver-${driver.id}`}
                position={position}
                icon={icon}
              >
                <Popup>
                  <strong>{driver.name}</strong>
                  <br />
                  Status: {driver.status}
                </Popup>
              </Marker>
            );
          })}

          {filteredBookingLines.map((b) => {
            const driver = drivers.find((d) => d.id === b.driverId);
            const customer = customers.find((c) => c.id === b.customerId);
            if (!driver || !customer) return null;

            const positions = [
              [driver.location.lat, driver.location.lng],
              [customer.location.lat, customer.location.lng],
            ];

            return (
              <Polyline
                key={`booking-${b.id}`}
                positions={positions}
                color={getBookingLineColor(b.status)}
                weight={4}
              >
                <Popup>
                  <strong>Booking #{b.id}</strong>
                  <br />
                  Driver: {driver.name}
                  <br />
                  Customer: {customer.name}
                  <br />
                  Status: {b.status}
                </Popup>
              </Polyline>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default DriverMap;
