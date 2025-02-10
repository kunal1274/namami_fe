import React from "react";
import { FaArrowAltCircleDown, FaEdit, FaHistory } from "react-icons/fa";
import {
  FaHelicopter,
  FaPaypal,
  FaPeopleGroup,
  FaPhoenixFramework,
} from "react-icons/fa6";

const Menu2 = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Optional arrow at the very top */}
      <div className="mb-4">
        {/* Down arrow icon example */}
        <FaArrowAltCircleDown />
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center mb-8 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 relative">
          {/* Avatar icon */}
          <FaPeopleGroup />

          {/* Pencil icon */}
          <div
            className="
            absolute top-0 right-0 
            translate-x-1/4 -translate-y-1/4
            w-6 h-6 bg-white rounded-full 
            flex items-center justify-center
          "
          >
            <FaEdit />
          </div>
        </div>

        {/* Name & Email */}
        <h2 className="text-gray-800 text-xl font-semibold">Carson</h2>
        <p className="text-gray-500 text-sm">carson@mail.com</p>
      </div>

      {/* Grid of Boxes */}
      <div
        className="
        grid grid-cols-2 gap-4 mb-8
        w-full max-w-sm px-4
      "
      >
        {/* Ride History */}
        <div
          className="
          bg-white rounded-xl shadow 
          p-4 flex flex-col items-center
        "
        >
          <FaHistory />
          <p className="text-gray-700 font-medium">Ride history</p>
        </div>

        {/* Payment */}
        <div
          className="
          bg-white rounded-xl shadow 
          p-4 flex flex-col items-center
        "
        >
          <FaPaypal />
          <p className="text-gray-700 font-medium">Payment</p>
        </div>

        {/* Promocode */}
        <div
          className="
          bg-white rounded-xl shadow 
          p-4 flex flex-col items-center
        "
        >
          <FaPhoenixFramework />
          <p className="text-gray-700 font-medium">Promocode</p>
        </div>

        {/* Support */}
        <div
          className="
          bg-white rounded-xl shadow 
          p-4 flex flex-col items-center
        "
        >
          <FaHelicopter />
          <p className="text-gray-700 font-medium">Support</p>
        </div>
      </div>

      {/* Floating Close Button */}
      <button
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
  );
};

export default Menu2;
