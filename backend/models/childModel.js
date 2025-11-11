import db from "../db.js";

export const addChild = (data, callback) => {
  const { parent_id, name, age, child_class } = data;

  if (!parent_id || !name || !age || !child_class) {
    return callback(new Error("All fields are required"));
  }

  const sql =
    "INSERT INTO Children (parent_id, name, age, `class`) VALUES (?, ?, ?, ?)";
  db.query(sql, [parent_id, name, age, child_class], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

export const getChildrenByParent = (parent_id, callback) => {
  const sql = "SELECT * FROM Children WHERE parent_id = ?";
  db.query(sql, [parent_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
