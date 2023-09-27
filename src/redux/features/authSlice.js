import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auths",
  initialState: {
    auth: false,
  },
  reducers: {
    isAuthTrue: (state, action) => {
      state.auth = true;
    },
    isAuthFalse: (state, action) => {
      state.auth = false;
    },
  },
});

export const { isAuthTrue, isAuthFalse } = authSlice.actions;
