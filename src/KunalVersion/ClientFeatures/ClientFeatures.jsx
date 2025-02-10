import React, { useEffect, useState } from "react";
import axios from "axios";

// Replace with your API base URL
const baseUrl = "http://localhost:5050/fms/api/v0";

function ClientFeatures() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newFeatureKey, setNewFeatureKey] = useState("");

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
      fetchClients(); // Refresh clients
    } catch (err) {
      alert("Failed to add client");
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
    } catch (err) {
      alert("Failed to update feature");
    } finally {
      setLoading(false);
    }
  };

  // Add New Feature to a Client
  const addFeature = async (clientId) => {
    if (!newFeatureKey.trim()) {
      alert("Feature key is required");
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
    } catch (err) {
      alert("Failed to add feature");
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
    } catch (err) {
      alert("Failed to remove feature");
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
            <h3 className="text-lg font-bold text-gray-700">{client.name}</h3>
            <h4 className="font-medium text-gray-600 mt-4 mb-2">Features:</h4>
            <ul className="space-y-2">
              {Array.from(Object.entries(client.features)).map(
                ([featureKey, value]) => (
                  <li
                    key={featureKey}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700">{featureKey}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          toggleFeature(client._id, featureKey, value)
                        }
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          value
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        }`}
                      >
                        {value ? "Enabled" : "Disabled"}
                      </button>
                      <button
                        onClick={() => removeFeature(client._id, featureKey)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
                      >
                        Remove
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
    </div>
  );
}

export default ClientFeatures;
