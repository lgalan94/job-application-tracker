import React from 'react';
import type { User } from '../types'; 

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="lg:fixed top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md px-5 py-3 flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
      
      <div className='flex flex-row gap-1'>
        <img className="w-8 h-8" src="/android-chrome-192x192.png" alt="" />
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white tracking-tight">
           Job Application Tracker
        </h1>
      </div>
      

      {/* Right: User Info + Logout */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center sm:items-end">
          <h5 className="text-blue-600 uppercase">{user?.name}</h5>
          <span className="text-xs italic text-gray-500 lowercase">
            {user?.email}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-1 text-sm bg-red-600 text-white rounded-md shadow-md hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
