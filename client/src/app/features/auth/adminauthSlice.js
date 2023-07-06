import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: JSON.parse(localStorage.getItem("admin"))
    ? JSON.parse(localStorage.getItem("admin"))
    : null,
};

const adminauthSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setadminAuth: (state) => {
      state.authState = JSON.parse(localStorage.getItem("admin"));
    },
    clearadminAuth: (state) => {
      state.authState = null;
    },
  },
});

export default adminauthSlice.reducer;
export const { setadminAuth, clearadminAuth } = adminauthSlice.actions;
