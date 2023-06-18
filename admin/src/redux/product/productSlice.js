import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./productService";
import swal from "sweetalert";

export const addProducts = createAsyncThunk(
  "products/add_product",
  async ({ productData }, { rejectWithValue }) => {
    try {
      const response = await service.addProducts(productData);
      swal("Success", response.data.message, "success");
      return response.data.product;
    } catch (error) {
      swal("Test", error.response.data.message, "error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/get_products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete_product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await service.deleteProduct(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.products = [...state.products, action.payload];
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action);
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.products = state.products.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export default productSlice.reducer;
