import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 rounded-t-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        {/* Left — App name & copyright */}
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold tracking-wide">
            © {new Date().getFullYear()} JA Tracker
          </p>
          <p className="text-xs text-indigo-200">All rights reserved.</p>
        </div>

        {/* Middle — Version info */}
        <div className="text-center">
          <p className="text-sm font-medium">
            Version <span className="font-semibold ">v{__APP_VERSION__}</span>
          </p>
          <p className="text-xs text-indigo-200">
            Build: {new Date(__BUILD_DATE__).toLocaleString()}
          </p>
        </div>

        {/* Right — Developer signature */}
        <div className="text-center sm:text-right">
          <p className="text-sm font-medium">Crafted with ❤️ by Lito Galan Jr</p>
        </div>
      </div>
    </footer>
  );
};
