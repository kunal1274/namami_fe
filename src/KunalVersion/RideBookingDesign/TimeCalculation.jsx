import React, { useState, useEffect } from "react";
// Adjust the path as necessary

// utils/dateUtils.js
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

const TimeCalculation1 = () => {
  const [start, setStart] = useState(formatLocalDateTime(new Date()));
  const [end, setEnd] = useState("");
  const [totalHours, setTotalHours] = useState(4); // Default hours for time slot calculation
  const [timeSlot, setTimeSlot] = useState("4 hrs"); // Initialize timeSlot with default hours

  // Helper function to parse timeSlot string to number
  const parseTimeSlot = (slot) => {
    const match = slot.match(/(\d+)\s*hrs/);
    return match ? parseInt(match[1], 10) : 4;
  };

  // Function to calculate the end time based on the start time and hours added
  const calculateEndTime = (startTime, hours) => {
    const startDate = new Date(startTime);
    startDate.setHours(startDate.getHours() + hours);
    return formatLocalDateTime(startDate);
  };

  // Update end date when start or timeSlot changes
  useEffect(() => {
    const hours = parseTimeSlot(timeSlot) || 4; // Extract hours from the timeSlot
    setTotalHours(hours); // Set total hours for calculation
    setEnd(calculateEndTime(start, hours));
  }, [start, timeSlot]);

  // Function to auto-calculate the time slot based on start and end
  const calculateTimeSlotFromDates = () => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInHours = Math.round((endDate - startDate) / (1000 * 60 * 60)); // Difference in hours
    setTimeSlot(`${diffInHours} hrs`);
    setTotalHours(diffInHours);
  };

  // Handle changes in start time
  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  // Handle changes in end time (if you allow manual adjustment)
  const handleEndChange = (e) => {
    setEnd(e.target.value);
    calculateTimeSlotFromDates();
  };

  // Handle changes in time slot
  const handleTimeSlotChange = (e) => {
    setTimeSlot(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Book a Ride</h2>

      {/* Start DateTime Input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Start Date & Time</label>
        <input
          type="datetime-local"
          value={start}
          onChange={handleStartChange}
          className="w-full border-gray-300 rounded-md p-2"
          required
          min={getMinStartTime()}
        />
      </div>

      {/* Time Slot Selection */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Time Slot</label>
        <select
          value={timeSlot}
          onChange={handleTimeSlotChange}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="1 hrs">1 Hour</option>
          <option value="2 hrs">2 Hours</option>
          <option value="3 hrs">3 Hours</option>
          <option value="4 hrs">4 Hours</option>
          <option value="5 hrs">5 Hours</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* End DateTime Display (Read-Only) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">End Date & Time</label>
        <input
          type="datetime-local"
          value={end}
          onChange={handleEndChange}
          className="w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>

      {/* Total Hours Display */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Total Hours</label>
        <input
          type="number"
          value={totalHours}
          readOnly
          className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => {
          // Handle form submission
          console.log("Booking submitted:", { start, end, totalHours });
        }}
      >
        Book Ride
      </button>
    </div>
  );
};

// Helper function to format Date object to 'YYYY-MM-DDTHH:mm' for datetime-local input
const formatLocalDateTime1 = (date) => {
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

const TimeCalculation = () => {
  // State variables
  const [start, setStart] = useState(formatLocalDateTime(new Date()));
  const [end, setEnd] = useState("");
  const [timeSlot, setTimeSlot] = useState("4:00"); // Default time slot: 4 hours 0 minutes
  const [totalTime, setTotalTime] = useState({ hours: 4, minutes: 0 });
  const [isTimeSlotUsed, setIsTimeSlotUsed] = useState(true); // Flag to indicate if time slot was used

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
   * Handles form submission.
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here (e.g., API call)
    console.log("Booking submitted:", {
      start,
      end,
      totalTime,
      isTimeSlotUsed,
    });
    // Optionally, reset the form or navigate to another page
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Book a Ride</h2>
      <form onSubmit={handleSubmit}>
        {/* Start Date & Time */}
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="start">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={start}
            onChange={handleStartChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
            min={formatLocalDateTime(new Date())} // Prevent selecting past times
          />
        </div>

        {/* Time Slot Selection */}
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="timeSlot">
            Time Slot (Duration)
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

        {/* End Date & Time */}
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="end">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={end}
            onChange={handleEndChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
            min={start} // Prevent end time before start time
          />
        </div>

        {/* Total Time Display */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Total Duration</label>
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
};

export default TimeCalculation;
