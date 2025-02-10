// Menu2Overlay.jsx
import React from "react";
import { FaArrowAltCircleDown, FaEdit, FaHistory } from "react-icons/fa";
import {
  FaHelicopter,
  FaPaypal,
  FaPeopleGroup,
  FaPhoenixFramework,
} from "react-icons/fa6";

const Menu2Overlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If not open, return nothing

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Optional Gray Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose} // Clicking backdrop also closes
      ></div>

      {/* Main Menu2 content */}
      <div
        className="
          relative w-full 
          min-h-screen 
          bg-gray-50
          flex flex-col 
          items-center 
          justify-center
        "
      >
        {/* Close / X Button - top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow text-gray-700 hover:bg-gray-200"
        >
          ✕
        </button>

        {/* Down Arrow at top-center */}
        <button
          onClick={onClose}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-600 hover:text-gray-800"
        >
          <FaArrowAltCircleDown className="h-6 w-6" />
        </button>

        {/* Profile area */}
        <div className="flex flex-col items-center mb-8 px-4 mt-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 relative">
            {/* Avatar icon */}
            <FaPeopleGroup className="text-gray-500 text-3xl" />

            {/* Pencil icon */}
            <div
              className="
                absolute top-0 right-0 
                translate-x-1/4 -translate-y-1/4
                w-6 h-6 bg-white rounded-full 
                flex items-center justify-center
                shadow
              "
            >
              <FaEdit className="text-gray-600 text-sm" />
            </div>
          </div>

          {/* Name & Email */}
          <h2 className="text-gray-800 text-xl font-semibold">Carson</h2>
          <p className="text-gray-500 text-sm">carson@mail.com</p>
        </div>

        {/* Grid of Boxes */}
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-sm px-4">
          {/* Ride History */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <FaHistory className="text-blue-500 text-2xl mb-1" />
            <p className="text-gray-700 font-medium">Ride history</p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <FaPaypal className="text-blue-500 text-2xl mb-1" />
            <p className="text-gray-700 font-medium">Payment</p>
          </div>

          {/* Promocode */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <FaPhoenixFramework className="text-blue-500 text-2xl mb-1" />
            <p className="text-gray-700 font-medium">Promocode</p>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <FaHelicopter className="text-blue-500 text-2xl mb-1" />
            <p className="text-gray-700 font-medium">Support</p>
          </div>
        </div>

        {/* Floating Close Button (redundant if user can also close via backdrop or arrow) */}
        <button
          onClick={onClose}
          className="
            w-12 h-12 bg-white rounded-full 
            flex items-center justify-center 
            shadow-md text-gray-700
            hover:bg-gray-200
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Menu2Overlay;
