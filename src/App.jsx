import React, { use, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./pages/Loader";
import authCheckOnAppMount from "./utils/authCheckOnAppMount";
import { logoutThunk } from "./app/features/authFeatures/authThunks";
import { setUser, setAuthChecked } from "./app/features/authFeatures/authSlice";
import { useNavigate } from "react-router-dom";
import { setUiLoading } from "./app/features/uiFeatures/uiSlice";

const App = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const { uiLoading } = useSelector((state) => state.ui);
  const { authChecked } = useSelector((state) => state.auth);

  // React Hooks
  const navigate = useNavigate();

  // Auth Check On App Mount
  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setUiLoading(true));
      const userData = await authCheckOnAppMount();
      if (userData) {
        await dispatch(setUser(userData));
      } else {
        await dispatch(logoutThunk()); // clears redux state only
        navigate("/");
      }
      await dispatch(setAuthChecked(true));
      dispatch(setUiLoading(false));
    };

    checkAuth();

    return () => {
      dispatch(setAuthChecked(false));
    };
  }, [dispatch]);

  if (uiLoading || !authChecked) {
    return <Loader />;
  }

  return <AppRoutes />;
};

export default App;
