import React from "react";

const ControlPanel = ({ selectedMenu, onChangeMenu }) => {
  return (
    <div className="p-4 flex gap-4 items-center justify-center">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="menu"
          value="menu1"
          checked={selectedMenu === "menu1"}
          onChange={(e) => onChangeMenu(e.target.value)}
        />
        <span className="text-gray-700">Menu 1</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="menu"
          value="menu2"
          checked={selectedMenu === "menu2"}
          onChange={(e) => onChangeMenu(e.target.value)}
        />
        <span className="text-gray-700">Menu 2</span>
      </label>
    </div>
  );
};

export default ControlPanel;
