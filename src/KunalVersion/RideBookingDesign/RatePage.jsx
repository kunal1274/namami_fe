import React, { useState } from "react";
import { StarIcon, Bars3Icon } from "@heroicons/react/24/outline";

/**
 * RatePage
 *
 * A page to let the customer rate the driver (5-star system),
 * leave a message, and tap a "Rate" button.
 */
export default function RatePage() {
  // Example star rating (1 to 5)
  const [rating, setRating] = useState(4); // default 4 out of 5
  // Example message input
  const [message, setMessage] = useState("");

  // Helper to set star rating on click
  const handleStarClick = (value) => {
    setRating(value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Filled if i <= rating, else outline or grey
      const isFilled = i <= rating;
      stars.push(
        <StarIcon
          key={i}
          onClick={() => handleStarClick(i)}
          className={`h-7 w-7 cursor-pointer ${
            isFilled ? "text-blue-600" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  // For demonstration, pick a label based on rating
  const ratingLabel = {
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Excellent",
    5: "Superb",
  }[rating];

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* MAP PLACEHOLDER */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600">[Map Placeholder]</span>
      </div>

      {/* TOP BAR */}
      <div className="absolute top-6 w-full flex items-center justify-between px-4">
        <button className="p-2 bg-white rounded-full shadow text-gray-700 hover:bg-gray-200">
          <Bars3Icon className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Send Feedback</h1>
        {/* Invisible spacer to keep title centered */}
        <div style={{ width: "40px" }}></div>
      </div>

      {/* BOTTOM CARD */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl px-4 pb-6 pt-2">
        {/* Handle */}
        <div className="flex items-center justify-center mt-2 mb-3">
          <div className="w-12 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Driver Row */}
        <div className="flex items-center mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="driver"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-800 text-base font-semibold">Patrick</p>
            {/* Could show other info if needed */}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">{renderStars()}</div>
          <p className="text-gray-600 text-sm mt-2">{ratingLabel || ""}</p>
        </div>

        {/* Text Area */}
        <div className="mt-4">
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Rate Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-700">
          Rate
        </button>
      </div>
    </div>
  );
}
