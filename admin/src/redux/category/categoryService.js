import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/categories",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("admin")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("admin")).admin_token
    }`;
  }

  return req;
});

export const addCategory = (catData) => API.post("/add_category", catData);
export const deleteCategory = (id) => API.delete(`/delete_cat/${id}`);
