// src/components/ChildProfile.jsx
import React, { useState } from "react";
import axios from "axios";

const ChildProfile = ({ parentId, onChildAdded }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [childClass, setChildClass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/children", {
        parent_id: parentId,
        name,
        age,
        child_class: childClass, // changed to match DB
      });
      alert("Child added successfully!");
      setName("");
      setAge("");
      setChildClass("");
      if (onChildAdded) onChildAdded(res.data); // send new child_id to Dashboard
    } catch (err) {
      console.error("Error adding child:", err);
      alert("Error adding child");
    }
  };

  return (
    <div className="calendar-upload">
      <h3>Add Child Profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Child Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={childClass}
          onChange={(e) => setChildClass(e.target.value)}
          required
        />
        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default ChildProfile;
