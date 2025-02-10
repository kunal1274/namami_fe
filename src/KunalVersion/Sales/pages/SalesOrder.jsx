import React, { useState } from "react";
import transposeIcon from "../../../assets/images/tp.png";
import tableViewIcon from "../../../assets/images/tbl.png";

const SalesOrder = () => {
  const [lineMode, setLineMode] = useState("single"); // Line mode toggle state ("single" or "multiple")
  const [viewMode, setViewMode] = useState("normal");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      itemCode: "",
      itemName: "",
      quantity: 0,
      unit: "",
      price: 0,
      discount: 0,
      amount: 0,
      tax: 0,
      tcs: 0,
      totalAmount: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    saleOrder: "",
    customerName: "",
    currency: "USD",
    advance: 0,
    orderStatus: "Draft",
    address: "",
    contactDetails: "",
    creationDate: "",
    creationTime: "",
    remarks: "",
  });

  // Handle Form Input Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Single Line Input Change
  const handleSingleLineChange = (field, value) => {
    setLineItems((prev) => [
      {
        ...prev[0],
        [field]:
          field === "quantity" || field === "price" || field === "tax"
            ? parseFloat(value)
            : value,
        amount:
          field === "quantity" || field === "price"
            ? prev[0].quantity * prev[0].price
            : prev[0].amount,
        totalAmount:
          field === "quantity" || field === "price" || field === "tax"
            ? prev[0].quantity * prev[0].price + prev[0].tax
            : prev[0].totalAmount,
      },
    ]);
  };

  // Handle Multi-line Item Input Change
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
        discount: 0,
        amount: 0,
        tax: 0,
        tcs: 0,
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
      advance: 0,
      orderStatus: "Draft",
      address: "",
      contactDetails: "",
      creationDate: "",
      creationTime: "",
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
        discount: 0,
        amount: 0,
        tax: 0,
        tcs: 0,
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

      {/* Sales Order Header with Correct Grid Layout */}
      <div className="grid gap-4 mb-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {/* Sale Order */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Sale Order</label>
          <input
            type="text"
            name="saleOrder"
            placeholder="Sale Order"
            value={formData.saleOrder}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Customer Name */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Customer Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Currency */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Currency</label>
          <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={formData.currency}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Advance */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Advance</label>
          <input
            type="text"
            name="advance"
            placeholder="Advance"
            value={formData.advance}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Order Status */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Order Status</label>
          <input
            type="text"
            name="orderStatus"
            placeholder="Order Status"
            value={formData.orderStatus}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Creation Date */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Creation Date</label>
          <input
            type="date"
            name="creationDate"
            placeholder="Creation Date"
            value={formData.creationDate}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Creation Time */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Creation Time</label>
          <input
            type="time"
            name="creationTime"
            placeholder="Creation Time"
            value={formData.creationTime}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Contact Details */}
        <div className="col-span-1 sm:col-span-1">
          <label className="font-bold">Contact Details</label>
          <input
            type="text"
            name="contactDetails"
            placeholder="Contact Details"
            value={formData.contactDetails}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Customer Address */}
        <div className="md:col-span-2 sm:col-span-1">
          <label className="font-bold">Customer Address</label>
          <textarea
            name="address"
            placeholder="Customer Address / Buyer Address / Billing Address"
            value={formData.address}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2 sm:col-span-1">
          <label className="font-bold">Remarks</label>
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleFormChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Line Mode Toggle */}
        <div className="md:col-span-2 flex items-center sm:col-span-1">
          <span className="mr-2 font-bold">Line Mode:</span>
          <button
            disabled={lineItems.length > 1}
            onClick={() => setLineMode("single")}
            className={`px-4 py-2 ${
              lineMode === "single" ? "bg-blue-500 text-white" : "bg-gray-200"
            } ${
              lineItems.length > 1
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            Single Line
          </button>
          <button
            onClick={() => setLineMode("multiple")}
            className={`ml-2 px-4 py-2 ${
              lineMode === "multiple" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Multiple Lines
          </button>
        </div>
      </div>

      {/* Line Items Section */}
      <div className="overflow-x-auto">
        {" "}
        {/* Transpose Toggle Button */}
        <div className="mb-4">
          <span className="mr-2 font-bold">Table View:</span>
          <button
            onClick={() => setViewMode("normal")}
            className={`px-4 py-2 ${
              viewMode === "normal" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {/* {transpose ? `Normal` : `Transpose`} */}
            Normal
          </button>
          <button
            onClick={() => setViewMode("transpose")}
            className={`ml-2 px-4 py-2 ${
              viewMode === "transpose"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Transpose
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`ml-2 px-4 py-2 ${
              viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("accordion")}
            className={`ml-2 px-4 py-2 ${
              viewMode === "accordion"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Accordion
          </button>

          <button
            onClick={() => setViewMode("grid2")}
            className={`ml-2 px-4 py-2 ${
              viewMode === "grid2" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Grid 2
          </button>
        </div>
        {viewMode === "transpose" ? (
          <table className="w-full border mb-4">
            <thead>
              <tr>
                <th className="border">Field</th>
                {lineItems.map((_, index) => (
                  <th key={index} className="border text-center">
                    Row {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border font-bold">S.N</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    {index + 1}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-bold">Item Code</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="text"
                      value={item.itemCode}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "itemCode",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-bold">Item Name</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "itemName",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>
              {/* Quantity */}
              <tr>
                <td className="border font-bold">Qty</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "quantity",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* Unit */}
              <tr>
                <td className="border font-bold">Unit</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) =>
                        handleLineItemChange(item.id, "unit", e.target.value)
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr>
                <td className="border font-bold">Price</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleLineItemChange(item.id, "price", e.target.value)
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* Discount */}
              <tr>
                <td className="border font-bold">Discount</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "discount",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* Amount */}
              <tr>
                <td className="border font-bold">Amount</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    {item.amount.toFixed(2)}
                  </td>
                ))}
              </tr>

              {/* Tax */}
              <tr>
                <td className="border font-bold">Tax</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="number"
                      value={item.tax}
                      onChange={(e) =>
                        handleLineItemChange(item.id, "tax", e.target.value)
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* TCS */}
              <tr>
                <td className="border font-bold">TCS</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    <input
                      type="number"
                      value={item.tcs}
                      onChange={(e) =>
                        handleLineItemChange(item.id, "tcs", e.target.value)
                      }
                      className="p-1 w-full"
                    />
                  </td>
                ))}
              </tr>

              {/* Total Amount */}
              <tr>
                <td className="border font-bold">Total Amount</td>
                {lineItems.map((item, index) => (
                  <td key={index} className="border text-center">
                    {item.totalAmount.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-bold">Actions</td>
                {lineItems.map((item, index) => (
                  <td className="border text-center px-2">
                    <button
                      disabled={lineItems.length === 1}
                      onClick={() => removeLineItem(item.id)}
                      className={`bg-red-500 text-white px-2 py-1 ${
                        lineItems.length === 1
                          ? "hover:cursor-not-allowed"
                          : "hover:cursor-pointer"
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ) : viewMode === "normal" ? (
          <table className="w-full border mb-4">
            <thead>
              <tr>
                <th className="border">S.N</th>
                <th className="border">Item Code</th>
                <th className="border">Item Name</th>
                <th className="border">Qty</th>
                <th className="border">Unit</th>
                <th className="border">Price</th>
                <th className="border">Discount</th>
                <th className="border">Amount</th>
                <th className="border">Tax</th>
                <th className="border">TCS</th>
                <th className="border">Total Amount</th>
                {lineMode === "multiple" && <th className="border">Actions</th>}
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
                        handleLineItemChange(
                          item.id,
                          "itemCode",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                  <td className="border">
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "itemName",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                  <td className="border">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "quantity",
                          e.target.value
                        )
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
                  <td className="border">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        handleLineItemChange(
                          item.id,
                          "discount",
                          e.target.value
                        )
                      }
                      className="p-1 w-full"
                    />
                  </td>
                  <td className="border text-center">
                    {item.amount.toFixed(2)}
                  </td>
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
                  <td className="border">
                    <input
                      type="number"
                      value={item.tcs}
                      onChange={(e) =>
                        handleLineItemChange(item.id, "tcs", e.target.value)
                      }
                      className="p-1 w-full"
                    />
                  </td>
                  <td className="border text-center">
                    {item.totalAmount.toFixed(2)}
                  </td>
                  {lineMode === "multiple" && (
                    <>
                      <td className="border text-center px-2">
                        <button
                          disabled={lineItems.length === 1}
                          onClick={() => removeLineItem(item.id)}
                          className={`bg-red-500 text-white px-2 py-1 ${
                            lineItems.length === 1
                              ? "hover:cursor-not-allowed"
                              : "hover:cursor-pointer"
                          }`}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {lineItems.map((item, index) => (
              <div key={index} className="border p-4">
                <div>
                  <span className="font-bold">S.N:</span> {index + 1}
                </div>
                <div>
                  <span className="font-bold">Item Code:</span>
                  <input
                    type="text"
                    value={item.itemCode}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "itemCode", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-bold">Item Name:</span>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "itemName", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-bold">Qty:</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "quantity", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-bold">Unit:</span>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "unit", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-bold">Price:</span>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "price", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>
                <div>
                  <span className="font-bold">Discount:</span>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "discount", e.target.value)
                    }
                    className="p-1 w-full"
                  />
                </div>

                <div>
                  <span className="font-bold">Amount:</span>{" "}
                  {item.amount.toFixed(2)}
                </div>
                <div>
                  <span className="font-bold">Tax:</span>
                  <input
                    type="number"
                    value={item.tax}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "tax", e.target.value)
                    }
                    className="p-1 w-full border"
                  />
                </div>
                <div>
                  <span className="font-bold">TCS:</span>
                  <input
                    type="number"
                    value={item.tcs}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "tcs", e.target.value)
                    }
                    className="p-1 w-full border"
                  />
                </div>
                <div>
                  <span className="font-bold">Total:</span>{" "}
                  {item.totalAmount.toFixed(2)}
                </div>
                <div>
                  <>
                    <span className="font-bold">Actions</span>{" "}
                    <button
                      disabled={lineItems.length === 1}
                      onClick={() => removeLineItem(item.id)}
                      className={`bg-red-500 text-white px-2 py-1 ml-2 ${
                        lineItems.length === 1
                          ? "hover:cursor-not-allowed"
                          : "hover:cursor-pointer"
                      }`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setOpenAccordion((prev) =>
                          prev === item.id ? null : item.id
                        )
                      }
                      className="bg-blue-500 text-white px-2 ml-2 py-1 my-2"
                    >
                      {openAccordion === item.id ? "-" : "+"}
                    </button>
                  </>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "accordion" ? (
          <table className="w-full border mb-4">
            <thead>
              <tr>
                <th className="border">S.N</th>
                <th className="border">Item Code</th>
                <th className="border">Item Name</th>
                <th className="border">Qty</th>
                <th className="border">Unit</th>
                <th className="border">Price</th>
                <th className="border">Discount</th>
                <th className="border">Amount</th>
                <th className="border">Tax</th>
                <th className="border">TCS</th>
                <th className="border">Total Amount</th>
                {lineMode === "multiple" && <th className="border">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  {/* Main Row */}
                  <tr>
                    <td className="border text-center">{index + 1}</td>
                    <td className="border">
                      <input
                        type="text"
                        value={item.itemCode}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "itemCode",
                            e.target.value
                          )
                        }
                        className="p-1 w-full"
                      />
                    </td>
                    <td className="border">
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "itemName",
                            e.target.value
                          )
                        }
                        className="p-1 w-full"
                      />
                    </td>
                    <td className="border">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "quantity",
                            e.target.value
                          )
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
                    <td className="border">
                      <input
                        type="number"
                        value={item.discount}
                        onChange={(e) =>
                          handleLineItemChange(
                            item.id,
                            "discount",
                            e.target.value
                          )
                        }
                        className="p-1 w-full"
                      />
                    </td>
                    <td className="border text-center">
                      {item.amount.toFixed(2)}
                    </td>
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
                    <td className="border">
                      <input
                        type="number"
                        value={item.tcs}
                        onChange={(e) =>
                          handleLineItemChange(item.id, "tcs", e.target.value)
                        }
                        className="p-1 w-full"
                      />
                    </td>
                    <td className="border text-center">
                      {item.totalAmount.toFixed(2)}
                    </td>
                    {lineMode === "multiple" && (
                      <>
                        <td className="border text-center px-2">
                          <button
                            disabled={lineItems.length === 1}
                            onClick={() => removeLineItem(item.id)}
                            className={`bg-red-500 text-white px-2 py-1 ${
                              lineItems.length === 1
                                ? "hover:cursor-not-allowed"
                                : "hover:cursor-pointer"
                            }`}
                          >
                            Delete
                          </button>
                        </td>

                        <td className="border text-center px-2">
                          <button
                            onClick={() =>
                              setOpenAccordion((prev) =>
                                prev === item.id ? null : item.id
                              )
                            }
                            className="bg-blue-500 text-white px-2 py-1"
                          >
                            {openAccordion === item.id ? "-" : "+"}
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Accordion Content */}
                  {openAccordion === item.id && (
                    <tr>
                      <td colSpan={12} className="border bg-gray-100">
                        <div className="p-4">
                          {/* Long Description */}
                          <div className="mb-4">
                            <label className="font-bold">
                              Long Description:
                            </label>
                            <textarea
                              value={item.longDescription || ""}
                              onChange={(e) =>
                                handleLineItemChange(
                                  item.id,
                                  "longDescription",
                                  e.target.value
                                )
                              }
                              className="border p-2 w-full"
                              placeholder="Enter long description"
                            />
                          </div>

                          {/* Tax Breakup */}
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="font-bold">CGST:</label>
                              <input
                                type="number"
                                value={item.cgst || 0}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "cgst",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label className="font-bold">SGST:</label>
                              <input
                                type="number"
                                value={item.sgst || 0}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "sgst",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label className="font-bold">IGST:</label>
                              <input
                                type="number"
                                value={item.igst || 0}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "igst",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                          </div>

                          {/* Site, Warehouse, and Location */}
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="font-bold">Site:</label>
                              <input
                                type="text"
                                value={item.site || ""}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "site",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label className="font-bold">Warehouse:</label>
                              <input
                                type="text"
                                value={item.warehouse || ""}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "warehouse",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                            <div>
                              <label className="font-bold">Location:</label>
                              <input
                                type="text"
                                value={item.location || ""}
                                onChange={(e) =>
                                  handleLineItemChange(
                                    item.id,
                                    "location",
                                    e.target.value
                                  )
                                }
                                className="border p-2 w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {lineItems.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">S.N:</span>{" "}
                  {index + 1}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Item Code:
                  </span>
                  <input
                    type="text"
                    value={item.itemCode}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "itemCode", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">
                    Item Name:
                  </span>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "itemName", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Qty:</span>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "quantity", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Unit:</span>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "unit", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Price:</span>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "price", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Discount:</span>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "discount", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Amount:</span>{" "}
                  <span className="text-gray-900">
                    {item.amount.toFixed(2)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Tax:</span>
                  <input
                    type="number"
                    value={item.tax}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "tax", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">TCS:</span>
                  <input
                    type="number"
                    value={item.tcs}
                    onChange={(e) =>
                      handleLineItemChange(item.id, "tcs", e.target.value)
                    }
                    className="border rounded p-2 w-full mt-1"
                  />
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Total:</span>{" "}
                  <span className="text-gray-900">
                    {item.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    disabled={lineItems.length === 1}
                    onClick={() => removeLineItem(item.id)}
                    className={`px-4 py-2 text-sm rounded ${
                      lineItems.length === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      setOpenAccordion((prev) =>
                        prev === item.id ? null : item.id
                      )
                    }
                    className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {openAccordion === item.id ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {lineMode === "multiple" && (
          <button
            onClick={addLineItem}
            className="bg-green-500 text-white px-4 py-2 mb-4 mt-2"
          >
            Add Row
          </button>
        )}
      </div>

      {/* Sales Order Summary */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-bold mb-4">Sales Order Summary</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:grid-cols-1">
          {/* Total Lines */}
          <div className="col-span-1">
            <label className="font-bold">Total Lines:</label>
            <div>{lineItems.length}</div>
          </div>

          {/* Net Amount */}
          <div className="col-span-1">
            <label className="font-bold">Net Amount:</label>
            <div>
              {lineItems.reduce((sum, item) => sum + item.totalAmount, 0) -
                (
                  parseFloat(formData.discount || 0) +
                  parseFloat(formData.advance || 0)
                ).toFixed(2)}
            </div>
          </div>

          {/* Net Total Amount After Tax */}
          <div className="col-span-1">
            <label className="font-bold">Net Amount After Tax (GST):</label>
            <div>
              {lineItems.reduce(
                (sum, item) => sum + item.totalAmount + item.tax,
                0
              ) -
                (
                  parseFloat(formData.discount || 0) +
                  parseFloat(formData.advance || 0)
                ).toFixed(2)}
            </div>
          </div>

          {/* Net Total Amount After TCS/TDS */}
          <div className="col-span-1">
            <label className="font-bold">Net Amount After TCS/TDS:</label>
            <div>
              {lineItems.reduce(
                (sum, item) => sum + item.totalAmount + item.tax + item.tcs,
                0
              ) -
                (
                  parseFloat(formData.discount || 0) +
                  parseFloat(formData.advance || 0)
                ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

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
