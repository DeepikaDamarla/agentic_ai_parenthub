// backend/routes/childRoutes.js
import express from "express";
import { addChild, getChildrenByParent } from "../models/childModel.js";

const router = express.Router();

// Add a child
router.post("/", (req, res) => {
  const { parent_id, name, age, child_class } = req.body;

  // Validate required fields
  if (!parent_id || !name || !age || !child_class) {
    return res.status(400).json({ error: "All fields are required" });
  }

  addChild({ parent_id, name, age, child_class }, (err, result) => {
    if (err) {
      console.error("Error adding child:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ child_id: result.insertId });
  });
});

// Get children by parent
router.get("/", (req, res) => {
  const { parent_id } = req.query;

  if (!parent_id) {
    return res.status(400).json({ error: "parent_id is required" });
  }

  getChildrenByParent(parent_id, (err, results) => {
    if (err) {
      console.error("Error fetching children:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

export default router;
