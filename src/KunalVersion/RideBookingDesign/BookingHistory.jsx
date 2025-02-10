// src/components/BookingHistory.jsx
import React, { useState } from "react";

import ToastContainer from "./ToastContainer";
import { ArrowDownIcon } from "@heroicons/react/24/outline"; // Just an icon example
import { XMarkIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import ActionsDropdown from "./ActionsDropdown";

const mockBookings = [
  {
    id: "b1",
    dateTime: "8 JUNE 2019, 18:39",
    status: "COMPLETED",
    startTime: "11:24",
    startAddress: "1, Thrale Street, London, SE19HW, UK",
    endTime: "11:38",
    endAddress: "Ealing Broadway Shopping Centre, London, W55JY, UK",
    bookingDetails: {
      // For your modal
      ridingStatus: "COMPLETED",
      rideNumber: "RN-1001",
      salesNumber: "SO-256",
      totalTime: { hours: 2, minutes: 14 },
      start: "2019-06-08 11:24",
      end: "2019-06-08 11:38",
      pickUp: "1, Thrale Street, London",
      dropOff: "Ealing Broadway Shopping Centre",
      totalAmount: 450,
      orderStatus: "Completed",
      itemNumber: "DDS4",
      qty: 4,
      unit: "hrs",
      currency: "GBP",
    },
  },
  {
    id: "b2",
    dateTime: "10 JUNE 2019, 21:53",
    status: "CANCELLED",
    startTime: "18:03",
    startAddress: "1, Thrale Street, London, SE19HW, UK",
    endTime: "18:44",
    endAddress: "18, Ocean avenue, London, SE19HW, UK",
    bookingDetails: {
      ridingStatus: "CANCELLED",
      rideNumber: "RN-1002",
      salesNumber: "SO-257",
      totalTime: { hours: 1, minutes: 41 },
      start: "2019-06-10 18:03",
      end: "2019-06-10 18:44",
      pickUp: "1, Thrale Street, London",
      dropOff: "18, Ocean avenue, London",
      totalAmount: 0,
      orderStatus: "Cancelled",
      itemNumber: "DDS4",
      qty: 4,
      unit: "hrs",
      currency: "GBP",
    },
  },
  {
    id: "b3",
    dateTime: "12 JUNE 2019, 09:15",
    status: "ALLOCATOR_PROCESSING",
    startTime: "09:15",
    startAddress: "Heathrow Airport, London, UK",
    endTime: "10:00",
    endAddress: "Kings Cross, London, UK",
    bookingDetails: {
      ridingStatus: "ALLOCATOR_PROCESSING",
      rideNumber: "RN-1003",
      salesNumber: "SO-258",
      totalTime: { hours: 0, minutes: 45 },
      start: "2019-06-12 09:15",
      end: "2019-06-12 10:00",
      pickUp: "Heathrow Airport, London",
      dropOff: "Kings Cross, London",
      totalAmount: 300,
      orderStatus: "Draft",
      itemNumber: "DDS4",
      qty: 4,
      unit: "hrs",
      currency: "GBP",
    },
  },
];

// Booking Details Modal Component
export const BookingDetailsModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      {/* MODIFICATION: Make the modal scrollable */}
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Booking Details
        </h2>
        <div className="space-y-6">
          {/* Customer Visible Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-gray-600">Riding Status:</div>
              <div className="text-blue-600 font-medium">
                {bookingDetails.ridingStatus}
              </div>

              <div className="text-gray-600">Ride Number #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.rideNumber}
              </div>

              <div className="text-gray-600">Sales Number #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.salesNumber}
              </div>

              <div className="text-gray-600">Hours:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.totalTime.hours} hour(s){" "}
                {bookingDetails.totalTime.minutes} minute(s)
              </div>

              <div className="text-gray-600">Start Date Time:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.start}
              </div>

              <div className="text-gray-600">End Date Time:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.end}
              </div>

              <div className="text-gray-600">Pick Up:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.pickUp}
              </div>

              {bookingDetails.dropOff && (
                <>
                  <div className="text-gray-600">Drop off:</div>
                  <div className="text-gray-800 font-medium break-words">
                    {bookingDetails.dropOff}
                  </div>
                </>
              )}

              <div className="text-gray-600">Total Amt:</div>
              <div className="text-green-600 font-semibold flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {bookingDetails.totalAmount}
              </div>
            </div>
          </div>

          {/* Internal Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Internal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-gray-600">Order Status:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.orderStatus}
              </div>

              <div className="text-gray-600">Item #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.itemNumber}
              </div>

              <div className="text-gray-600">Qty:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.qty}
              </div>

              <div className="text-gray-600">Unit:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.unit}
              </div>

              <div className="text-gray-600">Currency:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BookingHistory() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Open modal with full booking details
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking.bookingDetails);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  // Add a toast
  const addToast = (message, type = "success") => {
    const newToast = {
      id: Date.now(),
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    // Remove automatically after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  // Remove toast manually
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Change booking status (example: ALLOCATOR_PROCESSING -> CONFIRMED)
  const handleChangeStatus = (id) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id && b.status === "ALLOCATOR_PROCESSING") {
          return { ...b, status: "CONFIRMED" };
        }
        return b;
      })
    );
    addToast("Status changed to CONFIRMED!");
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Ride history
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow p-4 md:p-6"
          >
            {/* Header: date/time + optional status */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 text-sm md:text-base font-semibold">
                {booking.dateTime}
              </span>

              {/* Status display */}
              {booking.status === "CANCELLED" ? (
                <span className="text-red-500 font-bold text-sm md:text-base">
                  CANCELLED
                </span>
              ) : booking.status === "ALLOCATOR_PROCESSING" ? (
                <span className="text-orange-500 font-bold text-sm md:text-base">
                  ALLOCATOR PROCESSING
                </span>
              ) : booking.status === "CONFIRMED" ? (
                <span className="text-green-600 font-bold text-sm md:text-base">
                  CONFIRMED
                </span>
              ) : booking.status === "COMPLETED" ? (
                <span className="text-gray-400 font-bold text-sm md:text-base">
                  COMPLETED
                </span>
              ) : null}
            </div>

            <hr className="mb-2" />

            {/* Timeline */}
            <div className="space-y-2 text-sm md:text-base text-gray-700">
              {/* Start time + address */}
              <div className="flex gap-2">
                <span className="w-12 text-right">{booking.startTime}</span>
                {/* Blue bullet */}
                <span className="text-blue-600 mt-1">●</span>
                {/* Address */}
                <span className="flex-1">{booking.startAddress}</span>
              </div>

              {/* Vertical line + arrow icon */}
              <div className="flex ml-[3rem]">
                <div className="pl-2 border-l-2 border-gray-300 mx-2"></div>
                <ArrowDownIcon className="h-4 w-4 text-gray-400 -ml-[3px]" />
              </div>

              {/* End time + address */}
              <div className="flex gap-2">
                <span className="w-12 text-right">{booking.endTime}</span>
                <span className="text-red-600 mt-1">●</span>
                <span className="flex-1">{booking.endAddress}</span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="mt-4 flex items-center space-x-4">
              {/* View Details => open modal */}
              <button
                onClick={() => handleViewDetails(booking)}
                className="text-blue-600 text-sm underline font-medium"
              >
                View details
              </button>

              {/* Example: Only show "Change Status" if ALLOCATOR_PROCESSING */}
              {booking.status === "ALLOCATOR_PROCESSING" && (
                <button
                  onClick={() => handleChangeStatus(booking.id)}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Change Status
                </button>
              )}
              <ActionsDropdown />
            </div>
          </div>
        ))}
      </div>

      {/* Booking Details Modal (from your code) */}
      {selectedBooking && (
        <BookingDetailsModal
          isOpen={showModal}
          onClose={handleCloseModal}
          bookingDetails={selectedBooking}
        />
      )}

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
