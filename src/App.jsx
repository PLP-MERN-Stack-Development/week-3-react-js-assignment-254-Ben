import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { StatsCard } from './components/StatsCard';
import { useTasks } from './hooks/useTasks';
import  Footer  from './components/Footer';
import { 
  CheckSquare, 
  Clock, 
  Star, 
  Plus,
  Zap
} from 'lucide-react';

function Dashboard() {
  const { 
    tasks, 
    allTasks, 
    filters, 
    isLoading, 
    addTask, 
    updateTask, 
    deleteTask, 
    setFilters 
  } = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.completed).length,
    pending: allTasks.filter(t => !t.completed).length,
    high: allTasks.filter(t => t.priority === 'high').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleToggleTask = (task) => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleSearchChange = (search) => {
    setFilters({ search });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            onAddTask={handleAddTask}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back! Hope you can Fire it Up 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your tasks today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Tasks"
                value={stats.total}
                icon={CheckSquare}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                trend={10}
              />
              <StatsCard
                title="Completed"
                value={stats.completed}
                icon={CheckSquare}
                color="bg-gradient-to-br from-green-500 to-green-600"
                trend={5}
              />
              <StatsCard
                title="Pending"
                value={stats.pending}
                icon={Clock}
                color="bg-gradient-to-br from-amber-500 to-amber-600"
                trend={-5}
              />
              <StatsCard
                title="High Priority"
                value={stats.high}
                icon={Star}
                color="bg-gradient-to-br from-red-500 to-red-600"
                trend={3}
              />
            </div>

            {/* Progress Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress Overview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You're doing great! Keep it up!</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="text-yellow-500" size={20} />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Search and Filters */}
            <SearchBar
              searchTerm={filters.search}
              onSearchChange={handleSearchChange}
              onFilterToggle={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />

            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
              isOpen={showFilters}
            />

            {/* Task List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Tasks {tasks.length > 0 && `(${tasks.length})`}
                </h2>
                <button
                  onClick={handleAddTask}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  <Plus size={20} />
                  <span>Add Task</span>
                </button>
              </div>
              
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggle={handleToggleTask}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addTask}
        onUpdate={updateTask}
        task={editingTask}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;