import React from "react";

export function PaymentProcessing() {
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Map placeholder */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-sm text-gray-500">Map placeholder</span>
      </div>

      {/* Bottom card */}
      <div
        className="
          absolute bottom-0 w-full 
          bg-white rounded-t-3xl shadow-2xl
          px-4 py-6 flex flex-col items-center
        "
      >
        {/* Spinner */}
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-sm text-gray-700 font-medium">
          Retrying payment. <br />
          It may take a few seconds...
        </p>
      </div>
    </div>
  );
}
