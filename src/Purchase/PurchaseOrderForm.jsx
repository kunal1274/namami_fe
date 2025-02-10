import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const PurchaseOrderForm = ({handleCancel}) => {
  const [items, setItems] = useState([]);

  const [vendors, setVendors] = useState([]);

  const [selectedVendor, setSelectedVendor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [charges, setCharges] = useState(0);
  const [lineAmt, setLineAmt] = useState(0);
  const [status, setStatus] = useState("Draft");
  const [purchaseOrderNum, setPurchaseOrderNum] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const itemsBaseUrl = "https://befr8n.vercel.app/fms/api/v0/items";
  const vendorsBaseUrl = "https://befr8n.vercel.app/fms/api/v0/vendors";
  const purchaseOrderUrl = "https://befr8n.vercel.app/fms/api/v0/purchaseorders";

  const [lineItems, setLineItems] = useState([
    {
      id: Date.now(),
      itemName: "",
      itemCode: "",
      unit: "",
      quantity: 1,
      price: 0,
      discount: 0,
      Status: "draft",
      charges: 0,
      tax: 0,
      tcs: 0,
      tds: 0,
      lineAmt: 0,
      amountBeforeTax: 0,
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendorsResponse, itemsResponse] = await Promise.all([
          axios.get(vendorsBaseUrl),
          axios.get(itemsBaseUrl),
        ]);
        setVendors(vendorsResponse.data.data);
        setItems(itemsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch vendor details when vendor is selected
  useEffect(() => {
    if (selectedVendor) {
      const vendor = vendors.find((c) => c._id === selectedVendor);
      if (vendor) {
        setSelectedVendorDetails({
          contactNum: vendor.contactNum || "",
          currency: vendor.currency || "",
          address: vendor.address || "",
        });
      }
    } else {
      // Clear the fields when no vendor is selected
      setSelectedVendorDetails({
        contactNum: "",
        currency: "",
        address: "",
      });
    }
  }, [selectedVendor, vendors]);
  useEffect(() => {
    if (selectedItem) {
      const item = items.find((i) => i._id === selectedItem);
      if (item) {
        setItemDetails({
          name: item.name,
          code: item.code,
          type: item.type,
          unit: item.unit,
          price: item.price, // Setting price here
          id: item._id,
        });
        setPrice(item.price); // Price is being set here
        setLineAmt(item.price * quantity - discount + charges);
      }
    }
  }, [selectedItem, quantity, discount, charges, items]);

  const calculateTotalAmount = (item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    const discount = (Number(item.discount) || 0) / 100;
    const tax = (Number(item.tax) || 0) / 100;
    const tcs = (Number(item.tcs) || 0) / 100;
    const tds = (Number(item.tds) || 0) / 100;
    const charges = Number(item.charges) || 0;

    const subtotal = quantity * price;
    const discountAmount = subtotal * discount;
    const amountBeforeTax = subtotal - discountAmount;
    const taxAmount = amountBeforeTax * tax;
    const tcsAmount = amountBeforeTax * tcs;
    const tdsAmount = amountBeforeTax * tds;

    return {
      amountBeforeTax: amountBeforeTax.toFixed(2),
      lineAmt: (amountBeforeTax + taxAmount + tcsAmount + charges).toFixed(2),
    };
  };

  const handleLineItemChange = (id, field, value) => {
    setLineItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              ...calculateTotalAmount({ ...item, [field]: value }),
            }
          : item
      )
    );
  };

  const handleItemSelection = (id, selectedItemId) => {
    const selectedItemData = items.find((item) => item._id === selectedItemId);
    console.log(selectedItemData, "135");
    setSelectedItem(selectedItemData);
    if (selectedItemData) {
      handleLineItemChange(id, "itemCode", selectedItemData.code);
      handleLineItemChange(id, "itemName", selectedItemData.name);
      handleLineItemChange(id, "price", selectedItemData.price);
      handleLineItemChange(id, "unit", selectedItemData.unit);
    }
  };

  const totalNetAmount = lineItems.reduce(
    (sum, item) => sum + parseFloat(item.amountBeforeTax || 0),
    0
  );

  const totalNetAmountAfterTax = lineItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.amountBeforeTax || 0) +
      (parseFloat(item.amountBeforeTax) * (Number(item.tax) || 0)) / 100,
    0
  );

  const totalNetAmountAfterTCS_TDS = lineItems.reduce(
    (sum, item) =>
      sum +
      parseFloat(item.amountBeforeTax || 0) +
      (parseFloat(item.amountBeforeTax) * (Number(item.tcs) || 0)) / 100 +
      (parseFloat(item.amountBeforeTax) * (Number(item.tds) || 0)) / 100,
    0
  );

  const [formData, setFormData] = useState({
    vendor: "",
    item: "",
    quantity: "",
    price: "",
    discount: 2.5,
    charges: 0,
    lineAmt: 1137.5,
    status: "Draft",
  });

  const [selectedVendorDetails, setSelectedVendorDetails] = useState({
    contactNum: "",
    currency: "",
    address: "",
  });

  const [itemDetails, setItemDetails] = useState({
    code: "",
    name: "",
    type: "",
    unit: "",
    price: 0,
    id: "",
  });

  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    if (!selectedVendor) {
      alert("Vendor selection is required.");
      return false;
    }

    if (!handleItemSelection) {
      alert("Item selection is required.");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered");
  
    if (!validateForm()) {
      alert("Please fill all the mandatory fields correctly.");
      return;
    }
  
    setLoading(true); // Disable form while processing
  
    const payload = {
      vendor: selectedVendor || "",
      item: selectedItem._id || "",
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
      discount: Number(discount) || 0,
      charges: Number(charges) || 0,
      lineAmt: Number(lineAmt) || 0,
    };
  
    try {
      console.log("Submitting payload:", payload);
      const response = await axios.post(purchaseOrderUrl, payload);
      console.log("Full API Response:", response.data); // Log the full response
      
      const orderNumber = response.data.orderNum; // Ensure 'orderNum' exists in the response
      setPurchaseOrderNum(orderNumber);
      console.log("Order Number:", orderNumber); // Log the order number
  
      // Introduce a 2-second delay before showing the alert
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      alert(`purchase Order Created Successfully! Order Number: ${orderNumber}`);}
    catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        alert(
          `Error: ${
            error.response.data.message || "Failed to create purchase Order"
          }`
        );
        console.error("Server Response Error:", error.response.data);
      } else if (error.request) {
        alert("No response received from server.");
        console.error("No response received:", error.request);
      } else {
        alert("Error while preparing the request.");
        console.error("Error Message:", error.message);
      }
    } finally {
      setLoading(false); // Re-enable the form
    }
  };
 
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          {" "}
          <h1 className="text-xl font-bold mb-4">Purchase Order Creation Page</h1>
          <div className="flex justify-end gap-4">
            <button
              className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Order"}
            </button>
            <button className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
              Allocation
            </button>
            <button className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
              Invoice
            </button>
            <button className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
              Payment
            </button>{" "}
            <button className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
              Delete
            </button>
            <button     onClick={handleCancel}className="h-10 px-4 py-2 border border-green-500 bg-white rounded-md hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>

        <div className="grid gap-4 mb-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="col-span-1 sm:col-span-1">
  <label className="font-bold">Sale Order</label>
  <input
    type="text"
    name="PurchaseOrder"
    value={purchaseOrderNum} // Display the sale order number
    placeholder="Sale Order"
    className="border p-2 w-full"
    readOnly // Make it read-only to prevent editing
  />
