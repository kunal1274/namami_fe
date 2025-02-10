import React from "react";
import BookingHistory from "../RideBookingDesign/BookingHistory";
import { Link } from "react-router-dom";

const Menu11 = () => {
  return (
    <div className="w-[320px] h-screen shadow-lg flex flex-col font-sans">
      {/* -- Top Blue Section -- */}
      <div className="bg-[#0C61FE] pt-8 pb-6 px-6 flex flex-col items-center relative">
        {/* Avatar Circle */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 relative">
          {/* Simple User Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#0C61FE]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A4 4 0 019 16h6a4 4 0 
              013.879 1.804m-8.165-4.204A3 3 0 1112 
              9.001a3 3 0 01-1.286 2.495"
            />
          </svg>

          {/* Edit Pencil Icon (top-right) */}
          <div
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 
            w-5 h-5 bg-white rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-[#0C61FE]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 
                3.536M2.5 16.5l7.586-7.586a2 
                2 0 012.828 0l5.172 
                5.172a2 2 0 010 2.828L10.5 
                24.5H2.5v-8z"
              />
            </svg>
          </div>
        </div>

        {/* User info */}
        <h2 className="text-white text-xl font-semibold leading-tight">
          Carson
        </h2>
        <p className="text-white text-sm">carson@mobility.com</p>
      </div>

      {/* -- White Section: Menu Items -- */}
      <div className="bg-white px-6 py-8 flex-grow relative">
        <ul className="space-y-6 text-gray-800">
          <li className="font-medium">RIDE HISTORY</li>
          <li className="font-medium">PAYMENT</li>

          {/* Promocode with a notification bubble */}
          <li className="font-medium relative flex items-center gap-2">
            PROMOCODE
            <span
              className="inline-flex items-center justify-center 
              w-6 h-6 text-sm bg-white text-[#0C61FE] 
              border border-[#0C61FE] rounded-full shadow-sm"
            >
              1
            </span>
          </li>
          <li className="font-medium">SUPPORT</li>
        </ul>

        {/* Sign out link at the bottom */}
        <div className="absolute bottom-6">
          <button className="text-[#0C61FE] font-medium hover:underline">
            Sign out
          </button>
        </div>
      </div>

      {/* Optional: Right side map or content could go outside this 
          panel, if you want an overlay design. */}
    </div>
  );
};

/**
 * Responsive left-drawer style menu
 */
const Menu1 = () => {
  return (
    <div
      className="
      flex flex-col h-screen w-full      /* Default: full width on mobile */
      md:w-[320px] md:shadow-lg         /* On md+: fixed width and shadow */
      bg-white font-sans
    "
    >
      {/* -- Top Section (Blue) -- */}
      <div className="bg-[#0C61FE] p-6 pb-8 flex flex-col items-center relative">
        {/* Avatar Circle */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 relative">
          {/* User Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#0C61FE]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A4 4 0 0 1 9 
                16h6a4 4 0 0 1 3.879 
                1.804m-8.165-4.204A3 3 0 1 
                1 12 9.001a3 3 0 0 
                1-1.286 2.495"
            />
          </svg>

          {/* Pencil Icon */}
          <div
            className="
            absolute top-0 right-0 
            translate-x-1/2 -translate-y-1/2
            w-5 h-5 bg-white rounded-full 
            flex items-center justify-center
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-[#0C61FE]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M2.5 
                  16.5l7.586-7.586a2 2 0 012.828 
                  0l5.172 5.172a2 2 0 010 
                  2.828L10.5 24.5H2.5v-8z"
              />
            </svg>
          </div>
        </div>

        {/* User info */}
        <h2 className="text-white text-xl font-semibold leading-tight">
          Carson
        </h2>
        <p className="text-white text-sm">carson@mobility.com</p>
      </div>

      {/* -- Menu Items Section -- */}
      <div className="flex-grow px-6 py-8 relative">
        <ul className="space-y-6 text-gray-800">
          <li className="font-medium">RIDE HISTORY</li>
          <li className="font-medium">
            <Link
              to={`/bookinghistory`}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              BOOKING HISTORY
            </Link>
          </li>
          <li className="font-medium">PAYMENT</li>

          <li className="font-medium relative flex items-center gap-2">
            PROMOCODE
            <span
              className="
              inline-flex items-center 
              justify-center 
              w-6 h-6 text-sm 
              bg-white text-[#0C61FE] 
              border border-[#0C61FE] 
              rounded-full shadow-sm
            "
            >
              1
            </span>
          </li>

          <li className="font-medium">SUPPORT</li>
        </ul>

        {/* Sign Out at the Bottom */}
        <div className="absolute bottom-6">
          <button className="text-[#0C61FE] font-medium hover:underline">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu1;
