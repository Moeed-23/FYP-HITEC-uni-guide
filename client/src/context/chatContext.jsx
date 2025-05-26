// import React, { createContext, useState, useCallback, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export const ChatContext = createContext({
//   messages: [],
//   typing: false,
//   sendMessage: () => {}
// });

// export function ChatProvider({ children }) {
//   const { user } = useAuth();
//   const token = localStorage.getItem("token");

//   const [messages, setMessages] = useState([
//     {
//       text:      "Hi! I'm HITEC UniGuide. How can I assist you today?",
//       type:      "bot",
//       timestamp: new Date(),
//       suggestions: ["Admission criteria?", "Programs?", "Admission Policy?"]
//     }
//   ]);
//   const [typing, setTyping] = useState(false);

//   // ask for desktop-notification permission once
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   const sendMessage = useCallback(
//     async (overrideText) => {
//       const question = overrideText?.trim();
//       if (!question) return;

//       // 1) append user message
//       setMessages((m) => [
//         ...m,
//         { text: question, type: "user", timestamp: new Date() }
//       ]);
//       setTyping(true);

//       try {
//         const base = import.meta.env.VITE_API_URL || "";
//         const res  = await axios.post(
//           `${base}/api/chat`,
//           { question },
//           { headers: { "Content-Type": "application/json" } }
//         );
//         const answer      = res.data.answer      || "Sorry, I couldn't find an answer.";
//         const suggestions = res.data.suggestions || [];

//         // 2) append bot answer
//         setMessages((m) => [
//           ...m,
//           { text: answer, type: "bot", timestamp: new Date(), suggestions }
//         ]);

//         // 3) desktop notification if we're hidden
//         if (document.hidden && Notification.permission === "granted") {
//           new Notification("UniGuide replied", { body: answer });
//         }

//         // 4) save to user’s savedQuestions
//         try {
//           await axios.post(
//             `${base}/api/users/${user._id}/saved-questions`,
//             { question, answer },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//         } catch (e) {
//           console.error("Failed to save question:", e);
//         }
//       } catch (err) {
//         console.error("Chat error:", err);
//         setMessages((m) => [
//           ...m,
//           {
//             text:        "Assistant is currently unavailable. Please try again later.",
//             type:        "bot",
//             timestamp:   new Date(),
//             suggestions: []
//           }
//         ]);
//       } finally {
//         setTyping(false);
//       }
//     },
//     [user, token]
//   );

//   return (
//     <ChatContext.Provider value={{ messages, typing, sendMessage }}>
//       {children}
//     </ChatContext.Provider>
//   );
// }





// src/context/ChatContext.js
import { createContext } from "react";

const ChatContext = createContext({
  messages: [],
  typing:    false,
  sendMessage: () => {}
});

export default ChatContext;
