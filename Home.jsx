import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Student To-Do Manager 🎓</h1>

      <p>
        Organize your daily academic tasks,
        track deadlines and stay productive.
      </p>

      <Link to="/tasks">
        <button>Manage My Tasks</button>
      </Link>

      <div className="examples">
        <h2>Example Tasks</h2>

        <ul>
          <li>Complete SQL Assignment</li>
          <li>Practice JavaScript</li>
          <li>Submit Project Report</li>
          <li>Attend Python Class</li>
          <li>Complete React Exercise</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;