import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function TipsPage() {
  // We store the selected tip (as a percent number)
  const [selectedTip, setSelectedTip] = useState(0);

  const tipOptions = [0, 5, 10, 20];

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600">[Map Placeholder]</span>
      </div>

      {/* TOP BAR */}
      <div className="absolute top-6 w-full flex items-center justify-between px-4">
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200">
          <Bars3Icon className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Tips Amount</h1>
        <div style={{ width: "40px" }}></div>
      </div>

      {/* BOTTOM CARD */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl px-4 pb-6 pt-2">
        {/* Handle */}
        <div className="flex items-center justify-center mt-2 mb-3">
          <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Driver Row */}
        <div className="flex items-center mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="driver"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-800 text-base font-semibold">Patrick</p>
          </div>
        </div>

        {/* Tip Selection */}
        <div className="flex space-x-3 mb-4">
          {tipOptions.map((tip) => (
            <button
              key={tip}
              onClick={() => setSelectedTip(tip)}
              className={`
                flex-1 py-2 rounded-full text-sm font-semibold 
                ${
                  selectedTip === tip
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {tip}%
            </button>
          ))}
        </div>

        {/* Tipping Info */}
        <p className="text-gray-500 text-sm">
          Tipping is welcome, but not required.
          <br />
          The amount is always up to you.
        </p>

        {/* Submit Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}
