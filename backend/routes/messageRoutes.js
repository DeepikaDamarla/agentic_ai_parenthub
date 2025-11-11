import express from "express";
import { addMessage } from "../models/messageModel.js";

const router = express.Router();

router.post("/", (req, res) => {
  addMessage(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message_id: result.insertId });
  });
});

export default router;
