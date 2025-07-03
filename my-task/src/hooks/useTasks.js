import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';

export function useTasks() {
  const { state, dispatch } = useTask();

  useEffect(() => {
    if (state.tasks.length === 0) {
      fetchInitialTasks();
    }
  }, []);

  const fetchInitialTasks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const todos = await response.json();

      const tasks = todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: `Task ${todo.id} description`,
        completed: todo.completed,
        priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        category: ['Work', 'Personal', 'Shopping', 'Health'][Math.floor(Math.random() * 4)],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      dispatch({ type: 'SET_TASKS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task) => {
    const updatedTask = {
      ...task,
      updatedAt: new Date().toISOString()
    };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(state.filters.search.toLowerCase());
    const matchesCategory =
      state.filters.category === 'all' || task.category === state.filters.category;
    const matchesPriority =
      state.filters.priority === 'all' || task.priority === state.filters.priority;
    const matchesStatus =
      state.filters.status === 'all' ||
      (state.filters.status === 'completed' && task.completed) ||
      (state.filters.status === 'pending' && !task.completed);

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  return {
    tasks: filteredTasks,
    allTasks: state.tasks,
    filters: state.filters,
    isLoading: state.isLoading,
    error: state.error,
    addTask,
    updateTask,
    deleteTask,
    setFilters
  };
}