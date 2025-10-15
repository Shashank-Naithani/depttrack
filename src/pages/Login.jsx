import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../app/features/authFeatures/authThunks";
import { setUiLoading } from "../app/features/uiFeatures/uiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // States
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Supporting Hooks
  const navigate = useNavigate();

  // Redux Hooks
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isAuth } = useSelector((state) => state.auth);

  // Handler Functions
  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(setUiLoading(true));

    // Login
    const response = await dispatch(loginThunk(loginData));

    // Error
    if (response?.meta.requestStatus === "rejected") {
      dispatch(setUiLoading(false));
      toast.error("Unable to login. Please try again.");
      return;
    }

    // Success
    if (
      response?.payload.department.id === "admin" ||
      response?.payload.department.id === "human-resource"
    ) {
      navigate("/admin");
    } else {
      navigate(`/department/${response?.payload.department.id}`);
    }
    toast.success("Login successful.");
    dispatch(setUiLoading(false));
  };

  // On Mount and unmount handlers
  useEffect(() => {
    dispatch(setUiLoading(true));
    if (user) {
      if (
        user.department.id === "admin" ||
        user.department.id === "human-resource"
      ) {
        navigate("/admin");
      } else {
        navigate(`/department/${user.department.id}`);
      }
    }
    dispatch(setUiLoading(false));
  }, [dispatch]);

  return (
    <div className="min-h-[100dvh] bg-white flex">
      {/* Left Panel - Branding (Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 justify-center items-center p-12">
        <div className="max-w-md text-white text-center">
          <div className="mb-8 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white opacity-90"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h2 className="text-3xl font-semibold">DeptTrack</h2>
          <p className="mt-6 text-lg opacity-90">
            Streamlining our efforts to make a difference in communities around
            the world.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header with Icon */}
          <div className="text-center mb-6 md:hidden">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-600 mb-1">DIVA</h1>
            <h2 className="text-xl text-gray-800 font-medium">Task Tracker</h2>
            <p className="mt-3 text-sm text-gray-600 max-w-xs mx-auto">
              Streamlining our efforts to make a difference
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={loginHandler}>
              {/* Email Input */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-medium mb-2 text-sm"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="Enter your email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-800 font-medium mb-2 text-sm"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm pr-10"
                    placeholder="Enter your password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />

                  {/* Password Hide/Show Icon */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!loginData.email || !loginData.password}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                Login
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} DeptTrack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
