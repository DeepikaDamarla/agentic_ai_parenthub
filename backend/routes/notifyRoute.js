// routes/notifyRoute.js
import express from "express";
import { notifyParents } from "../utils/notifyEvents.js";

const router = express.Router();

// GET /api/notify-test
router.get("/notify-test", (req, res) => {
  try {
    notifyParents(); // call the notification function
    res.json({ message: "Notification function triggered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
