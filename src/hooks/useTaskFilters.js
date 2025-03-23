import { useMemo } from "react";
import { useTasks } from "../contexts/TaskContext";

export const useTaskFilters = () => {
  const { tasks } = useTasks();

  const taskStats = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return {
        total: 0,
        completed: 0,
        incomplete: 0,
        percentComplete: 0,
      };
    }

    const completedTasks = tasks.filter((task) => task.completed);
    const incompleteTasks = tasks.filter((task) => !task.completed);
    return {
      total: tasks.length,
      completed: completedTasks.length,
      incomplete: incompleteTasks.length,
      percentComplete:
        tasks.length > 0
          ? Math.round((completedTasks.length / tasks.length) * 100)
          : 0,
    };
  }, [tasks]);

  const getTasksByCategory = useMemo(() => {
    return (category) => {
      if (!Array.isArray(tasks)) return [];
      return tasks.filter((task) => task.category === category);
    };
  }, [tasks]);

  const searchTasks = useMemo(() => {
    return (searchTerm) => {
      if (!Array.isArray(tasks)) return [];
      if (!searchTerm) return tasks;

      const lowerCaseSearch = searchTerm.toLowerCase();
      return tasks.filter(
        (task) =>
          (task.title && task.title.toLowerCase().includes(lowerCaseSearch)) ||
          (task.description &&
            task.description.toLowerCase().includes(lowerCaseSearch))
      );
    };
  }, [tasks]);

  return {
    taskStats,
    getTasksByCategory,
    searchTasks,
  };
};
