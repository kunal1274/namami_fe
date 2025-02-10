// RideBookingLanding.jsx

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
  InformationCircleIcon, // New Icon for Information
} from "@heroicons/react/24/outline";
import { XMarkIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid"; // New Icons for Currency

// Utility Function to Format Date-Time
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

// Minimum Start Time Function
const getMinStartTime = () => {
  return formatLocalDateTime(new Date());
};

// Estimation Modal Component
const EstimationModal = ({ isOpen, onClose, estimation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Estimation for Booking: Quote/2024-25/Jan#000345
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Start Date Time:</span>
            <span className="text-gray-800">{estimation.start}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">End Date Time:</span>
            <span className="text-gray-800">{estimation.end}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Duration:</span>
            <span className="text-gray-800">
              {estimation.totalTime.hours} hour(s){" "}
              {estimation.totalTime.minutes} minute(s)
            </span>
          </div>
          {!estimation.hidePrice && (
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.price}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Charges:</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.charges}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Toll:</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.toll} ({estimation.tollType})
            </span>
          </div>
          {estimation.includeInsurance && (
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance:</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.insurance} (+GST)
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Discount or Promo:</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.discount}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Base Amount:</span>
            <span className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.baseAmount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax Amount (18%):</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.taxAmount}
            </span>
          </div>
          <div className="ml-4 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">CGST (9%):</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.cgst}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SGST (9%):</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.sgst}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IGST:</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.igst}
              </span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total After Tax:</span>
            <span className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.totalAfterTax}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Withholding Tax:</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.withholdingTax}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">TCS (2%):</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.tcs}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">TDS (1%):</span>
            <span className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.tds}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Amount to be Paid:</span>
            <span className="flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.totalAmount}
            </span>
          </div>
          {estimation.includeTip && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tip (Optional):</span>
              <span className="text-gray-800 flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {estimation.tip}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-xl text-gray-900">
            <span>Estimated Total:</span>
            <span className="flex items-center">
              <CurrencyRupeeIcon className="h-6 w-6 mr-1 text-green-500" />
              {estimation.estimatedTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Details Modal Component
const BookingDetailsModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Booking Details
        </h2>
        <div className="space-y-6">
          {/* Customer Visible Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Riding Status:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.ridingStatus}
              </div>

              <div>
                <span className="text-gray-600">Ride Number #:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.rideNumber}
              </div>

              <div>
                <span className="text-gray-600">Sales Number #:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.salesNumber}
              </div>

              <div>
                <span className="text-gray-600">Hours:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.totalTime.hours} hour(s){" "}
                {bookingDetails.totalTime.minutes} minute(s)
              </div>

              <div>
                <span className="text-gray-600">Start Date Time:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.start}
              </div>

              <div>
                <span className="text-gray-600">End Date Time:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.end}
              </div>

              <div>
                <span className="text-gray-600">Pick Up:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.pickUp}
              </div>

              {bookingDetails.dropOff && (
                <>
                  <div>
                    <span className="text-gray-600">Drop off:</span>
                  </div>
                  <div className="text-gray-800 font-medium break-words">
                    {bookingDetails.dropOff}
                  </div>
                </>
              )}

              <div>
                <span className="text-gray-600">Total Amt:</span>
              </div>
              <div className="text-green-600 font-semibold flex items-center">
                <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                {bookingDetails.totalAmount}
              </div>
            </div>
          </div>

          {/* Internal Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Internal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Order Status:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.orderStatus}
              </div>

              <div>
                <span className="text-gray-600">Item #:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.itemNumber}
              </div>

              <div>
                <span className="text-gray-600">Qty:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.qty}
              </div>

              <div>
                <span className="text-gray-600">Unit:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.unit}
              </div>

              <div>
                <span className="text-gray-600">Currency:</span>
              </div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.currency}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Spinner Component (Assumed to be in Spinner.jsx)
// Example Spinner Component
export const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function RideBookingLanding() {
  // Existing State Variables
  const [activeRoleTab, setActiveRoleTab] = useState("Customer");
  const [activeTab, setActiveTab] = useState("Driver Booking");
  const [driverBookingType, setDriverBookingType] = useState("Daily");
  const [emergencyReasons, setEmergencyReasons] = useState([]);
  const [start, setStart] = useState(formatLocalDateTime(new Date()));
  const [end, setEnd] = useState("");
  const [timeSlot, setTimeSlot] = useState("4:00"); // Default time slot: 4 hours 0 minutes
  const [totalTime, setTotalTime] = useState({ hours: 4, minutes: 0 });
  const [isTimeSlotUsed, setIsTimeSlotUsed] = useState(true); // Flag to indicate if time slot was used

  // New State Variables for Estimation
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [estimationDetails, setEstimationDetails] = useState({});
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [includeTip, setIncludeTip] = useState(false);
  const [hidePrice, setHidePrice] = useState(false); // Toggle to hide price

  // New State Variables for Booking
  const [bookingDetails, setBookingDetails] = useState({});
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  // Handlers for Tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRoleTabClick = (roleTab) => {
    setActiveRoleTab(roleTab);
  };

  // Handler for Emergency Reasons
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

  /**
   * Calculates the estimation details.
   */
  const calculateEstimation = () => {
    // Base calculations
    const baseAmount = 1000;
    const charges = 100;
    const tollType = "Flat"; // or "7%"
    const toll = tollType === "Flat" ? 70 : (charges * 7) / 100;
    const insurance = includeInsurance ? 30 : 0;
    const discount = 50; // Can be made dynamic
    const gstRate = 18;
    const cgst = 90; // 9%
    const sgst = 90; // 9%
    const igst = 0; // Not applicable
    const taxAmount = cgst + sgst + igst; // 180
    const totalAfterTax =
      baseAmount + charges + toll + insurance - discount + taxAmount;
    const withholdingTax = 10;
    const tcs = 20; // 2%
    const tds = 10; // 1%
    const totalAmount = totalAfterTax + withholdingTax + tcs + tds;
    const tip = includeTip ? 0 : 0; // Can be made dynamic
    const estimatedTotal = totalAmount + tip;

    // Price handling
    const price = hidePrice ? 0 : 222; // Hide price based on condition

    // Prepare estimation details
    const estimation = {
      start: new Date(start).toLocaleString(),
      end: new Date(end).toLocaleString(),
      totalTime,
      price,
      charges,
      toll,
      tollType,
      includeInsurance,
      insurance,
      discount,
      baseAmount,
      taxAmount,
      cgst,
      sgst,
      igst,
      totalAfterTax,
      withholdingTax,
      tcs,
      tds,
      totalAmount,
      includeTip,
      tip,
      estimatedTotal,
      hidePrice,
    };

    setEstimationDetails(estimation);
    setShowEstimateModal(true);
  };

  /**
   * Handles the Estimate button click.
   * @param {Object} e - Event object
   */
  const handleEstimate = (e) => {
    e.preventDefault();
    calculateEstimation();
  };

  /**
   * Simulates an API call to book the ride.
   * Replace this with your actual API call using fetch or axios.
   */
  const bookRide = () => {
    return new Promise((resolve, reject) => {
      // Simulate API latency
      setTimeout(() => {
        // Simulate success response
        resolve({
          rideNumber: "Allocator Still Working",
          salesNumber: "SO-000456",
          totalTime,
          start: new Date(start).toLocaleString(),
          end: new Date(end).toLocaleString(),
          pickUp: "D Mart, Sector 70A, Darbaripur 122101",
          dropOff: `105 Apekshe Apartment, Room No. 5, First Floor
opposite to Thirumala PG, 2nd cross Balaji street, Mylasandra,
back gate global village, Bangalore, Karnataka-560059, India`,
          ridingStatus: "ALLOCATOR_PROCESSING",
          totalAmount: 1340,
          orderStatus: "Draft",
          itemNumber: "DDS4",
          qty: 4,
          unit: "hrs",
          currency: "INR",
        });

        // To simulate an error, uncomment the line below:
        // reject("Failed to book the ride. Please try again.");
      }, 2000);
    });
  };

  /**
   * Handles the Book Now button click.
   * Initiates the booking process and manages state based on response.
   * @param {Object} e - Event object
   */
  const handleBookNow = async (e) => {
    e.preventDefault();
    setIsBookingLoading(true);
    setBookingError("");
    try {
      const response = await bookRide();
      setBookingDetails(response);
      setShowBookingDetails(true);
    } catch (error) {
      setBookingError(error);
    } finally {
      setIsBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER with map background */}
      <header className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-48 sm:h-64 md:h-72 lg:h-80">
        <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
          <span className="text-white text-sm md:text-base">
            (Map Placeholder)
          </span>
        </div>
        {/* Top navigation with back button */}
        <div className="relative z-10 flex items-center px-6 py-4">
          <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition">
            <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-white ml-4">
            Select Address
          </h1>
        </div>
      </header>

      {/* MAIN content area */}
      <main className="flex-1 -mt-8 md:-mt-12 lg:-mt-16 relative">
        {/** TABS for Role */}
        <div className="flex justify-center space-x-4 my-4">
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
              className={`px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition ${
                activeRoleTab === role
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        {/* TABS for Booking Type */}
        <div className="flex justify-center space-x-4 my-2">
          {["Driver Booking", "Cab Booking", "Freight Booking"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-indigo-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mx-auto w-full max-w-md md:max-w-2xl lg:max-w-3xl">
          {/* White card overlay */}
          <div className="bg-white rounded-2xl shadow-xl px-8 py-8 md:px-12 md:py-12">
            {/* EMERGENCY CHECKBOX SECTION */}
            {activeTab === "Driver Booking" && activeRoleTab !== "Driver" && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  Is this Booking for an Emergency?
                </h2>
                <div className="flex flex-wrap gap-4">
                  {["Hospital", "Airport", "Marriage", "School", "Urgent"].map(
                    (reason) => (
                      <label
                        key={reason}
                        className={`flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-full transition ${
                          emergencyReasons.includes(reason)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50"
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Customer
              </label>
              <div className="relative">
                <select className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Customer</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Alex Johnson</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Disabled Item Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Number
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-4 py-2">
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
            <div className="space-y-6 mb-6">
              {/* Pickup Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Address
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="24, Ocean Avenue"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Drop Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop Address (Optional)
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
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
            <div className="mb-6">
              <button className="text-sm text-blue-600 flex items-center gap-1 font-medium hover:underline">
                <MapPinIcon className="h-5 w-5" />
                Show on a map
              </button>
            </div>

            {/* TIME / DATE / DURATION Section */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 space-y-6">
              {/* Start Date Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="start"
                  name="start"
                  value={start}
                  onChange={handleStartChange}
                  required
                  min={getMinStartTime()}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Slot (Duration)
                </label>
                {/* Removed the select dropdown for time slots */}
              </div>
              {/* Quick Duration Buttons */}
              <div className="flex flex-wrap gap-4">
                {[
                  "2:00",
                  "3:00",
                  "4:00",
                  "4:30",
                  "5:00",
                  "5:30",
                  "6:00",
                  "6:30",
                  "7:00",
                  "7:30",
                  "8:00",
                  "12:00",
                  "24:00",
                  "48:00",
                  "72:00",
                ].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => {
                      setTimeSlot(duration);
                      setIsTimeSlotUsed(true);
                    }}
                    className={`px-4 py-2 text-xs rounded-full border transition ${
                      timeSlot === duration
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                    }`}
                  >
                    {duration.replace(":", " hrs ")} mins
                  </button>
                ))}
              </div>

              {/* End Date Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Total Time Display */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Actual Total Duration
                </label>
                <input
                  type="text"
                  value={`${totalTime.hours} hour(s) ${totalTime.minutes} minute(s)`}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              {/* Flag When Time Slot Is Not Used */}
              {!isTimeSlotUsed && (
                <div className="flex items-center text-red-500 text-sm">
                  <InformationCircleIcon className="h-5 w-5 mr-2" />
                  Time slot was not used for total hours calculation.
                </div>
              )}
            </section>

            {/* DRIVER BOOKING OPTIONS */}
            {activeTab === "Driver Booking" && (
              <section className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Booking Type
                </h2>
                <div className="flex flex-wrap gap-4">
                  {["Daily", ">= 1 Day", "Outside City"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDriverBookingType(type)}
                      className={`px-6 py-3 border border-gray-300 rounded-full text-sm font-medium transition ${
                        driverBookingType === type
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Car Type Selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Car Type
              </h2>
              <div className="flex flex-wrap gap-6">
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
                    className="flex flex-col items-center text-center w-24"
                  >
                    <div className="bg-white border border-gray-300 rounded-full p-4 w-16 h-16 flex items-center justify-center text-gray-700 shadow-sm">
                      {/* Car icon placeholder */}
                      <span className="text-lg">{car.icon}</span>
                    </div>
                    <span className="mt-2 text-sm text-gray-600">
                      {car.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Transmission Selection */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Car Transmission
              </h2>
              <div className="flex gap-6">
                <button className="flex-1 py-3 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-100 transition">
                  Automatic
                </button>
                <button className="flex-1 py-3 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-100 transition">
                  Manual
                </button>
              </div>
            </section>

            {/* Car Details (Optional) */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Car Details (Optional)
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Brand like Honda"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Model Year like City 2019"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Diesel/Petrol/CNG/Electric"
                    className="w-full text-sm focus:outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Ride Details (Optional) */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Ride Details (Optional)
              </h2>
              <textarea
                rows={4}
                placeholder="Provide any additional details about your ride..."
                className="w-full text-sm focus:outline-none border border-gray-300 rounded-md p-3"
              />
            </section>

            {/* Estimation and Booking Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              {/* NEW: Estimate Button */}
              <button
                onClick={handleEstimate}
                className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-indigo-600 hover:text-white transition flex items-center justify-center"
              >
                Estimate
              </button>

              {/* NEW: Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={isBookingLoading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-indigo-700 transition flex items-center justify-center"
              >
                {isBookingLoading ? <Spinner /> : "Book Now"}
              </button>

              {/* Existing Schedule Button */}
              <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-indigo-600 hover:text-white transition flex items-center justify-center">
                Schedule Later
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-indigo-600 hover:text-white transition flex items-center justify-center">
                Negotiate
              </button>
            </div>

            {/* Booking Error Message */}
            {bookingError && (
              <div className="mt-6 text-center">
                <span className="text-red-500 text-sm flex items-center justify-center">
                  <InformationCircleIcon className="h-5 w-5 mr-2" />
                  {bookingError}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* NEW: Estimation Modal */}
      <EstimationModal
        isOpen={showEstimateModal}
        onClose={() => setShowEstimateModal(false)}
        estimation={estimationDetails}
      />

      {/* NEW: Booking Details Modal */}
      <BookingDetailsModal
        isOpen={showBookingDetails}
        onClose={() => setShowBookingDetails(false)}
        bookingDetails={bookingDetails}
      />
    </div>
  );
}
