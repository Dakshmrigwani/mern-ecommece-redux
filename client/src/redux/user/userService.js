import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).user_token
    }`;
  }

  return req;
});

export const userRegister = (formData) => API.post("/register", formData);
export const userLogin = (formValues) => API.post("/userLogin", formValues);
// export const loadUser = () => API.get("/me");
export const updateUser = (profileData) => API.put("/update", profileData);
export const changePassword = (passwordData) =>
  API.put("/changePassword", passwordData);
export const forgotPassword = (email) => API.post("/forgotpassword", email);
export const resetPassword = (token, password) =>
  API.put(`/resetpassword/${token}`, { password });
