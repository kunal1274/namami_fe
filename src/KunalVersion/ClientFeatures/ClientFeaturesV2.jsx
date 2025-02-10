import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5050/fms/api/v0";

function ClientFeatures() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newFeatureKey, setNewFeatureKey] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

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
    } catch (err) {
      setError("Failed to fetch clients");
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
      alert("Client name is required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/clients`, { name: newClientName });
      setNewClientName("");
      fetchClients();
    } catch (err) {
      alert("Failed to add client");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Feature Activation
  const toggleFeatureActivation = async (
    clientId,
    featureKey,
    currentValue
  ) => {
    setLoading(true);
    try {
      await axios.patch(`${baseUrl}/clients/${clientId}/features/toggle`, {
        featureKey,
      });
      fetchClients();
    } catch (err) {
      alert("Failed to toggle feature activation");
    } finally {
      setLoading(false);
    }
  };

  // Add New Feature to a Client
  const addFeature = async (clientId) => {
    if (!newFeatureKey.trim() || !appVersion.trim()) {
      alert("Feature key and app version are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/clients/${clientId}/features`, {
        featureKey: newFeatureKey,
        value: true,
        appVersion,
      });
      setNewFeatureKey("");
      setAppVersion("");
      fetchClients();
    } catch (err) {
      alert("Failed to add feature");
    } finally {
      setLoading(false);
    }
  };

  // Remove Feature
  const removeFeature = async (clientId, featureKey, isActive) => {
    if (isActive) {
      alert("Active features cannot be removed.");
      return;
    }
    setLoading(true);
    try {
      await axios.delete(
        `${baseUrl}/clients/${clientId}/features/${featureKey}`
      );
      fetchClients();
    } catch (err) {
      alert("Failed to remove feature");
    } finally {
      setLoading(false);
    }
  };

  // Delete a Client
  const deleteClient = async (clientId) => {
    //if (!window.confirm("Are you sure you want to delete this client?")) return;
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/clients/${clientId}`);

      fetchClients();
      closeModal(); // Close modal after successful deletion
    } catch (err) {
      alert("Failed to delete client");
    } finally {
      setLoading(false);
    }
  };

  // Delete All Clients
  const deleteAllClients = async () => {
    if (!window.confirm("Are you sure you want to delete all clients?")) return;
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/clients`);
      fetchClients();
    } catch (err) {
      alert("Failed to delete all clients");
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

  // Copy Feature to Another Client
  const copyFeature = async (sourceClientId, targetClientId, featureKey) => {
    setLoading(true);
    try {
      const sourceClient = clients.find(
        (client) => client._id === sourceClientId
      );
      const featureValue = sourceClient.features[featureKey];
      await axios.post(`${baseUrl}/clients/${targetClientId}/features`, {
        featureKey,
        value: featureValue,
      });
      fetchClients();
    } catch (err) {
      alert("Failed to copy feature");
    } finally {
      setLoading(false);
    }
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-700">{client.name}</h3>
              <button
                onClick={() => deleteClient(client._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete Client
              </button>
            </div>
            <h4 className="font-medium text-gray-600 mt-4 mb-2">Features:</h4>
            <ul className="space-y-2">
              {Array.from(Object.entries(client.features)).map(
                ([featureKey, value], index) => (
                  <li
                    key={featureKey}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {index + 1}. {featureKey} (App Version:{" "}
                      {value.appVersion || "N/A"})
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          toggleFeatureActivation(
                            client._id,
                            featureKey,
                            value.active
                          )
                        }
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          value.active
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                      >
                        {value.active ? "Active" : "Inactive"}
                      </button>
                      <button
                        onClick={() =>
                          removeFeature(client._id, featureKey, value.active)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => setSelectedClient(client._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>

            {/* Add Feature */}
            <div className="mt-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="New Feature Key"
                  value={newFeatureKey}
                  onChange={(e) => setNewFeatureKey(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="App Version"
                  value={appVersion}
                  onChange={(e) => setAppVersion(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => addFeature(client._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={deleteAllClients}
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

const ConfirmModal = ({ title, message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
