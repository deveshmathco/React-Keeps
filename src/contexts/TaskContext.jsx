import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
} from "react";
import {
  fetchTasks,
  createTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  fetchCategories,
  addCategory as apiAddCategory,
} from "../services/api";

const initialState = {
  tasks: [],
  categories: [],
  loading: true,
  error: null,
};

const SET_TASKS = "SET_TASKS";
const SET_CATEGORIES = "SET_CATEGORIES";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const TOGGLE_TASK = "TOGGLE_TASK";
const ADD_CATEGORY = "ADD_CATEGORY";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

const taskReducer = (state, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id.toString() !== action.payload.toString()
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: action.payload.completed }
            : task
        ),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const loadInitialData = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
        const tasksData = await fetchTasks();
        dispatch({ type: SET_TASKS, payload: tasksData });

        const categoriesData = await fetchCategories();
        dispatch({ type: SET_CATEGORIES, payload: categoriesData });
      } catch (error) {
        console.error("Failed to load initial data:", error);
        dispatch({
          type: SET_ERROR,
          payload: "Failed to load tasks and categories",
        });
      }
    };

    loadInitialData();
  }, []);

  const addTask = useCallback(async (task) => {
    try {
      const newTask = await createTask(task);
      dispatch({ type: ADD_TASK, payload: newTask });
      return newTask;
    } catch (error) {
      console.error("Failed to add task:", error);
      dispatch({ type: SET_ERROR, payload: "Failed to add task" });
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      const id = await apiDeleteTask(taskId);
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (error) {
      console.error("Failed to delete task:", error);
      dispatch({ type: SET_ERROR, payload: "Failed to delete task" });
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id, updatedTask) => {
    try {
      const updated = await apiUpdateTask(id, updatedTask);
      dispatch({ type: UPDATE_TASK, payload: { id, updatedTask: updated } });
      return updated;
    } catch (error) {
      console.error("Failed to update task:", error);
      dispatch({ type: SET_ERROR, payload: "Failed to update task" });
      throw error;
    }
  }, []);

  const toggleTaskCompletion = useCallback(async (taskId, completed) => {
    try {
      const updatedTask = await apiUpdateTask(taskId, {
        completed: !completed,
      });
      dispatch({
        type: TOGGLE_TASK,
        payload: { id: taskId, completed: updatedTask.completed },
      });
      return updatedTask;
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
      dispatch({
        type: SET_ERROR,
        payload: "Failed to toggle task completion",
      });
      throw error;
    }
  }, []);

  const addCategory = useCallback(async (categoryName) => {
    try {
      const newCategory = await apiAddCategory({ name: categoryName });
      dispatch({ type: ADD_CATEGORY, payload: newCategory });
      return newCategory;
    } catch (error) {
      console.error("Failed to add category:", error);
      dispatch({ type: SET_ERROR, payload: "Failed to add category" });
      throw error;
    }
  }, []);

  const categoryNames = state.categories.map(
    (category) => category.name || category
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        categories: categoryNames,
        rawCategories: state.categories,
        loading: state.loading,
        error: state.error,
        addTask,
        deleteTask,
        updateTask,
        toggleTaskCompletion,
        addCategory,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