</div>

          <div className="col-span-1 sm:col-span-1">
            <label className="font-bold">Vendor name </label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          {selectedVendorDetails && (
            <div className="col-span-1 sm:col-span-1">
              <label className="font-bold">currency</label>
              <input
                type="text"
                value={selectedVendorDetails.currency}
                placeholder="Currency"
                className="border p-2 w-full"
                readOnly
              />
            </div>
          )}
          {selectedVendorDetails && (
            <div className="col-span-1 sm:col-span-1">
              <label className="font-bold">Contact Details</label>
              <input
                type="text"
                value={selectedVendorDetails.contactNum}
                placeholder="Contact Number"
                className="border p-2 w-full"
                readOnly
              />
            </div>
          )}

          <div className="col-span-1 sm:col-span-1">
            <label className="font-bold">Advance</label>
            <input
              type="text"
              name="advance"
              placeholder="Advance"
              className="border p-2 w-full"
            />
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label className="font-bold">Order Status</label>
            <input
              type="text"
              value={formData.status}
              name="orderStatus"
              placeholder="Order Status"
              className="border p-2 w-full"
            />
          </div>
          <div className="md:col-span-2 sm:col-span-1">
            <label className="font-bold">Vendor Address</label>
            <textarea
              name="address"
              value={selectedVendorDetails.address}
              placeholder="Vendor Address / Buyer Address / Billing Address"
              className="border p-2 w-full"
              readOnly
            />
          </div>
          <div className="md:col-span-2 sm:col-span-1">
            <label className="font-bold">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Remarks"
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Transpose Toggle Button jjjjjjjjjjjjjjjjjjjjjjjj*/}

      <div className="border border-green-500 rounded-lg bg-white shadow-lg p-6 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <form className="space-y-6">
            <table className="min-w-full border-collapse border border-gray-300 text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-900 uppercase text-xs font-semibold">
                <tr>
                  <th className="border p-3 text-center">S.N</th>
                  <th className="border p-3 text-center">Item Code</th>
                  <th className="border p-3 w-60 text-center">Item Name</th>
                  <th className="border p-3 text-center">Qty</th>
                  <th className="border p-3 text-center">Unit</th>
                  <th className="border p-3 text-center">Price</th>
                  <th className="border p-3 text-center">Discount %</th>
                  <th className="border p-3 text-center">Amount</th>
                  <th className="border p-3 text-center">Tax %</th>
                  <th className="border p-3 text-center">TCS/TDS %</th>
                  <th className="border p-3 text-center">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lineItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border text-center p-3">{index + 1}</td>
                    <td className="border p-3">{item.itemCode}</td>
                    <td className="border p-3">
                      <select
                        value={item.name}
                        onChange={(e) =>
                          handleItemSelection(item.id, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                      >
                        <option value="">Select Item</option>
                        {items.map((itemOption) => (
                          <option key={itemOption._id} value={itemOption._id}>
                            {itemOption.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </td>
                    <td className="border p-3">{item.unit}</td>
                    <td className="border p-3">{item.price}</td>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={item.discount}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </td>
                    <td className="border p-3">{item.amountBeforeTax}</td>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={item.tax}
                        onChange={(e) =>
                          handleLineItemChange(item.id, "tax", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </td>
                    <td className="border p-3">
                      <input
                        type="text"
                        value={item.tcs}
                        onChange={(e) =>
                          handleLineItemChange(item.id, "tcs", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
                      />
                    </td>
                    <td className="border p-3">{item.lineAmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sales Order Summary */}
            <div className="mt-6 border-t pt-4">
              <p className="text-gray-800">
                <strong>Total Lines:</strong> {lineItems.length}
              </p>
              <p className="text-gray-800">
                <strong>Net Amount:</strong> ${totalNetAmount.toFixed(2)}
              </p>
              <p className="text-gray-800">
                <strong>Total Discount Amount:</strong> -$
                {lineItems
                  .reduce(
                    (sum, item) =>
                      sum + item.quantity * item.price * (item.discount / 100),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p className="text-gray-800">
                <strong>Total Tax Amount (GST):</strong> +$
                {lineItems
                  .reduce(
                    (sum, item) =>
                      sum + item.amountBeforeTax * (item.tax / 100),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p className="text-gray-800">
                <strong>Total TCS/TDS Amount:</strong> +$
                {lineItems
                  .reduce(
                    (sum, item) =>
                      sum + item.amountBeforeTax * (item.tcs / 100),
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;
