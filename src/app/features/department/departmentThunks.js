import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export const getCurrentDepartmentById = createAsyncThunk(
  "department/getCurrentDepartmentById",
  async (departmentId, { rejectWithValue }) => {
    try {
      if (!departmentId) {
        return rejectWithValue("Missing department id.");
      }

      // check if department exists
      const departmentDocRef = doc(db, "departments", departmentId);
      const departmentDocSnap = await getDoc(departmentDocRef);
      if (!departmentDocSnap.exists()) {
        return rejectWithValue("Department does not exist.");
      }

      return departmentDocSnap.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get All Departments Thunk ******
export const getAllDepartmentsThunk = createAsyncThunk(
  "department/getAllDepartmentsThunk",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch departments
      const departmentsCollectionRef = collection(db, "departments");

      // Get departments
      const departmentsSnapshot = await getDocs(departmentsCollectionRef);
      const departments = departmentsSnapshot.docs
        .map((doc) => ({
          ...doc.data(),
        }))
        .filter(
          (dept) =>
            dept.id.toLowerCase() !== "admin" &&
            dept.id.toLowerCase() !== "human-resource"
        );

      return departments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
