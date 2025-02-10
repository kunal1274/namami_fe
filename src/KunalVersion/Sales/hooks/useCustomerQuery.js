import { useQuery } from "react-query";
import { fetchCustomers } from "../utils/api.js";

export const useCustomerQuery = () => {
  return useQuery("customers", fetchCustomers, {
    onError: (error) => {
      console.error(
        "Error fetching customers:",
        error.response?.data || error.message
      );
    },
  });
};
