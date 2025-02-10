// src/components/DriverMapGoogle.jsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { icon } from "leaflet";

/* ---------------------------------------------------------
   1) Utility Functions (same logic as your Leaflet version)
--------------------------------------------------------- */
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

function getInitials(name) {
  return name.substring(0, 2).toUpperCase();
}

// For label conflict resolution
function getUniqueLabel(baseLabel, labelCounts) {
  if (!labelCounts[baseLabel]) {
    labelCounts[baseLabel] = 0;
  }
  labelCounts[baseLabel]++;
  const count = labelCounts[baseLabel];
  return count > 1 ? `${baseLabel}${count}` : baseLabel;
}

/* ---------------------------------------------------------
   2) Colors & Icon Generation
   With Google Maps, we can define a "Marker" icon by a URL,
   or generate data-URL images on the fly.
   We'll do a minimal approach: use a colored circle or pin.
--------------------------------------------------------- */

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

/**
 * Build a small "data URL" icon—a colored circle with the label
 * For production, consider a more elaborate SVG or a static PNG.
 */
function createMarkerIcon(label, fillColor) {
  // We'll generate an SVG data URI with a circle or pin shape
  const svg = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="28" fill="${fillColor}" />
      <text x="50%" y="50%" fill="white" font-size="16" font-weight="bold"
        text-anchor="middle" dominant-baseline="central">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
}

/* ---------------------------------------------------------
   3) Booking-based Lines
   in-progress or next booking logic
--------------------------------------------------------- */
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
    nextBooking = future.reduce((acc, curr) =>
      new Date(curr.start) < new Date(acc.start) ? curr : acc
    );
  }
  return { inProgress, nextBooking };
}

function filterBookingLines(lines, filterType, filterValue) {
  if (filterType === "ALL") return lines;
  if (filterType === "DRIVER") {
    return lines.filter((item) => item.driver.id === filterValue);
  }
  if (filterType === "CUSTOMER") {
    return lines.filter((item) => item.customer.id === filterValue);
  }
  if (filterType === "BOOKING") {
    return lines.filter((item) => item.bookingId === filterValue);
  }
  return lines;
}

