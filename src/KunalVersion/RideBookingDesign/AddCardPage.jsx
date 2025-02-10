import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function AddCardPage() {
  // State for partial card details
  const [cardNumber, setCardNumber] = useState("4950 45XX XXXX XXXX");
  const [expiry, setExpiry] = useState("01/23");
  const [cvv, setCvv] = useState("XXX");
  const [cardholderName, setCardholderName] = useState("JEFF STOCKWELL");

  // Handler to go to scanning interface
  const handleScanClick = () => {
    alert("Go to scanning screen... (or navigate)");
  };

  // Handler for done
  const handleDone = () => {
    alert("Card data submitted!");
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-6 w-full flex items-center justify-between px-4">
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200">
          <Bars3Icon className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Add card</h1>
        <div style={{ width: "40px" }}></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-16 px-4 pb-24">
        {/* Card Preview */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 text-white w-full max-w-sm">
          {/* Logo top-right (placeholder for MasterCard) */}
          <div className="flex justify-end mb-3">
            <div className="bg-transparent text-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                fill="none"
                className="h-8 w-8"
              >
                <circle cx="12" cy="18" r="8" fill="#FF5F00" />
                <circle cx="24" cy="18" r="8" fill="#EB001B" />
                <circle
                  cx="18"
                  cy="18"
                  r="8"
                  fill="#F79E1B"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
          </div>

          {/* Card fields */}
          <div className="mb-4 text-xs uppercase text-gray-400">
            Card Number
          </div>
          <div className="text-lg font-semibold tracking-wide text-gray-200">
            {cardNumber}
          </div>

          <div className="mt-3 flex justify-between text-sm text-gray-300">
            <div>
              <div className="uppercase text-gray-400 text-xs">Month/Year</div>
              <div>{expiry}</div>
            </div>
            <div>
              <div className="uppercase text-gray-400 text-xs">CVV</div>
              <div>{cvv}</div>
            </div>
          </div>

          <div className="mt-4 text-base font-bold text-white">
            {cardholderName}
          </div>
        </div>

        {/* Inputs + Keyboard placeholders */}
        <div className="mb-4 flex items-center justify-between">
          {/* “Scan” button on left, “Done” on right */}
          <button
            onClick={handleScanClick}
            className="text-gray-600 flex items-center space-x-1"
          >
            {/* Icon (camera) can be anything */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l1-2h3l1 2h8l1-2h3l1 2M5 8h14v13H5V8z"
              />
            </svg>
            <span>Scan</span>
          </button>

          <button onClick={handleDone} className="text-blue-600 font-semibold">
            Done
          </button>
        </div>

        {/* Some kind of input fields (just placeholders) */}
        <div className="mb-2">
          <label className="block text-sm text-gray-700">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1 focus:outline-none"
          />
        </div>

        <div className="flex space-x-2 mb-2">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Month/Year</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-sm text-gray-700">Cardholder Name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1 focus:outline-none"
          />
        </div>

        <p className="text-sm text-gray-500 mt-6">
          All your details are securely stored and encrypted.
        </p>
      </div>
    </div>
  );
}
