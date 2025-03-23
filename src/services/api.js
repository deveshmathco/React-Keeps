import axios from "axios";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Task APIs
export const fetchTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const taskWithDefaults = {
      ...task,
      id: Date.now().toString(),
      createdAt: task.createdAt || new Date().toISOString(),
      completed: false,
    };
    const response = await api.post("/tasks", taskWithDefaults);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await api.patch(`/tasks/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const taskId = id.toString();
    await api.delete(`/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    if (!category.id) {
      category = { ...category, id: Date.now().toString() };
    }
    const response = await api.post("/categories", category);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
