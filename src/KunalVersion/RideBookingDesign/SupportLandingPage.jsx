import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function SupportLanding() {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Blue top area */}
      <div className="relative w-full bg-blue-600 h-48 flex items-center px-4">
        {/* Back arrow + Title */}
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-white text-2xl font-bold">Support</h1>
      </div>

      {/* White Card: options */}
      <div
        className="
          relative -mt-8 mx-4 p-4 
          bg-white rounded-xl shadow-lg
          flex flex-col space-y-3
        "
      >
        <button className="flex items-center justify-between py-2 hover:bg-gray-50">
          <span className="text-gray-700 text-sm font-medium">
            Frequently asked questions
          </span>
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
        <button className="flex items-center justify-between py-2 hover:bg-gray-50">
          <span className="text-gray-700 text-sm font-medium">
            Your support tickets
          </span>
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
        <button className="flex items-center justify-between py-2 hover:bg-gray-50">
          <span className="text-gray-700 text-sm font-medium">Contact us</span>
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

      {/* 3 Options at bottom (Option1, Option2, Option3) */}
      <div className="mt-6 flex items-center justify-around px-4">
        {/* Option 1 */}
        <div className="bg-white rounded-xl shadow p-4 w-24 flex flex-col items-center">
          {/* Icon placeholder */}
          <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
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
                d="M5.121 17.804A4 4 0 019 
                   16h6a4 4 0 013.879 1.804M9 
                   16v-1a3 3 0 116 0v1m-6 
                   0h6"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-700 font-medium">Option 1</p>
        </div>

        {/* Option 2 */}
        <div className="bg-white rounded-xl shadow p-4 w-24 flex flex-col items-center">
          <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4h12v12H4z" />
            </svg>
          </div>
          <p className="text-sm text-gray-700 font-medium">Option 2</p>
        </div>

        {/* Option 3 */}
        <div className="bg-white rounded-xl shadow p-4 w-24 flex flex-col items-center">
          <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
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
                d="M3 7h18M3 
                   7l5.879 5.879c.78.78 
                   2.047.78 
                   2.828 0L19 7M5 
                   21h14a2 2 0 
                   002-2v-5H3v5a2 
                   2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-700 font-medium">Option 3</p>
        </div>
      </div>
    </div>
  );
}
