import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function ScanCardPage() {
  const handleClose = () => {
    alert("Close scanning or go back...");
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Possibly the camera feed goes behind. We'll do a dummy background. */}
      <div
        className="
          absolute inset-0
          bg-[url('https://source.unsplash.com/daily')] bg-cover bg-center 
          opacity-50
        "
      ></div>

      {/* Top bar with close icon */}
      <div className="absolute top-6 left-4 flex items-center">
        <button
          onClick={handleClose}
          className="p-2 bg-black bg-opacity-30 rounded-full text-white hover:bg-opacity-50"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Card overlay box with corners */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* A container with rounded corners to mimic scanning frame */}
        <div
          className="
            relative w-72 h-44 
            bg-gray-800 bg-opacity-80 
            rounded-lg flex flex-col 
            text-white p-4
          "
        >
          {/* Corner highlights (white lines) - top-left, top-right, bottom-left, bottom-right */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-white"></div>

          <span className="text-xs uppercase text-gray-400">Card Number</span>
          <span className="text-sm font-semibold mt-1">
            4950 45XX XXXX XXXX
          </span>

          <div className="flex justify-between mt-2 text-xs">
            <div>
              <p className="text-gray-400 uppercase">Month/Year</p>
              <p>01/23</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase">CVV</p>
              <p>XXX</p>
            </div>
          </div>

          <p className="mt-auto text-sm font-bold">JEFF STOCKWELL</p>

          {/* Card brand icon top-right */}
          <div className="absolute top-2 right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              fill="none"
              className="h-6 w-6"
            >
              <circle cx="12" cy="18" r="8" fill="#FF5F00" />
              <circle cx="24" cy="18" r="8" fill="#EB001B" />
              <circle cx="18" cy="18" r="8" fill="#F79E1B" fillOpacity="0.7" />
            </svg>
          </div>
        </div>

        {/* Instruction text at the bottom */}
        <p className="text-white mt-8 px-4 text-center">
          Hold the card inside the frame. It will be scanned automatically
        </p>
      </div>
    </div>
  );
}
