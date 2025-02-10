// src/components/DriverMapGoogle.jsx

import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

/* ---------------------------------------------------------
   1) Utility Functions (same as your Leaflet version)
--------------------------------------------------------- */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lat2 - lon1);
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
 */
function createMarkerIcon(label, fillColor) {
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
   3) Bookings-based logic
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

// Helper to find booking by driver+customer
function findBookingForDriverCustomer(driverId, customerId, allBookings) {
  return allBookings.find(
    (b) => b.driverId === driverId && b.customerId === customerId
  );
}

function getLatLngFromDriver(driverId, drivers) {
  const d = drivers.find((drv) => drv.id === driverId);
  return d ? { lat: d.location.lat, lng: d.location.lng } : null;
}
function getLatLngFromCustomer(customerId, customers) {
  const c = customers.find((cust) => cust.id === customerId);
  return c ? { lat: c.location.lat, lng: c.location.lng } : null;
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
  // toggles for lines
  const [showDistanceLines, setShowDistanceLines] = useState(false);
  const [showTimeLines, setShowTimeLines] = useState(false);

  // toggles for route
  const [showRoute, setShowRoute] = useState(false);

  // booking filter
  const [viewType, setViewType] = useState("ALL");
  const [selectedValue, setSelectedValue] = useState(null);

  // route states
  const [selectedRouteDriverId, setSelectedRouteDriverId] = useState(null);
  const [selectedRouteCustomerId, setSelectedRouteCustomerId] = useState(null);

  const [directionsResult, setDirectionsResult] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  // FIXED: We'll add "needsRoute" to avoid repeated calls
  const [needsRoute, setNeedsRoute] = useState(false); // NEW

  // Lines for driver–customer combos
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

  const bookingLines = useMemo(() => {
    if (!bookings) return [];
    const lines = [];
    drivers.forEach((drv) => {
      const { inProgress, nextBooking } = getActiveBookingsByDriver(
        drv.id,
        bookings
      );

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

  const filteredBookingLines = useMemo(() => {
    if (!bookings) return [];
    return filterBookingLines(bookingLines, viewType, selectedValue);
  }, [bookings, bookingLines, viewType, selectedValue]);

  // Map ref
  const mapRef = useRef(null);

  const onLoadMap = (map) => {
    mapRef.current = map;
    fitBounds(map);
  };

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

  const labelCounts = {};

  // Build dropdown data
  const driverOptions = drivers.map((d) => ({ label: d.name, value: d.id }));
  const customerOptions = customers.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const bookingOptions = bookings
    ? bookings.map((b) => ({ label: `Booking #${b.id}`, value: b.id }))
    : [];

  /* ------------------------------------------------------
     Directions callback
  ------------------------------------------------------ */
  const handleDirectionsCallback = (response) => {
    if (!response) return;

    if (response.status === "OK") {
      setDirectionsResult(response);

      const leg = response.routes[0].legs[0];
      const distance = leg.distance.text;
      const duration = leg.duration.text;
      const startAddress = leg.start_address;
      const endAddress = leg.end_address;

      setRouteInfo({ distance, duration, startAddress, endAddress });
    } else {
      console.error("Directions request failed:", response);
      alert("No route found (DirectionsService error).");
    }

    // Once we get directions or fail, we do NOT repeat.
    setNeedsRoute(false); // FIXED
  };

  const handleToggleRoute = () => {
    setShowRoute((prev) => !prev);
    // If turning OFF the route, clear directions
    if (showRoute) {
      setDirectionsResult(null);
      setRouteInfo(null);
      setNeedsRoute(false); // ensures we won't repeatedly call
    }
  };

  // (1) If booking is selected => auto-fill driver & customer
  useEffect(() => {
    if (!bookings) return;
    if (viewType === "BOOKING" && selectedValue) {
      const booking = bookings.find((b) => b.id === selectedValue);
      if (!booking) return;

      if (!booking.driverId || !booking.customerId) {
        alert(
          "No route defined for this booking (missing driver or customer)."
        );
        setSelectedRouteDriverId(null);
        setSelectedRouteCustomerId(null);
        setDirectionsResult(null);
        setRouteInfo(null);
      } else {
        setSelectedRouteDriverId(booking.driverId);
        setSelectedRouteCustomerId(booking.customerId);
      }
    }
  }, [viewType, selectedValue, bookings]);

  /* 
    We'll do a useEffect to set "needsRoute = true" 
    only once when the user toggles showRoute and we have 
    a valid driver+customer. 
  */
  useEffect(() => {
    if (!showRoute) return; // if user hasn't turned on "Show Route", skip
    if (!drivers || !customers || !bookings) return;

    // If we have both driver & customer
    if (selectedRouteDriverId && selectedRouteCustomerId) {
      const foundBooking = findBookingForDriverCustomer(
        selectedRouteDriverId,
        selectedRouteCustomerId,
        bookings
      );
      if (!foundBooking) {
        alert(
          "No route found for this Driver & Customer (no matching booking)."
        );
        setDirectionsResult(null);
        setRouteInfo(null);
        setNeedsRoute(false);
      } else {
        // We'll do a route request once
        setNeedsRoute(true); // FIXED: only once
      }
    }
    // If only driver is selected => show polylines for that driver.
    else if (selectedRouteDriverId && !selectedRouteCustomerId) {
      alert(
        "Showing all routes for the selected Driver’s bookings (polylines)."
      );
      setNeedsRoute(false);
    }
  }, [
    showRoute,
    selectedRouteDriverId,
    selectedRouteCustomerId,
    bookings,
    drivers,
    customers,
  ]);

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
            onClick={handleToggleRoute}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {showRoute ? "Hide Route" : "Show Route"}
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

      {/* Route Between: pick driver + customer */}
      <div className="bg-gray-100 p-2 rounded mb-4 flex gap-2 items-center">
        <span className="font-semibold">Route Between:</span>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedRouteDriverId || ""}
          onChange={(e) => setSelectedRouteDriverId(Number(e.target.value))}
        >
          <option value="">--Select Driver--</option>
          {driverOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedRouteCustomerId || ""}
          onChange={(e) => setSelectedRouteCustomerId(Number(e.target.value))}
        >
          <option value="">--Select Customer--</option>
          {customerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Show route details if we have them */}
      {routeInfo && (
        <div className="border border-gray-200 rounded p-2 mb-2 bg-white text-sm">
          <strong>Route Details:</strong>
          <p>
            Distance: {routeInfo.distance}, Time: {routeInfo.duration}
          </p>
          <p>
            From: {routeInfo.startAddress} <br />
            To: {routeInfo.endAddress}
          </p>
        </div>
      )}

      <div style={{ width: "600px", height: "400px" }}>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            onLoad={onLoadMap}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 40.7128, lng: -74.006 }}
            zoom={12}
          >
            {/* 
               DirectionsService is rendered IF:
               1) showRoute is true
               2) we have driver+customer
               3) needsRoute is true => we haven't done it yet
            */}
            {showRoute &&
              selectedRouteDriverId &&
              selectedRouteCustomerId &&
              needsRoute && (
                <DirectionsService
                  options={{
                    origin: getLatLngFromDriver(selectedRouteDriverId, drivers),
                    destination: getLatLngFromCustomer(
                      selectedRouteCustomerId,
                      customers
                    ),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                  }}
                  callback={handleDirectionsCallback}
                />
              )}

            {/* If we have a route, show it once */}
            {directionsResult && (
              <DirectionsRenderer
                options={{
                  directions: directionsResult,
                  // If you want the map to NOT recenter each time:
                  // preserveViewport: true,
                }}
              />
            )}

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

                return (
                  <Polyline
                    key={`all-${idx}`}
                    path={line.positions}
                    options={{
                      strokeColor: color,
                      strokeWeight: 3,
                    }}
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
                  />
                );
              })}

            {/* 
              If showRoute = true, driver only, no customer => 
              polylines for that driver’s bookings 
            */}
            {showRoute &&
              selectedRouteDriverId &&
              !selectedRouteCustomerId &&
              bookingLines
                .filter((bl) => bl.driver.id === selectedRouteDriverId)
                .map((item, idx) => {
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
                      key={`drv-route-${idx}`}
                      path={path}
                      options={{ strokeColor: item.color, strokeWeight: 4 }}
                    />
                  );
                })}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default DriverMapGoogle;
