import React, { useState } from "react";

const SalesOrder = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contactNum: "",
    billingAddress: "",
    shippingAddress: "",
  });
  const [orderDetails, setOrderDetails] = useState({
    orderDate: new Date().toISOString().split("T")[0],
    orderNumber: "0001",
    paymentTerms: "In full",
    shippingMethod: "Ground",
    deliveryDate: "",
  });
  const [items, setItems] = useState([
    { description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, unitPrice: 0, discount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Recalculate total
    if (field === "quantity" || field === "unitPrice" || field === "discount") {
      const qty = updatedItems[index].quantity;
      const price = updatedItems[index].unitPrice;
      const discount = updatedItems[index].discount;
      updatedItems[index].total = qty * price - (qty * price * discount) / 100;
    }

    setItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Sales Order</h1>
            <p className="text-gray-600">
              Order Number: {orderDetails.orderNumber}
            </p>
          </div>
          <div>
            <img src="/your-logo.png" alt="Your Logo" className="h-16" />
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Customer Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Information
            </h2>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({ ...customerDetails, name: e.target.value })
              }
              className="w-full border rounded-lg p-2 mt-2 mb-4"
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={customerDetails.contactNum}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  contactNum: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mb-4"
            />
            <textarea
              placeholder="Billing Address"
              value={customerDetails.billingAddress}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  billingAddress: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2 mb-4"
            />
            <textarea
              placeholder="Shipping Address"
              value={customerDetails.shippingAddress}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  shippingAddress: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Order Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Order Information
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="date"
                placeholder="Order Date"
                value={orderDetails.orderDate}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    orderDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Delivery Date"
                value={orderDetails.deliveryDate}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    deliveryDate: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <select
                value={orderDetails.shippingMethod}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    shippingMethod: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              >
                <option value="Ground">Ground</option>
                <option value="Air">Air</option>
                <option value="Sea">Sea</option>
              </select>
              <select
                value={orderDetails.paymentTerms}
                onChange={(e) =>
                  setOrderDetails({
                    ...orderDetails,
                    paymentTerms: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-2"
              >
                <option value="In full">In full</option>
                <option value="On receipt">On receipt</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Order Items
          </h2>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-right">Quantity</th>
                <th className="border p-3 text-right">Unit Price</th>
                <th className="border p-3 text-right">Discount (%)</th>
                <th className="border p-3 text-right">Total</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={item.description}
                      placeholder="Item Description"
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      className="w-full border rounded-lg p-2"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                      className="w-full border rounded-lg p-2 text-right"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(index, "unitPrice", Number(e.target.value))
                      }
                      className="w-full border rounded-lg p-2 text-right"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) =>
                        updateItem(index, "discount", Number(e.target.value))
                      }
                      className="w-full border rounded-lg p-2 text-right"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    {item.total.toFixed(2)}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Item
          </button>
        </section>

        <footer className="mt-8 flex justify-between items-center">
          <div>
            <p className="text-gray-700">Subtotal: TBD</p>
            <p className="text-gray-700">Discounts: TBD</p>
            <p className="text-gray-700 font-bold">Total: TBD</p>
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
            Confirm Order
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SalesOrder;
