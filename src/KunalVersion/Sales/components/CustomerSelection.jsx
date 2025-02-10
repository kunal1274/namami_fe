import React from "react";
import { useCustomerQuery } from "../hooks/useCustomerQuery";

const CustomerSelection = ({ onCustomerSelect }) => {
  const { data: customers, isLoading, isError } = useCustomerQuery();

  if (isLoading) {
    return <p>Loading customers...</p>;
  }

  if (isError) {
    return <p>Failed to load customers.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Select a Customer</h2>
      <select
        onChange={(e) =>
          onCustomerSelect(customers.find((c) => c._id === e.target.value))
        }
        className="w-full border p-2 rounded"
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.name} ({customer.contactNum})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerSelection;
