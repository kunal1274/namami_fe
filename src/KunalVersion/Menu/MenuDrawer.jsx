import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Menu1 from "./Menu1"; // or wherever your Menu1 is located
import Menu2 from "./Menu2"; // or wherever your Menu2 is located
import Menu2Overlay from "./Menu2Overlay";

/**
 * Side drawer that can show either Menu1 or Menu2
 */
const MenuDrawer = ({ showDrawer, onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState("menu1"); // default
  const [showMenu2, setShowMenu2] = useState(false);

  // If not shown, hide the entire overlay
  if (!showDrawer) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay (click to close) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Drawer Panel */}
      <div
        className="
        relative
        w-[250px] md:w-[320px]
        h-full
        bg-white
        shadow-xl
        animate-slideInLeft
      "
      >
        {/* Close / X Icon (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Toggle which menu to show */}
        <div className="p-4 flex gap-4">
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              selectedMenu === "menu1"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedMenu("menu1")}
          >
            Menu 1
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              selectedMenu === "menu2"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setSelectedMenu("menu2");
              setShowMenu2(true);
            }}
          >
            Menu 2
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              selectedMenu === "menu3"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedMenu("menu3")}
          >
            Menu 3
          </button>
        </div>

        {/* Render the chosen menu */}
        <div className="mt-2 h-full overflow-auto">
          {selectedMenu === "menu1" && <Menu1 />}
          {selectedMenu === "menu2" && (
            <Menu2Overlay
              isOpen={showMenu2}
              onClose={() => setShowMenu2(false)}
            />
          )}
          {selectedMenu === "menu3" && <Menu2 />}
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
