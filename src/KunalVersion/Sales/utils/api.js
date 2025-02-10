import axios from "axios";

const baseUrl = "https://befr8n.vercel.app/fms/api/v0";

export const fetchCustomers = async () => {
  const { data } = await axios.get(`${baseUrl}/customers`);
  return data.data;
};

export const createOrder = async (orderPayload) => {
  const { data } = await axios.post(`${baseUrl}/orders`, orderPayload);
  return data;
};
