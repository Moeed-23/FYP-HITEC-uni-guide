// src/context/ChatProvider.jsx
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";   // adjust path as needed
import ChatContext from "../context/chatContext";

export default function ChatProvider({ children }) {
  const { user } = useAuth();
  const token     = localStorage.getItem("token");

  const [messages, setMessages] = useState([
    {
      text:        "Hi! I'm HITEC UNIGUIDE. How can I assist you today?",
      type:        "bot",
      timestamp:   new Date(),
      suggestions: ["Admission criteria?", "Admission Policy?"],
    },
  ]);
  const [typing, setTyping] = useState(false);

  // ask for desktop notifications once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const sendMessage = useCallback(
    async (question) => {
      if (!question.trim()) return;
      // append user message
      setMessages(m => [
        ...m,
        { text: question, type: "user", timestamp: new Date() }
      ]);
      setTyping(true);

      try {
        const base = import.meta.env.VITE_API_URL || "";
        const { data } = await axios.post(
          `${base}/api/chat`,
          { question },
          { headers: { "Content-Type": "application/json" } }
        );

        const answer      = data.answer      || "Sorry, I couldn't find an answer.";
        const suggestions = data.suggestions || [];

        setMessages(m => [
          ...m,
          { text: answer, type: "bot", timestamp: new Date(), suggestions }
        ]);

        if (document.hidden && Notification.permission === "granted") {
          new Notification("UniGuide replied", { body: answer });
        }

        // save to user’s savedQuestions
        await axios.post(
          `${base}/api/users/${user._id}/saved-questions`,
          { question, answer },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error(err);
        setMessages(m => [
          ...m,
          {
            text:        "Assistant is currently unavailable. Please try again later.",
            type:        "bot",
            timestamp:   new Date(),
            suggestions: []
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [user, token]
  );

  return (
    <ChatContext.Provider value={{ messages, typing, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
