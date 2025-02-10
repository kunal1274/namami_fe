import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function SupportRequestCompact() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Submitted message: " + message);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button className="p-2 bg-white rounded-full shadow mr-2">
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Tell more</h1>
      </div>

      {/* Content */}
      <div className="px-4 mt-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">I left an item</h2>
        <p className="text-sm text-gray-600 leading-6">
          If you've lost an item you will need to send us a message immediately,
          please remember to provide as many details as possible about your lost
          item and the ride you took. If we find it, we’ll connect you with the
          driver directly to get it back.
        </p>

        {/* Text area */}
        <label className="block text-sm font-semibold text-gray-700">
          TELL US
        </label>
        <textarea
          rows={4}
          placeholder="Your message here..."
          className="
            w-full border border-gray-300 
            rounded-xl p-3 text-sm focus:outline-none
          "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="
            mt-4 w-full bg-blue-600 text-white 
            py-3 rounded-full text-sm font-semibold 
            hover:bg-blue-700
          "
        >
          Submit
        </button>
      </div>
    </div>
  );
}
