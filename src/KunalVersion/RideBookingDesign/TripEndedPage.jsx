import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

// Trip Ended Page
export function TripEndedPage() {
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Top bar: menu + spacing */}
      <div className="absolute top-6 left-4 flex items-center">
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200 mr-3">
          <Bars3Icon className="h-5 w-5" />
        </button>
      </div>

      {/* We can center the main card vertically with flex */}
      <div className="flex flex-col items-center justify-center h-full px-4">
        {/* White Card with shadow & some spacing */}
        <div
          className="
          bg-white w-full max-w-md rounded-xl shadow-lg
          p-6 relative
        "
        >
          {/* Large Checkmark Circle */}
          <div className="flex justify-center mb-4">
            <div
              className="
              w-16 h-16 rounded-full border border-gray-200 
              flex items-center justify-center
            "
            >
              {/* A checkmark or use an icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Your trip has ended
          </h2>

          {/* Timeline Box */}
          <div
            className="
            mb-4 border border-gray-200 rounded-xl p-4
            text-sm text-gray-700
          "
          >
            {/* FROM */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 text-right text-gray-500">11:24</div>
              <div className="text-blue-600 mt-1">●</div>
              <div className="flex-1">1, Thrale Street, London, SE19HW, UK</div>
            </div>
            {/* Vertical line */}
            <div className="flex ml-[3.2rem] mb-4">
              <div className="border-l-2 border-gray-300 flex-1 ml-1"></div>
            </div>
            {/* TO */}
            <div className="flex items-start space-x-3">
              <div className="w-12 text-right text-gray-500">11:38</div>
              <div className="text-blue-600 mt-1">▼</div>
              <div className="flex-1">
                Ealing Broadway Shopping Centre, London, W55JY
              </div>
            </div>
          </div>

          {/* Payment row */}
          <div
            className="
            flex items-center justify-between
            bg-gray-50 rounded-xl p-4 border border-gray-100
          "
          >
            {/* Card info */}
            <div className="flex items-center space-x-2">
              <span className="text-xl">💳</span>
              <p className="text-gray-700 text-sm font-medium">**** 8295</p>
            </div>
            {/* Price */}
            <p className="text-gray-700 font-semibold">
              $<span className="text-lg">7</span>
              <sup className="align-super text-xs">63</sup>
            </p>
          </div>

          {/* Zigzag "receipt" effect at the bottom */}
          <div
            className="
            absolute bottom-0 left-0 w-full h-4 
            bg-white
            [clip-path:polygon(0%_100%,3%_0%,6%_100%,9%_0%,12%_100%,15%_0%,18%_100%,21%_0%,24%_100%,27%_0%,30%_100%,33%_0%,36%_100%,39%_0%,42%_100%,45%_0%,48%_100%,51%_0%,54%_100%,57%_0%,60%_100%,63%_0%,66%_100%,69%_0%,72%_100%,75%_0%,78%_100%,81%_0%,84%_100%,87%_0%,90%_100%,93%_0%,96%_100%,99%_0%,100%_100%)]
          "
          ></div>
        </div>

        {/* OK button at bottom */}
        <button
          className="
          mt-6 bg-blue-600 text-white px-8 py-3 
          rounded-full text-sm font-semibold 
          hover:bg-blue-700
        "
        >
          Ok
        </button>
      </div>
    </div>
  );
}
