import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth/admin",
});

export const adminLogin = (adminData) => API.post("/login", adminData);
