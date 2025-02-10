import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

/**
 * ArrivedPage
 *
 * Demonstrates a typical "Arrived" ride-hailing screen:
 *  - Map placeholder
 *  - Toast bubble: "Your taxi has arrived"
 *  - Bottom card with driver info + "Contact driver" button + close icon
 */
export default function ArrivedPage() {
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600">[Map Placeholder]</span>
      </div>

      {/* TOP BAR: Menu + Title */}
      <div className="absolute top-6 left-4 flex items-center">
        {/* Menu or hamburger icon (placeholder) */}
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200 mr-3">
          {/* Just a placeholder icon; replace with your actual icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Arrived</h1>
      </div>

      {/* “Your taxi has arrived” Toast */}
      <div className="absolute top-20 left-4">
        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-md">
          {/* Blue dot */}
          <span className="text-blue-600 text-sm">●</span>
          <span className="text-gray-800 text-sm font-medium">
            Your taxi has arrived
          </span>
        </div>
      </div>

      {/* Car + passenger location placeholders (optional) */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* Car marker */}
        <div className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center text-gray-600 mb-2">
          🚗
        </div>
        {/* Passenger’s location circle */}
        <div className="w-6 h-6 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center relative">
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div
        className="
          absolute bottom-0 w-full 
          bg-white rounded-t-3xl shadow-2xl
          px-4 py-4
        "
      >
        {/* Handle / little notch */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Driver info row */}
        <div className="flex items-center">
          {/* Driver avatar */}
          <div className="w-14 h-14 bg-gray-200 overflow-hidden rounded-full">
            <img
              src="https://i.pravatar.cc/150?img=9"
              alt="driver"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Driver details */}
          <div className="ml-3">
            <p className="text-gray-800 text-base font-semibold">Patrick</p>
            <p className="text-gray-500 text-sm">HS785K • Volkswagen Jetta</p>
          </div>

          {/* Close button on the right */}
          <button
            className="ml-auto w-10 h-10 bg-white border border-gray-200 rounded-full 
              flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Contact Driver Button */}
        <div className="mt-4 flex items-center">
          <button
            className="
              flex-1 bg-blue-600 text-white 
              py-3 rounded-full text-sm font-semibold
              hover:bg-blue-700
            "
          >
            Contact driver
          </button>
        </div>
      </div>
    </div>
  );
}
