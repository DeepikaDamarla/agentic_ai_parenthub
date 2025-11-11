import express from "express";
import db from "../db.js";

const router = express.Router();

// GET /api/events/fetch?parent_id=1
router.get("/", (req, res) => {
  const { parent_id } = req.query;
  if (!parent_id) return res.status(400).json({ message: "parent_id is required" });

  const sql = `
    SELECT e.event_id, e.event_name, e.event_date, e.details, e.event_type,
           c.name AS child_name, p.name AS parent_name
    FROM events e
    JOIN children c ON e.child_id = c.child_id
    JOIN parents p ON c.parent_id = p.parent_id
    WHERE p.parent_id = ? AND e.notified = false
    ORDER BY e.event_date ASC
  `;

  db.query(sql, [parent_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

export default router;
