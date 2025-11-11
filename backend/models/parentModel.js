import db from "../db.js";

export const createParent = (parent, callback) => {
  const { name, email, password } = parent;
  db.query(
    "INSERT INTO parents (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    callback
  );
};
