import React from 'react';
import { Clock, Star, Edit, Trash2, Check, AlertCircle } from 'lucide-react';

export function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'Personal':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'Shopping':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'Health':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`
      group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 
      rounded-xl p-6 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 
      transition-all duration-300 hover:-translate-y-1 animate-fade-in
      ${task.completed ? 'opacity-75' : ''}
    `}>
      {/* Priority Indicator */}
      <div className={`
        absolute top-0 left-0 w-1 h-full rounded-l-xl
        ${task.priority === 'high' ? 'bg-red-500' : 
          task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}
      `} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggle(task)}
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${task.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400'
              }
            `}
          >
            {task.completed && <Check size={14} />}
          </button>
          <div>
            <h3 className={`
              font-semibold text-gray-900 dark:text-white transition-all duration-200
              ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}
            `}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                {task.category}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                <Star size={10} className="mr-1" />
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className={`
        text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2
        ${task.completed ? 'line-through' : ''}
      `}>
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Clock size={12} />
          <span>
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        {task.updatedAt !== task.createdAt && (
          <div className="flex items-center space-x-1">
            <AlertCircle size={12} />
            <span>Updated {new Date(task.updatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}