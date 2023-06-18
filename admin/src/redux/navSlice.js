import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    sidebarBtn: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { sidebarBtn } = navSlice.actions;

export default navSlice.reducer;
