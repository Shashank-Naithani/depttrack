import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../app/features/authFeatures/authThunks";
import { setUiLoading } from "../app/features/uiFeatures/uiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handler Functions
  const handleLogout = async () => {
    dispatch(setUiLoading(true));
    await dispatch(logoutThunk());
    navigate("/");
    dispatch(setUiLoading(false));
    toast.success("Logout successful.");
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-4 md:px-6 py-3">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h1
              onClick={() => navigate("/")}
              className="text-x sm:text-xl font-bold text-gray-800 cursor-default"
            >
              DeptTrack
            </h1>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Switch to Admin Dashboard Button */}
          {(user?.department.id.toLowerCase() === "admin" ||
            user?.department.id.toLowerCase() === "human-resource") && (
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center justify-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-1 md:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="hidden md:inline">Admin Dashboard</span>
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <svg
              className="w-5 h-5 mr-1 md:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
