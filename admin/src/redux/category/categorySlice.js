import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./categoryService";
import swal from "sweetalert";

export const addCategory = createAsyncThunk(
  "categories/add_category",
  async ({ catData }, { rejectWithValue }) => {
    try {
      const response = await service.addCategory(catData);
      swal("Success", response.data.message, "success");
      return response.data.product;
    } catch (error) {
      swal("Test", error.response.data.message, "error");
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    products: [],
    categories: [],
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.categories = [...state.categories, action.payload];
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export default categorySlice.reducer;
