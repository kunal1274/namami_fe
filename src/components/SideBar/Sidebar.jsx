import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaBox, FaUser, FaBars, FaWrench } from "react-icons/fa";

const SidebarItem = ({ icon, label, isOpen, path, onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => {
        if (path) navigate(path);
        if (onClick) onClick();
      }}
      className={`flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer transition ${
        isActive ? "bg-gray-200 font-semibold" : ""
      }`}
      role="button"
      aria-label={label}
    >
      {icon}
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubMenu = (menu) =>
    setActiveMenu(activeMenu === menu ? null : menu);
  const toggleReportSubMenu = () =>
    setActiveSubmenu(activeSubmenu === "report" ? null : "report");

  return (
    <div
      className={`bg-white shadow-md h-screen transition-all ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="flex items-center justify-end p-3 cursor-pointer"
        role="button"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </div>

      {/* Sidebar Items */}
      <SidebarItem
        icon={<FaHome />}
        label="Dashboard"
        path="/dashboard"
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<FaUser />}
        label="Customer"
        path="/customer"
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<FaBox />}
        label="Item"
        path="/itempage"
        isOpen={isOpen}
      />

      {/* Sales Menu */}
      <div>
        <SidebarItem
          icon={<FaBox />}
          label="Sales"
          isOpen={isOpen}
          onClick={() => toggleSubMenu("sales")}
        />
        {activeMenu === "sales" && isOpen && (
          <div className="ml-6 space-y-2">
            {[
              { label: "All Sale Orders", path: "/salepage" },
              { label: "Confirm Sale Orders", path: "/ConfirmSaleorder" },
              { label: "Cancel Sale Orders", path: "/CancelSaleOrder" },
              { label: "Allocation History", path: "/AllocationHistory" },
              {
                label: "Report",
                path: null, // No navigation, just opens submenu
                onClick: toggleReportSubMenu,
              },
            ].map((item) => (
              <SidebarItem
                key={item.label}
                icon={<FaBox />}
                label={item.label}
                path={item.path}
                isOpen={isOpen}
                onClick={item.onClick}
              />
            ))}
            {activeSubmenu === "report" && (
              <div className="ml-6 space-y-2">
                {[
                  { label: "By Customer", path: "/bycustomerreport" },
                  { label: "By Item", path: "/byitemreport" },
                  { label: "By Invoice", path: "/ReportByInvoice" },
                  { label: "By Confirm ", path: "/ReportByInvoice" },
                  { label: "By Date", path: "/ReportByInvoice" },
                ].map((subItem) => (
                  <SidebarItem
                    key={subItem.label}
                    icon={<FaBox />}
                    label={subItem.label}
                    path={subItem.path}
                    isOpen={isOpen}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Menus */}
      <SidebarItem
        icon={<FaUser />}
        label="Vendor"
        path="/vender"
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<FaBox />}
        label="Purchase"
        path="/purchasepage"
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<FaBox />}
        label="Ledger"
        path="/ledger"
        isOpen={isOpen}
      />
      <SidebarItem icon={<FaBox />} label="Bank" path="/bank" isOpen={isOpen} />
      <SidebarItem icon={<FaBox />} label="Tax" path="/tax" isOpen={isOpen} />
      <SidebarItem
        icon={<FaWrench />}
        label="Setting"
        path="/setting"
        isOpen={isOpen}
      />
    </div>
  );
};

export default Sidebar;
