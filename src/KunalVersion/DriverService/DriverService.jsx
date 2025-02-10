import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DriverService() {
  const navigate = useNavigate();

  //   // Automatically redirect to a default child route (e.g., Booking)
  //   useEffect(() => {
  //     navigate("booking"); // Redirects to the "booking" route
  //   }, [navigate]);

  return (
    <div>
      <h1>Driver Service</h1>
      {/* Renders the child routes */}
      <Outlet />
    </div>
  );
}
