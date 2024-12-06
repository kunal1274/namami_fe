import React, { useState } from "react";

import {
  FaBars,
  FaSearch,
  FaHome,
  FaBox,
  FaHeart,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

import { FaFilter } from "react-icons/fa";

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
  Completed: "text-green-500 bg-green-100",
  Processing: "text-blue-500 bg-blue-100",
  Rejected: "text-red-500 bg-red-100",
  "On Hold": "text-orange-500 bg-orange-100",
  "In Transit": "text-purple-500 bg-purple-100",
};

const Table = () => {
  return (
    <div className="overflow-x-auto max-h-96 bg-white rounded-md shadow">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-20">
          <tr>
            {["ID", "NAME", "ADDRESS", "DATE", "TYPE", "STATUS"].map(
              (header, index) => (
                <th
                  key={header}
                  className={`px-6 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap ${
                    index === 0 ? "sticky top-0 left-0 bg-gray-200 z-30" : ""
                  }`}
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
              {/* Sticky First Column */}
              <td className="px-6 py-3 whitespace-nowrap sticky left-0 bg-white z-10 border-r">
                {row.id}
              </td>
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
          <SidebarItem icon={<FaHome />} label="Dashboard" isOpen={isOpen} />
          <SidebarItem icon={<FaBox />} label="Products" isOpen={isOpen} />
          <SidebarItem icon={<FaHeart />} label="Favorites" isOpen={isOpen} />
          <SidebarItem icon={<FaBell />} label="Inbox" isOpen={isOpen} />
        </div>

        <SidebarItem icon={<FaSignOutAlt />} label="Logout" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer">
    {icon}
    {isOpen && <span className="text-sm font-medium">{label}</span>}
  </div>
);

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="p-6 overflow-hidden">
          <h1 className="text-2xl font-bold mb-4">Order Lists</h1>
          <FilterBar />
          <div className="overflow-x-auto">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
