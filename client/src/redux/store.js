import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
