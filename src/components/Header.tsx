import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { useAuth } from '../hooks/useAuth'; 

import type { User } from '../types'; // adjust import path if needed

interface HeaderProps {
  onAddNew: () => void;
  onLogout: () => void;
  user: User | null;
}


export const Header: React.FC<HeaderProps> = ({ onAddNew }) => {
  const { user, logout } = useAuth(); 

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
      {/* Left: App title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
        Gemini Job Tracker
      </h1>

      {/* Middle: User info */}
      {user && (
        <div className="text-gray-700 dark:text-gray-200 text-sm sm:text-base text-center sm:text-right">
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      )}

      {/* Right: Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Add Application</span>
          <span className="inline sm:hidden">New</span>
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
