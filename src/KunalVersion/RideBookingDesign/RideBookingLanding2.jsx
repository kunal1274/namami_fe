import React, { useState } from "react";
// Importing icons for better design
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  LockClosedIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function RideBookingLanding() {
  const [activeTab, setActiveTab] = useState("Driver Booking");
  const [driverBookingType, setDriverBookingType] = useState("One-way");
  const [emergencyReasons, setEmergencyReasons] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEmergencyCheckbox = (reason) => {
    if (emergencyReasons.includes(reason)) {
      setEmergencyReasons(emergencyReasons.filter((item) => item !== reason));
    } else {
      setEmergencyReasons([...emergencyReasons, reason]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER with map background */}
      <header className="relative bg-gray-200 h-48 sm:h-64 md:h-72 lg:h-80">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm md:text-base">
            (Map Placeholder)
          </span>
        </div>
        {/* Top navigation with back button */}
        <div className="relative z-10 flex items-center px-4 py-3">
          <button className="p-1 rounded-full bg-white shadow mr-2">
            <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-700">
            Select Address
          </h1>
        </div>
      </header>

      {/* TABS for Booking Type */}
      <div className="flex justify-center space-x-4 my-6">
        {["Driver Booking", "Cab Booking"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-2 rounded-md text-sm font-semibold shadow-sm ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN Content Area */}
      <main className="flex-1 -mt-8 md:-mt-12 lg:-mt-16 relative">
        <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg px-6 py-6 md:px-8 md:py-8">
            {/* EMERGENCY CHECKBOX SECTION */}
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Is this Booking for an Emergency?
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Hospital",
                  "Airport",
                  "Marriage",
                  "Accident",
                  "School",
                  "Urgent",
                ].map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2 cursor-pointer border px-3 py-2 rounded-md ${
                      emergencyReasons.includes(reason)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={emergencyReasons.includes(reason)}
                      onChange={() => handleEmergencyCheckbox(reason)}
                    />
                    <CheckIcon className="w-5 h-5" />
                    {reason}
                  </label>
                ))}
              </div>
            </section>

            {/* Customer Dropdown */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Select Customer
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <select className="w-full focus:outline-none text-sm">
                  <option>Select Customer</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Alex Johnson</option>
                </select>
              </div>
            </div>

            {/* Disabled Item Number */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Item Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 bg-gray-100">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value="DDS4"
                  disabled
                  className="w-full text-sm bg-gray-100 focus:outline-none"
                />
              </div>
            </div>

            {/* DRIVER BOOKING OPTIONS */}
            {activeTab === "Driver Booking" && (
              <section className="mb-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Booking Type
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["One-way", "Two-way", "Outside City"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDriverBookingType(type)}
                      className={`px-4 py-2 border border-gray-300 rounded-md ${
                        driverBookingType === type
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Address Fields */}
            <div className="space-y-3 mb-4">
              <label className="block text-sm text-gray-600">
                Pickup Address
              </label>
              <input
                type="text"
                placeholder="24, Ocean avenue"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-3 mb-4">
              <label className="block text-sm text-gray-600">
                Drop Address (Optional)
              </label>
              <input
                type="text"
                placeholder="Kings Cross, etc..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-600">
                Estimate
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-700">
                Book
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-600">
                Schedule
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-indigo-500 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-indigo-600">
                Negotiate
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
