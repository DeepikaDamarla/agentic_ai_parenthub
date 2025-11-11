import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const ParentEvents = () => {
  const [events, setEvents] = useState([]);
  const parentId = localStorage.getItem("parent_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Updated to the new fetch route
        const res = await axios.get(`http://localhost:5000/api/events/fetch?parent_id=${parentId}`);
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        alert("Failed to fetch events");
      }
    };
    fetchEvents();
  }, [parentId]);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>
      <button
        className="dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
      {events.length === 0 ? (
        <p>No pending events found.</p>
      ) : (
        <div className="event-cards">
          {events.map((event) => (
            <div key={event.event_id} className="event-card">
              <h3>{event.event_name}</h3>
              <p><strong>Date:</strong> {event.event_date}</p>
              <p><strong>Child:</strong> {event.child_name}</p>
              <p><strong>Parent:</strong> {event.parent_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentEvents;
