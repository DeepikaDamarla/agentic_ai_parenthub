import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("parent_id");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login
  };

  const handleEventList = () => {
    navigate("/events"); // Navigate to events page
  };

  return (
    <nav className="navbar">
      <div className="logo">Agentic AI Parent Hub</div>
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </>
        ) : (
          <>
            <button onClick={handleEventList} className="eventlist-btn">
              Events List
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
