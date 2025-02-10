import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function ActionsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Example: handle each action
  const handleActionClick = (action) => {
    console.log("Clicked:", action);
    // do something with action...
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="inline-flex items-center px-2 py-1 border border-gray-300 
                   bg-white text-gray-700 hover:bg-gray-100 rounded-md 
                   focus:outline-none"
      >
        Actions
        <ChevronDownIcon className="h-4 w-4 ml-1" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg 
                     ring-1 ring-black ring-opacity-5 z-10"
        >
          <div className="py-1">
            <button
              onClick={() => handleActionClick("Cancel")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => handleActionClick("Post Shipment")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Post Shipment
            </button>
            <button
              onClick={() => handleActionClick("Post Delivery")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Post Delivery
            </button>
            <button
              onClick={() => handleActionClick("Post Invoice")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Post Invoice
            </button>
            <button
              onClick={() => handleActionClick("Post Credit Note")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Post Credit Note
            </button>
            <button
              onClick={() => handleActionClick("Refund")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100"
            >
              Refund
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
