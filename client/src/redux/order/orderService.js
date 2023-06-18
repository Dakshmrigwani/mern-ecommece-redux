import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).user_token
    }`;
  }

  return req;
});

export const createOrder = (orderData) => API.post("/new_order", orderData);
export const userOrders = () => API.get("/my_orders");
