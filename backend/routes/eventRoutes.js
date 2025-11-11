import express from "express";
import { addEvent } from "../models/eventModel.js";
import db from "../db.js";

const router = express.Router(); // ✅ Make sure this line is present

/**
 * POST /api/events
 * body: { child_name, event_type, event_name, event_date, details }
 */
router.post("/", (req, res) => {
  const { child_name, event_type, event_name, event_date, details } = req.body;

  if (!child_name || !event_type || !event_name || !event_date || !details) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find child_id from child_name
  const sql = "SELECT child_id FROM children WHERE name = ?";
  db.query(sql, [child_name], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) {
      return res.status(400).json({ message: "Child not found" });
    }

    const child_id = results[0].child_id;

    addEvent(
      { child_id, event_type, event_name, event_date, details, notified: false },
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ event_id: result.insertId });
      }
    );
  });
});



export default router;