/* ---------------------------------------------------------
   4) Main Component
--------------------------------------------------------- */
function DriverMapGoogle({
  apiKey, // your Google Maps API key
  drivers,
  customers,
  bookings,
}) {
  // toggles
  const [showDistanceLines, setShowDistanceLines] = useState(false);
  const [showTimeLines, setShowTimeLines] = useState(false);
  const [showRoute, setShowRoute] = useState(false);

  // for booking filter (driver/customer/booking)
  const [viewType, setViewType] = useState("ALL");
  const [selectedValue, setSelectedValue] = useState(null);

  // 4A) lines for all driver–customer pairs
  const allDriverCustomerLines = useMemo(() => {
    const combos = [];
    drivers.forEach((drv) => {
      customers.forEach((cst) => {
        const distance = haversineDistance(
          drv.location.lat,
          drv.location.lng,
          cst.location.lat,
          cst.location.lng
        );
        const timeStr = calculateTime(distance);
        combos.push({
          positions: [
            { lat: drv.location.lat, lng: drv.location.lng },
            { lat: cst.location.lat, lng: cst.location.lng },
          ],
          distance,
          timeStr,
        });
      });
    });
    return combos;
  }, [drivers, customers]);

  // 4B) booking-based lines
  const bookingLines = useMemo(() => {
    if (!bookings) return [];
    const lines = [];
    drivers.forEach((drv) => {
      const { inProgress, nextBooking } = getActiveBookingsByDriver(
        drv.id,
        bookings
      );

      // in-progress
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

      // next
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

  // apply filter
  const filteredBookingLines = useMemo(() => {
    if (!bookings) return [];
    return filterBookingLines(bookingLines, viewType, selectedValue);
  }, [bookings, bookingLines, viewType, selectedValue]);

  // We'll store references to the map so we can fit bounds
  const mapRef = useRef(null);

  const onLoadMap = (map) => {
    mapRef.current = map;
    fitBounds(map);
  };

  // 4C) Fit bounds to show all drivers & customers
  function fitBounds(map) {
    if (!window.google) return;
    const bounds = new window.google.maps.LatLngBounds();
    drivers.forEach((d) =>
      bounds.extend({ lat: d.location.lat, lng: d.location.lng })
    );
    customers.forEach((c) =>
      bounds.extend({ lat: c.location.lat, lng: c.location.lng })
    );
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  }

  // label conflict
  const labelCounts = {};

  // building dropdown data
  const driverOptions = drivers.map((d) => ({ label: d.name, value: d.id }));
  const customerOptions = customers.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const bookingOptions = bookings
    ? bookings.map((b) => ({ label: `Booking #${b.id}`, value: b.id }))
    : [];

  // 4D) For route: We won't implement an official "DirectionsService" example here.
  //     You can integrate @react-google-maps/api's DirectionsService or an external solution.
  //     We'll skip the "Route" for demonstration, or you can show a single route from [0] driver to [0] customer.

  return (
    <div className="border border-gray-300 rounded bg-white shadow-sm p-4 mt-4 w-full max-w-4xl">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="font-semibold text-lg">Google Map Preview</h2>
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
            {showRoute ? "Hide Route" : "Show Route (Demo)"}
          </button>
        </div>
      </div>

      {/* Booking Filter */}
      {bookings && (
        <div className="bg-gray-100 p-2 rounded mb-4 flex gap-2 items-center">
          <span className="font-semibold">View Bookings By:</span>
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
      )}

      {/* Container for the Map */}
      <div style={{ width: "600px", height: "400px" }}>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            onLoad={onLoadMap}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            // We can set an initial center. We'll override via fitBounds anyway
            center={{ lat: 40.7128, lng: -74.006 }}
            zoom={12}
          >
            {/* Markers for drivers */}
            {drivers.map((driver) => {
              const baseLabel = getInitials(driver.name);
              const label = getUniqueLabel(baseLabel, labelCounts);
              const iconUrl = window.google
                ? createMarkerIcon(label, getDriverColor(driver.status))
                : null;
              return (
                <Marker
                  key={`driver-${driver.id}`}
                  position={{
                    lat: driver.location.lat,
                    lng: driver.location.lng,
                  }}
                  icon={
                    iconUrl
                      ? {
                          url: iconUrl,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }
                      : null
                  }
                />
              );
            })}

            {/* Markers for customers */}
            {customers.map((cust) => {
              const baseLabel = getInitials(cust.name);
              const label = getUniqueLabel(baseLabel, labelCounts);
              const iconUrl = window.google
                ? createMarkerIcon(label, getCustomerColor(cust.status))
                : null;
              return (
                <Marker
                  key={`cust-${cust.id}`}
                  position={{
                    lat: cust.location.lat,
                    lng: cust.location.lng,
                  }}
                  icon={
                    iconUrl
                      ? {
                          url: iconUrl,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }
                      : null
                  }
                />
              );
            })}

            {/* Distance/Time lines across all drivers/customers */}
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
                const lineLabel = infoArr.join(" | ");

                return (
                  <Polyline
                    key={`all-${idx}`}
                    path={line.positions}
                    options={{
                      strokeColor: color,
                      strokeWeight: 3,
                    }}
                    onClick={() =>
                      console.log("Polyline driver clicked:", line)
                    }
                    // No built-in direct popup in GoogleMap, but we can handle onClick
                    // or other strategies. We'll skip the "popup" for brevity.
                  />
                );
              })}

            {/* Filtered booking lines (in-progress/next) */}
            {bookings &&
              filteredBookingLines.map((item, idx) => {
                const path = [
                  {
                    lat: item.driver.location.lat,
                    lng: item.driver.location.lng,
                  },
                  {
                    lat: item.customer.location.lat,
                    lng: item.customer.location.lng,
                  },
                ];
                return (
                  <Polyline
                    key={`bk-${idx}`}
                    path={path}
                    options={{
                      strokeColor: item.color,
                      strokeWeight: 4,
                    }}
                    onClick={() =>
                      console.log("Polyline customer clicked:", line)
                    }
                  />
                );
              })}

            {/* If you want a “Route” to the first driver→customer using Google Directions,
                you'd integrate DirectionsService and DirectionsRenderer here. 
                We'll skip for brevity. */}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default DriverMapGoogle;
