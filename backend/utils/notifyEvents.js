// backend/utils/notifyParents.js
import db from "../db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dayjs from "dayjs";

dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("❌ Error sending email:", err);
  });
};

// Check for today's events and notify parents
export const notifyParents = () => {
  const today = dayjs().format("YYYY-MM-DD");

  const sql = `
    SELECT e.event_id, e.event_name, e.event_date, e.details, 
           c.name AS child_name, p.name AS parent_name, p.email
    FROM events e
    JOIN children c ON e.child_id = c.child_id
    JOIN parents p ON c.parent_id = p.parent_id
    WHERE e.notified = false
  `;

  db.query(sql, [], (err, results) => {
    if (err) return;

    results.forEach((event) => {
      const eventDate = dayjs(event.event_date).format("YYYY-MM-DD");

      if (eventDate === today) {
        const emailText = `
Hello ${event.parent_name},

This is a reminder for an upcoming event for your child ${event.child_name}:

Event: ${event.event_name}
Date: ${eventDate}
Details: ${event.details || "No additional details provided."}

- Agentic AI Parent Hub
        `;

        sendEmail(event.email, `Reminder: ${event.event_name}`, emailText);

        // Mark event as notified
        db.query(
          "UPDATE events SET notified = true WHERE event_id = ?",
          [event.event_id],
          (err) => {
            if (err) console.error("❌ Error updating event as notified:", err);
          }
        );
      }
    });
  });
};
