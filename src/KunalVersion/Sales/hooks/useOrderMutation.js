import { useMutation } from "react-query";
import { createOrder } from "../utils/api.js";

export const useOrderMutation = () => {
  return useMutation(createOrder, {
    onSuccess: (data) => {
      console.log("Order created successfully:", data);
    },
    onError: (error) => {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
    },
  });
};
