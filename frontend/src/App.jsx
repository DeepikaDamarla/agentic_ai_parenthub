import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventList from "./components/EventList"; // <-- New page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    const storedParentId = localStorage.getItem("parent_id");
    if (storedParentId) {
      setParentId(storedParentId);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setParentId={setParentId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard parentId={parentId} />} />
        <Route path="/events" element={<EventList parentId={parentId} />} /> {/* Events page */}
      </Routes>
    </Router>
  );
}

export default App;
