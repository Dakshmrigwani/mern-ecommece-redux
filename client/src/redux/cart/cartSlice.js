import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cartItems");
  if (cart) {
    return JSON.parse(localStorage.getItem("cartItems"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cartItems", JSON.stringify(data));
};

// export const createUserCart = createAsyncThunk(
//   "cart/createUserCart",
//   async (cartData, { rejectWithValue }) => {
//     try {
//       const response = await service.createCart(cartData);
//       toast.success("Item added to cart");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const userCartList = createAsyncThunk(
//   "cart/userCartList",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await service.getUserCart();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteCartItem = createAsyncThunk(
//   "cart/deleteCartItem",
//   async ({ id, pid }, { rejectWithValue }) => {
//     try {
//       const response = await service.deleteUserCart(id, pid);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: fetchFromLocalStorage(),
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    quantity: 0,
    loading: false,
    cartError: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((p) => p._id === action.payload._id);
      if (item) {
        item.qty++;
        toast.success("Item quantity increased");
      } else {
        toast.success("Item added to cart");
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.quantity += 1;
      // state.total += action.payload.price * action.payload.qty;
    },
    increaseQuantity: (state, action) => {
      state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.qty += 1;
        }
      });
      storeInLocalStorage(state.cartItems);
    },
    decreaseQuantity: (state, action) => {
      state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.qty -= 1;
        }
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload
          );
        }
      });
      storeInLocalStorage(state.cartItems);
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      storeInLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      storeInLocalStorage(state.cartItems);
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createUserCart.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(createUserCart.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.cartProducts = action.payload;
  //     })
  //     .addCase(createUserCart.rejected, (state, action) => {
  //       state.loading = false;
  //       state.cartError = action.payload.message;
  //     })

  //     // userCartList
  //     .addCase(userCartList.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(userCartList.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.cartProducts = action.payload;
  //     })
  //     .addCase(userCartList.rejected, (state, action) => {
  //       state.loading = false;
  //       state.cartError = action.payload.message;
  //     })

  //     // deleteCartItem
  //     .addCase(deleteCartItem.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(deleteCartItem.fulfilled, (state, action) => {
  //       state.loading = false;
  //       const {
  //         arg: { id },
  //       } = action.meta;
  //       state.cartProducts = state.cartProducts.filter(
  //         (item) => item._id !== id
  //       );
  //     })
  //     .addCase(deleteCartItem.rejected, (state, action) => {
  //       state.loading = false;
  //       state.cartError = action.payload.message;
  //     });
  // },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  clearCart,
  saveShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
