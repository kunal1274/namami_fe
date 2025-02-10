import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Payment Successful
        </h2>
        <p className="mb-4">Thank you for your payment!</p>
        <Link
          to="/"
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
