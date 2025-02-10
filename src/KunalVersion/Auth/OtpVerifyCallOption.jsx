import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function OtpVerifyCallOption() {
  const handleCall = () => {
    alert("Request phone call...");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
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

        {/* 4 placeholders */}
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"></span>
          <span className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"></span>
          <span className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"></span>
          <span className="text-blue-600 text-3xl font-bold border-b border-gray-200 px-2"></span>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          The SMS with the code didn’t arrive?
        </p>

        <button
          onClick={handleCall}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700"
        >
          Press here to get a call
        </button>

        {/* Keypad mock omitted for brevity */}
      </div>
    </div>
  );
}
