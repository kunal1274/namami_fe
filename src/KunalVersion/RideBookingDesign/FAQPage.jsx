import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function FaqPage() {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">FAQ’s</h1>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6 mt-2 pb-6">
        {/* Account section */}
        <div>
          <h2 className="text-gray-700 font-bold mb-2">Account</h2>
          <div className="space-y-2">
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">Unblock account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">Change phone number</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">Privacy information</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Payment and pricing section */}
        <div>
          <h2 className="text-gray-700 font-bold mb-2">Payment and pricing</h2>
          <div className="space-y-2">
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">
                Accepted payment methods
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">Price estimation</span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">
                Ride cancellation fee
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">
                Damage or cleaning fee
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <hr />
            <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 py-2">
              <span className="text-sm text-gray-600">
                Price higher than expected
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
