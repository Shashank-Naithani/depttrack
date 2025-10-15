import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../libs/firebase";

export const getCurrentDepartmentTasksThunk = createAsyncThunk(
  "task/getCurrentDepartmentTasksThunk",
  async (departmentId, { rejectWithValue }) => {
    try {
      if (!departmentId) {
        return rejectWithValue("Missing department id.");
      }

      //   Fetch tasks
      const tasksCollectionRef = collection(db, "tasks");
      const tasksQuery = query(
        tasksCollectionRef,
        where("department", "==", departmentId)
      );

      //   Get tasks
      const tasksSnapshot = await getDocs(tasksQuery);
      const tasks = tasksSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          dueDate: data.dueDate ? data.dueDate.toDate().toISOString() : null,
        };
      });

      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTasksThunk = createAsyncThunk(
  "task/getAllTasksThunk",
  async (_, { rejectWithValue }) => {
    try {
      //   Fetch tasks
      const tasksCollectionRef = collection(db, "tasks");

      //   Get tasks
      const tasksSnapshot = await getDocs(tasksCollectionRef);
      const tasks = tasksSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          dueDate: data.dueDate ? data.dueDate.toDate().toISOString() : null,
        };
      });

      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Change Task Status Thunk ******
export const changeTaskStatusThunk = createAsyncThunk(
  "task/changeTaskStatusThunk",
  async ({ taskId, newStatus }, { rejectWithValue }) => {
    try {
      if (!taskId || !newStatus) {
        throw new Error("Missing taskId or newStatus");
      }

      // Reference to the task document
      const taskDocRef = doc(db, "tasks", taskId);

      // Update only the status field
      await updateDoc(taskDocRef, { status: newStatus });

      return { taskId, newStatus };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Task Thunk ******
export const addTaskThunk = createAsyncThunk(
  "task/addTaskThunk",
  async (task, { rejectWithValue }) => {
    try {
      // Ensure dueDate is stored as Firestore Timestamp
      const taskWithDate = {
        ...task,
        dueDate: task.dueDate
          ? Timestamp.fromDate(new Date(task.dueDate))
          : null,
      };

      // Add doc to Firestore
      const docRef = await addDoc(collection(db, "tasks"), taskWithDate);

      // Add the generated ID back into the same document
      await updateDoc(docRef, { id: docRef.id });

      // Return task with date only (same as your old return)
      return task;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Task Thunk ******
export const updateTaskThunk = createAsyncThunk(
  "task/updateTaskThunk",
  async (task, { rejectWithValue }) => {
    try {
      // Ensure dueDate is stored as Firestore Timestamp
      const taskWithDate = {
        ...task,
        dueDate: task.dueDate
          ? Timestamp.fromDate(new Date(task.dueDate))
          : null,
      };

      // Update doc in Firestore
      await updateDoc(doc(db, "tasks", task.id), taskWithDate);

      // Return task with date only (same as your old return)
      return task;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Task Thunk
export const deleteTaskThunk = createAsyncThunk(
  "task/deleteTaskThunk",
  async (taskId, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);

      // return deleted id so reducer can remove it from state
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
