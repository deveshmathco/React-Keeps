import React, { useState, memo, useMemo, useCallback, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";
import { useTaskFilters } from "../hooks/useTaskFilters";
import TaskItem from "./TaskItem";
import styled from "styled-components";
import {
  Section,
  Select,
  Input,
  Button,
  FilterContainer,
} from "./styles/StyledComponents";

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TaskGroupHeader = styled.h3`
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid
    ${(props) =>
      props.type === "completed"
        ? props.theme.success
        : props.type === "high"
        ? props.theme.danger
        : props.theme.primary};
  color: ${(props) =>
    props.type === "completed"
      ? props.theme.success
      : props.type === "high"
      ? props.theme.danger
      : props.theme.text};
  font-weight: 600;
  grid-column: 1 / -1;
`;

const TaskStats = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardBackground};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px ${(props) => props.theme.shadow};

  .stat {
    text-align: center;

    .number {
      font-size: 1.5rem;
      font-weight: bold;
      color: ${(props) => props.theme.primary};
      display: block;
    }

    .label {
      font-size: 0.9rem;
      color: ${(props) => props.theme.secondary};
    }
  }
`;

const TaskList = () => {
  const { tasks, categories, loading, error } = useTasks();
  const { searchTasks, taskStats } = useTaskFilters();
  const [isDataReady, setIsDataReady] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    if (Array.isArray(tasks) && tasks.length > 0) {
      setIsDataReady(true);
    }
  }, [tasks]);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const toggleCompletedTasks = useCallback(() => {
    setShowCompleted((prev) => !prev);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory("All");
    setSearchTerm("");
    setShowCompleted(true);
  }, []);

  const filteredTasks = useMemo(() => {
    if (!Array.isArray(tasks)) return [];

    let searchFiltered = searchTasks(searchTerm);

    if (selectedCategory !== "All") {
      searchFiltered = searchFiltered.filter(
        (task) => task.category === selectedCategory
      );
    }

    if (!showCompleted) {
      searchFiltered = searchFiltered.filter((task) => !task.completed);
    }

    return searchFiltered;
  }, [tasks, selectedCategory, searchTerm, showCompleted, searchTasks]);

  const groupedTasks = useMemo(() => {
    const highPriority = filteredTasks.filter(
      (task) =>
        !task.completed &&
        (task.priority === "high" ||
          getPriorityFromDate(task.createdAt) === "high")
    );

    const normalTasks = filteredTasks.filter(
      (task) =>
        !task.completed &&
        task.priority !== "high" &&
        getPriorityFromDate(task.createdAt) !== "high"
    );

    const completedTasks = filteredTasks.filter((task) => task.completed);

    return { highPriority, normalTasks, completedTasks };
  }, [filteredTasks]);

  if (loading && !isDataReady) {
    return (
      <Section>
        <h2>Tasks</h2>
        <p>Loading tasks...</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <h2>Tasks</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </Section>
    );
  }

  return (
    <Section>
      <h2>Tasks</h2>

      <TaskStats>
        <div className="stat">
          <span className="number">{taskStats.total}</span>
          <span className="label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="number">{taskStats.completed}</span>
          <span className="label">Completed</span>
        </div>
        <div className="stat">
          <span className="number">{taskStats.incomplete}</span>
          <span className="label">Pending</span>
        </div>
        <div className="stat">
          <span className="number">{taskStats.percentComplete}%</span>
          <span className="label">Complete</span>
        </div>
      </TaskStats>

      <FilterContainer>
        <div className="filter-group">
          <label htmlFor="categoryFilter">Filter by Category</label>
          <Select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            {Array.isArray(categories) &&
              categories.map((category, index) => (
                <option key={`category-${index}`} value={category}>
                  {category}
                </option>
              ))}
          </Select>
        </div>

        <div className="filter-group">
          <label htmlFor="searchTasks">Search Tasks</label>
          <Input
            type="text"
            id="searchTasks"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title or description"
          />
        </div>

        <div className="filter-actions">
          <Button onClick={toggleCompletedTasks}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
      </FilterContainer>

      {filteredTasks.length === 0 ? (
        <p>No tasks found. Try changing your filters or add a new task.</p>
      ) : (
        <TasksGrid>
          {groupedTasks.highPriority.length > 0 && (
            <>
              <TaskGroupHeader type="high">High Priority Tasks</TaskGroupHeader>
              {groupedTasks.highPriority.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </>
          )}

          {groupedTasks.normalTasks.length > 0 && (
            <>
              <TaskGroupHeader>Tasks</TaskGroupHeader>
              {groupedTasks.normalTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </>
          )}

          {showCompleted && groupedTasks.completedTasks.length > 0 && (
            <>
              <TaskGroupHeader type="completed">
                Completed Tasks
              </TaskGroupHeader>
              {groupedTasks.completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </>
          )}
        </TasksGrid>
      )}
    </Section>
  );
};

function getPriorityFromDate(dateStr) {
  if (!dateStr) return "medium";

  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "high";
    if (diffDays < 3) return "medium";
    return "low";
  } catch {
    return "medium";
  }
}

export default memo(TaskList);
