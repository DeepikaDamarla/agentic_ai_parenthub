// src/components/ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles.css"; // (Optional) link to your CSS file for styling

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "parent",
      message: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      // Send message to backend
      await axios.post("http://localhost:5000/api/messages", newMessage);

      // Simulated AI response
      const aiResponse = {
        sender: "AI",
        message: `Here’s what I think about: "${newMessage.message}" 😊`,
        timestamp: new Date().toISOString(),
      };

      setTimeout(async () => {
        setMessages((prev) => [...prev, aiResponse]);
        await axios.post("http://localhost:5000/api/messages", aiResponse);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-header">Parent-AI Chat</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.sender === "parent" ? "parent" : "ai"
            }`}
          >
            <span className="sender">{msg.sender}:</span> {msg.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your child’s progress..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
