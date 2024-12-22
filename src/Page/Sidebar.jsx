import {
  FaHome,
  FaBox,
  FaHeart,
  FaBell,
  FaSignOutAlt,
 FaWrench,
  FaUser,
  
  FaBars,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem ";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`flex-shrink-0 ${
        isOpen ? "w-64" : "w-16"
      } bg-white shadow-md transition-all`}
    >
      <div
        className={`flex items-center justify-between border-b ${
          isOpen ? "p-5" : "py-6 px-4"
        }`}
      >
        {isOpen && (
          <h1 className="text-lg font-bold text-blue-500">DashStack</h1>
        )}
        <FaBars
          className="cursor-pointer"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        />
      </div>
      <nav className="flex flex-col space-y-2 mt-4 text-black">
        <div className="border-b pb-2">
       

          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            path="/"
            isOpen={isOpen}
          />
        <FontAwesomeIcon icon="fa-brands fa-react" />
          <SidebarItem
            icon={< FaUser/>}
            label="Customer"
           
            isOpen={isOpen}
          />
           <SidebarItem
            icon={<FaUser/>}
            label="Vender"
     
            isOpen={isOpen}
          />
          <SidebarItem
            icon={< FaBox/>}
            label="Item"
            path="/favorites"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaBox />}
            label="Bank"
            path="/inbox"
            isOpen={isOpen}
          />
        </div>

        <SidebarItem
        icon={<FaBox />}
          label="Ledger"
          path="/logout"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<FaBox />}
          label="Tax"
          path="/logout"
          isOpen={isOpen}
        />

<SidebarItem
          icon={< FaWrench/>}
          label="Setting"
          path="/Setting"
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
