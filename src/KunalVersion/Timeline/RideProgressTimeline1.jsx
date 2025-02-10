import React from "react";
import { steps } from "./stepsData";

// Some example icons from Heroicons (you can use any icon library)
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";

const statusIcon = (status) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    case "in-progress":
      // e.g. a spinner or any icon
      return (
        <svg
          className="animate-spin h-6 w-6 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      );
    case "pending":
      return <ClockIcon className="h-6 w-6 text-gray-400" />;
    default:
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
  }
};

const RideProgressTimeline1 = () => {
  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-xl font-semibold mb-6">Ride Progress</h2>
      <div className="relative pl-6 border-l border-gray-300">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.id} className="relative mb-8">
              {/* The vertical line */}
              {!isLast && (
                <span
                  className="absolute left-0 top-0 h-full border-l border-gray-300"
                  style={{ marginLeft: "5px", zIndex: -1 }}
                ></span>
              )}

              {/* Icon */}
              <div
                className="absolute -left-3 top-0 bg-white rounded-full p-1"
                style={{ zIndex: 1 }}
              >
                {statusIcon(step.status)}
              </div>

              {/* Step content */}
              <div className="ml-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700 text-sm">
                    {step.title}
                    {step.isOptional && (
                      <span className="text-xs text-gray-400 italic ml-2">
                        (Optional)
                      </span>
                    )}
                  </h3>
                  {step.timestamp && (
                    <span className="text-xs text-gray-400">
                      {step.timestamp}
                    </span>
                  )}
                </div>
                {/* Example sub-description or note */}
                {step.final && (
                  <p className="text-xs text-red-500 mt-1">
                    This is a possible final status.
                  </p>
                )}
                {/* You can add more detail here as needed */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RideProgressTimeline1;
