import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Invoice = ({ goBack }) => {
  const { saleOrderNum } = useParams(); // Get from URL params

  const [saleData, setSaleData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [inputSaleOrderNum, setInputSaleOrderNum] = useState(
    saleOrderNum || ""
  ); // Store input for search

  // Create an Axios instance
  const api = axios.create({
    baseURL: "https://befr8n.vercel.app/fms/api/v0/salesorders",
  });

  const fetchSaleDetail = useCallback(async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(`/${id}`);

      if (response.status === 200) {
        setSaleData(response.data?.data || {});
      } else {
        const msg = `Unexpected response status: ${response.status}`;
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
      toast.error(err.response?.data?.message || "Error fetching sale data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial delay loading effect
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-fetch sale details when saleOrderNum changes
  useEffect(() => {
    if (!saleOrderNum) {
      setLoading(false);
      return;
    }
    setInputSaleOrderNum(saleOrderNum);
    fetchSaleDetail(saleOrderNum);
  }, [saleOrderNum, fetchSaleDetail]);

  // Search handler
  const handleSearch = () => {
    if (!inputSaleOrderNum.trim()) {
      toast.warn("Please enter a Sale ID.");
      return;
    }
    fetchSaleDetail(inputSaleOrderNum);
  };

  // Print handler
  const printInvoice = () => {
    const invoiceWrapper = document.querySelector(".invoice-wrapper");
    if (invoiceWrapper) {
      invoiceWrapper.classList.add("print-mode");
    }

    window.print();

    setTimeout(() => {
      if (invoiceWrapper) {
        invoiceWrapper.classList.remove("print-mode");
      }
    }, 1000);
  };

  // Conditional rendering for loading states
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading initial page...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="invoice-wrapper p-4" id="print-area">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="invoice-header flex justify-between items-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMk1Lk-qBhzpSd7U0IiQtkR_3wCVGaEbgEUA&s"
            alt="Company Logo"
            className="h-24"
          />
          <div className="text-right">
            <h1 className="text-3xl font-bold">Invoice</h1>
            <p>Invoice No: {saleData.orderNum || "N/A"}</p>
            <p>
              Date:{" "}
              {saleData.createdAt
                ? new Date(saleData.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <hr className="mb-6" />

        {/* Customer Details */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
            <p>
              <strong>Name:</strong> {saleData.customer?.name || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {saleData.customer?.contactNum || "N/A"}
            </p>
            <p>
              <strong>ID:</strong> {saleData.customer?._id || "N/A"}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold mb-2">Payment To</h2>
            <p>Shyam Enterprise</p>
            <p>Patna 89438</p>
            <p>45678567</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-center">Item</th>
                <th className="px-6 py-3 bg-gray-100 text-center">Quantity</th>
                <th className="px-6 py-3 bg-gray-100 text-center">Price</th>
                <th className="px-6 py-3 bg-gray-100 text-center">Unit</th>

                <th className="px-6 py-3 bg-gray-100 text-center">Discount</th>
                <th className="px-6 py-3 bg-gray-100 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-3 text-center">
                  {saleData.item?.name || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {saleData.quantity || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {saleData.item?.price || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {saleData.item?.unit || "N/A"}
                </td>

                <td className="px-6 py-3 text-center">
                  {saleData.discount || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {saleData.lineAmt || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print & Go Back Buttons */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
            onClick={printInvoice}
          >
            Print Invoice
          </button>
          <button
            className="bg-red-500 ml-5 text-white py-2 px-6 rounded-lg"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
