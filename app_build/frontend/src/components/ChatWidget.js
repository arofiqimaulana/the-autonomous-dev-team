"use client";

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

export default function ChatWidget() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  
  // Use a simple prompt OR hardcode sender roles for demo purposes
  const [role, setRole] = useState("User"); 

  useEffect(() => {
    // Determine host. Usually it'd be from ENV, but standard dev port is 3001
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("chat_history", (history) => {
      setMessages(history);
    });

    newSocket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket) return;

    socket.emit("chat_message", {
      text: inputValue,
      sender: role,
    });
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="chat-container">
        <div className="chat-header">
          <div className="status-dot"></div>
          Support Chat ({role})
        </div>
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Start your conversation...
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`message-bubble ${
                m.sender === role ? "message-user" : "message-agent"
              }`}
            >
              <div className="text-xs opacity-75 mb-1">{m.sender}</div>
              {m.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="chat-send-btn" aria-label="Send">
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="mt-2 text-center">
        <button 
          onClick={() => setRole(role === "User" ? "Agent" : "User")}
          className="text-xs bg-gray-200 px-2 py-1 rounded"
        >
          Toggle Role (Currently: {role})
        </button>
      </div>
    </div>
  );
}
