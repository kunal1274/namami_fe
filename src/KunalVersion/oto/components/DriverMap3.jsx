// src/components/DriverMap.jsx

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

// ------------------------------------
// Utility Functions
// ------------------------------------
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

function calculateTime(distanceKm, speed = 40) {
  // For a simple estimate at 40 km/h
  const hours = distanceKm / speed;
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${hours.toFixed(1)} hr`;
}

function getInitials(name) {
  return name.substring(0, 2).toUpperCase();
}

// For Drivers
function getDriverColor(status) {
  switch (status) {
    case "available":
      return "#22c55e"; // green
    case "booked":
    case "in_progress":
      return "#6366f1"; // indigo
    case "completing":
    case "about_to_complete":
      return "#a855f7"; // purple
    case "unavailable":
      return "#ef4444"; // red
    case "rejected":
      return "#ec4899"; // pink
    default:
      return "#6b7280"; // gray
  }
}

// For Customers
function getCustomerColor(status) {
  switch (status) {
    case "waiting":
    case "requested":
      return "#f97316"; // orange
    case "about_to_complete":
      return "#a855f7"; // purple
    default:
      return "#6b7280"; // gray
  }
}

// Create an SVG pin icon
function createStatusIcon(label, fillColor) {
  const svgPin = `
    <svg width="40" height="40" viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0C4.48 0 0 4.48 0 10c0 4.24 2.62 7.86 6.43 9.33L10 30l3.57-10.67C17.38 17.86 20 14.24 20 10c0-5.52-4.48-10-10-10z" fill="${fillColor}" />
      <text x="50%" y="50%" fill="white" font-size="7" font-weight="bold"
        text-anchor="middle" dy=".3em">${label}</text>
    </svg>
  `;
  return L.divIcon({
    html: svgPin,
    className: "",
    iconAnchor: [10, 30],
    popupAnchor: [0, -30],
  });
}

// ------------------------------------
// Child component: FitBounds
// ------------------------------------
function FitBounds({ drivers, customers }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    // If no data
    if (!drivers.length && !customers.length) return;

    const bounds = L.latLngBounds([]);
    drivers.forEach((d) => {
      bounds.extend([d.location.lat, d.location.lng]);
    });
    customers.forEach((c) => {
      bounds.extend([c.location.lat, c.location.lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, drivers, customers]);

  return null;
}

// ------------------------------------
// Child component: RoutingControl
// shows route from first driver to first customer
// ------------------------------------
function RoutingControl({ drivers, customers, showRoute }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    // Cleanup existing route if toggling off
    if (!showRoute) {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
      return;
    }

    // If we have at least one driver & one customer, let's route from
    // driverData[0] to customerData[0].
    if (!drivers.length || !customers.length) return;

    const driver = drivers[0];
    const cust = customers[0];

    // remove old
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    const LRC = L.Routing.control({
      waypoints: [
        L.latLng(driver.location.lat, driver.location.lng),
        L.latLng(cust.location.lat, cust.location.lng),
      ],
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
      },
      createMarker: () => null, // hide default route markers
      showAlternatives: false,
    }).addTo(map);

    routingRef.current = LRC;

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [map, drivers, customers, showRoute]);

  return null;
}

// ------------------------------------
// MAIN EXPORT
// ------------------------------------
function DriverMap({ drivers, customers }) {
  // toggles
  const [showDistanceLines, setShowDistanceLines] = useState(false);
  const [showTimeLines, setShowTimeLines] = useState(false);
  const [showRoute, setShowRoute] = useState(false);

  // Precompute lines for every driver<->customer
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

  return (
    <div className="border border-gray-300 rounded bg-white shadow-sm p-4 mt-4 w-full max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Map Preview</h2>
        <div className="flex flex-wrap gap-2">
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
          <button
            onClick={() => setShowRoute(!showRoute)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {showRoute ? "Hide Route" : "Show Route (1 Driver->Cust)"}
          </button>
        </div>
      </div>

      {/* A fixed container for the map: 600x400, tweak as you like */}
      <div style={{ width: "600px", height: "400px" }}>
        <MapContainer
          center={[40.7128, -74.006]}
          zoom={12}
          scrollWheelZoom
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Child that auto-fits bounds to drivers/customers */}
          <FitBounds drivers={drivers} customers={customers} />

          {/* Child that sets up the routing if toggled */}
          <RoutingControl
            drivers={drivers}
            customers={customers}
            showRoute={showRoute}
          />

          {/* Markers for drivers */}
          {drivers.map((driver) => {
            const label = getInitials(driver.name);
            const color = getDriverColor(driver.status);
            const icon = createStatusIcon(label, color);
            const position = [driver.location.lat, driver.location.lng];
            return (
              <Marker
                key={`driver-${driver.id}`}
                position={position}
                icon={icon}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{driver.name}</strong>
                    <br />
                    Status: {driver.status}
                    <br />
                    {driver.canDriveCarTypes.join(", ")} |{" "}
                    {driver.canDriveTransmissions.join(", ")}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Markers for customers */}
          {customers.map((cust) => {
            const label = getInitials(cust.name);
            const color = getCustomerColor(cust.status);
            const icon = createStatusIcon(label, color);
            const position = [cust.location.lat, cust.location.lng];
            return (
              <Marker key={`cust-${cust.id}`} position={position} icon={icon}>
                <Popup>
                  <div className="text-sm">
                    <strong>{cust.name}</strong>
                    <br />
                    Status: {cust.status}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Distance/Time lines */}
          {(showDistanceLines || showTimeLines) &&
            lines.map((line, idx) => {
              let color = "blue";
              if (showTimeLines && !showDistanceLines) color = "green";
              if (showTimeLines && showDistanceLines) color = "purple";

              let infoArr = [];
              if (showDistanceLines) {
                infoArr.push(`Distance: ${line.distance.toFixed(1)} km`);
              }
              if (showTimeLines) {
                infoArr.push(`Time: ${line.timeStr}`);
              }
              const info = infoArr.join(" | ");

              return (
                <Polyline
                  key={idx}
                  positions={line.positions}
                  color={color}
                  weight={3}
                >
                  <Popup>
                    <div className="text-sm">{info}</div>
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
