// SidebarItem.jsx
import React from 'react';

const SidebarItem = ({ label, href }) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {label}
      </a>
    </li>
  );
};

export default SidebarItem;
