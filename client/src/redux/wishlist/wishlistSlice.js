import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import * as service from "./wishlistService";

export const addToWishlist = createAsyncThunk(
  "wishlist/createWishlist",
  async (wishData, { rejectWithValue }) => {
    try {
      const response = await service.createWishlist(wishData);
      if (response.data) {
        toast.success("Item Added to wishlist");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await service.getUserWishlist(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlist/deleteWishlist",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await service.deleteWishlist(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishitems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action);
        state.wishitems = [...state.wishitems, action.payload];
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      // get users wishlist
      .addCase(userWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(userWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action);
        state.wishitems = action.payload;
      })
      .addCase(userWishlist.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload.message;
      })

      // delete users wishlist
      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.wishitems = state.wishitems.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = wishlistSlice.actions;

export default wishlistSlice.reducer;
