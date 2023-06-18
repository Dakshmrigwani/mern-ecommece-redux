import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/carts",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).user_token
    }`;
  }

  return req;
});

export const createCart = (cartData) => API.post("/create", cartData);
export const getUserCart = () => API.get("/");
export const deleteUserCart = (id, pid) => API.delete(`/${id}/${pid}`);
