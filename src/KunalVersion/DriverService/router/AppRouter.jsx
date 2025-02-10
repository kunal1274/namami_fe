import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Booking from "../pages/Booking";
import AllocatorDashboard from "../pages/AllocatorDashboard";
import DriverDashboard from "../pages/DriverDashboard";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/allocator" element={<AllocatorDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}
