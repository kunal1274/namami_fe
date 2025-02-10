import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function AddPromoCode() {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    alert(`Promocode: ${code}`);
  };

  return (
    <div className="w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Add promocode</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center mt-16 px-4">
        {/* Large code display */}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="PROMO2023"
          className="
            text-blue-600 text-3xl font-bold tracking-wider 
            text-center w-full focus:outline-none mb-4 
            border-b border-gray-300
          "
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="
            bg-blue-600 text-white px-8 py-3 
            rounded-full text-sm font-semibold 
            hover:bg-blue-700
          "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
