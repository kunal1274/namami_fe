import React, { useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  TruckIcon,
} from "@heroicons/react/24/solid";

// SAMPLE STEPS DATA
const stepsData = [
  {
    id: 1,
    title: "Ride Requested",
    status: "completed", // completed | in-progress | pending | canceled
    timestamp: "Tue, 31 Dec '24 - 5:18pm",
    description: "User has requested a ride via the app.",
  },
  {
    id: 2,
    title: "Allocator Processing",
    status: "completed",
    timestamp: "Tue, 31 Dec '24 - 5:25pm",
    description: "Allocator is checking for nearest available drivers.",
  },
  {
    id: 3,
    title: "Driver Assigned",
    status: "completed",
    timestamp: "Tue, 31 Dec '24 - 7:32pm",
    description: "Driver John Doe has been assigned to the ride.",
  },
  {
    id: 4,
    title: "En Route to Pickup Location",
    status: "in-progress",
    timestamp: "Tue, 31 Dec '24 - 7:54pm",
    description: "Driver is currently heading to the pickup location.",
  },
  {
    id: 5,
    title: "At Pickup Location",
    status: "pending",
    description: "Driver has reached the pickup location.",
  },
  {
    id: 6,
    title: "Waiting for Customer",
    status: "pending",
    isOptional: true,
    description:
      "Driver is waiting, may cancel or mark 'no show' if time limit passes.",
  },
  {
    id: 7,
    title: "Ride Started & In Progress",
    status: "pending",
    description: "The customer has boarded; ride is in progress.",
  },
  {
    id: 8,
    title: "Ride Paused",
    status: "pending",
    description: "Driver may pause the ride for short stops, if needed.",
  },
  {
    id: 9,
    title: "Ride Completed",
    status: "pending",
    description: "Ride has successfully finished.",
    final: true,
  },
  {
    id: 10,
    title: "Ride Cancelled",
    status: "pending",
    description: "Ride was cancelled due to some reason.",
    final: true,
  },
  {
    id: 11,
    title: "Customer No Show",
    status: "pending",
    description:
      "Driver waited for the passenger, but the passenger did not arrive in time.",
    final: true,
  },
];

// A helper to render the appropriate icon for each status
const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return (
        <CheckCircleIcon
          className="h-6 w-6 text-green-500 shrink-0"
          title="Completed"
        />
      );
    case "in-progress":
      return (
        <ArrowPathIcon
          className="h-6 w-6 text-blue-500 shrink-0 animate-spin"
          title="In Progress"
        />
      );
    case "pending":
      return (
        <ClockIcon className="h-6 w-6 text-gray-400 shrink-0" title="Pending" />
      );
    case "canceled":
      return (
        <XCircleIcon
          className="h-6 w-6 text-red-500 shrink-0"
          title="Canceled"
        />
      );
    default:
      // Fallback icon
      return (
        <TruckIcon className="h-6 w-6 text-gray-500 shrink-0" title="Default" />
      );
  }
};

