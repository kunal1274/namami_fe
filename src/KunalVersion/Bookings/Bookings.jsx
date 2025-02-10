import React, { useState } from "react";
import { FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";

import { FaUser, FaMoneyBillWave } from "react-icons/fa";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BookingStep onNext={nextStep} />;
      case 2:
        return <AllocationStep onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <RideProgressStep onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <PaymentStep onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <SettlementStep onPrev={prevStep} />;
      default:
        return <BookingStep onNext={nextStep} />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ProgressIndicator step={step} />
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderStepContent()}
      </div>
    </div>
  );
};

const ProgressIndicator = ({ step }) => {
  const steps = [
    "Booking",
    "Allocation",
    "Ride Progress",
    "Payment",
    "Settlement",
  ];
  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`flex-1 text-center ${
            index + 1 <= step ? "text-blue-500 font-bold" : "text-gray-400"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

const BookingStep = ({ onNext }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 1: Booking</h2>
    <div className="mb-4">
      <label className="block font-bold mb-1">Customer Name</label>
      <input type="text" className="w-full border rounded p-2" />
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Pickup Location</label>
      <input type="text" className="w-full border rounded p-2" />
    </div>
    <div className="mb-4">
      <label className="block font-bold mb-1">Destination</label>
      <input type="text" className="w-full border rounded p-2" />
    </div>
    <button
      onClick={onNext}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Book Ride
    </button>
    {/* Backend: Handle sales order creation */}
  </div>
);

const AllocationStep = ({ onNext, onPrev }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 2: Allocation</h2>
    <div className="mb-4">
      <label className="block font-bold mb-1">Driver</label>
      <select className="w-full border rounded p-2">
        <option>Select a driver</option>
        {/* Map drivers here */}
      </select>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Allocate Driver
      </button>
    </div>
    {/* Backend: Handle purchase order creation */}
  </div>
);

const RideProgressStep = ({ onNext, onPrev }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 3: Ride In Progress</h2>
    <div className="mb-4">
      <p>Driver has started the ride.</p>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Complete Ride
      </button>
    </div>
    {/* Backend: Track ride progress */}
  </div>
);

const PaymentStep = ({ onNext, onPrev }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 4: Payment</h2>
    <div className="mb-4">
      <label className="block font-bold mb-1">Payment Method</label>
      <select className="w-full border rounded p-2">
        <option>Select Payment Method</option>
        <option>Stripe</option>
        <option>Cash</option>
        <option>Net Banking</option>
      </select>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Confirm Payment
      </button>
    </div>
    {/* Backend: Handle payment integration */}
  </div>
);

const SettlementStep = ({ onPrev }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Step 5: Settlement</h2>
    <div className="mb-4">
      <p>
        Finalizing settlement for commission, tax, and other charges with the
        customer and driver.
      </p>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={onPrev}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Close Ride
      </button>
    </div>
    {/* Backend: Finalize settlement */}
  </div>
);

//export default MultiStepForm;

const TimelineTracker = () => {
  const [events] = useState([
    {
      id: 1,
      time: "10:00 AM",
      date: "2024-12-30",
      title: "Booking",
      description: "Ride booked by the customer.",
      location: "Customer Address, NY",
    },
    {
      id: 2,
      time: "10:30 AM",
      date: "2024-12-30",
      title: "Allocation",
      description: "Driver allocated to the ride.",
      location: "Driver Pool, NY",
    },
    {
      id: 3,
      time: "11:00 AM",
      date: "2024-12-30",
      title: "Ride Start",
      description: "Driver started the ride.",
      location: "Pickup Location, NY",
    },
    {
      id: 4,
      time: "01:00 PM",
      date: "2024-12-30",
      title: "Ride Complete",
      description: "Driver completed the ride.",
      location: "Destination, NY",
    },
    {
      id: 5,
      time: "01:30 PM",
      date: "2024-12-30",
      title: "Payment",
      description: "Customer completed the payment.",
      location: "Destination, NY",
    },
    {
      id: 6,
      time: "02:00 PM",
      date: "2024-12-30",
      title: "Settlement",
      description: "Final settlement for the ride.",
      location: "Admin Office, NY",
    },
  ]);

  const calculateTotalDuration = () => {
    const startTime = new Date("2024-12-30T10:00:00");
    const endTime = new Date("2024-12-30T14:00:00"); // Example end time
    const duration = Math.abs(endTime - startTime) / (1000 * 60 * 60); // Duration in hours
    return duration;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ride Timeline Tracker</h1>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={event.id} className="timeline-item mb-6">
            <div className="flex items-center mb-2">
              <FaClock className="text-blue-500 mr-2" />
              <span className="font-bold">
                {event.date} - {event.time}
              </span>
            </div>
            <div className="flex items-start">
              <div className="timeline-icon">
                <FaCheckCircle
                  className={`text-2xl ${
                    index % 2 === 0 ? "text-green-500" : "text-blue-500"
                  }`}
                />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-bold">{event.title}</h2>
                <p>{event.description}</p>
                <div className="flex items-center mt-2">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold">Total Ride Duration:</h2>
        <p>{calculateTotalDuration()} hours</p>
      </div>
    </div>
  );
};

//export default TimelineTracker;

const RideManagement = () => {
  const [role, setRole] = useState("superadmin"); // Default role: superadmin
  const [timeline, setTimeline] = useState([
    {
      id: 1,
      title: "Ride Booked",
      description: "Ride booked by the customer.",
      time: "10:00 AM",
      date: "2024-12-30",
      location: "Customer Address, NY",
    },
  ]);

  const handleAction = (action) => {
    const newEvent = {
      id: timeline.length + 1,
      title: action.title,
      description: action.description,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      location: action.location || "N/A",
    };
    setTimeline((prev) => [...prev, newEvent]);
  };

  const renderActions = () => {
    const actions = [];
    if (role === "customer" || role === "superadmin") {
      actions.push(
        <button
          key="book-ride"
          onClick={() =>
            handleAction({
              title: "Ride Booked",
              description: "The customer has booked a ride.",
              location: "Customer Address, NY",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 mb-4"
        >
          Book Ride
        </button>
      );
    }

    if (role === "allocator" || role === "superadmin") {
      actions.push(
        <button
          key="allocate-driver"
          onClick={() =>
            handleAction({
              title: "Driver Allocated",
              description: "Driver has been allocated to the ride.",
              location: "Driver Pool, NY",
            })
          }
          className="bg-green-500 text-white px-4 py-2 mb-4"
        >
          Allocate Driver
        </button>
      );
    }

    if (role === "driver" || role === "superadmin") {
      actions.push(
        <button
          key="start-ride"
          onClick={() =>
            handleAction({
              title: "Ride Started",
              description: "Driver has started the ride.",
              location: "Pickup Location, NY",
            })
          }
          className="bg-yellow-500 text-white px-4 py-2 mb-4"
        >
          Start Ride
        </button>,
        <button
          key="complete-ride"
          onClick={() =>
            handleAction({
              title: "Ride Completed",
              description: "Driver has completed the ride.",
              location: "Destination, NY",
            })
          }
          className="bg-red-500 text-white px-4 py-2 mb-4"
        >
          Complete Ride
        </button>
      );
    }

    if (role === "admin" || role === "superadmin") {
      actions.push(
        <button
          key="confirm-payment"
          onClick={() =>
            handleAction({
              title: "Payment Received",
              description: "Payment has been received from the customer.",
              location: "Online/UPI",
            })
          }
          className="bg-blue-500 text-white px-4 py-2 mb-4"
        >
          Confirm Payment
        </button>,
        <button
          key="finalize-settlement"
          onClick={() =>
            handleAction({
              title: "Ride Settlement",
              description: "Final settlement with the driver completed.",
              location: "Admin Office, NY",
            })
          }
          className="bg-green-500 text-white px-4 py-2 mb-4"
        >
          Finalize Settlement
        </button>
      );
    }

    return actions;
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Panel: Timeline */}
      <div className="timeline bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Ride Timeline</h2>
        {timeline.map((event) => (
          <div key={event.id} className="timeline-item mb-4 border-b pb-4">
            <div className="flex items-center mb-2">
              <FaClock className="text-blue-500 mr-2" />
              <span className="font-bold">
                {event.date} - {event.time}
              </span>
            </div>
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel: Action Steps */}
      <div className="actions bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Actions for {role}</h2>
        <div className="flex flex-wrap gap-4">{renderActions()}</div>
        <div className="mt-6">
          <label className="font-bold mr-4">Switch Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2"
          >
            <option value="superadmin">Superadmin</option>
            <option value="customer">Customer</option>
            <option value="allocator">Allocator</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RideManagement;
