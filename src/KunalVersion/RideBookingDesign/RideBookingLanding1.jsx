import React from "react";
// Example icons from Heroicons. Replace with your own if desired.
import {
  ArrowLeftIcon,
  MapPinIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function RideBookingLanding() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER with map background */}
      <header className="relative bg-gray-200 h-48 sm:h-64 md:h-72 lg:h-80">
        {/* Placeholder map background. You could embed a real map or an image here. */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm md:text-base">
            (Map Placeholder)
          </span>
        </div>
        {/* Top navigation (back button + title) */}
        <div className="relative z-10 flex items-center px-4 py-3">
          <button className="p-1 rounded-full bg-white shadow mr-2">
            <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">
            Select address
          </h1>
        </div>
      </header>

      {/* MAIN content area */}
      <main className="flex-1 -mt-8 md:-mt-12 lg:-mt-16 relative">
        <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          {/* White card overlay */}
          <div className="bg-white rounded-lg shadow px-4 py-4 md:px-6 md:py-6">
            {/* Address input fields */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pickup Address
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="24, Ocean avenue"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Drop Address
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Kings Cross, etc..."
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Show on a map link */}
            <div className="mb-4">
              <button className="text-sm text-blue-600 flex items-center gap-1 font-medium">
                <MapPinIcon className="h-4 w-4" />
                Show on a map
              </button>
            </div>

            {/* TIME / DATE / DURATION (with icons) */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
              <div className="mt-2 mb-2 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Scheduled Start Date Time
                  <input
                    type="datetime-local"
                    //value={start}
                    //onChange={(e) => setStart(e.target.value)}
                    className="ml-2 border p-1 rounded"
                  />
                </span>
              </div>
              {/* Example quick durations */}
              <div className="flex flex-wrap gap-2">
                {["4 hrs", "8 hrs", "12 hrs", "1 day", "3 days", "1 week"].map(
                  (duration) => (
                    <button
                      key={duration}
                      className="px-3 py-1 text-xs bg-white rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      {duration}
                    </button>
                  )
                )}
              </div>
              {/* Potential End Date Time */}
              <div className="mt-3 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  End Date Time (optional)
                  <input
                    type="datetime-local"
                    //value={start}
                    //onChange={(e) => setStart(e.target.value)}
                    className="ml-2 border p-1 rounded"
                  />
                </span>
              </div>
            </section>

            {/* Car type selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Type
              </h2>
              {/* Scrollable or wrap with icons */}
              <div className="flex flex-wrap gap-3">
                {/* Each 'car type' card */}
                {[
                  { name: "Compact", icon: "(C)" },
                  { name: "Sedan", icon: "(S)" },
                  { name: "Luxury", icon: "(L)" },
                  { name: "Electric", icon: "(E)" },
                  { name: "SUV", icon: "(SUV)" },
                  { name: "Van", icon: "(V)" },
                ].map((car) => (
                  <div
                    key={car.name}
                    className="flex flex-col items-center text-center w-16"
                  >
                    <div className="bg-white border border-gray-300 rounded-md p-2 w-full flex items-center justify-center text-gray-700">
                      {/* Car icon placeholder */}
                      <span className="text-xs">{car.icon}</span>
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {car.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Transmission */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Transmission
              </h2>
              <div className="flex gap-3">
                <button className="flex-1 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Automatic
                </button>
                <button className="flex-1 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Manual
                </button>
              </div>
            </section>

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm">
                Estimate
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm">
                Book
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm">
                Schedule
              </button>
            </div>
            <div className="flex justify-center mt-3">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-md shadow-sm">
                Negotiate
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
