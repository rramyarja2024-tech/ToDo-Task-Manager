import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
} from "../services/taskApi";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      await loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to complete task");
    }
  };

  const handleEdit = async (task) => {
    const newTitle = window.prompt(
      "Enter new task title:",
      task.title
    );

    if (!newTitle || newTitle.trim() === "") {
      return;
    }

    try {
      await updateTask(task._id, {
        title: newTitle,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed
      });

      await loadTasks();
      setEditingTask(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <div className="tasks-page">

      <h1>My Tasks</h1>

      <TaskForm onTaskAdded={handleAddTask} />

      <div className="filter-buttons">

        <button onClick={() => setFilter("all")}>
          All ({tasks.length})
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending ({tasks.filter(t => !t.completed).length})
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed ({tasks.filter(t => t.completed).length})
        </button>

      </div>

      <div className="task-list">

        {filteredTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Tasks;