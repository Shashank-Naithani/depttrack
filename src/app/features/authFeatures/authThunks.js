import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../../libs/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Login Thunk ******
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // check if user exists
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (!userCred) {
        return rejectWithValue("Invalid credentials.");
      }

      // check if user data exists
      const userDocRef = await doc(db, "users", userCred.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return rejectWithValue("Invalid credentials.");
      }

      // check if user department exists
      let user = await userDoc.data();
      if (!user.department) {
        return rejectWithValue("No department assigned.");
      }
      const userDepartment = await getDoc(user.department);
      if (!userDepartment.data().name || !userDepartment.data().id) {
        return rejectWithValue("Unable to find department.");
      }

      // final user data to return
      user = {
        ...user,
        department: userDepartment.data(),
      };

      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Logout Thunk ******
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
