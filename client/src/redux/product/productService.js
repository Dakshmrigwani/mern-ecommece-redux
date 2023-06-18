import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

export const getProducts = () => API.get("/");
export const getProductById = (id) => API.get(`/${id}`);
export const getSearchProduct = (searchQuery) =>
  API.get(`/search?searchQuery=${searchQuery}`);
