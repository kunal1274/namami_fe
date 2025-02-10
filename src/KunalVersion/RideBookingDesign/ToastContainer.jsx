// src/components/ToastContainer.jsx
import React from "react";

/**
 * A container that shows tailwind-styled toast messages.
 * Expects props.toasts to be an array of { id, message, type } objects.
 */
const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow text-white ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="mr-2">{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-white ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
