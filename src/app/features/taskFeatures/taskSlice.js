import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskThunk,
  changeTaskStatusThunk,
  deleteTaskThunk,
  getAllTasksThunk,
  getCurrentDepartmentTasksThunk,
  updateTaskThunk,
} from "./taskThunks";

const initialState = {
  // State for all tasks of a department
  currentDepartmentTasks: [],
  currentDepartmentTasksStatus: "idle",
  currentDepartmentTasksError: null,

  // State for all tasks
  allTasks: [],
  allTasksStatus: "idle",
  allTasksError: null,

  // State for changing task status
  changeTaskStatusStatus: "idle",
  changeTaskStatusError: null,

  // State for adding task
  addTaskStatus: "idle",
  addTaskError: null,

  // State for updating task
  updateTaskStatus: "idle",
  updateTaskError: null,

  // State for deleting task
  deleteTaskStatus: "idle",
  deleteTaskError: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    clearCurrentDepartmentTasks: (state) => {
      state.currentDepartmentTasks = [];
      state.currentDepartmentTasksStatus = "idle";
      state.currentDepartmentTasksError = null;
    },
    clearAllTasks: (state) => {
      state.allTasks = [];
      state.allTasksStatus = "idle";
      state.allTasksError = null;
    },
  },
  extraReducers: (builder) => {
    // GetCurrentDepartmentTasksThunk ******
    builder
      .addCase(getCurrentDepartmentTasksThunk.pending, (state) => {
        state.currentDepartmentTasks = [];
        state.currentDepartmentTasksStatus = "loading";
        state.currentDepartmentTasksError = null;
      })
      .addCase(getCurrentDepartmentTasksThunk.fulfilled, (state, action) => {
        state.currentDepartmentTasks = action.payload;
        state.currentDepartmentTasksStatus = "successed";
        state.currentDepartmentTasksError = null;
      })
      .addCase(getCurrentDepartmentTasksThunk.rejected, (state, action) => {
        state.currentDepartmentTasks = [];
        state.currentDepartmentTasksStatus = "failed";
        state.currentDepartmentTasksError = action.error.message;
      })

      // GetAllTasksThunk ******
      .addCase(getAllTasksThunk.pending, (state) => {
        state.allTasks = [];
        state.allTasksStatus = "loading";
        state.allTasksError = null;
      })
      .addCase(getAllTasksThunk.fulfilled, (state, action) => {
        state.allTasks = action.payload;
        state.allTasksStatus = "successed";
        state.allTasksError = null;
      })
      .addCase(getAllTasksThunk.rejected, (state, action) => {
        state.allTasks = [];
        state.allTasksStatus = "failed";
        state.allTasksError = action.error.message;
      })

      // ChangeTaskStatusThunk ******
      .addCase(changeTaskStatusThunk.pending, (state) => {
        state.changeTaskStatusStatus = "loading";
        state.changeTaskStatusError = null;
      })
      .addCase(changeTaskStatusThunk.fulfilled, (state, action) => {
        state.changeTaskStatusStatus = "successed";
        state.changeTaskStatusError = null;
      })
      .addCase(changeTaskStatusThunk.rejected, (state, action) => {
        state.changeTaskStatusStatus = "failed";
        state.changeTaskStatusError = action.error.message;
      })

      // AddTaskThunk ******
      .addCase(addTaskThunk.pending, (state) => {
        state.addTaskStatus = "loading";
        state.addTaskError = null;
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.addTaskStatus = "successed";
        state.addTaskError = null;
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        state.addTaskStatus = "failed";
        state.addTaskError = action.error.message;
      })

      // UpdateTaskThunk ******
      .addCase(updateTaskThunk.pending, (state) => {
        state.updateTaskStatus = "loading";
        state.updateTaskError = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.updateTaskStatus = "successed";
        state.updateTaskError = null;
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.updateTaskStatus = "failed";
        state.updateTaskError = action.error.message;
      })

      // DeleteTaskThunk ******
      .addCase(deleteTaskThunk.pending, (state) => {
        state.deleteTaskStatus = "loading";
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.deleteTaskStatus = "successed";
        state.deleteTaskError = null;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.deleteTaskStatus = "failed";
        state.deleteTaskError = action.error.message;
      });
  },
});

export default taskSlice.reducer;
export const { clearCurrentDepartmentTasks, clearAllTasks } = taskSlice.actions;
