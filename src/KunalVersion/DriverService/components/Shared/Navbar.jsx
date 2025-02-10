import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        DriverService
      </Link>
      <div className="space-x-4">
        <Link to="/booking" className="hover:underline">
          Book a Ride
        </Link>
        <Link to="/allocator" className="hover:underline">
          Allocator Dashboard
        </Link>
        <Link to="/driver" className="hover:underline">
          Driver Dashboard
        </Link>
      </div>
    </nav>
  );
}
