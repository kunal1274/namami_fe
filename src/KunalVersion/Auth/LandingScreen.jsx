import React from "react";

export function LandingScreen() {
  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Some large circle placeholder */}
      <div className="w-64 h-64 bg-gray-100 rounded-full mb-6"></div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Set your location
      </h2>
      <p className="text-gray-500 text-sm text-center px-6">
        Enable location sharing so that your driver can see where you are
      </p>

      {/* Dots for multi-step onboarding */}
      <div className="flex space-x-2 mt-6">
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        <span className="w-2 h-2 rounded-full bg-blue-300 border border-blue-400"></span>
      </div>
    </div>
  );
}
