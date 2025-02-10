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
import { XMarkIcon, CurrencyRupeeIcon } from "@heroicons/react/24/solid"; // New Icon for Modal Close

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

// Utility Function to Convert Time Slot to Days/Weeks
const convertTimeSlotToDays = (totalHours) => {
  if (totalHours >= 168) {
    const weeks = Math.floor(totalHours / 168);
    return weeks === 1 ? `${weeks} week` : `${weeks} weeks`;
  } else if (totalHours >= 24) {
    const days = Math.floor(totalHours / 24);
    return days === 1 ? `${days} day` : `${days} days`;
  } else {
    return null;
  }
};

// Minimum Start Time Function
const getMinStartTime = () => {
  return formatLocalDateTime(new Date());
};

// Estimation Modal Component
const EstimationModal1 = ({ isOpen, onClose, estimation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          Estimation for Booking: Quote/2024-25/Jan#000345
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Start Date Time:</span>
            <span>{estimation.start}</span>
          </div>
          <div className="flex justify-between">
            <span>End Date Time:</span>
            <span>{estimation.end}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Duration:</span>
            <span>
              {estimation.totalTime.hours} hour(s){" "}
              {estimation.totalTime.minutes} minute(s)
            </span>
          </div>
          {!estimation.hidePrice && (
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{estimation.price}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Charges:</span>
            <span>₹{estimation.charges}</span>
          </div>
          <div className="flex justify-between">
            <span>Toll:</span>
            <span>
              ₹{estimation.toll} ({estimation.tollType})
            </span>
          </div>
          {estimation.includeInsurance && (
            <div className="flex justify-between">
              <span>Insurance:</span>
              <span>₹{estimation.insurance} (+GST)</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Discount or Promo:</span>
            <span>₹{estimation.discount}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Base Amount:</span>
            <span>₹{estimation.baseAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax Amount (18%):</span>
            <span>₹{estimation.taxAmount}</span>
          </div>
          <div className="ml-4">
            <div className="flex justify-between">
              <span>CGST (9%):</span>
              <span>₹{estimation.cgst}</span>
            </div>
            <div className="flex justify-between">
              <span>SGST (9%):</span>
              <span>₹{estimation.sgst}</span>
            </div>
            <div className="flex justify-between">
              <span>IGST:</span>
              <span>₹{estimation.igst}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total After Tax:</span>
            <span>₹{estimation.totalAfterTax}</span>
          </div>
          <div className="flex justify-between">
            <span>Withholding Tax:</span>
            <span>₹{estimation.withholdingTax}</span>
          </div>
          <div className="flex justify-between">
            <span>TCS (2%):</span>
            <span>₹{estimation.tcs}</span>
          </div>
          <div className="flex justify-between">
            <span>TDS (1%):</span>
            <span>₹{estimation.tds}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total Amount to be Paid:</span>
            <span>₹{estimation.totalAmount}</span>
          </div>
          {estimation.includeTip && (
            <div className="flex justify-between">
              <span>Tip (Optional):</span>
              <span>₹{estimation.tip}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Estimated Total:</span>
            <span>₹{estimation.estimatedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estimation Modal Component
const EstimationModal = ({ isOpen, onClose, estimation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* MODIFICATION: Make the modal scrollable */}
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-gray-600">Start Date Time:</div>
            <div className="text-gray-800">{estimation.start}</div>

            <div className="text-gray-600">End Date Time:</div>
            <div className="text-gray-800">{estimation.end}</div>

            <div className="text-gray-600">Total Duration:</div>
            <div className="text-gray-800">
              {estimation.totalTime.displayDuration}
            </div>

            {!estimation.hidePrice && (
              <>
                <div className="text-gray-600">Price:</div>
                <div className="text-gray-800 flex items-center">
                  <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                  {estimation.price}
                </div>
              </>
            )}

            <div className="text-gray-600">Charges:</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.charges}
            </div>

            <div className="text-gray-600">Toll:</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.toll} ({estimation.tollType})
            </div>

            {estimation.includeInsurance && (
              <>
                <div className="text-gray-600">Insurance:</div>
                <div className="text-gray-800 flex items-center">
                  <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                  {estimation.insurance} (+GST)
                </div>
              </>
            )}

            <div className="text-gray-600">Discount or Promo:</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.discount}
            </div>

            <div className="text-gray-600 font-semibold">Base Amount:</div>
            <div className="text-gray-800 font-semibold flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.baseAmount}
            </div>

            <div className="text-gray-600">Tax Amount (18%):</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.taxAmount}
            </div>

            <div className="text-gray-600">CGST (9%):</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.cgst}
            </div>

            <div className="text-gray-600">SGST (9%):</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.sgst}
            </div>

            <div className="text-gray-600">IGST:</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.igst}
            </div>

            <div className="text-gray-600 font-semibold">Total After Tax:</div>
            <div className="text-gray-800 font-semibold flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.totalAfterTax}
            </div>

            <div className="text-gray-600">Withholding Tax:</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.withholdingTax}
            </div>

            <div className="text-gray-600">TCS (2%):</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.tcs}
            </div>

            <div className="text-gray-600">TDS (1%):</div>
            <div className="text-gray-800 flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.tds}
            </div>

            <div className="text-gray-600 font-semibold">
              Total Amount to be Paid:
            </div>
            <div className="text-gray-800 font-semibold flex items-center">
              <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
              {estimation.totalAmount}
            </div>

            {estimation.includeTip && (
              <>
                <div className="text-gray-600">Tip (Optional):</div>
                <div className="text-gray-800 flex items-center">
                  <CurrencyRupeeIcon className="h-5 w-5 mr-1 text-green-500" />
                  {estimation.tip}
                </div>
              </>
            )}

            <div className="text-gray-600 font-bold text-xl">
              Estimated Total:
            </div>
            <div className="text-gray-900 font-bold text-xl flex items-center">
              <CurrencyRupeeIcon className="h-6 w-6 mr-1 text-green-500" />
              {estimation.estimatedTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Details Modal Component
const BookingDetailsModal1 = ({ isOpen, onClose, bookingDetails }) => {
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

// Booking Details Modal Component
const BookingDetailsModal = ({ isOpen, onClose, bookingDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      {/* MODIFICATION: Make the modal scrollable */}
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
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
              <div className="text-gray-600">Riding Status:</div>
              <div className="text-blue-600 font-medium">
                {bookingDetails.ridingStatus}
              </div>

              <div className="text-gray-600">Ride Number #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.rideNumber}
              </div>

              <div className="text-gray-600">Sales Number #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.salesNumber}
              </div>

              <div className="text-gray-600">Hours:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.totalTime.hours} hour(s){" "}
                {bookingDetails.totalTime.minutes} minute(s)
              </div>

              <div className="text-gray-600">Start Date Time:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.start}
              </div>

              <div className="text-gray-600">End Date Time:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.end}
              </div>

              <div className="text-gray-600">Pick Up:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.pickUp}
              </div>

              {bookingDetails.dropOff && (
                <>
                  <div className="text-gray-600">Drop off:</div>
                  <div className="text-gray-800 font-medium break-words">
                    {bookingDetails.dropOff}
                  </div>
                </>
              )}

              <div className="text-gray-600">Total Amt:</div>
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
              <div className="text-gray-600">Order Status:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.orderStatus}
              </div>

              <div className="text-gray-600">Item #:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.itemNumber}
              </div>

              <div className="text-gray-600">Qty:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.qty}
              </div>

              <div className="text-gray-600">Unit:</div>
              <div className="text-gray-800 font-medium">
                {bookingDetails.unit}
              </div>

              <div className="text-gray-600">Currency:</div>
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
  const [totalTime, setTotalTime] = useState({
    hours: 4,
    minutes: 0,
    displayDuration: "4 hour(s) 0 minute(s)",
  });
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

    // MODIFICATION: Convert hours to days/weeks if applicable
    const additionalTime = convertTimeSlotToDays(diffHours);
    let displayDuration = `${diffHours} hour(s) ${diffMinutes} minute(s)`;
    if (additionalTime) {
      displayDuration += ` (${additionalTime})`;
    }

    return { hours: diffHours, minutes: diffMinutes, displayDuration };
  };

  // // Initialize end time based on default time slot on component mount
  // useEffect(() => {
  //   const initialEnd = calculateEndTime(start, timeSlot);
  //   setEnd(initialEnd);
  //   const { hours, minutes } = parseTimeSlot(timeSlot);
  //   setTotalTime({ hours, minutes });
  // }, []); // Empty dependency array ensures this runs once on mount

  // Initialize end time based on default time slot on component mount
  useEffect(() => {
    const initialEnd = calculateEndTime(start, timeSlot);
    setEnd(initialEnd);
    const { hours, minutes, displayDuration } = calculateTotalTime(
      start,
      initialEnd
    ); // MODIFICATION
    setTotalTime({ hours, minutes, displayDuration }); // MODIFICATION
  }, []); // Empty dependency array ensures this runs once on mount

  // // Update end time and total duration when start time or time slot changes, if time slot is used
  // useEffect(() => {
  //   if (isTimeSlotUsed) {
  //     const newEnd = calculateEndTime(start, timeSlot);
  //     setEnd(newEnd);
  //     const { hours, minutes } = parseTimeSlot(timeSlot);
  //     setTotalTime({ hours, minutes });
  //   }
  // }, [start, timeSlot, isTimeSlotUsed]);

  // Update end time and total duration when start time or time slot changes, if time slot is used
  useEffect(() => {
    if (isTimeSlotUsed) {
      const newEnd = calculateEndTime(start, timeSlot);
      setEnd(newEnd);
      const { hours, minutes, displayDuration } = calculateTotalTime(
        start,
        newEnd
      ); // MODIFICATION
      setTotalTime({ hours, minutes, displayDuration }); // MODIFICATION
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
    const { hours, minutes, displayDuration } = calculateTotalTime(
      start,
      newEnd
    ); // MODIFICATION
    setTotalTime({ hours, minutes, displayDuration }); // MODIFICATION
    setIsTimeSlotUsed(false); // Time slot is bypassed
    // const { hours, minutes } = calculateTotalTime(start, newEnd);
    // setTotalTime({ hours, minutes });
    // setIsTimeSlotUsed(false); // Time slot is bypassed
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
          back gate global village, Bangalore, Karnataka-560059,India`,
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
            activeTab === "Freight Booking"
              ? "Truck Owner/Drivers"
              : activeTab === "Cab Booking"
              ? "Taxi Driver"
              : activeTab === "Driver Booking"
              ? "Driver"
              : "Self",
            ,
            activeTab === "Freight Booking"
              ? "Transporter"
              : activeTab === "Cab Booking"
              ? "Facilitator"
              : activeTab === "Driver Booking"
              ? "Dispatcher"
              : "Allocator",
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
                  min={getMinStartTime()}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
                />
              </div>
              {/* Time Slot Selection */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Time slot (duration)
                </label>
                {/* <select
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
                  
                </select> */}
              </div>
              {/* Quick Duration Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 1, value: "2:00", display: "2 hrs 00 mins" },
                  { code: 2, value: "2:30", display: "2 hrs 30 mins" },
                  { code: 3, value: "3:00", display: "3 hrs 00 mins" },
                  { code: 4, value: "3:30", display: "3 hrs 30 mins" },
                  { code: 5, value: "4:00", display: "4 hrs 00 mins" },
                  { code: 7, value: "4:30", display: "4 hrs 30 mins" },
                  { code: 8, value: "5:00", display: "5 hrs 00 mins" },
                  { code: 9, value: "5:30", display: "5 hrs 30 mins" },
                  { code: 10, value: "6:00", display: "6 hrs 00 mins" },
                  { code: 11, value: "8:00", display: "8 hrs 00 mins" },
                  { code: 12, value: "10:00", display: "10 hrs 00 mins" },
                  { code: 13, value: "12:00", display: "12 hrs 00 mins" },
                  { code: 14, value: "15:00", display: "15 hrs 00 mins" },
                  { code: 15, value: "24:00", display: "1 day" },
                  { code: 16, value: "48:00", display: "2 days" },
                  { code: 17, value: "72:00", display: "3 days" },
                  { code: 18, value: "96:00", display: "4 days" },
                  { code: 19, value: "120:00", display: "5 days" },
                  { code: 20, value: "144:00", display: "6 days" },
                  { code: 21, value: "168:00", display: "1 week" },
                ].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => {
                      setTimeSlot(duration.value);
                      setIsTimeSlotUsed(true);
                    }}
                    className={`px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700  ${
                      timeSlot === duration.value
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-blue-700"
                    }`}
                  >
                    {/* {duration.replace(":", " hrs ")} mins */}
                    {duration.display}
                  </button>
                ))}
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
                  //value={`${totalTime.hours} hour(s) ${totalTime.minutes} minute(s)`}
                  value={`${
                    totalTime.displayDuration
                      ? `${totalTime.displayDuration}`
                      : ""
                  }`}
                  readOnly
                  className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
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
              <section className="mb-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Booking Type
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["Daily", "Outside City", "Outside State"].map((type) => (
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

            {/* Car Details (Optional) */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Car Details (Optional)
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

            {/* Ride Details (Optional) */}
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Ride Details (Optional)
              </h2>
              <div className="flex gap-3">
                <textarea
                  rows={4}
                  placeholder="Ride related details like Touring Delhi first time and need driver only who knows all in and out of the route. Situation like emergency to airport or hospital or school or to office. Aged or woman or children and please be careful while driving like slow driving. Going outside the city. Going for one way."
                  className="w-full text-sm focus:outline-none border border-gray-300 rounded-md p-2"
                />
              </div>
            </section>
            <section className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4 space-y-4">
              {/* Toggle Insurance */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={() => setIncludeInsurance(!includeInsurance)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm text-gray-700">Include Insurance</span>
              </label>
              {/* Toggle Tip */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeTip}
                  onChange={() => setIncludeTip(!includeTip)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm text-gray-700">Include Tip</span>
              </label>
              {/* Toggle Price Visibility */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hidePrice}
                  onChange={() => setHidePrice(!hidePrice)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-sm text-gray-700">Hide Price</span>
              </label>
            </section>

            {/* Estimation and Booking Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {/* NEW: Estimate Button */}
              <button
                onClick={handleEstimate}
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-600 hover:text-white transition"
              >
                Estimate
              </button>

              {/* Existing Book and Schedule Buttons */}
              <button
                onClick={handleBookNow}
                disabled={isBookingLoading}
                className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-lg hover:bg-blue-700 hover:text-white transition"
              >
                {isBookingLoading ? <Spinner /> : "Book Now"}
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-600 hover:text-white transition">
                Schedule Later
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-white text-black px-6 py-2 rounded-md text-sm font-semibold shadow-md hover:bg-blue-700 hover:text-white transition">
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
