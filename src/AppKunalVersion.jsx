import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaFile, FaPeopleGroup } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0/customer";
// const baseUrl = "http://localhost:5050/fms/api/v0/customer";

import {
  FaBars,
  FaSearch,
  FaHome,
  FaBox,
  FaHeart,
  FaBell,
  FaSignOutAlt,
  FaList,
  FaGrin,
  FaAccusoft,
} from "react-icons/fa";

import { FaFilter } from "react-icons/fa";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import FileUpload from "./KunalVersion/FileUpload/FileUpload";
import AppCreateCustomer from "./KunalVersion/CustomerMaster/AppCreateCustomer";
import ClientFeatures from "./KunalVersion/ClientFeatures/ClientFeatures";
import OneTimeOrder from "./KunalVersion/SalesOrders/OneTimeOrder";
import OneTimeOneItemOrder from "./KunalVersion/SalesOrders/OneTimeOneItemSalesOrders";
import OneTimeCustomerOrder from "./KunalVersion/SalesOrders/OneTimeCustomerOrder";
import SalesOrder from "./KunalVersion/Sales/pages/SalesOrder";
// import MultiStepForm from "./KunalVersion/Bookings/Bookings";
// import TimelineTracker from "./KunalVersion/Bookings/Bookings";
import RideManagement from "./KunalVersion/Bookings/Bookings";
// import AppToDo from "./KunalVersion/ToDo/_App";
import AppToDoDnD from "./KunalVersion/ToDo/ToDo";
import AppOto from "./KunalVersion/oto/MainApp";
import RideProgressTimeline from "./KunalVersion/Timeline/RideProgressTimeline";
import RidePayments from "./KunalVersion/Payments/RidePayments";
import DriverService from "./KunalVersion/DriverService/DriverService";
import { GlobalProvider } from "./KunalVersion/DriverService/context/GlobalContext";
import Booking from "./KunalVersion/DriverService/pages/Booking";
import AllocatorDashboard from "./KunalVersion/DriverService/pages/AllocatorDashboard";
import DriverDashboard from "./KunalVersion/DriverService/pages/DriverDashboard";
import Payment from "./KunalVersion/DriverService/pages/Payment";
import PaymentSuccess from "./KunalVersion/DriverService/pages/PaymentSuccess";
import RideBookingLanding from "./KunalVersion/RideBookingDesign/RideBookingLanding";
import TimeCalculation from "./KunalVersion/RideBookingDesign/TimeCalculation";
import RideBookingLandingDup from "./KunalVersion/RideBookingDesign/RideBookingLandingDup";
import MenuApp from "./KunalVersion/Menu/MenuApp";
import BookingHistory from "./KunalVersion/RideBookingDesign/BookingHistory";
import ArrivingDetailsPage from "./KunalVersion/RideBookingDesign/ArrivingDetailsPage";
import ArrivedPage from "./KunalVersion/RideBookingDesign/ArrivedPage";
import OnTripPage from "./KunalVersion/RideBookingDesign/OnTrip";
import RatePage from "./KunalVersion/RideBookingDesign/RatePage";
import TipsPage from "./KunalVersion/RideBookingDesign/TipsPage";
import { TripEndedPage } from "./KunalVersion/RideBookingDesign/TripEndedPage";
import { NotificationToast } from "./KunalVersion/RideBookingDesign/NotificationToast";
import { TutorialOverlay } from "./KunalVersion/RideBookingDesign/TutorialOverlay";
import RideProgressTimeline1 from "./KunalVersion/Timeline/RideProgressTimeline1";
import AppResume from "./KunalVersion/Resume/Resume";
import Resume from "./KunalVersion/Resume/Resume";
import SampleResume from "./KunalVersion/Resume/SampleResume";
import ResumeDocx from "./KunalVersion/Resume/ResumeDocx";
import CardPage from "./KunalVersion/RideBookingDesign/CardPage";
import Promo from "./KunalVersion/RideBookingDesign/Promo";
import Support from "./KunalVersion/RideBookingDesign/Support";
import AuthFlow from "./KunalVersion/Auth/AuthFlow";
import { ProfilePage } from "./KunalVersion/Profile/ProfilePage";
import ProfileScreen from "./KunalVersion/Profile/ProfileScreen";
import NetflixResume from "./KunalVersion/Resume/Netflix";
import AmazonResume from "./KunalVersion/Resume/AmazonResume";
import GenpactResume from "./KunalVersion/Resume/GenpactResume";
import KunalGenpactResume from "./KunalVersion/Resume/KunalGenpactResume";
import KunalGenpactResumeDocx from "./KunalVersion/Resume/KGP";
import KunalWhatsappResume from "./KunalVersion/Resume/KunalWhatsappResume";
import {
  KunalFlagResume,
  KunalIndianResume,
  KunalSanskritResume,
} from "./KunalVersion/Resume/KunalIndianResume";

