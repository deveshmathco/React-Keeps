import React, { useState, useCallback, useEffect } from "react";
import { useTasks } from "../contexts/TaskContext";
import {
  Form,
  Input,
  TextArea,
  Select,
  Button,
  Card,
} from "./styles/StyledComponents";

const initialFormState = {
  title: "",
  description: "",
  category: "Personal",
  priority: "medium",
  createdAt: new Date().toISOString(),
};

const TaskForm = ({
  isEditing = false,
  initialData = null,
  onCancel = null,
}) => {
  const { addTask, updateTask, categories, loading } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(
    isEditing && initialData ? { ...initialData } : { ...initialFormState }
  );

  useEffect(() => {
    if (
      Array.isArray(categories) &&
      categories.length > 0 &&
      !formData.category
    ) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
      }));
    }
  }, [categories, formData.category]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);

      if (!formData.title.trim()) {
        setError("Title is required");
        return;
      }

      setIsSubmitting(true);

      try {
        if (isEditing && initialData) {
          await updateTask(initialData.id, formData);
          if (onCancel) onCancel();
        } else {
          await addTask({
            ...formData,
            createdAt: new Date().toISOString(),
          });

          setFormData({ ...initialFormState });
        }
      } catch (err) {
        setError("Failed to save task. Please try again.");
        console.error("Form submission error:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isEditing, initialData, addTask, updateTask, onCancel]
  );

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  return (
    <Card>
      <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Enter task title"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <TextArea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter task description"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <Select
            id="category"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            disabled={
              isSubmitting ||
              loading ||
              !Array.isArray(categories) ||
              categories.length === 0
            }
          >
            {Array.isArray(categories) &&
              categories.map((category, index) => (
                <option key={`category-option-${index}`} value={category}>
                  {category}
                </option>
              ))}
          </Select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <Select
            id="priority"
            name="priority"
            value={formData.priority || "medium"}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </Select>
        </div>

        <div className="form-actions">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Task"
              : "Add Task"}
          </Button>

          {isEditing && (
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default TaskForm;
