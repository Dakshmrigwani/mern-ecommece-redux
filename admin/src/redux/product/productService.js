import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("admin")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("admin")).admin_token
    }`;
  }

  return req;
});

export const addProducts = (productData) =>
  API.post("/add_product", productData);

export const getProducts = () => API.get("/");
export const deleteProduct = (id) => API.delete(`/delete_product/${id}`);
