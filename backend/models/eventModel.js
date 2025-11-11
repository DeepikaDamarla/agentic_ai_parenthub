import db from "../db.js";

export const addEvent = (event, callback) => {
  const { child_id, event_name, event_date, details, event_type, notified } = event;
  db.query(
    "INSERT INTO events (child_id, event_name, event_date, details, event_type, notified) VALUES (?, ?, ?, ?, ?, ?)",
    [child_id, event_name, event_date, details, event_type, notified],
    callback
  );
};
