import express from "express";
import bcrypt from "bcryptjs";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ MySQL Connection using .env values
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Test DB Connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database:", process.env.DB_NAME);
  }
});

/* ==========================
   SIGNUP ROUTE
========================== */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    // Check existing email
    db.query("SELECT * FROM Parents WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ success: false, message: "DB error" });

      if (result.length > 0) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const sql = "INSERT INTO Parents (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [name, email, hashedPassword], (err, data) => {
        if (err) return res.status(500).json({ success: false, message: "Signup failed" });

        res.status(201).json({
          success: true,
          message: "Signup successful",
          parent_id: data.insertId,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ==========================
   LOGIN ROUTE
========================== */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "All fields required" });

  const sql = "SELECT * FROM Parents WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB error" });

    if (result.length === 0)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    const parent = result[0];
    const isMatch = await bcrypt.compare(password, parent.password);

    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid email or password" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      parent_id: parent.parent_id,
      name: parent.name,
    });
  });
});

export default router;
