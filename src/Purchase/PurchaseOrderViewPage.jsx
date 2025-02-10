import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const PurchaseViewPage = ({ goBack, purchaseId }) => {
  const [inputPurchaseId, setInputPurchaseId] = useState("");

  const [isEdited, setIsEdited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [purchaseData, setPurchaseData] = useState({
    vendor: {
      name: "",
      contactNum: "",
    },
  });
  // Fetch Purchase detail by ID

  const fetchPurchaseDetail = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://befr8n.vercel.app/fms/api/v0/purchaseorders/${id}`
      );

      if (response.status === 200) {
        console.log("Fetched Data:", response.data.data);
        setPurchaseData(response.data.data || {});
      } else {
        const msg = `Unexpected response status: ${response.status}`;
        setError(msg);
        toast.error(msg);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);
  // Automatically fetch purchase details if purchaseId is provided
  useEffect(() => {
    if (purchaseId) {
      setInputPurchaseId(purchaseId);
      fetchPurchaseDetail(purchaseId);
    }
  }, [purchaseId, fetchPurchaseDetail]);

  // Handle search
  const handleSearch = () => {
    if (!inputPurchaseId.trim()) {
      toast.warn("Please enter a Purchase ID.");
      return;
    }
    fetchPurchaseDetail(inputPurchaseId);
  };

  // Handle edit
  const handleEdit = () => {
    setIsEdited(true);
    setIsEditing(true);
  };

  // Handle update
  const handleUpdate = async () => {
    if (!PurchaseData) return;

    if (window.confirm("Are you sure you want to update this Purchase?")) {
      setLoading(true);
      try {
        // Simulating update API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
        toast.success("Purchase updated successfully!");
        setIsEditing(false);
        setIsEdited(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "An unexpected error occurred.";

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  const navigate = useNavigate(); // useNavigate hook here

  const handleInvoice = () => {
    navigate(`/invoice/${purchaseId}`); // Navigate using the navigate function
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Purchases Order View Page</h1>
        <div className="flex gap-4">
          <button
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
            onClick={handleEdit}
          >
            Edit
          </button>{" "}
          <button
            onClick={goBack}
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
            onClick={handleInvoice}
          >
            Invoice
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Purchase Details Section */}
      {!loading && purchaseData && (
        <div>
          <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1 mb-4">
            <div>
              <label className="font-bold">purchase Order</label>
              <input
                type="text"
                value={purchaseData?.orderNum || "N/A"}
                disabled
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Vendor Name</label>
              <input
                type="text"
                value={purchaseData.vendor?.name || "N/A"}
                onChange={(e) =>
                  setPurchaseData((prev) => ({
                    ...prev,
                    vendor: {
                      ...prev.vendor,
                      name: e.target.value,
                    },
                  }))
                }
                disabled={!isEdited}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="font-bold">Contact Number</label>
            <input
              type="text"
              value={purchaseData.vendor?.contactNum || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  // Allow only up to 10 digits
                  setPurchaseData((prev) => ({
                    ...prev,
                    vendor: {
                      ...prev.vendor,
                      contactNum: value,
                    },
                  }));
                }
              }}
              disabled={!isEdited}
              className="border p-2 w-full"
              maxLength={10} // Optional HTML attribute to restrict input length
            />
          </div>
          {/* Line Items Table */}
          <div className="border border-green-500 rounded-lg bg-white p-4">
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Item Code</th>
                  <th className="border px-4 py-2">Item Name</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Unit</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Discount %</th>
                  <th className="border px-4 py-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <td className="px-6 py-3 text-center">
                  {purchaseData.item?.code || "N/A"}
                </td>

                <td className="px-6 py-3 text-center">
                  {purchaseData.item?.name || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {purchaseData.item?.type || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {purchaseData.item?.price || "N/A"}
                </td>
                <div>
                  <select
                    name="unit"
                    value={purchaseData?.unit || ""}
                    onChange={(e) =>
                      setPurchaseData({ ...purchaseData, unit: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                    disabled={!isEditing}
                  >
                    <option value="MT-Megatons">MT - Megatons</option>
                    <option value="KG-Kilogram">KG - Kilogram</option>
                    <option value="ML-Mega Liter">ML - Mega Liter</option>
                    <option value="Ea-Each">Ea - Each</option>
                    <option value="Pic-Pieces">Pic - Pieces</option>
                    <option value="Box">Box</option>
                    <option value="Carton - Carton Box">
                      Carton - Carton Box
                    </option>
                  </select>
                </div>

                <td className="px-6 py-3 text-center">
                  {purchaseData.quantity || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {purchaseData.discount || "N/A"}
                </td>
                <td className="px-6 py-3 text-center">
                  {purchaseData.lineAmt || "N/A"}
                </td>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseViewPage;
