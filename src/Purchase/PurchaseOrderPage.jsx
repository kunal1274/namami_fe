import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseOrderForm from "./PurchaseOrderForm";
import PurchaseOrderList from "./PurchaseOrderList";
import PurchaseOrderViewPage from "./PurchaseOrderViewPage";


const PurchaseOrderPage = () => {
  const [view, setView] = useState("list");
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultNewPurchaseOrder = {
    name: "",
    price: "",
    type: "",
    unit: "",
    description: "",
    active: true,
  };

  const [newPurchaseOrder, setNewPurchaseOrder] = useState(defaultNewPurchaseOrder);

  // Fetch PurchaseOrders from the API
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/PurchaseOrders");
        setPurchaseOrders(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseOrders();
  }, []);

  const createPurchaseOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/PurchaseOrders", newPurchaseOrder, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("PurchaseOrder created successfully!");
      setPurchaseOrders((prev) => [...prev, response.data]);
      setNewPurchaseOrder(defaultNewPurchaseOrder);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePurchaseOrder = async (PurchaseOrder) => {
    setLoading(true);
    try {
      if (PurchaseOrder.id) {
        // Update existing PurchaseOrder
        const response = await axios.put(`/api/purchaseOrders/${purchaseOrder.id}`, purchaseOrder);
        setPurchaseOrders((prev) =>
          prev.map((existingPurchaseOrder) =>
            existingPurchaseOrder.id === purchaseOrder.id ? response.data : existingPurchaseOrder
          )
        );
        setMessage("PurchaseOrder updated successfully!");
      } else {
        // Create new PurchaseOrder
        const response = await axios.post("/api/PurchaseOrders", purchaseOrder, {
          headers: { "Content-Type": "application/json" },
        });
        setPurchaseOrders((prev) => [...prev, response.data]);
        setMessage("PurchaseOrder saved successfully!");
      }
      setView("list");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPurchaseOrder = (purchaseOrderId) => {
    const purchaseOrder = purchaseOrders.find((purchaseOrder) => purchaseOrder.id === purchaseOrderId);
    if (purchaseOrder) {
      setSelectedPurchaseOrder(purchaseOrder);
      setView("view");
    } else {
      setError("purchaseOrder not found.");
    }
  };

  const handleAddPurchaseOrder = () => {
    setView("form");

    setSelectedPurchaseOrder(null);
    setNewPurchaseOrder(defaultNewPurchaseOrder);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
    setMessage("");
    setError("");
  };

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.data.message || "Server error occurred.");
    } else if (error.request) {
      setError("Network error. Please try again.");
    } else {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-white-400 ">
      <div className="bg-slate-50 rounded-lg p-4">
        {loading && <p className="text-yellow-500">Loading...</p>}
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {view === "form" && (
          <PurchaseOrderForm
            selectedPurchaseOrder={selectedPurchaseOrder}
            newPurchaseOrder={newPurchaseOrder}
            setNewPurchaseOrder={setNewPurchaseOrder}
            createPurchaseOrder={createPurchaseOrder}
            handleSavePurchaseOrder={handleSavePurchaseOrder}
            handleCancel= {handleCancel}
          />
        )}

        {view === "list" && (
          <PurchaseOrderList
          
            handleAddPurchaseOrder={handleAddPurchaseOrder}
            handleViewPurchaseOrder={handleViewPurchaseOrder}
          />
        )}

{view === "view" && (
          <PurchaseOrderViewPage
          Sale={selectedSale}
            handleCancel={handleCancel}
            handleAddSale={handleAddSale}
          />
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderPage;
