import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./navSlice";
import productReducer from "./product/productSlice";
import authAdminReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    prodReducer: productReducer,
    authAdmin: authAdminReducer,
  },
});
