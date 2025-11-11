import React, { useState } from "react";
import CalendarUpload from "../components/CalendarUpload";
import ChatBot from "../components/ChatBot";
import ChildProfile from "../components/ChildProfile";
import "../styles.css";

const Dashboard = ({ parentId }) => {
  const [selectedChildId, setSelectedChildId] = useState(null);

  const handleChildAdded = (child) => {
    setSelectedChildId(child.child_id);
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel: Child Management + Calendar */}
      <div className="left-panel">
        <ChildProfile parentId={parentId} onChildAdded={handleChildAdded} />
        <CalendarUpload parentId={parentId} />
      </div>

      {/* Right Panel: Always show ChatBot */}
      <div className="right-panel">
        <ChatBot parentId={parentId} childId={selectedChildId} />
      </div>
    </div>
  );
};

export default Dashboard;
