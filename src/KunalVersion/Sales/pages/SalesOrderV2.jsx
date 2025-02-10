import React, { useState } from "react";

const SalesOrder = () => {
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      itemCode: "",
      itemName: "",
      quantity: 0,
      unit: "",
      price: 0,
      amount: 0,
      tax: 0,
      totalAmount: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    saleOrder: "",
    customerName: "",
    currency: "USD",
    orderStatus: "Draft",
    address: "",
    contactDetails: "",
    creationDate: "",
    remarks: "",
  });

  // Handle Form Input Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Line Item Input Change
  const handleLineItemChange = (id, field, value) => {
    setLineItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "price" || field === "tax"
                  ? parseFloat(value)
                  : value,
              amount:
                field === "quantity" || field === "price"
                  ? item.quantity * item.price
                  : item.amount,
              totalAmount:
                field === "quantity" || field === "price" || field === "tax"
                  ? item.quantity * item.price + item.tax
                  : item.totalAmount,
            }
          : item
      )
    );
  };

  // Add New Line Item
  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        itemCode: "",
        itemName: "",
        quantity: 0,
        unit: "",
        price: 0,
        amount: 0,
        tax: 0,
        totalAmount: 0,
      },
    ]);
  };

  // Remove Line Item
  const removeLineItem = (id) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Save Sales Order
  const handleSave = () => {
    console.log("Form Data:", formData);
    console.log("Line Items:", lineItems);
    alert("Sales Order Saved!");
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      saleOrder: "",
      customerName: "",
      currency: "USD",
      orderStatus: "Draft",
      address: "",
      contactDetails: "",
      creationDate: "",
      remarks: "",
    });
    setLineItems([
      {
        id: 1,
        itemCode: "",
        itemName: "",
        quantity: 0,
        unit: "",
        price: 0,
        amount: 0,
        tax: 0,
        totalAmount: 0,
      },
    ]);
  };

  // Cancel
  const handleCancel = () => {
    alert("Sales Order Creation Cancelled");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sales Order Creation Page</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="saleOrder"
          placeholder="Sale Order"
          value={formData.saleOrder}
          onChange={handleFormChange}
          className="border p-2"
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleFormChange}
          className="border p-2"
        />
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={handleFormChange}
          className="border p-2"
        />
        <input
          type="text"
          name="orderStatus"
          placeholder="Order Status"
          value={formData.orderStatus}
          onChange={handleFormChange}
          className="border p-2"
        />
        <textarea
          name="address"
          placeholder="Customer Address / Buyer Address / Billing Address"
          value={formData.address}
          onChange={handleFormChange}
          className="border p-2 col-span-2"
        />
        <textarea
          name="contactDetails"
          placeholder="Contact Details"
          value={formData.contactDetails}
          onChange={handleFormChange}
          className="border p-2 col-span-2"
        />
        <input
          type="date"
          name="creationDate"
          placeholder="Creation Date"
          value={formData.creationDate}
          onChange={handleFormChange}
          className="border p-2"
        />
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleFormChange}
          className="border p-2 col-span-2"
        />
      </div>

      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="border">S.N</th>
            <th className="border">Item Code</th>
            <th className="border">Item Name</th>
            <th className="border">Qty</th>
            <th className="border">Unit</th>
            <th className="border">Price</th>
            <th className="border">Amount</th>
            <th className="border">Tax</th>
            <th className="border">Total Amount</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr key={item.id}>
              <td className="border text-center">{index + 1}</td>
              <td className="border">
                <input
                  type="text"
                  value={item.itemCode}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "itemCode", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "itemName", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "quantity", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "unit", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "price", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border text-center">{item.amount.toFixed(2)}</td>
              <td className="border">
                <input
                  type="number"
                  value={item.tax}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "tax", e.target.value)
                  }
                  className="p-1 w-full"
                />
              </td>
              <td className="border text-center">
                {item.totalAmount.toFixed(2)}
              </td>
              <td className="border text-center">
                <button
                  onClick={() => removeLineItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addLineItem}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        Add Row
      </button>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Reset
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SalesOrder;
