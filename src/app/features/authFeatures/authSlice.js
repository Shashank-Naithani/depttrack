import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./authThunks";

// Initial State ******
const initialState = {
  user: null,
  isAuth: false,
  authChecked: false,
  status: "idle",
  error: null,
};

// Logout Reducer ******
const logoutReducer = (state) => {
  state.user = null;
  state.isAuth = false;
  state.status = "successed";
  state.error = null;
};

// Set User Reducer ******
const setUserReducer = (state, action) => {
  state.user = action.payload;
  state.isAuth = true;
  state.status = "successed";
  state.error = null;
};

// Auth Slice ******
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: logoutReducer,
    setUser: setUserReducer,
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk ******
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.isAuth = false;
        state.user = null;
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.error = null;
        state.status = "successed";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = null;
        state.status = "failed";
      })
      // Logout Thunk ******
      .addCase(logoutThunk.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.error = null;
        state.status = "successed";
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = null;
        state.status = "failed";
      });
  },
});

export const { logout, setUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
