// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import parentRoutes from "./routes/parentRoutes.js";
import childRoutes from "./routes/childRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/auth.js";
import fetchEventsRoute from "./routes/fetchEventsRoute.js";
import cron from "node-cron";
import { notifyParents } from "./utils/notifyEvents.js";
import notifyRoute from "./routes/notifyRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/parents", parentRoutes);
app.use("/api/children", childRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events/fetch", fetchEventsRoute); // GET: /api/events/fetch
app.use("/api", notifyRoute); // GET /api/notify-test

// Cron job – runs every 5 seconds (you can adjust this later)
cron.schedule("*/5 * * * * *", () => {
  notifyParents();
});

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // Serve the static files from React app
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Agentic AI Parent Hub Backend Running 🚀");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
