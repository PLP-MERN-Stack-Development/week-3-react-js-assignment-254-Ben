import React from 'react';
import { Sun, Moon, Plus, Bell, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Header({ onAddTask, sidebarOpen, setSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className="block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 transition-all"></span>
                <span className="block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 mt-1 transition-all"></span>
                <span className="block h-0.5 w-6 bg-gray-600 dark:bg-gray-300 mt-1 transition-all"></span>
              </div>
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-4 lg:ml-0">
              TaskFlow
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span className="hidden sm:block">Add Task</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell size={20} />
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}