import React, { useState, useEffect } from "react";
import axios from "axios";

const CalendarUpload = ({ parentId }) => {
  const [children, setChildren] = useState([]);
  const [childName, setChildName] = useState(""); // send child name now
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  // Fetch children for this parent
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/children?parent_id=${parentId}`);
        setChildren(res.data);
        if (res.data.length > 0) setChildName(res.data[0].name);
      } catch (err) {
        console.error("Error fetching children:", err.response ? err.response.data : err.message);
      }
    };
    fetchChildren();
  }, [parentId]);

  // Handle event submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/events", {
      parent_id: parentId,    // <-- send parentId
      child_name: childName,  // <-- send selected child name
      event_name: eventName,
      event_date: date,
      details,
      event_type: "general",
      notified: false,
    });

      console.log("Event added successfully:", response.data);
      alert("Event added successfully!");
      setEventName("");
      setDate("");
      setDetails("");
    } catch (err) {
      console.error("Error adding event:", err.response ? err.response.data : err.message);
      alert("Error adding event: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="calendar-upload">
      <h3>Add Calendar Event</h3>
      <form onSubmit={handleSubmit}>
        <select value={childName} onChange={(e) => setChildName(e.target.value)}>
          {children.map((child) => (
            <option key={child.child_id} value={child.name}>
              {child.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default CalendarUpload;
