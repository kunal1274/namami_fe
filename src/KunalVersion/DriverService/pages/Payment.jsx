import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { initiatePayment } = useContext(GlobalContext);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const navigate = useNavigate();

  const handlePayment = async () => {
    // Call context or API to process the payment
    const success = await initiatePayment(paymentMethod);
    if (success) {
      navigate("/payment-success");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Select Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full border-gray-300 rounded-md"
          >
            <option value="creditCard">Credit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </div>
        <button
          onClick={handlePayment}
          className="bg-accent text-white px-4 py-2 rounded-md w-full hover:bg-green-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
