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

/* ------------------------------------
   1) Utility Functions (unchanged)
------------------------------------ */
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
  const hours = distanceKm / speed;
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${hours.toFixed(1)} hr`;
}

// CHANGED: We split "getInitials" from "conflict resolution"
function getInitials(name) {
  return name.substring(0, 2).toUpperCase();
}

// NEW: For label conflict resolution
function getUniqueLabel(baseLabel, labelCounts) {
  if (!labelCounts[baseLabel]) {
    labelCounts[baseLabel] = 0;
  }
  labelCounts[baseLabel]++;
  const count = labelCounts[baseLabel];
  // If used more than once, append the number
  return count > 1 ? `${baseLabel}${count}` : baseLabel;
}

/* ------------------------------------
   2) Color Utility (unchanged)
------------------------------------ */
function getDriverColor(status) {
  switch (status) {
    case "available":
      return "#22c55e";
    case "booked":
    case "in_progress":
      return "#6366f1";
    case "completing":
    case "about_to_complete":
      return "#a855f7";
    case "unavailable":
      return "#ef4444";
    case "rejected":
      return "#ec4899";
    default:
      return "#6b7280";
  }
}

function getCustomerColor(status) {
  switch (status) {
    case "waiting":
    case "requested":
      return "#f97316";
    case "about_to_complete":
      return "#a855f7";
    default:
      return "#6b7280";
  }
}

/* ------------------------------------
   3) Create an SVG pin icon (unchanged)
------------------------------------ */
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

/* ------------------------------------
   4) Child: FitBounds (unchanged)
------------------------------------ */
function FitBounds({ drivers, customers }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
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

/* ------------------------------------
   5) Child: RoutingControl (unchanged)
------------------------------------ */
function RoutingControl({ drivers, customers, showRoute }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!showRoute) {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
      return;
    }

    if (!drivers.length || !customers.length) return;

    const driver = drivers[0];
    const cust = customers[0];

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
      createMarker: () => null,
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

/* ------------------------------------
   6) Optional: "in-progress" or "next" booking logic
   If you want to draw lines only for in-progress or next,
   define your booking logic here. Otherwise, skip.
------------------------------------ */
function getActiveBookingsByDriver(driverId, bookings) {
  const now = new Date();
  const driverBookings = bookings.filter((b) => b.driverId === driverId);

  // in-progress
  const inProgress = driverBookings.filter((b) => {
    const s = new Date(b.start);
    const e = new Date(b.end);
    return s <= now && e >= now;
  });

  // next booking (earliest future)
  const future = driverBookings.filter((b) => new Date(b.start) > now);
  let nextBooking = null;
  if (future.length > 0) {
    nextBooking = future.reduce((acc, curr) => {
      if (new Date(curr.start) < new Date(acc.start)) return curr;
      return acc;
    });
  }
  return { inProgress, nextBooking };
}

/* ------------------------------------
   7) Main Export: DriverMap (CHANGED)
------------------------------------ */
function DriverMap({
  drivers,
  customers,
  bookings, // NEW: optional bookings array
}) {
  // toggles (unchanged)
  const [showDistanceLines, setShowDistanceLines] = useState(false);
  const [showTimeLines, setShowTimeLines] = useState(false);
  const [showRoute, setShowRoute] = useState(false);

  // CHANGED: Instead of building lines for every driver <-> customer,
  // we'll keep your existing approach, AND optionally handle "booking lines."
  // If no "bookings" prop is passed, we do the old approach.

  // 7A) Build lines (the old approach) for toggles:
  const allDriverCustomerLines = useMemo(() => {
    if (!drivers || !customers) return [];
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

  // 7B) Build lines if we want "in progress" or "next" booking lines
  const bookingLines = useMemo(() => {
    if (!bookings) return []; // if none provided, skip
    const lines = [];
    drivers.forEach((drv) => {
      const { inProgress, nextBooking } = getActiveBookingsByDriver(
        drv.id,
        bookings
      );

      // for each in-progress booking
      inProgress.forEach((bk) => {
        const cust = customers.find((c) => c.id === bk.customerId);
        if (cust) {
          lines.push({
            bookingId: bk.id,
            driver: drv,
            customer: cust,
            start: bk.start,
            end: bk.end,
            color: "blue",
          });
        }
      });

      // for the earliest next booking
      if (nextBooking) {
        const cust = customers.find((c) => c.id === nextBooking.customerId);
        if (cust) {
          lines.push({
            bookingId: nextBooking.id,
            driver: drv,
            customer: cust,
            start: nextBooking.start,
            end: nextBooking.end,
            color: "green",
          });
        }
      }
    });
    return lines;
  }, [drivers, customers, bookings]);

  // CHANGED: We unify the label conflicts. We'll track how many times a label is used.
  const labelCounts = {};

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

      {/* A fixed container for the map: 600x400, same as before */}
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

          {/* Child that auto-fits bounds */}
          <FitBounds drivers={drivers} customers={customers} />

          {/* Child that sets up the routing if toggled */}
          <RoutingControl
            drivers={drivers}
            customers={customers}
            showRoute={showRoute}
          />

          {/* Markers for drivers */}
          {drivers.map((driver) => {
            // conflict resolution
            const baseLabel = getInitials(driver.name);
            const label = getUniqueLabel(baseLabel, labelCounts);

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
            // conflict resolution
            const baseLabel = getInitials(cust.name);
            const label = getUniqueLabel(baseLabel, labelCounts);

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

          {/* Distance/Time lines (same logic as your original code) */}
          {(showDistanceLines || showTimeLines) &&
            allDriverCustomerLines.map((line, idx) => {
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
                  key={`all-${idx}`}
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

          {/* NEW: Lines for "in-progress" or "next" bookings (if bookings prop is provided) */}
          {bookings &&
            bookingLines.map((item, idx) => {
              const driverPos = [
                item.driver.location.lat,
                item.driver.location.lng,
              ];
              const custPos = [
                item.customer.location.lat,
                item.customer.location.lng,
              ];
              return (
                <Polyline
                  key={`bk-${idx}`}
                  positions={[driverPos, custPos]}
                  color={item.color}
                  weight={4}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>Booking #{item.bookingId}</strong>
                      <br />
                      {item.driver.name} → {item.customer.name}
                      <br />
                      {item.start} to {item.end}
                    </div>
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
