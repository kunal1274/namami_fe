import React, { useState } from "react";
import {
  XMarkIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function ArrivingVersion2() {
  // Toggling the bottom sheet
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600">[Map Placeholder]</span>
      </div>

      {/* TOP ROW: X Icon and "Arriving" Title */}
      <div className="absolute top-6 left-4 flex items-center">
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200 mr-3">
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Arriving</h1>
      </div>

      {/* Possibly a "2 min" bubble + route indicator */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full shadow mb-1">
          2 min
        </div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
      {/* Car icon or marker, for demonstration */}
      <div className="absolute top-28 right-8 bg-white border border-gray-200 rounded-full w-10 h-10 shadow flex items-center justify-center text-gray-600">
        🚗
      </div>

      {/* BOTTOM SHEET */}
      <div
        className={`
          absolute bottom-0 w-full bg-white shadow-2xl rounded-t-3xl
          transform transition-transform duration-300
          ${isExpanded ? "h-[60%] md:h-[70%]" : "h-[35%]"}
        `}
      >
        {/* DRAG HANDLE / Tap area */}
        <div
          className="flex items-center justify-center pt-3 cursor-pointer"
          onClick={handleToggle}
        >
          {/* Dashed handle */}
          <div className="w-12 h-1.5 rounded-full bg-gray-300 border-dashed border-2 border-gray-400"></div>
        </div>

        {/* Conditional content */}
        {isExpanded ? (
          <ExpandedView onClose={handleToggle} />
        ) : (
          <CollapsedView />
        )}
      </div>
    </div>
  );
}

/* -----------------------------
   Collapsed View
------------------------------*/
function CollapsedView() {
  return (
    <div className="px-4 mt-4 h-full flex flex-col">
      {/* Driver Info Row */}
      <div className="flex items-center">
        <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="driver"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-lg font-semibold text-gray-800">Patrick</p>
          <p className="text-sm text-gray-400">HS785K • Volkswagen Jetta</p>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="mt-auto mb-4 flex items-center justify-around">
        {/* Phone */}
        <button className="flex flex-col items-center text-gray-700 hover:text-blue-600">
          <div className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
            <PhoneIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Call</span>
        </button>

        {/* Chat with badge */}
        <button className="relative flex flex-col items-center text-gray-700 hover:text-blue-600">
          <div className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
          </div>
          {/* Notification badge */}
          <span
            className="
              absolute top-0 right-3 inline-flex items-center justify-center 
              px-1 py-0.5 text-[10px] font-bold leading-none text-white 
              bg-blue-600 rounded-full
              transform translate-x-1/2 -translate-y-1/2
            "
          >
            2
          </span>
          <span className="text-xs mt-1">Chat</span>
        </button>

        {/* Cancel or close */}
        <button className="flex flex-col items-center text-gray-700 hover:text-blue-600">
          <div className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
            <XMarkIcon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">Cancel</span>
        </button>
      </div>
    </div>
  );
}

/* -----------------------------
   Expanded View
   With scrolling + properly aligned timeline
------------------------------*/
function ExpandedView({ onClose }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
        {/* Driver Row */}
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=13"
              alt="driver"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-lg font-semibold text-gray-800">Patrick</p>
            <p className="text-sm text-gray-400">HS785K • Volkswagen Jetta</p>
            <p className="text-xs text-gray-400">License: AABB-1122-XYZ</p>
          </div>

          {/* Optionally a close button on top right */}
          <button
            onClick={onClose}
            className="ml-auto bg-white border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline box */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-sm">
          {/* FROM -> TO with aligned vertical bar */}
          <div className="relative flex flex-col space-y-4">
            {/* From Row */}
            <div className="flex items-start">
              {/* Time */}
              <div className="w-14 text-sm text-gray-500 text-right pr-2">
                11:24
              </div>
              {/* Icon + Vertical line container */}
              <div className="flex flex-col items-center mr-3">
                <div className="text-blue-600">●</div>
                {/* Vertical line extends below the bullet */}
                <div className="flex-1 w-px bg-gray-300" />
              </div>
              {/* Address */}
              <div className="flex-1 text-gray-700 text-sm leading-snug">
                1, Thrale Street, London, SE19HW, UK
              </div>
            </div>

            {/* To Row */}
            <div className="flex items-start">
              <div className="w-14 text-sm text-gray-500 text-right pr-2">
                11:38
              </div>
              <div className="flex flex-col items-center mr-3">
                <div className="text-blue-600">▼</div>
              </div>
              <div className="flex-1 text-gray-700 text-sm leading-snug">
                Ealing Broadway Shopping Centre, London, W55JY, UK
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-4 bg-gray-50 rounded-xl p-4 shadow-sm flex items-center">
          {/* Some card brand icon */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-2xl">💳</span>
          </div>
          <p className="text-gray-700 font-medium text-sm">**** 8295</p>
        </div>
      </div>

      {/* Bottom Buttons Row */}
      <div className="px-4 py-4 flex items-center space-x-3">
        {/* Contact driver (full width) */}
        <button className="flex-1 bg-blue-600 text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-700">
          Contact driver
        </button>

        {/* Cancel / close */}
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
