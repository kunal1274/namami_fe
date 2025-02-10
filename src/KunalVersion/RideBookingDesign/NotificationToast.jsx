import React from "react";

// Notification Toast
export function NotificationToast({ message, type = "info" }) {
  // Determine dot color based on "type"
  const dotColor =
    {
      error: "text-red-500",
      success: "text-green-500",
      info: "text-blue-600",
      neutral: "text-gray-400",
    }[type] || "text-blue-600";

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-md">
        <span className={`${dotColor} text-sm`}>●</span>
        <span className="text-gray-800 text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
