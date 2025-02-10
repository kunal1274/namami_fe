import React from "react";
import BookRideForm from "../components/Booking/BookRideForm";

export default function Booking() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <BookRideForm />
      </div>
    </div>
  );
}
