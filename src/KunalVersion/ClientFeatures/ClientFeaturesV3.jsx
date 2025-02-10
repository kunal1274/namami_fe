import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal"; // Reusable modal for confirmations

const baseUrl = "http://localhost:5050/fms/api/v0";

function ClientFeatures() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newFeatureKey, setNewFeatureKey] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  // Fetch Clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/clients`);
      setClients(response.data.data);
      toast.success("Clients fetched successfully!");
    } catch (err) {
      toast.error("Failed to fetch clients!");
    } finally {
      setLoading(false);
    }
  };

  // Open Confirmation Modal
  const openModal = (title, message, onConfirm) => {
    setModalTitle(title);
    setModalMessage(message);
    setOnConfirmAction(() => onConfirm);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add New Client
  const addClient = async () => {
    if (!newClientName.trim()) {
      toast.error("Client name is required!");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/clients`, { name: newClientName });
      setNewClientName("");
      fetchClients(); // Refresh clients
      toast.success("Client added successfully!");
    } catch (err) {
      toast.error("Failed to add client!");
    } finally {
      setLoading(false);
    }
  };

  // Delete All Clients
  const deleteAllClients = async () => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/clients`);
      fetchClients();
      closeModal();
      toast.success("All clients deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete all clients!");
    } finally {
      setLoading(false);
    }
  };

  // Add New Feature to a Client
  const addFeature = async (clientId) => {
    if (!newFeatureKey.trim()) {
      toast.error("Feature key is required!");
      return;
    }
    setLoading(true);
    try {
      await axios.patch(`${baseUrl}/clients/${clientId}/features`, {
        featureKey: newFeatureKey,
        value: true,
      });
      setNewFeatureKey("");
      fetchClients();
      toast.success("Feature added successfully!");
    } catch (err) {
      toast.error("Failed to add feature!");
    } finally {
      setLoading(false);
    }
  };

  // Remove Feature
  const removeFeature = async (clientId, featureKey) => {
    setLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/clients/${clientId}/features/${featureKey}`
      );
      fetchClients();
      toast.success("Feature removed successfully!");
    } catch (err) {
      toast.error("Failed to remove feature!");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Feature
  const toggleFeature = async (clientId, featureKey, currentValue) => {
    setLoading(true);
    try {
      await axios.patch(`${baseUrl}/clients/${clientId}/features`, {
        featureKey,
        value: !currentValue,
      });
      fetchClients();
      toast.success(`Feature '${featureKey}' updated successfully!`);
    } catch (err) {
      toast.error(`Failed to update feature '${featureKey}'!`);
    } finally {
      setLoading(false);
    }
  };

  // Trigger Delete All Clients
  const handleDeleteAllClients = () => {
    openModal(
      "Delete All Clients",
      "Are you sure you want to delete all clients? This action cannot be undone.",
      deleteAllClients
    );
  };

  // Initial Fetch
  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Client Features Management
      </h1>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Add New Client */}
      <div className="mb-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Client
        </h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            placeholder="Client Name"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addClient}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* Display Clients */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Clients</h2>
        {clients.map((client) => (
          <div
            key={client._id}
            className="bg-white p-6 shadow-md rounded-lg mb-6"
          >
            <h3 className="text-lg font-bold text-gray-700">{client.name}</h3>
            {/* Add your feature-related UI here */}
          </div>
        ))}
      </div>

      {/* Delete All Clients Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleDeleteAllClients}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete All Clients
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        title={modalTitle}
        message={modalMessage}
        onConfirm={onConfirmAction}
        onCancel={closeModal}
        isOpen={isModalOpen}
      />
    </div>
  );
}

export default ClientFeatures;
