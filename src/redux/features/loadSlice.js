import { createSlice } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
  name: "loads",
  initialState: {
    load: false,
  },
  reducers: {
    isLoadTrue: (state, action) => {
      state.load = true;
    },
    isLoadFalse: (state, action) => {
      state.load = false;
    },
  },
});

export const { isLoadTrue, isLoadFalse } = loadSlice.actions;
