import React, { memo, useState, useMemo } from "react";
import { useTasks } from "../contexts/TaskContext";
import {
  TaskItem as StyledTaskItem,
  CategoryBadge,
  Button,
  DangerButton,
  SuccessButton,
} from "./styles/StyledComponents";
import TaskForm from "./TaskForm";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toggleTaskCompletion, deleteTask } = useTasks();

  const priority = task.priority || getPriorityFromDate(task.createdAt);

  const ActionButton = useMemo(() => {
    return task.completed ? Button : SuccessButton;
  }, [task.completed]);

  const handleToggle = () => {
    toggleTaskCompletion(task.id, task.completed);
  };

  const handleDelete = () => {
    try {
      deleteTask(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm
        isEditing={true}
        initialData={task}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <StyledTaskItem $completed={task.completed}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-metadata">
          <CategoryBadge $completed={task.completed} $priority={priority}>
            {task.category}
          </CategoryBadge>

          {priority && !task.completed && (
            <CategoryBadge $priority={priority}>
              {priority === "high"
                ? "High Priority"
                : priority === "medium"
                ? "Medium Priority"
                : "Low Priority"}
            </CategoryBadge>
          )}
        </div>
      </div>
      <div className="task-actions">
        <ActionButton onClick={handleToggle}>
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </ActionButton>
        <Button onClick={handleEdit}>Edit</Button>
        <DangerButton onClick={handleDelete}>Delete</DangerButton>
      </div>
    </StyledTaskItem>
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

export default memo(TaskItem);
