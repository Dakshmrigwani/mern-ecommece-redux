import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./orderService";

// create new order code
export const createNewOrder = createAsyncThunk(
  "orders/new_order",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await service.createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get user orders
export const getUserOrders = createAsyncThunk(
  "orders/my_orders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.userOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    userOrders: [],
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
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearError } = orderSlice.actions;

export default orderSlice.reducer;
