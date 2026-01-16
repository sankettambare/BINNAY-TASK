import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { role, logout, token } = useContext(AuthContext);

  return (
    <div className="nav">
      {/* Always visible */}
      <Link to="/">Movies</Link>

      {/* Show when NOT logged in */}
      {!token && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {/* Admin only */}
      {role === "admin" && <Link to="/add">Add Movie</Link>}

      {/* Logout when logged in */}
      {token && <button onClick={logout}>Logout</button>}
    </div>
  );
}
