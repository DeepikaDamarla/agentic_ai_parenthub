// src/routes/parents.js
import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password

    db.query(
      "INSERT INTO parents (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ parent_id: result.insertId, name, email });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
