import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/uiFeatures/uiSlice";
import authSlice from "./features/authFeatures/authSlice";
import departmentSlice from "./features/department/departmentSlice";
import taskSlice from "./features/taskFeatures/taskSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    department: departmentSlice,
    task: taskSlice,
  },
});

export default store;
