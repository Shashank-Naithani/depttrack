import { createSlice, current } from "@reduxjs/toolkit";
import {
  getAllDepartmentsThunk,
  getCurrentDepartmentById,
} from "./departmentThunks";

const initialState = {
  // Current Department Data
  currentDepartment: null,
  currentDepartmentStatus: "idle",
  currentDepartmentError: null,

  // All Departments Data
  allDepartments: [],
  allDepartmentsStatus: "idle",
  allDepartmentsError: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {
    clearCurrentDepartment: (state) => {
      state.currentDepartment = null;
      state.currentDepartmentStatus = "idle";
      state.currentDepartmentError = null;
    },
    clearAllDepartments: (state) => {
      state.allDepartments = [];
      state.allDepartmentsStatus = "idle";
      state.allDepartmentsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GetCurrentDepartmentById Thunk ******
      .addCase(getCurrentDepartmentById.pending, (state) => {
        state.currentDepartment = null;
        state.currentDepartmentStatus = "loading";
        state.currentDepartmentError = null;
      })
      .addCase(getCurrentDepartmentById.fulfilled, (state, action) => {
        state.currentDepartment = action.payload;
        state.currentDepartmentStatus = "successed";
        state.currentDepartmentError = null;
      })
      .addCase(getCurrentDepartmentById.rejected, (state, action) => {
        state.currentDepartment = null;
        state.currentDepartmentStatus = "failed";
        state.currentDepartmentError = action.error.message;
      })
      // GetAllDepartments Thunk ******
      .addCase(getAllDepartmentsThunk.pending, (state) => {
        state.allDepartments = [];
        state.allDepartmentsStatus = "loading";
        state.allDepartmentsError = null;
      })
      .addCase(getAllDepartmentsThunk.fulfilled, (state, action) => {
        state.allDepartments = action.payload;
        state.allDepartmentsStatus = "successed";
        state.allDepartmentsError = null;
      })
      .addCase(getAllDepartmentsThunk.rejected, (state, action) => {
        state.allDepartments = [];
        state.allDepartmentsStatus = "failed";
        state.allDepartmentsError = action.error.message;
      });
  },
});

export default departmentSlice.reducer;
export const { clearCurrentDepartment, clearAllDepartments } =
  departmentSlice.actions;
