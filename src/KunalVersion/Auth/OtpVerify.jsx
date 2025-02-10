import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function OtpVerify() {
  // Suppose we store typed digits in an array or string
  const [digits, setDigits] = useState(["3", "8", "4", "9"]); // Example

  const handleKeypadClick = (num) => {
    // Add logic to handle numeric inputs
    console.log("Clicked num:", num);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Verify code</h1>
        <p className="text-sm text-gray-500 mb-6">
          A code has been sent to +33 234 556 7888 via SMS
        </p>

        {/* Show typed digits */}
        <div className="flex items-center space-x-4 mb-2">
          {digits.map((d, idx) => (
            <span
              key={idx}
              className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"
            >
              {d}
            </span>
          ))}
        </div>
        {/* Resend code link */}
        <button className="text-blue-600 text-sm font-semibold mt-2">
          Resend code
        </button>

        {/* Numeric Keypad mock */}
        <div className="mt-6 grid grid-cols-3 gap-6">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "✓", "0", "⌫"].map(
            (num) => (
              <button
                key={num}
                onClick={() => handleKeypadClick(num)}
                className="
                  w-12 h-12 flex items-center justify-center
                  text-xl text-gray-700 bg-white
                  rounded-full shadow
                "
              >
                {num}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
