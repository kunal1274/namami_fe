import React, { useState } from "react";
import Menu1 from "./Menu1";
import Menu2 from "./Menu2";
import ControlPanel from "./ControlPanel";

function MenuApp1() {
  const [selectedMenu, setSelectedMenu] = useState("menu1");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Control Panel at the top */}
      <ControlPanel
        selectedMenu={selectedMenu}
        onChangeMenu={(menuValue) => setSelectedMenu(menuValue)}
      />

      {/* Render the selected menu */}
      <div className="flex-1">
        {selectedMenu === "menu1" && <Menu1 />}
        {selectedMenu === "menu2" && <Menu2 />}
      </div>
    </div>
  );
}

function MenuApp() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Menu 1 */}
      <Menu1 />

      {/* Right side: Menu 2 (or any other content) */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        {/* If you'd like to show Menu2 floating in the center */}
        <Menu2 />
      </div>
    </div>
  );
}

export default MenuApp;
