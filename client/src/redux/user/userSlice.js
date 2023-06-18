import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./userService";

// user register code
export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ values, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await service.userRegister(values);
      toast.success("User registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// user login code
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await service.userLogin(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/update",
  async (profileData, { rejectWithValue }) => {
    console.log(profileData);
    try {
      const response = await service.updateUser(profileData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// change user password
export const updateUserPassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await service.changePassword(passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// forgot password
export const forgotUserPassword = createAsyncThunk(
  "auth/forgotUserPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await service.forgotPassword(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// reset password
export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async ({ token, password }, { rejectWithValue }) => {
    console.log(token, password);
    try {
      const response = await service.resetPassword(token, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      // login code
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...action.payload,
            cartItems: [...action.payload.cartItems],
          })
        );
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      // update user password
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      // forgot user password
      .addCase(forgotUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      })

      // reset user password
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export const { userLogout, clearError, clearMessage } = userSlice.actions;

export default userSlice.reducer;
