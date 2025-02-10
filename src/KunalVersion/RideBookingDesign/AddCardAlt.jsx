import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");

  // For toggling the small “Scan card / Add face ID” menu
  const [showActions, setShowActions] = useState(true);

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Add card</h1>
      </div>

      <div className="px-4 mt-2 space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            CARD NUMBER
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="
              w-full rounded-lg bg-gray-100 
              border border-gray-200 
              p-3 text-sm focus:outline-none
            "
          />
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            CARD HOLDER NAME
          </label>
          <input
            type="text"
            placeholder="Full Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="
              w-full rounded-lg bg-gray-100 
              border border-gray-200 
              p-3 text-sm focus:outline-none
            "
          />
        </div>

        {/* Exp Date */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              EXP. DATE
            </label>
            <input
              type="text"
              placeholder="MM"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              className="
                w-full rounded-lg bg-gray-100 
                border border-gray-200 
                p-3 text-sm focus:outline-none
              "
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-600 mb-1 invisible">
              YEAR
            </label>
            <input
              type="text"
              placeholder="YY"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              className="
                w-full rounded-lg bg-gray-100 
                border border-gray-200 
                p-3 text-sm focus:outline-none
              "
            />
          </div>
        </div>
      </div>

      {/* Action sheet (Scan card / Add face ID) */}
      {showActions && (
        <div className="px-4 mt-6">
          <div
            className="
            bg-white rounded-xl shadow-md 
            border border-gray-200
          "
          >
            <button
              className="
                w-full text-left px-4 py-3 
                flex items-center space-x-2 
                hover:bg-gray-50
              "
            >
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
                  d="M3 5h2l2-2h6l2 2h2m-3 0h3v14H5V5h3m4 9v.01m0-4v.01"
                />
              </svg>
              <span className="text-gray-700 text-sm">Scan card</span>
            </button>
            <hr />
            <button
              className="
                w-full text-left px-4 py-3 
                flex items-center space-x-2
                hover:bg-gray-50
              "
            >
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
                  d="M5 3c1.667.333 3.333.667 5 2 1.5 1.167 1.167 3.333 
                     0 4-1.333.667-3.333.667-4.667 0C3 8.333 3 7 3 5.5c0-1.5 
                     1-3 2-2.5zM12 20c-2.667-2.667-3.333-5.333-2-8
                     2-1.5 4-1.167 5 0 .667 1.333.667 3.333 0 4.667
                     -.667 1.333-2 1.333-3 0z"
                />
              </svg>
              <span className="text-gray-700 text-sm">Add face ID</span>
            </button>
          </div>
        </div>
      )}

      {/* Keyboard placeholder at bottom if needed... */}
    </div>
  );
}
