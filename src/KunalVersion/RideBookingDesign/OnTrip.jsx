import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function OnTripPage() {
  // controls whether the bottom sheet is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600">[Map Placeholder]</span>
      </div>

      {/* TOP BAR: Menu + Centered Title */}
      <div className="absolute top-6 w-full flex items-center justify-between px-4">
        {/* Left: Hamburger or close button */}
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200">
          {/* Just an example icon: replace as needed */}
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

        {/* Center: “On Trip” */}
        <h1 className="text-xl font-bold text-gray-800">On Trip</h1>

        {/* Right: could be an empty placeholder to balance, or some icon */}
        <div style={{ width: "40px" }}></div>
      </div>

      {/* The route line & car images (optional placeholders) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* For demonstration, a route line or car icons could be absolutely placed. */}
      </div>

      {/* BOTTOM SHEET */}
      <div
        className={`
          absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl
          transform transition-transform duration-300
          ${isExpanded ? "h-[60%] md:h-[70%]" : "h-[25%]"}
        `}
      >
        {/* DRAG HANDLE */}
        <div
          className="flex items-center justify-center pt-2 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="w-12 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* CONTENT */}
        {isExpanded ? <ExpandedView /> : <CollapsedView />}
      </div>

      {/* The half avatar overlapping the bottom sheet + map */}
      <div
        className="
          absolute left-4 bottom-[25%]   /* same as collapsed bottom-sheet height */
          transform translate-y-[-50%]  /* shift up half the avatar’s height */
          w-16 h-16
          rounded-full overflow-hidden
          shadow-lg
          border-2 border-white
        "
      >
        <img
          src="https://i.pravatar.cc/300?img=16"
          alt="driver avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------
   COLLAPSED VIEW
---------------------------------------------- */
function CollapsedView() {
  return (
    <div className="px-4 pt-4 flex flex-col h-full">
      {/* Next to the half avatar, we can show just a small area: name + vehicle */}
      <div className="mt-8 flex items-center justify-between">
        {/* Driver info text (since avatar is half-floating) */}
        <div className="ml-20">
          <p className="text-base font-semibold text-gray-800">Patrick</p>
          <p className="text-sm text-gray-500">HS785K • Volkswagen Jetta</p>
        </div>

        {/* Possibly a close or X button */}
        <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Actions Row (Rate, Tips, etc.) */}
      <div className="mt-auto mb-4 flex justify-around">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">
          Rate
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100">
          Tips
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------
   EXPANDED VIEW
---------------------------------------------- */
function ExpandedView() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* SCROLLABLE content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {/* Additional info about the trip, maybe timeline or driver details */}
        <div className="mt-8 ml-20">
          <p className="text-lg font-semibold text-gray-800">Patrick</p>
          <p className="text-sm text-gray-500">HS785K • Volkswagen Jetta</p>
          <p className="text-xs text-gray-400">License: AABB-1122-XYZ</p>
        </div>

        {/* Some placeholder for more trip details */}
        <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-sm">
          <p className="text-gray-700 text-sm">
            Journey in progress. Expected arrival in ~15 minutes. Speed ~45 mph.
            Stopping by one short break if needed.
          </p>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded-xl shadow-sm">
          <p className="text-gray-700 text-sm mb-2">Payment Method:</p>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">💳</span>
            </div>
            <p className="text-gray-700 font-medium text-sm">**** 8295</p>
          </div>
        </div>
      </div>

      {/* ACTIONS at bottom */}
      <div className="px-4 py-4 flex justify-around">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">
          Rate
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100">
          Tips
        </button>
      </div>
    </div>
  );
}
