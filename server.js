const express = require("express");
const cors = require("cors");
const path = require("path");

const taskRoutes = require("./routes/taskRoutes");
require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

// Serve React frontend
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Student To-Do Manager running on http://localhost:${PORT}`);
});