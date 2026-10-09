const db = require("../database");

// Add Task
const createTask = (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and due date are required"
      });
    }

    const stmt = db.prepare(`
      INSERT INTO tasks (title, description, dueDate)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(
      title,
      description || "",
      dueDate
    );

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json({
      ...task,
      completed: Boolean(task.completed)
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message
    });
  }
};

// View All Tasks
const getTasks = (req, res) => {
  try {
    const tasks = db
      .prepare("SELECT * FROM tasks ORDER BY dueDate ASC")
      .all();

    res.status(200).json(
      tasks.map(task => ({
        ...task,
        completed: Boolean(task.completed)
      }))
    );
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
};

// View Single Task
const getTask = (req, res) => {
  try {
    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      ...task,
      completed: Boolean(task.completed)
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error.message
    });
  }
};

// Update Task
const updateTask = (req, res) => {
  try {
    const { title, description, dueDate, completed } = req.body;

    const result = db
      .prepare(`
        UPDATE tasks
        SET title = ?,
            description = ?,
            dueDate = ?,
            completed = ?
        WHERE id = ?
      `)
      .run(
        title,
        description || "",
        dueDate,
        completed ? 1 : 0,
        req.params.id
      );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(req.params.id);

    res.status(200).json({
      ...task,
      completed: Boolean(task.completed)
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message
    });
  }
};

// Delete Task
const deleteTask = (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM tasks WHERE id = ?")
      .run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message
    });
  }
};

// Mark Task Completed
const completeTask = (req, res) => {
  try {
    const result = db
      .prepare(`
        UPDATE tasks
        SET completed = 1
        WHERE id = ?
      `)
      .run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const task = db
      .prepare("SELECT * FROM tasks WHERE id = ?")
      .get(req.params.id);

    res.status(200).json({
      ...task,
      completed: Boolean(task.completed)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to complete task",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask
};