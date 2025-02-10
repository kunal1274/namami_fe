import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom"; // Added Routes and Route
import Sidebar from "../SideBar/Sidebar";
import Header from "../Header/Header";
import CustomerPage from "../../Customer/CustomerPage"; // Fixed component import
import ItemPage from "../../item/Itempage";
import VendorPage from "../../Vender/VendorPage";
import SaleOrderPage from "../../Sale/SaleOrderPage";
import AllocationHistory from "../../Sale//AllocationHistory";
import CancelSaleOrder from "../../Sale/CancelSaleOrder";

// import Report from "./Sale/Report";
import PurchaseOrderPage from "../../Purchase/PurchaseOrderPage";
import Invoice from "../../Sale/Invoice/Inv";
import SaleorderViewPage from "../../Sale/SaleorderViewPage";
import ByCustomerReport from "../../Sale/ByReport/ByCustomerReport";
import ByItemReport from "../../Sale/ByReport/ByItemReport";

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

<<<<<<< Updated upstream
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Header />
        <div className="p-4">
          {" "}
          {/* Add padding to main content */}
          <Routes>
            {/* Define Routes */}
            <Route path="/" element={<CustomerPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/itempage" element={<ItemPage />} />
            <Route path="/vender" element={<VendorPage />} />
            <Route path="/salepage" element={<SaleOrderPage />} />
            <Route path="/invoice/:saleOrderNum" element={<Invoice />} />
            <Route path="/AllocationHistory" element={<AllocationHistory />} />
            <Route path="/CancelSaleOrder" element={<CancelSaleOrder />} />
            {/* <Route path="/ConfirmSaleorder" element={<ConfirmSaleorder />} /> */}
            <Route path="/purchasepage" element={<PurchaseOrderPage />} />
            {/*   <Route path="/invoice/:saleId" element={<Invoice />} />       Add padding to main content */}
            <Route path="/saleorderviewpage" element={<SaleorderViewPage />} />
            <Route path="/bycustomerreport" element={<ByCustomerReport />} />
            <Route path="/byitemreport" element={<ByItemReport />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
=======
    {/* Main Content */}
    <div className="flex flex-col flex-1 overflow-auto">
      <Header />
      <div className="p-4"> {/* Add padding to main content */}
        <Routes>
          {/* Define Routes */}
          <Route path="/" element={<CustomerPage />} />
        
          <Route path="/customer" element={<CustomerPage />} />
          {/* Add more routes as needed */}
        </Routes>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Dashboard;
