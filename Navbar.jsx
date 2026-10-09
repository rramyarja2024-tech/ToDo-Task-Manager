import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🎓 Student Task Manager
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
    </nav>
  );
}

export default Navbar;