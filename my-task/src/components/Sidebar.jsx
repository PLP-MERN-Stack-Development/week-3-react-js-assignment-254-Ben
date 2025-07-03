import React from 'react';
import { 
  Home, 
  CheckSquare,  
  Clock, 
  Star, 
  User
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';

export function Sidebar({ isOpen, onClose }) {
  const { allTasks, setFilters, filters } = useTasks();
  
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.completed).length,
    pending: allTasks.filter(t => !t.completed).length,
    high: allTasks.filter(t => t.priority === 'high').length,
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', value: 'all', count: stats.total },
    { icon: CheckSquare, label: 'Completed', value: 'completed', count: stats.completed },
    { icon: Clock, label: 'Pending', value: 'pending', count: stats.pending },
    { icon: Star, label: 'High Priority', value: 'high', count: stats.high },
  ];

  const categories = ['Work', 'Personal', 'Shopping', 'Health'];

  const handleFilterChange = (type, value) => {
    if (type === 'status') {
      setFilters({ status: value });
    } else if (type === 'category') {
      setFilters({ category: value });
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md 
        border-r border-gray-200/50 dark:border-gray-700/50 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleFilterChange('status', item.value)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                    ${filters.status === item.value 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${filters.status === item.value 
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {item.count}
                  </span>
                </button>
              ))}
            </nav>

            {/* Categories */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange('category', category)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                      ${filters.category === category
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <span className="font-medium">{category}</span>
                    <span className={`
                      px-2 py-1 text-xs rounded-full
                      ${filters.category === category
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }
                    `}>
                      {allTasks.filter(t => t.category === category).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Benard Odera</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">obenard@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}