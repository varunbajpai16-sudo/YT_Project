import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// 🔥 Get stored data first
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("accessToken");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  accessToken: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
  onpage:"Home"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      // 🔥 Persist BOTH
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem(
        "accessToken",
        action.payload.accessToken
      );
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    toggleonpage:(state,action)=>{
      state.onpage= action.payload
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  toggleonpage
} = authSlice.actions;

export default authSlice.reducer;