const express = require("express");

const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  completeTask
} = require("../controllers/taskController");

const router = express.Router();

// Create task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get single task
router.get("/:id", getTask);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

// Mark completed
router.patch("/:id/complete", completeTask);

module.exports = router;