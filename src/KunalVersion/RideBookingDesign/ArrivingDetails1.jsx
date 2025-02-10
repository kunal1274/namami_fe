import React, { useState } from "react";
import {
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

/**
 * ArrivingVersion1
 *
 * Has two states:
 *  - Collapsed: Minimal bottom sheet (driver info + a handle)
 *  - Expanded: Full details (timeline, payment info, bigger card)
 */
export default function ArrivingVersion1() {
  // State to track whether details are expanded
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Toggles the bottom sheet between collapsed & expanded
   */
  const toggleDetails = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-500">[Map Placeholder]</span>
      </div>

      {/* TOP NAV + "Arriving" TITLE */}
      <div className="absolute top-6 left-4 flex items-center">
        {/* Close / X or Menu icon - for demonstration */}
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-100 mr-2">
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Arriving</h1>
      </div>

      {/* Possibly a "2 min" bubble near the passenger marker */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* Blue bubble */}
        <div className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full mb-1 shadow">
          2 min
        </div>
        {/* Dot representing user's location (just a sample) */}
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow"></div>
      </div>

      {/* CAR ICON - demonstration only */}
      <div className="absolute top-32 right-12 bg-white border border-gray-200 rounded-full w-10 h-10 shadow flex items-center justify-center text-gray-600">
        🚗
      </div>

      {/**
       * BOTTOM SHEET (Collapsible):
       * We'll position it absolutely at bottom, with a dynamic height depending on isExpanded.
       */}
      <div
        className={`
          absolute bottom-0 w-full bg-white shadow-2xl rounded-t-3xl
          transform transition-transform duration-300
          ${isExpanded ? "h-[60%] md:h-[70%]" : "h-[25%]"}
        `}
      >
        {/* DRAG / TAP HANDLE */}
        <div
          className="flex items-center justify-center pt-3 cursor-pointer"
          onClick={toggleDetails}
        >
          {/* Dashed or dotted handle */}
          <div className="w-12 h-1.5 rounded-full bg-gray-300 border-dashed border-2 border-gray-400"></div>
        </div>

        {/* CONTENT INSIDE THE SHEET */}
        {!isExpanded ? (
          <CollapsedView />
        ) : (
          <ExpandedView onClose={toggleDetails} />
        )}
      </div>
    </div>
  );
}

/**
 * Collapsed View
 * Minimal info (driver’s avatar, name, short vehicle info, contact button).
 * You can add phone/chat icons if you like.
 */
function CollapsedView() {
  return (
    <div className="px-4 mt-4 flex items-center space-x-3">
      {/* Driver Avatar */}
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="driver"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-gray-800 font-semibold text-lg">Patrick</p>
        <p className="text-sm text-gray-500">HS785K • Volkswagen Jetta</p>
      </div>

      {/* Possibly a "Contact" Button or Icons */}
      <div className="ml-auto flex items-center space-x-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
          Contact
        </button>
      </div>
    </div>
  );
}

/**
 * Expanded View
 * Shows timeline, addresses, payment method, big "Contact Driver" button, etc.
 */
function ExpandedView({ onClose }) {
  return (
    <div className="px-4 mt-4 flex flex-col h-full">
      {/* Driver Info Row */}
      <div className="flex items-center">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="https://i.pravatar.cc/300"
            alt="driver"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-3">
          <p className="text-lg font-semibold text-gray-800">Patrick</p>
          <p className="text-sm text-gray-500">HS785K • Volkswagen Jetta</p>
          <p className="text-xs text-gray-400">License: AABB-1122-XYZ</p>
        </div>

        {/* Close button at right (optional) */}
        <button
          onClick={onClose}
          className="ml-auto bg-white border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Timeline Box (Pickup & Dropoff) */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 flex flex-col space-y-3 shadow-sm">
        {/* Pick up line */}
        <div className="flex items-start space-x-3">
          <div className="w-10 text-right text-sm text-gray-500">11:24</div>
          <div className="text-blue-600 mt-1">●</div>
          <div className="flex-1 text-gray-700 leading-tight">
            1, Thrale Street, London, SE19HW, UK
          </div>
        </div>
        {/* Separator line */}
        <div className="flex ml-[2.6rem]">
          <div className="border-l-2 border-gray-300 h-4 ml-[2px]" />
        </div>
        {/* Dropoff line */}
        <div className="flex items-start space-x-3">
          <div className="w-10 text-right text-sm text-gray-500">11:38</div>
          <div className="text-blue-600 mt-1">▼</div>
          <div className="flex-1 text-gray-700 leading-tight">
            Ealing Broadway Shopping Centre, London, W55JY, UK
          </div>
        </div>
      </div>

      {/* Payment Method Example */}
      <div className="mt-4 bg-gray-50 rounded-xl p-4 flex items-center shadow-sm">
        {/* Example: MasterCard Icon + Last 4 digits */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-2xl text-red-500">💳</span>
        </div>
        <p className="text-gray-700 font-medium text-sm">**** 8295</p>
      </div>

      {/* Big "Contact driver" button */}
      <div className="mt-auto mb-4 flex items-center space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-700">
          Contact driver
        </button>

        {/* Possibly a cancel or close button */}
        <button
          onClick={onClose}
          className="bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
