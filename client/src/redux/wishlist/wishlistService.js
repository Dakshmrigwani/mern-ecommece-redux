import axios from "axios";

const API = axios.create({
  baseURL: "https://api-mern-ecommece.vercel.app/api/wishlists",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).user_token
    }`;
  }

  return req;
});

export const createWishlist = (wishData) => API.post("/create", wishData);
export const getUserWishlist = () => API.get("/");
export const deleteWishlist = (id) => API.delete(`/${id}`);
