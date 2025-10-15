import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-text mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          You don't have the required permissions to view this page.
        </p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/", { replace: true })}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
