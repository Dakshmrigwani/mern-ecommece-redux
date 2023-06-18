import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./authService";

export const loginAdmin = createAsyncThunk(
  "auth/admin/login",
  async ({ adminData }, { rejectWithValue }) => {
    try {
      const response = await service.adminLogin(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("admin", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
