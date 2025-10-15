import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-text mb-2">Page not found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
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

export default NotFound;
