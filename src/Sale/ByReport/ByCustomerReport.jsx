import { Select } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ByCustomerReport = ({ handleAddSaleOrder }) => {
  const baseUrl = "https://befr8n.vercel.app/fms/api/v0/salesorders";
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState("All");

  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl);
      setSales(response.data.data);
      setFilteredSales(response.data.data);
    } catch (error) {
      console.error("Failed to load Sales:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  // Group sales by customer
  const groupSalesByCustomer = () => {
    return sales.reduce((acc, sale) => {
      const customerName = sale.customer?.name || "Unknown Customer";
      if (!acc[customerName]) {
        acc[customerName] = [];
      }
      acc[customerName].push(sale);
      return acc;
    }, {});
  };

  // Generate PDF Report by Customer
  const generateCustomerReport = () => {
    const groupedSales = groupSalesByCustomer();
    const doc = new jsPDF();
    doc.text("Sales Report by Customer", 14, 20);

    Object.keys(groupedSales).forEach((customer, index) => {
      if (index > 0) doc.addPage(); // Add a new page per customer
      doc.text(`Customer: ${customer}`, 14, 30);
      const tableColumn = ["Sale No.", "Item Name", "Quantity", "Price", "Total"];
      const tableRows = groupedSales[customer].map((sale) => [
        sale.orderNum || "N/A",
        sale.item?.name || "N/A",
        sale.quantity || "N/A",
        sale.price || "N/A",
        sale.lineAmt || "N/A",
      ]);
      doc.autoTable({
        startY: 40,
        head: [tableColumn],
        body: tableRows,
      });
    });

    doc.save("sales_report_by_customer.pdf");
  };

  // Filter Sales by Customer Selection
  const handleCustomerFilterChange = (e) => {
    const value = e.target.value;
    setSelectedCustomer(value);
    if (value === "All") {
      setFilteredSales([...sales]);
    } else {
      setFilteredSales(sales.filter((sale) => sale.customer?.name === value));
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-grey-400 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between space-x-3">
        <h1 className="text-2xl font-bold mb-4">Sales Orders by Customer</h1>
        <div className="flex space-x-4">
          <button
            onClick={generateCustomerReport}
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
          >
            Generate Customer Report
          </button>
          <button
            onClick={handleAddSaleOrder}
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
          >
            + Add Sale
          </button>
        </div>
      </div>

      <div className="flex space-x-4 p-4 bg-white rounded-md shadow mb-6">
        <Select onChange={handleCustomerFilterChange}>
          <option value="All">All Customers</option>
          {Object.keys(groupSalesByCustomer()).map((customer) => (
            <option key={customer} value={customer}>
              {customer}
            </option>
          ))}
        </Select>
      </div>

      <div className="border border-gray-300 rounded-lg bg-white shadow-md p-4">
      <div className="max-h-[500px] overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
            <tr className="text-left text-gray-800 font-semibold uppercase">
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Customer</th>
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Sale Order No</th>
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Item Name</th>
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Quantity</th>
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Price</th>
            <th className="px-6 py-3 border border-gray-300 whitespace-nowrap">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 border border-gray-300">
                    {sale.customer?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">{sale.orderNum}</td>
                  <td className="px-6 py-3 border border-gray-300">{sale.item?.name}</td>
                  <td className="px-6 py-3 border border-gray-300">{sale.quantity}</td>
                  <td className="px-6 py-3 border border-gray-300">{sale.price}</td>
                  <td className="px-6 py-3 border border-gray-300">{sale.lineAmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ByCustomerReport;