// Timeline step item in BASIC style
const TimelineStepBasic = ({ step, showDetails }) => {
  return (
    <div className="flex items-start gap-3 pb-8 last:pb-0">
      {/* Icon */}
      <div className="mt-1">{getStatusIcon(step.status)}</div>

      {/* Textual info */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            {step.title}
            {step.isOptional && (
              <span className="bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-full">
                Optional
              </span>
            )}
          </h3>
          {step.timestamp && (
            <span className="text-xs text-gray-400 ml-2">{step.timestamp}</span>
          )}
        </div>

        {/* Show details if toggled */}
        {showDetails && step.description && (
          <p className="text-xs text-gray-500 mt-1">{step.description}</p>
        )}

        {/* Indicate final */}
        {step.final && showDetails && (
          <p className="text-xs text-red-500 mt-1">
            This status can be one possible final outcome.
          </p>
        )}
      </div>
    </div>
  );
};

// Timeline step item in CARD style
const TimelineStepCard = ({ step, showDetails }) => {
  return (
    <div className="flex items-start gap-3 pb-8 last:pb-0">
      {/* Icon */}
      <div className="mt-1">{getStatusIcon(step.status)}</div>

      {/* Card container */}
      <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm w-full">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            {step.title}
            {step.isOptional && (
              <span className="bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-full">
                Optional
              </span>
            )}
          </h3>
          {step.timestamp && (
            <span className="text-xs text-gray-400 ml-2">{step.timestamp}</span>
          )}
        </div>

        {showDetails && (
          <>
            {step.description && (
              <p className="text-xs text-gray-500">{step.description}</p>
            )}
            {step.final && (
              <p className="text-xs text-red-500 mt-1">
                This status can be one possible final outcome.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// MAIN TIMELINE COMPONENT
const Timeline = ({
  steps = [],
  orientation = "vertical", // vertical or horizontal
  styleType = "basic", // basic or card
  showDetails = false,
}) => {
  // Helper to decide which step component to use
  const StepComponent =
    styleType === "card" ? TimelineStepCard : TimelineStepBasic;

  if (orientation === "vertical") {
    // === VERTICAL TIMELINE LAYOUT ===
    return (
      <div className="relative border-l border-gray-200 pl-6">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.id} className="relative">
              {/* The vertical line extension */}
              {!isLast && (
                <span
                  className="absolute left-0 top-0 h-full border-l border-gray-200"
                  style={{ marginLeft: "6px", zIndex: -1 }}
                />
              )}

              <StepComponent step={step} showDetails={showDetails} />
            </div>
          );
        })}
      </div>
    );
  } else {
    // === HORIZONTAL TIMELINE LAYOUT ===
    return (
      <div className="overflow-x-auto">
        <div className="flex items-center gap-8">
          {steps.map((step, idx) => {
            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative"
              >
                {/* Step line on the top (except for the first element) */}
                {idx > 0 && (
                  <div
                    className="absolute left-[-50%] top-3 h-0.5 bg-gray-200"
                    style={{ width: "100%" }}
                  />
                )}

                {/* Step Icon + Title container */}
                <div className="flex flex-col items-center gap-2">
                  {getStatusIcon(step.status)}
                  <h3 className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {step.title}
                  </h3>
                  {step.isOptional && (
                    <span className="bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-full">
                      Optional
                    </span>
                  )}
                  {step.timestamp && (
                    <span className="text-xs text-gray-400">
                      {step.timestamp}
                    </span>
                  )}

                  {/* Optional details */}
                  {showDetails && styleType === "basic" && step.description && (
                    <p className="text-xs text-gray-500 mt-1 text-center max-w-xs">
                      {step.description}
                    </p>
                  )}
                  {showDetails && styleType === "card" && (
                    <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm max-w-xs mt-2">
                      {step.description && (
                        <p className="text-xs text-gray-500">
                          {step.description}
                        </p>
                      )}
                      {step.final && (
                        <p className="text-xs text-red-500 mt-1">
                          This status can be one possible final outcome.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default function RideProgressTimeline() {
  // State for controlling layout & style
  const [orientation, setOrientation] = useState("vertical"); // or "horizontal"
  const [styleType, setStyleType] = useState("basic"); // or "card"
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-md p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Ride Progress Timeline</h1>

        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Orientation Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orientation:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setOrientation("vertical")}
                className={`px-3 py-1 rounded ${
                  orientation === "vertical"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Vertical
              </button>
              <button
                onClick={() => setOrientation("horizontal")}
                className={`px-3 py-1 rounded ${
                  orientation === "horizontal"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Horizontal
              </button>
            </div>
          </div>

          {/* Style Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Style Type:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setStyleType("basic")}
                className={`px-3 py-1 rounded ${
                  styleType === "basic"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setStyleType("card")}
                className={`px-3 py-1 rounded ${
                  styleType === "card"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Card
              </button>
            </div>
          </div>

          {/* Show/Hide Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details:
            </label>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className={`px-3 py-1 rounded ${
                showDetails
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
          </div>
        </div>

        {/* TIMELINE */}
        <Timeline
          steps={stepsData}
          orientation={orientation}
          styleType={styleType}
          showDetails={showDetails}
        />
      </div>
    </div>
  );
}