const data = Array.from({ length: 50 }, (_, i) => ({
  id: `0000${i + 1}`,
  name: `Name ${i + 1}`,
  address: `Address ${i + 1} Address ${3 * i + 7} Address ${100 * i + 9}
  Address ${2 * i + 3}`,
  date: `01 Jan 202${i % 10}`,
  type: `Type ${i % 5}`,
  status: ["Completed", "Processing", "Rejected", "On Hold", "In Transit"][
    i % 5
  ],
}));

const statusColors = {
  Approved: "text-green-500 bg-green-100",
  Completed: "text-green-500 bg-green-100",
  Processing: "text-blue-500 bg-blue-100",
  Rejected: "text-red-500 bg-red-100",
  "On Hold": "text-orange-500 bg-orange-100",
  "In Transit": "text-purple-500 bg-purple-100",
  Pending: "text-orange-500 bg-orange-100",
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  { id: "2", data: { label: "Middle" }, position: { x: 250, y: 150 } },
  {
    id: "3",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 300 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e1-3", source: "1", target: "3" },
];

const Table = ({
  tableData,
  selectedRows,
  favorites,
  onRowSelect,
  onSelectAll,
  selectAll,
  onFavoriteToggle,
}) => {
  return (
    <div className="overflow-x-auto max-h-96 bg-white rounded-md shadow">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-20">
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={onSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700">
              <FaHeart />
            </th>
            {[
              "CODE",
              "NAME",
              "CONTACT",
              "ADDRESS",
              "CURRENCY",
              "PAN NUM",
              "REG NUM",
              "ACTIVE",
              "STATUS",
            ].map((header, index) => (
              <th
                key={header}
                className={`px-6 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap ${
                  index === 0 ? "sticky top-0 left-0 bg-gray-200 z-30" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableData.map((row) => (
            <tr key={row.code}>
              {/* Checkbox Column */}
              <td className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.code)}
                  onChange={() => onRowSelect(row.code)}
                  className="cursor-pointer"
                />
              </td>

              {/* Favorite Column */}
              <td className="px-6 py-3">
                <button
                  onClick={() => onFavoriteToggle(row.code)}
                  className="cursor-pointer"
                >
                  {favorites.includes(row.code) ? (
                    <span className="text-yellow-500">&#9733;</span> // Filled star
                  ) : (
                    <span className="text-gray-400">&#9734;</span> // Empty star
                  )}
                </button>
              </td>
              {/* Sticky First Column */}
              <td className="px-6 py-3 whitespace-nowrap sticky left-0 bg-white z-10 border-r">
                {row.code}
              </td>
              <td className="px-6 py-3 truncate">{row.name}</td>
              <td className="px-6 py-3 whitespace-normal truncate">
                {row.contactNum}
              </td>
              <td className="px-6 py-3 whitespace-normal truncate">
                {row.address}
              </td>
              <td className="px-6 py-3 truncate">{row.currency}</td>
              <td className="px-6 py-3 truncate">{row.panNum}</td>
              <td className="px-6 py-3 truncate">{row.registrationNum}</td>
              <td className="px-6 py-3 truncate">
                {row.active ? "Yes" : "No"}
              </td>
              <td className="px-6 py-3 truncate">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    statusColors[row.active ? "Approved" : "Pending"]
                  }`}
                >
                  {row.active ? "Approved" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const TableV1 = () => {
  return (
    <div className="overflow-x-auto max-h-96 bg-white rounded-md shadow">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {["ID", "NAME", "ADDRESS", "DATE", "TYPE", "STATUS"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 bg-gray-100 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-3 whitespace-nowrap">{row.id}</td>
              <td className="px-6 py-3 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-3 whitespace-nowrap">{row.address}</td>
              <td className="px-6 py-3 whitespace-nowrap">{row.date}</td>
              <td className="px-6 py-3 whitespace-nowrap">{row.type}</td>
              <td className="px-6 py-3 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    statusColors[row.status]
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const dataV0 = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "04 Sep 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "28 May 2019",
    type: "Book",
    status: "Processing",
  },
  // Add more rows as needed
];

const statusColorsV0 = {
  Completed: "text-green-500 bg-green-100",
  Processing: "text-blue-500 bg-blue-100",
  Rejected: "text-red-500 bg-red-100",
};

const TableV0 = () => {
  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {["ID", "NAME", "ADDRESS", "DATE", "TYPE", "STATUS"].map(
              (header) => (
                <th
                  key={header}
                  className="text-left px-6 py-3 bg-gray-100 text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              <td className="px-6 py-3">{row.id}</td>
              <td className="px-6 py-3">{row.name}</td>
              <td className="px-6 py-3">{row.address}</td>
              <td className="px-6 py-3">{row.date}</td>
              <td className="px-6 py-3">{row.type}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    statusColors[row.status]
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-sm text-gray-500">Showing 1-9 of 78</div>
    </div>
  );
};

const FilterBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white rounded-md shadow mb-6 space-y-4 md:space-y-0 md:space-x-4">
      {/* Left Section: Filters and Search */}
      <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Filter Button */}
        <button className="flex items-center px-3 py-2 bg-gray-200 rounded">
          <FaFilter className="mr-2" />
          Filter By
        </button>

        {/* Date Select Dropdown */}
        <select className="outline-none border rounded px-3 py-2">
          <option>Date</option>
          <option>Order Type</option>
        </select>

        {/* Order Status Dropdown */}
        <select className="outline-none border rounded px-3 py-2">
          <option>Order Status</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => alert(`Searching for "${searchTerm}"`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </div>
      </div>

      {/* Right Section: Reset Button */}
      <div className="w-full md:w-auto flex justify-end">
        <button className="text-red-500">Reset Filter</button>
      </div>
    </div>
  );
};

const FilterBarV0 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow mb-6">
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-3 py-2 bg-gray-200 rounded">
          <FaFilter className="mr-2" />
          Filter By
        </button>
        <select className="outline-none border rounded px-3 py-2">
          <option>Date</option>
          <option>Order Type</option>
        </select>
        <select className="outline-none border rounded px-3 py-2">
          <option>Order Status</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => alert(`Searching for "${searchTerm}"`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </div>
      </div>
      <button className="text-red-500">Reset Filter</button>
    </div>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md px-6 py-3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-full py-2 px-4 pl-10 w-80"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="flex items-center space-x-4">
        <FaBell className="cursor-pointer" />
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="profile"
            className="rounded-full w-8 h-8"
          />
          <span className="text-sm">Moni Roy</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`flex-shrink-0 ${isOpen ? "w-64" : "w-16"} bg-white shadow-md`}
    >
      <div
        className={`flex items-center justify-between border-b ${
          isOpen ? "p-5" : "py-6 px-4"
        }`}
      >
        {isOpen && (
          <h1 className="text-lg font-bold text-blue-500">DashStack</h1>
        )}
        <FaBars className="cursor-pointer" onClick={toggleSidebar} />
      </div>
      <nav className="flex flex-col space-y-2 mt-4">
        <div className="border-b pb-2">
          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            path="/"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaBox />}
            label="Products"
            path="/products"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaHeart />}
            label="Favorites"
            path="/favorites"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<FaBell />}
            label="Inbox"
            path="/inbox"
            isOpen={isOpen}
          />
        </div>

        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          path="/logout"
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen, path }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)} // Navigate programmatically
      className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer"
    >
      {icon}
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
};

const CustomerListTable = () => {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const listName = "Customer Lists";
  const [selectedRows, setSelectedRows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(customerList.map((row) => row.code)); // Select all
    }
    setSelectAll(!selectAll);
  };

  const handleFavoriteToggle = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Fetch All Customers
  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const response = await axios.get(baseUrl, {
          withCredentials: false,
        });
        console.log(response);
        setCustomerList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setMessage("Failed to load customer data.");
      }
    }
    loadCustomers();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">{listName}</h1>
        <div className="flex flex-row justify-center items-center space-x-2">
          <button
            onClick={() => navigate("/customers/create")} // Navigate to the form
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add New Customer
          </button>
        </div>
      </div>

      <FilterBar />

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <Table
            tableData={customerList}
            selectedRows={selectedRows}
            favorites={favorites}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            selectAll={selectAll}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="flex flex-auto items-center space-x-4">
        <Link
          to="/"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <FaHome />
          <h5>Home</h5>
        </Link>
        <Link
          to="/customers"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <IoPeopleCircleSharp />
          <h5>Customers</h5>
        </Link>
        <Link
          to="/vendors"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <FaPeopleGroup />
          <h5>Vendors</h5>
        </Link>
        <Link
          to="/app"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <FaList />
          <h5>App Features</h5>
        </Link>
        <Link
          to="/reactflow"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <FaAccusoft />
          <h5>React Flow</h5>
        </Link>
        <Link
          to="/fileupload"
          className="text-blue-500 underline hover:text-blue-700 flex flex-row space-x-1 items-center"
        >
          <FaFile />
          <h5>File Upload</h5>
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        {/**Customer list section */}

        <div className="p-6 overflow-auto">
          {/* <h1 className="text-2xl font-bold mb-4">Customer Lists</h1>
          <FilterBar />
          <div className="overflow-x-auto">
            <Table />
          </div> */}
          <section className="mb-10">
            <Outlet />
            {/* <CustomerListTable /> */}
          </section>
          <section className="mb-10 pt-4 border-t-2">
            <p>For Future Use</p>
            {/* <AppCreateContact /> */}
            {/* <AddNewContact /> */}
            {/* <TeamMainContent /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ member }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col items-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-200"
      />
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-sm text-gray-600">{member.role}</p>
      <p className="text-xs text-gray-500">{member.email}</p>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jukkoe Sisao",
    role: "CEO",
    email: "sibyl_kozey@gmail.com",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Harriet King",
    role: "CTO",
    email: "nadia_block@hotmail.com",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Lenora Benson",
    role: "Lead",
    email: "feil.wallace@kunde.us",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    name: "Olivia Reese",
    role: "Strategist",
    email: "kemmer.hattie@cremin.us",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "Bertha Valdez",
    role: "CEO",
    email: "loraine.koelpin@tromp.io",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    name: "Harriett Payne",
    role: "Digital Marketer",
    email: "nannie.west@estrella.tv",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    name: "George Bryant",
    role: "Social Media",
    email: "delmer.king@gmail.com",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    name: "Lily French",
    role: "Strategist",
    email: "lucienne.herman@hotmail.com",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 10,
    name: "Howard Adkins",
    role: "CEO",
    email: "wiegand.leonor@herman.us",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 11,
    name: "Earl Bowman",
    role: "Digital Marketer",
    email: "waino_altenwerth@nicolette.tv",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 12,
    name: "Patrick Padilla",
    role: "Social Media",
    email: "octavia.nienow@gleichner.net",
    image: "https://via.placeholder.com/100",
  },
];

const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {teamMembers.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
};

const TeamMainContent = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen overflow-x-auto">
      <header className="w-full bg-white shadow-md py-4 px-6">
        <h1 className="text-3xl font-bold">Team</h1>
      </header>
      <main className="w-full max-w-7xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Our Team Members</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add New Member
          </button>
        </div>

        <TeamGrid />
      </main>
    </div>
  );
};

// Moved to folder : KunalVersion/CustomerMaster
const AppCreateCustomerV1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNum: "",
    email: "",
    currency: "",
    panNum: "",
    registrationNum: "Male",
    billingAddress: "",
    deliveryAddress: "",
    isActive: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    navigate("/");
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{`Adding New Customer`}</h1>

      <form
        onSubmit={handleSubmit}
        //className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md border border-blue-500"
      >
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
            {/* Upload Photo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2c-2.761 0-5 2.239-5 5v3h10v-3c0-2.761-2.239-5-5-5z"
                  />
                </svg>
              </div>
              <button className="text-blue-600 mt-2 text-sm hover:underline">
                Upload Photo
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter the Customer name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-600 mb-2">Phone Number</label>
                <input
                  name="contactNum"
                  type="text"
                  placeholder="Enter Customer Mobile or Phone Num"
                  value={formData.contactNum}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter the Customer Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              {/* Currency */}
              <div>
                <label className="block text-gray-600 mb-2">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white"
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>

              {/* PAN Number */}
              <div>
                <label className="block text-gray-600 mb-2">PAN Number</label>
                <input
                  name="panNum"
                  type="text"
                  placeholder="Enter Customer PAN number"
                  value={formData.panNum}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Registration Number
                </label>
                <input
                  name="registrationNum"
                  type="text"
                  placeholder="Enter Customer GST or Tax Reg. Number"
                  value={formData.registrationNum}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              {/* <div>
            <label className="block text-gray-600 mb-2">Expiry Date</label>
            <input
              type="time"
              placeholder="Enter Reg. Expiry Date"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div> */}

              <div>
                <label className="block text-gray-600 mb-2">
                  Billing Address
                </label>
                <textarea
                  name="billingAddress"
                  placeholder="Enter Customer billing address"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">
                  Delivery Address
                </label>
                <textarea
                  name="deliveryAddress"
                  placeholder="Enter Customer Delivery or Shipping address if differs"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                />
                <label htmlFor="isActive" className="ml-2 text-gray-700">
                  Active
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                Add Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const AppEditProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="border-b border-gray-200 mb-6">
          <ul className="flex space-x-4 text-gray-600">
            <li className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 cursor-pointer">
              Edit Profile
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Preferences</li>
            <li className="hover:text-blue-600 cursor-pointer">Security</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Picture */}
          <div className="col-span-full flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Edit
            </button>
          </div>

          {/* Input Fields */}
          <div>
            <label className="block text-gray-600 mb-2">Your Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">User Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Charlene Reed"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              placeholder="charlenereed@gmail.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              placeholder="********"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-3"
              defaultValue="1990-01-25"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Present Address</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">
              Permanent Address
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">City</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="San Jose"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Postal Code</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="45962"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Country</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="USA"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AppKunalVersion = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          {/* Nested Routes inside Dashboard */}
          <Route path="customers" element={<CustomerListTable />} />{" "}
          {/* Default route */}
          <Route path="customers/create" element={<AppCreateCustomer />} />
          {/**App Management */}
          <Route path="client-features" element={<ClientFeatures />} />
          {/**later can be used with to do and full control on ERP feature list when combined with to do  */}
          <Route path="sales-orders" element={<SalesOrder />} />{" "}
          {/** ERP Sales order screen. More Work required */}
          <Route path="todo" element={<AppToDoDnD />} />{" "}
          {/** Deep and Very Good Hierarchical Tree TO do  */}
          <Route path="payments" element={<RidePayments />} />{" "}
          {/** Payment Gateway page . more work later */}
          <Route path="timeline" element={<RideProgressTimeline1 />} />{" "}
          {/** Ride Transit Tracking More Work later */}
          <Route path="appoto" element={<AppOto />} />{" "}
          {/** Driver allocation board . More Work required */}
          <Route path="kunal-flag" element={<KunalFlagResume />} />
          <Route path="kunal-sanskrit" element={<KunalSanskritResume />} />
          <Route path="kunal-hindi" element={<KunalIndianResume />} />
          <Route path="kunalwa" element={<KunalWhatsappResume />} />
          <Route path="kunalgp" element={<KunalGenpactResume />} />
          <Route path="amazon" element={<AmazonResume />} />
          <Route path="genpact" element={<GenpactResume />} />
          <Route path="netflix" element={<NetflixResume />} />
          <Route path="resumedocx" element={<ResumeDocx />} />
          <Route path="resume" element={<Resume />} />
          <Route path="sample-resume" element={<SampleResume />} />
          {/** The below is under testing only */}
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="auth-flow" element={<AuthFlow />} />
          <Route path="support" element={<Support />} />
          <Route path="promo" element={<Promo />} />
          {/**OKAY */}
          <Route path="card" element={<CardPage />} />
          {/**OKAY */}
          <Route path="tripend" element={<TripEndedPage />} /> {/**OKAY */}
          <Route path="notification" element={<NotificationToast />} />{" "}
          {/**NOT OKAY */}
          <Route path="tutorial" element={<TutorialOverlay />} />{" "}
          {/** MORE required */}
          <Route path="rate" element={<RatePage />} /> {/**OKAY */}
          <Route path="tips" element={<TipsPage />} /> {/**OKAY */}
          <Route path="ontrip" element={<OnTripPage />} /> {/**OKAY */}
          <Route path="arrived" element={<ArrivedPage />} /> {/**OKAY */}
          <Route path="arriving" element={<ArrivingDetailsPage />} />{" "}
          {/**MORE Required */}
          <Route path="bookinghistory" element={<BookingHistory />} />{" "}
          {/**OKAY */}
          <Route path="bookride" element={<TimeCalculation />} />{" "}
          {/** Simple Book Ride */}
          <Route path="menu" element={<MenuApp />} />{" "}
          {/** NOT REQUIRED but menu1 and menu2 are required in Arrival page etc. */}
          <Route path="ridelanding" element={<RideBookingLanding />} />{" "}
          {/** GOING GOOD */}
          <Route
            path="ridelandingdup"
            element={<RideBookingLandingDup />}
          />{" "}
          {/**Another OKAY as an alternate */}
          <Route path="bookings" element={<RideManagement />} />{" "}
          {/**GOOD for event log, status changes and its activity */}
          <Route path="reactflow" element={<AppReactFlow />} />{" "}
          {/**LATER RESEARCH */}
          <Route
            path="fileupload"
            element={<FileUpload itemId={`6765a22849b0f297a4c58593`} />}
          />{" "}
          {/**MORE WORK Required */}
          {/* <Route
            path="driverservice"
            element={
              <GlobalProvider>
                <DriverService />
              </GlobalProvider>
            }
          >
            <Route index element={<Booking />} />
            <Route path="allocator" element={<AllocatorDashboard />} />
            <Route path="driver" element={<DriverDashboard />} />
            <Route path="payment" element={<Payment />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
          </Route> */}{" "}
          {/** this is for demo on how nested and deep nested thing works  */}
          {/* <Route path="todoremoved" element={<AppToDo />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* <Route path="/Team" element={<TeamMainContent />} /> */}
      </Routes>
    </>
  );
};

// 404Page.jsx

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 max-w-sm w-full text-center">
        {/* 404 Image */}
        <div className="mb-6">
          <div className="relative bg-blue-500 rounded-lg py-6 px-6">
            <div className="absolute top-0 left-0 flex gap-1 p-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <h1 className="text-6xl font-bold text-orange-400">404</h1>
          </div>
        </div>

        {/* Text */}
        <p className="text-lg text-gray-700 font-medium mb-6">
          Looks like you’ve got lost...
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Back to the Dashboard
        </button>
      </div>
    </div>
  );
};

function AppReactFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnScroll
        zoomOnScroll
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

function AppReactFlowV1() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "60vw", height: "50vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default AppKunalVersion;
