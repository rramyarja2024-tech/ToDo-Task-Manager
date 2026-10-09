function TaskCard({
  task,
  onComplete,
  onDelete,
  onEdit
}) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        <strong>Due:</strong>{" "}
        {new Date(task.dueDate).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {task.completed ? "Completed ✅" : "Pending ⏳"}
      </p>

      <div className="task-buttons">
        {!task.completed && (
          <button onClick={() => onComplete(task._id)}>
            Complete
          </button>
        )}

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;