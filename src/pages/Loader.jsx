import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-primary rounded-xl mx-auto shadow-lg flex items-center justify-center relative z-10">
            <svg
              className="w-10 h-10 text-white animate-pulse"
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

          {/* Animated Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-primary/30 rounded-xl animate-ping absolute"></div>
            <div className="w-28 h-28 border-2 border-primary/20 rounded-xl animate-ping absolute animation-delay-300"></div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-semibold text-text mb-6">
          DIVA Task Tracker
        </h2>

        {/* Modern Loading Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute h-full bg-primary rounded-full w-0 animate-[widthGrow_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-primary/80 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
          <div className="w-3 h-3 bg-primary/60 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
          <div className="w-3 h-3 bg-primary/40 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
        </div>
      </div>

      {/* Custom Animation Keyframes */}
      <style>{`
        @keyframes widthGrow {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
