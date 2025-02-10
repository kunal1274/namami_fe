// SidebarButton.jsx
import React from 'react';

const SidebarButton = ({ isOpen, onClick, label, icon, children }) => {
  return (
    <button
      type="button"
      className={`flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${isOpen ? 'bg-gray-100' : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <svg
        aria-hidden="true"
        className={`w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${isOpen ? 'text-gray-900' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icon}
      </svg>
      <span className="flex-1 ml-3 text-left whitespace-nowrap">{label}</span>
      <svg
        aria-hidden="true"
        className={`w-6 h-6 ${isOpen ? 'rotate-180' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default SidebarButton;
