import React, { useState, useEffect } from "react";
// Importing icons for better design
import {
  ArrowLeftIcon,
  MapPinIcon,
  ChevronDownIcon,
  ClockIcon,
  UserIcon,
  LockClosedIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export const formatLocalDateTime = (date) => {
  const pad = (n) => (n < 10 ? "0" + n : n);

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
};

const getMinStartTime = () => {
  return formatLocalDateTime(new Date());
};

export default function RideBookingLanding() {
  const [activeRoleTab, setActiveRoleTab] = useState("Customer");
  const [activeTab, setActiveTab] = useState("Driver Booking");
  const [driverBookingType, setDriverBookingType] = useState("Daily");
  const [emergencyReasons, setEmergencyReasons] = useState([]);
  const [start, setStart] = useState(formatLocalDateTime(new Date()));
  const [end, setEnd] = useState("");
  const [timeSlot, setTimeSlot] = useState("4:00"); // Default time slot: 4 hours 0 minutes
  const [totalTime, setTotalTime] = useState({ hours: 4, minutes: 0 });
  const [isTimeSlotUsed, setIsTimeSlotUsed] = useState(true); // Flag to indicate if time slot was used

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRoleTabClick = (roleTab) => {
    setActiveRoleTab(roleTab);
  };

  const handleEmergencyCheckbox = (reason) => {
    if (emergencyReasons.includes(reason)) {
      setEmergencyReasons(emergencyReasons.filter((item) => item !== reason));
    } else {
      setEmergencyReasons([...emergencyReasons, reason]);
    }
  };

  /**
   * Parses a time slot string in "HH:MM" format into an object with hours and minutes.
   * @param {string} slot - Time slot string (e.g., "2:30" for 2 hours 30 minutes)
   * @returns {Object} - { hours: number, minutes: number }
   */
  const parseTimeSlot = (slot) => {
    const [hours, minutes] = slot.split(":").map(Number);
    return { hours: hours || 0, minutes: minutes || 0 };
  };

  /**
   * Calculates the end time by adding hours and minutes to the start time.
   * @param {string} startTime - Start time in 'YYYY-MM-DDTHH:mm' format
   * @param {string} slot - Time slot in "HH:MM" format
   * @returns {string} - End time in 'YYYY-MM-DDTHH:mm' format
   */
  const calculateEndTime = (startTime, slot) => {
    const { hours, minutes } = parseTimeSlot(slot);
    const startDate = new Date(startTime);
    startDate.setHours(startDate.getHours() + hours);
    startDate.setMinutes(startDate.getMinutes() + minutes);
    return formatLocalDateTime(startDate);
  };

  /**
   * Calculates the total duration between start and end times.
   * @param {string} startTime - Start time in 'YYYY-MM-DDTHH:mm' format
   * @param {string} endTime - End time in 'YYYY-MM-DDTHH:mm' format
   * @returns {Object} - { hours: number, minutes: number }
   */
  const calculateTotalTime = (startTime, endTime) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    let diffMs = endDate - startDate;
    if (diffMs < 0) diffMs = 0; // Prevent negative durations
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours: diffHours, minutes: diffMinutes };
  };

  // Initialize end time based on default time slot on component mount
  useEffect(() => {
    const initialEnd = calculateEndTime(start, timeSlot);
    setEnd(initialEnd);
    const { hours, minutes } = parseTimeSlot(timeSlot);
    setTotalTime({ hours, minutes });
  }, []); // Empty dependency array ensures this runs once on mount

  // Update end time and total duration when start time or time slot changes, if time slot is used
  useEffect(() => {
    if (isTimeSlotUsed) {
      const newEnd = calculateEndTime(start, timeSlot);
      setEnd(newEnd);
      const { hours, minutes } = parseTimeSlot(timeSlot);
      setTotalTime({ hours, minutes });
    }
  }, [start, timeSlot, isTimeSlotUsed]);

  /**
   * Handles changes to the start date and time.
   * @param {Object} e - Event object
   */
  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  /**
   * Handles changes to the time slot selection.
   * @param {Object} e - Event object
   */
  const handleTimeSlotChange = (e) => {
    setTimeSlot(e.target.value);
    setIsTimeSlotUsed(true); // Time slot is being used
  };

  /**
   * Handles changes to the end date and time.
   * @param {Object} e - Event object
   */
  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEnd(newEnd);
    const { hours, minutes } = calculateTotalTime(start, newEnd);
    setTotalTime({ hours, minutes });
    setIsTimeSlotUsed(false); // Time slot is bypassed
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

      {/* MAIN content area */}
      <main className="flex-1 -mt-8 md:-mt-12 lg:-mt-16 relative">
        {/**TABS for Role */}
        <div className="flex justify-center space-x-4 my-1">
          {[
            "Customer",
            "Driver",
            activeTab === "Freight Booking" ? "Transporter" : "Allocator",
            "Admin",
            "Superadmin",
          ].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleTabClick(role)}
              className={`px-6 py-2 rounded-md text-sm font-semibold shadow-sm ${
                activeRoleTab === role
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        {/* TABS for Booking Type */}
        <div className="flex justify-center space-x-4 my-1">
          {["Driver Booking", "Cab Booking", "Freight Booking"].map((tab) => (
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
        <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          {/* White card overlay */}
          <div className="bg-white rounded-lg shadow-lg px-6 py-6 md:px-8 md:py-8">
            {/* EMERGENCY CHECKBOX SECTION */}
            {activeTab === "Driver Booking" && activeRoleTab !== "Driver" && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Is this Booking for an Emergency?
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Hospital", "Airport", "Marriage", "School", "Urgent"].map(
                    (reason) => (
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
                    )
                  )}
                </div>
              </section>
            )}
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

            {/* Address input fields */}
            <div className="space-y-3 mb-4">
              {/* Pickup Address */}
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

              {/* Drop Address */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Drop Address (Optional)
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

            {/* TIME / DATE / DURATION Section */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 space-y-4">
              {/* Start Date Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  name="start"
                  value={start}
                  onChange={handleStartChange}
                  required
                  min={getMinStartTime}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
              </div>
              {/* Example quick durations */}
              {/* Time Slot Selection */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Time slot (duration)
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={timeSlot}
                  onChange={handleTimeSlotChange}
                  className="w-full border-gray-300 rounded-md p-2"
                >
                  <option value="1:00">1 hour 0 minutes</option>

                  <option value="2:00">2 hours 0 minutes</option>

                  <option value="3:00">3 hours 0 minutes</option>

                  <option value="4:00">4 hours 0 minutes</option>
                  <option value="4:30">4 hours 30 minutes</option>
                  <option value="5:00">5 hours 0 minutes</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {["4 hrs", "8 hrs", "12 hrs", "1 day", "3 days", "1 week"].map(
                  (duration) => (
                    <button
                      key={duration}
                      onClick={() => setTimeSlot(duration)}
                      className={`px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700  ${
                        timeSlot === duration
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-blue-700"
                      }`}
                    >
                      {duration}
                    </button>
                  )
                )}
              </div>

              {/* End Date Time */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  End Date & Time (optional/Auto-Calculate)
                </label>
                <input
                  type="datetime-local"
                  id="end"
                  name="end"
                  value={end}
                  onChange={handleEndChange}
                  required
                  min={start}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
              </div>
              {/* Total Time Display */}
              <div className="mb-4">
                <label className="block font-medium mb-1">
                  Actual Total Duration
                </label>
                <input
                  type="text"
                  value={`${totalTime.hours} hour(s) ${totalTime.minutes} minute(s)`}
                  readOnly
                  className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
              {/* Flag When Time Slot Is Not Used */}
              {!isTimeSlotUsed && (
                <div className="mb-4">
                  <span className="text-red-500 text-sm">
                    Time slot was not used for total hours calculation.
                  </span>
                </div>
              )}
            </section>

            {/* DRIVER BOOKING OPTIONS */}
            {activeTab === "Driver Booking" && (
              <section className="mb-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Booking Type
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Daily", ">= 1 Day", "Outside City"].map((type) => (
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

            {/* Car Type Selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Type
              </h2>
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

            {/* Transmission Selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Transmission
              </h2>
              <div className="flex gap-3">
                <button className="flex-1 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  Automatic
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                  Manual
                </button>
              </div>
            </section>

            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Details ( Optional)
              </h2>
              <div className="flex gap-3">
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Brand like Honda"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Model Year like City 2019"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md px-2 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Diesel/Petrol/CNG/Electric"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Transmission Selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Ride Details (Optional)
              </h2>
              <div className="flex gap-3">
                <textarea
                  rows={4}
                  placeholder="Ride related details like Touring delhi first time and need driver only who knows all in and out of the route.Situation like emergency to airport or hospital or school or to office.Aged or woman or children and please be careful while driving like slow driving.Going outside the city. Going for one way."
                  className="w-full text-sm focus:outline-none"
                />
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                className={`bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-700 hover:text-white`}
              >
                Estimate
              </button>

              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-lg hover:bg-blue-700 hover:text-white">
                Book
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-600 hover:text-white">
                Schedule
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-700 hover:text-white">
                Negotiate
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
