import React from "react";

export function UnpaidOrder() {
  const handleRetryPayment = () => {
    alert("Retrying payment...");
  };

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
          px-4 py-6
        "
      >
        <h2 className="text-sm text-gray-800 font-medium mb-1">
          Sorry, you have an unpaid order. Order amount:
        </h2>
        <div className="text-3xl font-bold text-gray-800 mb-4">$12.63</div>

        <button
          onClick={handleRetryPayment}
          className="
            w-full bg-blue-600 text-white 
            py-3 rounded-full text-sm font-semibold
            hover:bg-blue-700
          "
        >
          Retry payment
        </button>
      </div>
    </div>
  );
}
