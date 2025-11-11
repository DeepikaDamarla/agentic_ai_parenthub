import db from "../db.js";

export const addMessage = (msg, callback) => {
  const { parent_id, child_id, sender, message, timestamp } = msg;
  db.query(
    "INSERT INTO messages (parent_id, child_id, sender, message, timestamp) VALUES (?, ?, ?, ?, ?)",
    [parent_id, child_id, sender, message, timestamp],
    callback
  );
};
