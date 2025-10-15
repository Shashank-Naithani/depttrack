import { createSlice } from "@reduxjs/toolkit";

// Initial State ******
const initialState = {
  uiLoading: false,
};

// UI Slice ******
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setUiLoading: (state, action) => {
      state.uiLoading = action.payload;
    },
  },
});

export const { setUiLoading } = uiSlice.actions;
export default uiSlice.reducer;
