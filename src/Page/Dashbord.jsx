import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom"; // Added Routes and Route
import Sidebar from "./Sidebar";
import Header from "./Header";
import CustomerPage from "../Customer/Page"; // Fixed component import

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Home"); // Track the selected option
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    setSelectedOption(route); // Update the selected option
    navigate(route); // Navigate to the selected route
  };

  return (
    <div className="flex justify-center container_app">
    {/* Sidebar */}
    <Sidebar
      isOpen={isSidebarOpen}
      toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      onNavigate={handleNavigation} // Pass navigation handler to Sidebar
    />

    {/* Main Content */}
    <div className="flex flex-col flex-1 overflow-auto">
      <Header />
      <div className="p-4"> {/* Add padding to main content */}
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<CustomerPage />} />
          <Route path="/Vender" element={<VendorPage/>} />
          <Route path="/customer" element={<CustomerPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
