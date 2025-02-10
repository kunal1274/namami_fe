import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function SupportRequestDetailed() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [hurt, setHurt] = useState("yes"); // 'yes' or 'no'
  const [accidentDetails, setAccidentDetails] = useState("");
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = () => {
    alert(
      `Submitted details:\nDate: ${date}\nTime: ${time}\nPlace: ${place}\nHurt? ${hurt}\nDetails: ${accidentDetails}`
    );
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
      <div className="px-4 mt-4 space-y-4 pb-6 overflow-auto">
        <h2 className="text-lg font-semibold text-gray-800">
          I was involved in an accident
        </h2>
        <p className="text-sm text-gray-600 leading-6">
          If you've lost an item you will need to send us an message
          immediately, please remember to provide as many details as possible
          about your lost item and the ride you took. If we find it we’ll
          connect you with the driver directly to get it back.
        </p>

        {/* Date/Time/Place */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              DATE
            </label>
            <input
              type="text"
              placeholder="DD/MM"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full border border-gray-300 
                rounded-lg p-2 text-sm focus:outline-none
              "
            />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              TIME
            </label>
            <input
              type="text"
              placeholder="HH:MM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="
                w-full border border-gray-300 
                rounded-lg p-2 text-sm focus:outline-none
              "
            />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PLACE
            </label>
            <input
              type="text"
              placeholder="Location"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="
                w-full border border-gray-300 
                rounded-lg p-2 text-sm focus:outline-none
              "
            />
          </div>
        </div>

        {/* Hurt? (Yes/No) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            HAVE YOU BEEN HURT?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="hurt"
                value="yes"
                checked={hurt === "yes"}
                onChange={(e) => setHurt(e.target.value)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="hurt"
                value="no"
                checked={hurt === "no"}
                onChange={(e) => setHurt(e.target.value)}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Additional details */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            HAVE THE ACCIDENT OCCURRED
          </label>
          <input
            type="text"
            placeholder="Describe or type location"
            value={accidentDetails}
            onChange={(e) => setAccidentDetails(e.target.value)}
            className="
              w-full border border-gray-300 
              rounded-lg p-2 text-sm focus:outline-none
            "
          />
        </div>

        {/* Photo upload */}
        <div className="mt-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload photo
          </label>
          <div
            className="
              w-full h-40 border-2 border-dashed 
              border-gray-300 rounded-lg flex 
              items-center justify-center
            "
          >
            {!photo && (
              <label className="flex flex-col items-center text-gray-400 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 11.001 7.292A4 4 
                       0 0112 4.354zM16.243 14.343a2 2 
                       0 10-2.828 2.828 2 2 0 002.828-2.828z"
                  />
                </svg>
                <span className="text-sm">Tap to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
            {photo && <p className="text-gray-700 text-sm">{photo.name}</p>}
          </div>
        </div>

        {/* Submit */}
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
