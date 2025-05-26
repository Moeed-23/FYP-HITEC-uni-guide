// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Chat = () => {
//     const [messages, setMessages] = useState([
//         { text: "Hi! I'm UniGuide. How can I assist you today?", type: "bot" },
//         { text: "Can you help me with the admission process?", type: "user" },
//         { text: "Sure! What specific information are you looking for?", type: "bot" }
//     ]);
//     const [input, setInput] = useState("");
//     const [typing, setTyping] = useState(false);

//     const handleSend = () => {
//         if (input.trim() === "") return;

//         const userMessage = { text: input, type: "user" };
//         setMessages([...messages, userMessage]);
//         setInput("");

//         setTyping(true);
//         setTimeout(() => {
//             setTyping(false);
//             const botResponse = { text: `You said: "${input}". How else can I assist?`, type: "bot" };
//             setMessages((prevMessages) => [...prevMessages, botResponse]);
//         }, 1500);
//     };
//     // State for feedback modal visibility
//     const [feedbackOpen, setFeedbackOpen] = useState(false);

//     // State for feedback form data
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         rating: "5",
//         comments: ""
//     });

//     // Handle form inputs changing
//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData(fd => ({ ...fd, [name]: value }));
//     };

//     // Submit feedback to backend
//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData)
//             });
//             if (!res.ok) throw new Error("Network response was not ok");
//             alert("Thank you for your feedback!");
//             setFormData({ name: "", email: "", rating: "5", comments: "" });
//             setFeedbackOpen(false);
//         } catch (err) {
//             console.error("Feedback submission failed:", err);
//             alert("Failed to submit feedback. Please try again.");
//         }
//     };

//     return (
//         <>
//             <title>HITEC | UNIGUIDE | CHATBOT</title>
//             <header className="landing-header">
//                 {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
//                 <nav>
//                     <Link to="/homepage">Home</Link>
//                     <Link to="/chatbot">Chat Assistant</Link>
//                     <Link to="/admissions">Admissions</Link>
//                     <Link to="/events">Events</Link>
//                     <Link to="/tour">Tour</Link>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/alumni">Alumni</Link>
//                     <Link to="/industry-integration">Industry Integration</Link>
//                     <Link to="/studentresources">Student Resources</Link>
//                 </nav>
//             </header>

//             <div className="chat-container">
//                 <div className="chat-header">
//                     <i className="fas fa-robot"></i> UniGuide Assistant
//                 </div>

//                 <div className="chat-messages">
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`message ${msg.type}-message`}>
//                             {msg.text}
//                         </div>
//                     ))}
//                 </div>

//                 {typing && <div className="typing-indicator">UniGuide Assistant is typing...</div>}

//                 <div className="chat-input">
//                     <input
//                         type="text"
//                         placeholder="Type your message here..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 handleSend();
//                             }
//                         }}
//                     />
//                     <button onClick={handleSend}><i className="fas fa-paper-plane"></i></button>
//                 </div>
//             </div>

//             {/* Feedback Button */}
//             <button
//                 className="feedback-btn"
//                 onClick={() => setFeedbackOpen(true)}
//             >
//                 <i className="fas fa-comment-alt" /> Feedback
//             </button>

//             {/* Feedback Modal */}
//             <div
//                 className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//                 onClick={() => setFeedbackOpen(false)}
//             >
//                 <div className="modal-content" onClick={e => e.stopPropagation()}>
//                     <h2>Feedback</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                         <select
//                             name="rating"
//                             value={formData.rating}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Rate Your Experience</option>
//                             <option value="5">Excellent</option>
//                             <option value="4">Good</option>
//                             <option value="3">Average</option>
//                             <option value="2">Poor</option>
//                             <option value="1">Very Poor</option>
//                         </select>
//                         <textarea
//                             name="comments"
//                             placeholder="Comments"
//                             rows="5"
//                             value={formData.comments}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
//             </div>
//             <footer>
//                 <p>&copy; 2025 HITEC University. All rights reserved.</p>
//                 <div className="social-icons">
//                     <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//                     <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//                     <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//                 </div>
//             </footer>
//         </>
//     );
// };

// export default Chat;


///////////////////////////////////////////////



// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Chat = () => {
//     const [messages, setMessages] = useState([
//         { text: "Hi! I'm UniGuide. How can I assist you today?", type: "bot" }
//     ]);
//     const [input, setInput] = useState("");
//     const [typing, setTyping] = useState(false);
//     const [feedbackOpen, setFeedbackOpen] = useState(false);
//     const [submittingFeedback, setSubmittingFeedback] = useState(false);

//     const chatEndRef = useRef(null);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         rating: "",
//         comments: ""
//     });

//     const scrollToBottom = () => {
//         if (chatEndRef.current) {
//             chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const handleSend = async () => {
//         const trimmed = input.trim();
//         if (!trimmed) return;

//         const userMessage = { text: trimmed, type: "user" };
//         setMessages((prev) => [...prev, userMessage]);
//         setInput("");
//         setTyping(true);

//         try {
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ question: trimmed })
//             });

//             const data = await res.json();
//             const botResponse = data.answer || "I'm sorry, I couldn't find an answer.";
//             setMessages((prev) => [...prev, { text: botResponse, type: "bot" }]);
//         } catch (err) {
//             console.error("Chat error:", err);
//             setMessages((prev) => [...prev, { text: "Assistant is currently unavailable. Please try again later.", type: "bot" }]);
//         } finally {
//             setTyping(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmittingFeedback(true);
//         try {
//             const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData)
//             });

//             if (!res.ok) throw new Error("Network response was not ok");
//             alert("Thank you for your feedback!");
//             setFormData({ name: "", email: "", rating: "5", comments: "" });
//             setFeedbackOpen(false);
//         } catch (err) {
//             console.error("Feedback error:", err);
//             alert("Failed to submit feedback. Please try again.");
//         } finally {
//             setSubmittingFeedback(false);
//         }
//     };

//     return (
//         <>
//             <header className="landing-header">
//                 <nav>
//                     <Link to="/homepage">Home</Link>
//                     <Link to="/chatbot">Chat Assistant</Link>
//                     <Link to="/admissions">Admissions</Link>
//                     <Link to="/events">Events</Link>
//                     <Link to="/tour">Tour</Link>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/alumni">Alumni</Link>
//                     <Link to="/industry-integration">Industry Integration</Link>
//                     <Link to="/studentresources">Student Resources</Link>
//                 </nav>
//             </header>

//             <div className="chat-container">
//                 <div className="chat-header">
//                     <i className="fas fa-robot"></i> UniGuide Assistant
//                 </div>

//                 <div className="chat-messages">
//                     {messages.map((msg, idx) => (
//                         <div key={idx} className={`message ${msg.type}-message`}>
//                             {msg.text}
//                         </div>
//                     ))}
//                     <div ref={chatEndRef}></div>
//                 </div>

//                 {typing && <div className="typing-indicator">UniGuide Assistant is typing...</div>}

//                 <div className="chat-input">
//                     <input
//                         type="text"
//                         placeholder="Type your message here..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") handleSend();
//                         }}
//                     />
//                     <button onClick={handleSend}><i className="fas fa-paper-plane"></i></button>
//                 </div>
//             </div>

//             {/* Feedback Button */}
//             <button className="feedback-btn" onClick={() => setFeedbackOpen(true)}>
//                 <i className="fas fa-comment-alt" /> Feedback
//             </button>

//             {/* Feedback Modal */}
//             <div
//                 className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//                 onClick={() => setFeedbackOpen(false)}
//             >
//                 <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                     <h2>Feedback</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                         <select name="rating" value={formData.rating} onChange={handleChange} required>

//                             <option value="5">Excellent</option>
//                             <option value="4">Good</option>
//                             <option value="3">Average</option>
//                             <option value="2">Poor</option>
//                             <option value="1">Very Poor</option>
//                         </select>
//                         <textarea
//                             name="comments"
//                             placeholder="Comments"
//                             rows="5"
//                             value={formData.comments}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="submit" disabled={submittingFeedback}>
//                             {submittingFeedback ? "Submitting..." : "Submit"}
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             <footer>
//                 <p>&copy; 2025 HITEC University. All rights reserved.</p>
//                 <div className="social-icons">
//                     <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//                     <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//                     <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//                 </div>
//             </footer>
//         </>
//     );
// };

// export default Chat;




////////////////////////////////////////////////////////


// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Chat = () => {
//     const [messages, setMessages] = useState([
//         {
//             text: "Hi! I'm UniGuide. How can I assist you today?",
//             type: "bot",
//             timestamp: new Date(),
//             suggestions: ["Admission criteria?", "Deadline?", "University Timings?"],
//         },
//     ]);
//     const [input, setInput] = useState("");
//     const [typing, setTyping] = useState(false);
//     const [feedbackOpen, setFeedbackOpen] = useState(false);
//     const [submittingFeedback, setSubmittingFeedback] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         rating: "",
//         comments: "",
//     });

//     const chatEndRef = useRef(null);
//     const recognitionRef = useRef(null);

//     // Scroll to bottom on new message
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     // Ask for notification permission once
//     useEffect(() => {
//         if ("Notification" in window && Notification.permission !== "granted") {
//             Notification.requestPermission();
//         }
//     }, []);

//     // Formatting helpers
//     const formatTime = (d) =>
//         d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const formatDate = (d) => d.toLocaleDateString();

//     // Send (or quick-reply) handler
//     const handleSend = async (overrideText) => {
//         const text = (overrideText ?? input).trim();
//         if (!text) return;

//         // 1) add user msg
//         const userMsg = { text, type: "user", timestamp: new Date() };
//         setMessages((m) => [...m, userMsg]);
//         setInput("");
//         setTyping(true);


//         try {
//             const base = import.meta.env.VITE_API_URL || "";
//             const res = await fetch(`${base}/api/chat`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ question: text }),
//             });

//             if (!res.ok) {
//                 // log the raw response so you can see exactly what the server returned
//                 const errorText = await res.text();
//                 console.error("Chat error:", res.status, errorText);
//                 throw new Error(`Server returned ${res.status}`);
//             }

//             const data = await res.json();
//             const botText = data.answer || "Sorry, I couldn't find an answer.";
//             const botSuggestions = data.suggestions || [];

//             const botMsg = {
//                 text: botText,
//                 type: "bot",
//                 timestamp: new Date(),
//                 suggestions: botSuggestions,
//             };
//             setMessages((m) => [...m, botMsg]);

//             // desktop notification if user is away
//             if (
//                 document.hidden &&
//                 "Notification" in window &&
//                 Notification.permission === "granted"
//             ) {
//                 new Notification("UniGuide replied", { body: botText });
//             }
//         } catch (err) {
//             console.error("Fetch/JSON error:", err);
//             setMessages((m) => [
//                 ...m,
//                 {
//                     text:
//                         "Assistant is currently unavailable. Please try again later.",
//                     type: "bot",
//                     timestamp: new Date(),
//                     suggestions: [],
//                 },
//             ]);
//         } finally {
//             setTyping(false);
//         }
//     };

//     // Feedback form handlers (unchanged)
//     const handleChange = (e) =>
//         setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmittingFeedback(true);
//         try {
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_URL}/api/feedback`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(formData),
//                 }
//             );
//             if (!res.ok) throw new Error("Network response was not ok");
//             alert("Thank you for your feedback!");
//             setFormData({ name: "", email: "", rating: "5", comments: "" });
//             setFeedbackOpen(false);
//         } catch (err) {
//             console.error("Feedback error:", err);
//             alert("Failed to submit feedback. Please try again.");
//         } finally {
//             setSubmittingFeedback(false);
//         }
//     };

//     // // File attachment → stub upload then send filename
//     // const handleFileUpload = (e) => {
//     //     const file = e.target.files[0];
//     //     if (file) {
//     //         handleSend(`📎 Uploaded file: ${file.name}`);
//     //         // TODO: actually upload to your server if needed
//     //     }
//     // };

//     // Voice input using Web Speech API
//     const startListening = () => {
//         if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//             return alert("Speech recognition not supported in this browser.");
//         }
//         const SpeechRecognition =
//             window.SpeechRecognition || window.webkitSpeechRecognition;
//         const recog = new SpeechRecognition();
//         recog.lang = "en-US";
//         recog.interimResults = false;
//         recog.onresult = (evt) => {
//             const transcript = evt.results[0][0].transcript;
//             setInput((prev) => prev + " " + transcript);
//         };
//         recog.start();
//         recognitionRef.current = recog;
//     };

//     return (
//         <>
//             <header className="landing-header">
//                 <nav>
//                     <Link to="/homepage">Home</Link>
//                     <Link to="/chatbot">Chat Assistant</Link>
//                     <Link to="/admissions">Admissions</Link>
//                     <Link to="/events">Events</Link>
//                     <Link to="/tour">Tour</Link>
//                     <Link to="/dashboard">Dashboard</Link>
//                     <Link to="/alumni">Alumni</Link>
//                     <Link to="/industry-integration">Industry Integration</Link>
//                     <Link to="/studentresources">Student Resources</Link>
//                 </nav>
//             </header>

//             <div className="chat-container" role="log" aria-live="polite">
//                 <div className="chat-header" role="banner">
//                     <i className="fas fa-robot"></i> UniGuide Assistant
//                 </div>

//                 <div className="chat-messages">
//                     {messages.map((msg, idx) => {
//                         const prev = messages[idx - 1];
//                         const showDate =
//                             !prev || formatDate(prev.timestamp) !== formatDate(msg.timestamp);
//                         return (
//                             <React.Fragment key={idx}>
//                                 {showDate && (
//                                     <div className="date-separator">
//                                         {formatDate(msg.timestamp)}
//                                     </div>
//                                 )}

//                                 <div className={`message ${msg.type}-message`}>
//                                     <div className="message-text">{msg.text}</div>
//                                     <div className="timestamp">{formatTime(msg.timestamp)}</div>
//                                 </div>

//                                 {msg.type === "bot" && msg.suggestions?.length > 0 && (
//                                     <div className="suggestions">
//                                         {msg.suggestions.map((opt, i) => (
//                                             <button
//                                                 key={i}
//                                                 className="suggestion-btn"
//                                                 onClick={() => handleSend(opt)}
//                                             >
//                                                 {opt}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </React.Fragment>
//                         );
//                     })}
//                     <div ref={chatEndRef} />
//                 </div>

//                 {typing && (
//                     <div className="typing-indicator">
//                         UniGuide Assistant is typing...
//                     </div>
//                 )}

//                 <div className="chat-input" role="form" aria-label="Chat input">
//                     {/* <label className="attach-btn" aria-label="Attach file">
//                         <i className="fas fa-paperclip"></i>
//                         <input type="file" hidden onChange={handleFileUpload} />
//                     </label> */}

//                     <textarea
//                         aria-label="Type your message"
//                         placeholder="Type your message here..."
//                         value={input}
//                         rows={1}
//                         onChange={(e) => {
//                             setInput(e.target.value);
//                             e.target.style.height = "auto";
//                             e.target.style.height = `${e.target.scrollHeight}px`;
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter" && !e.shiftKey) {
//                                 e.preventDefault();
//                                 handleSend();
//                             }
//                         }}
//                     />

//                     <button
//                         type="button"
//                         onClick={startListening}
//                         aria-label="Speak"
//                         className="voice-btn"
//                     >
//                         <i className="fas fa-microphone"></i>
//                     </button>

//                     <button
//                         type="button"
//                         onClick={() => handleSend()}
//                         aria-label="Send message"
//                     >
//                         <i className="fas fa-paper-plane"></i>
//                     </button>
//                 </div>
//             </div>

//             {/* Feedback Button & Modal (unchanged) */}
//             <button
//                 className="feedback-btn"
//                 onClick={() => setFeedbackOpen(true)}
//             >
//                 <i className="fas fa-comment-alt" /> Feedback
//             </button>

//             <div
//                 className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//                 onClick={() => setFeedbackOpen(false)}
//             >
//                 <div
//                     className="modal-content"
//                     onClick={(e) => e.stopPropagation()}
//                 >
//                     <h2>Feedback</h2>
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                         <select
//                             name="rating"
//                             value={formData.rating}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="5">Excellent</option>
//                             <option value="4">Good</option>
//                             <option value="3">Average</option>
//                             <option value="2">Poor</option>
//                             <option value="1">Very Poor</option>
//                         </select>
//                         <textarea
//                             name="comments"
//                             placeholder="Comments"
//                             rows="5"
//                             value={formData.comments}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="submit" disabled={submittingFeedback}>
//                             {submittingFeedback ? "Submitting..." : "Submit"}
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             <footer>
//             <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//                 <div className="social-icons">
//                     <a href="https://www.facebook.com/hitecuni/">
//                         <i className="fab fa-facebook-f"></i>
//                     </a>
//                     <a href="https://www.instagram.com/hitecuni/?hl=en">
//                         <i className="fab fa-instagram"></i>
//                     </a>
//                     <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//                         <i className="fab fa-linkedin-in"></i>
//                     </a>
//                 </div>
//             </footer>
//         </>
//     );
// };

// export default Chat;


///////////////////////////////////////////////////////////////////////////////////////////////////





// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Chat = () => {
//   // Chat state
//   const [messages, setMessages] = useState([
//     {
//       text: "Hi! I'm UniGuide. How can I assist you today?",
//       type: "bot",
//       timestamp: new Date(),
//       suggestions: ["Admission criteria?", "Deadline?", "University Timings?"],
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);

//   // Feedback state
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [showFeedbackBtn, setShowFeedbackBtn] = useState(false);
//   const [submittingFeedback, setSubmittingFeedback] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "",
//     comments: "",
//   });

//   // Refs
//   const chatEndRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const footerRef = useRef(null);

//   // 1) Scroll to bottom on new message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 2) Request Notification permission once
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // 3) Show feedback button only when footer is visible
//   useEffect(() => {
//     if (!footerRef.current || !("IntersectionObserver" in window)) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setShowFeedbackBtn(entry.isIntersecting);
//       },
//       { root: null, threshold: 0.1 }
//     );

//     observer.observe(footerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Helpers
//   const formatTime = d =>
//     d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   const formatDate = d => d.toLocaleDateString();

//   // Send / quick-reply handler
//   const handleSend = async overrideText => {
//     const text = (overrideText ?? input).trim();
//     if (!text) return;

//     // add user message
//     setMessages(m => [
//       ...m,
//       { text, type: "user", timestamp: new Date() },
//     ]);
//     setInput("");
//     setTyping(true);

//     try {
//       const base = import.meta.env.VITE_API_URL || "";
//       const res = await fetch(`${base}/api/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ question: text }),
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         console.error("Chat error:", res.status, errText);
//         throw new Error(`Server returned ${res.status}`);
//       }

//       const data = await res.json();
//       const botText = data.answer || "Sorry, I couldn't find an answer.";
//       const botSuggestions = data.suggestions || [];

//       setMessages(m => [
//         ...m,
//         {
//           text: botText,
//           type: "bot",
//           timestamp: new Date(),
//           suggestions: botSuggestions,
//         },
//       ]);

//       // desktop notification
//       if (
//         document.hidden &&
//         "Notification" in window &&
//         Notification.permission === "granted"
//       ) {
//         new Notification("UniGuide replied", { body: botText });
//       }
//     } catch (err) {
//       console.error("Fetch/JSON error:", err);
//       setMessages(m => [
//         ...m,
//         {
//           text:
//             "Assistant is currently unavailable. Please try again later.",
//           type: "bot",
//           timestamp: new Date(),
//           suggestions: [],
//         },
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   // Feedback form handlers
//   const handleChange = e =>
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSubmittingFeedback(true);
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/feedback`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (!res.ok) throw new Error("Network response was not ok");
//       alert("Thank you for your feedback!");
//       setFormData({ name: "", email: "", rating: "5", comments: "" });
//       setFeedbackOpen(false);
//     } catch (err) {
//       console.error("Feedback error:", err);
//       alert("Failed to submit feedback. Please try again.");
//     } finally {
//       setSubmittingFeedback(false);
//     }
//   };

//   // Voice input
//   const startListening = () => {
//     if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
//       return alert("Speech recognition not supported in this browser.");
//     }
//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recog = new SR();
//     recog.lang = "en-US";
//     recog.interimResults = false;
//     recog.onresult = evt => {
//       const transcript = evt.results[0][0].transcript;
//       setInput(prev => prev + " " + transcript);
//     };
//     recog.start();
//     recognitionRef.current = recog;
//   };

//   return (
//     <>
//       <header className="landing-header">
//         <nav>
//           <Link to="/homepage">Home</Link>
//           <Link to="/chatbot">Chat Assistant</Link>
//           <Link to="/admissions">Admissions</Link>
//           <Link to="/events">Events</Link>
//           <Link to="/tour">Tour</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/alumni">Alumni</Link>
//           <Link to="/industry-integration">Industry Integration</Link>
//           <Link to="/studentresources">Student Resources</Link>
//         </nav>
//       </header>

//       <div className="chat-container" role="log" aria-live="polite">
//         <div className="chat-header" role="banner">
//           <i className="fas fa-robot" /> UniGuide Assistant
//         </div>

//         <div className="chat-messages">
//           {messages.map((msg, idx) => {
//             const prev = messages[idx - 1];
//             const showDate =
//               !prev || formatDate(prev.timestamp) !== formatDate(msg.timestamp);

//             return (
//               <React.Fragment key={idx}>
//                 {showDate && (
//                   <div className="date-separator">
//                     {formatDate(msg.timestamp)}
//                   </div>
//                 )}
//                 <div className={`message ${msg.type}-message`}>
//                   <div className="message-text">{msg.text}</div>
//                   <div className="timestamp">
//                     {formatTime(msg.timestamp)}
//                   </div>
//                 </div>
//                 {msg.type === "bot" && msg.suggestions?.length > 0 && (
//                   <div className="suggestions">
//                     {msg.suggestions.map((opt, i) => (
//                       <button
//                         key={i}
//                         className="suggestion-btn"
//                         onClick={() => handleSend(opt)}
//                       >
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </React.Fragment>
//             );
//           })}
//           <div ref={chatEndRef} />
//         </div>

//         {typing && (
//           <div className="typing-indicator">
//             UniGuide Assistant is typing...
//           </div>
//         )}

//         <div className="chat-input" role="form" aria-label="Chat input">
//           {/* <label className="attach-btn" aria-label="Attach file">
//             <i className="fas fa-paperclip" />
//             <input type="file" hidden onChange={handleFileUpload} />
//           </label> */}

//           <textarea
//             aria-label="Type your message"
//             placeholder="Type your message here..."
//             value={input}
//             rows={1}
//             onChange={e => {
//               setInput(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height = `${e.target.scrollHeight}px`;
//             }}
//             onKeyDown={e => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//           />

//           <button
//             type="button"
//             onClick={startListening}
//             aria-label="Speak"
//             className="voice-btn"
//           >
//             <i className="fas fa-microphone" />
//           </button>

//           <button
//             type="button"
//             onClick={() => handleSend()}
//             aria-label="Send message"
//           >
//             <i className="fas fa-paper-plane" />
//           </button>
//         </div>
//       </div>

//       {/* only show once footer is visible */}
//       {showFeedbackBtn && (
//         <button
//           className="feedback-btn"
//           onClick={() => setFeedbackOpen(true)}
//         >
//           <i className="fas fa-comment-alt" /> Feedback
//         </button>
//       )}

//       <div
//         className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//         onClick={() => setFeedbackOpen(false)}
//       >
//         <div
//           className="modal-content"
//           onClick={e => e.stopPropagation()}
//         >
//           <h2>Feedback</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               required
//             >
//               <option value="5">Excellent</option>
//               <option value="4">Good</option>
//               <option value="3">Average</option>
//               <option value="2">Poor</option>
//               <option value="1">Very Poor</option>
//             </select>
//             <textarea
//               name="comments"
//               placeholder="Comments"
//               rows="5"
//               value={formData.comments}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" disabled={submittingFeedback}>
//               {submittingFeedback ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </div>

//       <footer ref={footerRef}>
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en">
//             <i className="fab fa-instagram" />
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Chat;



//////////////////////////////////////////////////////////////////////////////
//////////////////////// latest 5/19/2025  ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


// // src/pages/Dash/Chat.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../src/context/AuthContext";
// import axios from "axios";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Chat() {
//   const { user } = useAuth();
//   const token     = localStorage.getItem("token");

//   const [messages, setMessages] = useState([
//     {
//       text:        "Hi! I'm HITEC UniGuide. How can I assist you today?",
//       type:        "bot",
//       timestamp:   new Date(),
//       suggestions: ["Admission criteria?", "Programs?", "Admission Policy?"],
//     },
//   ]);
//   const [input, setInput]                   = useState("");
//   const [typing, setTyping]                 = useState(false);
//   const [showFeedbackBtn, setShowFeedbackBtn]       = useState(false);
//   const [feedbackOpen, setFeedbackOpen]             = useState(false);
//   const [submittingFeedback, setSubmittingFeedback] = useState(false);
//   const [formData, setFormData]                     = useState({
//     name: "", email: "", rating: "5", comments: ""
//   });

//   const chatEndRef     = useRef(null);
//   const recognitionRef = useRef(null);
//   const footerRef      = useRef(null);

//   // ─── Scroll to bottom on new messages ─────────────────
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ─── Request Notification permission once ─────────────
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // ─── Show feedback button when footer is visible ───────
//   useEffect(() => {
//     if (!footerRef.current || !("IntersectionObserver" in window)) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setShowFeedbackBtn(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     obs.observe(footerRef.current);
//     return () => obs.disconnect();
//   }, []);

//   const formatTime = d =>
//     d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   const formatDate = d => d.toLocaleDateString();

//   // ─── AI send & save Q/A handler ────────────────────────
//   const handleSend = async (overrideText) => {
//     const question = (overrideText ?? input).trim();
//     if (!question) return;

//     // show user message
//     setMessages(msgs => [
//       ...msgs,
//       { text: question, type: "user", timestamp: new Date() }
//     ]);
//     setInput("");
//     setTyping(true);

//     try {
//       const base = import.meta.env.VITE_API_URL || "";
//       const res  = await axios.post(
//         `${base}/api/chat`,
//         { question },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const answer      = res.data.answer      || "Sorry, I couldn't find an answer.";
//       const suggestions = res.data.suggestions || [];

//       // show bot message
//       setMessages(msgs => [
//         ...msgs,
//         { text: answer, type: "bot", timestamp: new Date(), suggestions }
//       ]);

//       // desktop notification if in background
//       if (document.hidden && Notification.permission === "granted") {
//         new Notification("UniGuide replied", { body: answer });
//       }

//       // save to user’s savedQuestions
//       try {
//         await axios.post(
//           `${base}/api/users/${user._id}/saved-questions`,
//           { question, answer },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (saveErr) {
//         console.error("Failed to save question:", saveErr);
//       }

//     } catch (err) {
//       console.error("Chat error:", err);
//       setMessages(msgs => [
//         ...msgs,
//         {
//           text:        "Assistant is currently unavailable. Please try again later.",
//           type:        "bot",
//           timestamp:   new Date(),
//           suggestions: []
//         }
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   // ─── Feedback form handlers ───────────────────────────
// const handleChange = e =>
//   setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

// const handleFeedbackSubmit = async e => {
//   e.preventDefault();
//   setSubmittingFeedback(true);

//   try {
//     const base = import.meta.env.VITE_API_URL || "";
//     // no need to capture the response if we don't use it
//     await axios.post(
//       `${base}/api/feedback`,
//       formData,
//       { headers: { "Content-Type": "application/json" } }
//     );

//     alert("Thank you for your feedback!");
//     setFormData({ name: "", email: "", rating: "5", comments: "" });
//     setFeedbackOpen(false);
//   } catch (err) {
//     console.error("Feedback error:", err);
//     alert("Failed to submit feedback. Please try again.");
//   } finally {
//     setSubmittingFeedback(false);
//   }
// };


//   // ─── Voice input ──────────────────────────────────────
//   const startListening = () => {
//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SR) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }
//     const recog = new SR();
//     recog.lang            = "en-US";
//     recog.interimResults   = false;
//     recog.onresult         = e => {
//       setInput(prev => prev + " " + e.results[0][0].transcript);
//     };
//     recog.start();
//     recognitionRef.current = recog;
//   };

//   return (
//     <>
//       <header className="landing-header">
//         <nav>
//           <Link to="/homepage">Home</Link>
//           <Link to="/chatbot">Chat Assistant</Link>
//           <Link to="/admissions">Admissions</Link>
//           <Link to="/events">Events</Link>
//           <Link to="/tour">Tour</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/alumni">Alumni</Link>
//           <Link to="/industry-integration">Industry Integration</Link>
//           <Link to="/studentresources">Student Resources</Link>
//         </nav>
//       </header>

//       <div className="chat-container" role="log" aria-live="polite">
//         <div className="chat-header" role="banner">
//           <i className="fas fa-robot" /> UniGuide Assistant
//         </div>

//         <div className="chat-messages">
//           {messages.map((msg, idx) => {
//             const prevMsg = messages[idx - 1];
//             const showDate =
//               !prevMsg || formatDate(prevMsg.timestamp) !== formatDate(msg.timestamp);

//             return (
//               <React.Fragment key={idx}>
//                 {showDate && (
//                   <div className="date-separator">
//                     {formatDate(msg.timestamp)}
//                   </div>
//                 )}
//                 <div className={`message ${msg.type}-message`}>
//                   <div className="message-text">{msg.text}</div>
//                   <div className="timestamp">{formatTime(msg.timestamp)}</div>
//                 </div>
//                 {msg.type === "bot" && msg.suggestions?.length > 0 && (
//                   <div className="suggestions">
//                     {msg.suggestions.map((opt, i) => (
//                       <button
//                         key={i}
//                         className="suggestion-btn"
//                         onClick={() => handleSend(opt)}
//                       >
//                         {opt}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </React.Fragment>
//             );
//           })}
//           <div ref={chatEndRef} />
//         </div>

//         {typing && <div className="typing-indicator">UniGuide Assistant is typing...</div>}

//         <div className="chat-input" role="form" aria-label="Chat input">
//           <textarea
//             aria-label="Type your message"
//             placeholder="Type your message here..."
//             value={input}
//             rows={1}
//             onChange={e => {
//               setInput(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height = `${e.target.scrollHeight}px`;
//             }}
//             onKeyDown={e => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//           />
//           <button type="button" onClick={startListening} aria-label="Speak" className="voice-btn">
//             <i className="fas fa-microphone" />
//           </button>
//           <button type="button" onClick={() => handleSend()} aria-label="Send message">
//             <i className="fas fa-paper-plane" />
//           </button>
//         </div>
//       </div>

//       {/* Feedback button */}
//       {showFeedbackBtn && (
//         <button className="feedback-btn" onClick={() => setFeedbackOpen(true)}>
//           <i className="fas fa-comment-alt" /> Feedback
//         </button>
//       )}

//       {/* Feedback modal */}
//       <div
//         className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//         onClick={() => setFeedbackOpen(false)}
//       >
//         <div className="modal-content" onClick={e => e.stopPropagation()}>
//           <h2>Feedback</h2>
//           <form onSubmit={handleFeedbackSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               required
//             >
//               <option value="5">Excellent</option>
//               <option value="4">Good</option>
//               <option value="3">Average</option>
//               <option value="2">Poor</option>
//               <option value="1">Very Poor</option>
//             </select>
//             <textarea
//               name="comments"
//               placeholder="Comments"
//               rows="5"
//               value={formData.comments}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" disabled={submittingFeedback}>
//               {submittingFeedback ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </div>

//       <footer ref={footerRef}>
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en">
//             <i className="fab fa-instagram" />
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// }









// src/pages/Dash/Chat.jsx 
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ChatContext from "../context/chatContext";
import axios from "axios";
import "../css/chatbot.css";
import "../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Chat() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { messages, typing, sendMessage } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const [showFeedbackBtn, setShowFeedbackBtn] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: "",
  });

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const footerRef = useRef(null);

  // scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // show feedback button when footer appears
  useEffect(() => {
    if (!footerRef.current || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowFeedbackBtn(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (d) => new Date(d).toLocaleDateString();

  const handleSend = (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    try {
      const base = import.meta.env.VITE_API_URL || "";
      await axios.post(
        `${base}/api/feedback`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Thank you for your feedback!");
      setFormData({ name: "", email: "", rating: "5", comments: "" });
      setFeedbackOpen(false);
    } catch (err) {
      console.error("Feedback error:", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recog = new SR();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.onresult = (e) => {
      setInput((prev) => prev + " " + e.results[0][0].transcript);
    };
    recog.start();
    recognitionRef.current = recog;
  };

  return (
    <>
      <title>HITEC | UNIGUIDE | CHAT_ASSISTANT</title>
      <header className="landing-header">
        <nav>
          <Link to="/homepage">Home</Link>
          <Link to="/chatbot">Chat Assistant</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/events">Events</Link>
          <Link to="/tour">Tour</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/industry-integration">Industry Integration</Link>
          <Link to="/studentresources">Student Resources</Link>
        </nav>
      </header>


      {/* Mobile Devices */}
      <header className="site-header">
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
          ☰
        </button>
        <nav className={`site-nav${menuOpen ? ' open' : ''}`}>
          <ul>
            <li><Link to="/homepage">Home</Link></li>
            <li><Link to="/chatbot">Chat Assistant</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/tour">Tour</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/alumni">Alumni</Link></li>
            <li><Link to="/industry-integration">Industry Integration</Link></li>
            <li><Link to="/studentresources">Student Resources</Link></li>
          </ul>
        </nav>
      </header>

      <div className="chat-container" role="log" aria-live="polite">
        <div className="chat-header" role="banner">
          <i className="fas fa-robot" /> UNIGUIDE Assistant
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => {
            const prev = messages[idx - 1];
            const showDate =
              !prev || formatDate(prev.timestamp) !== formatDate(msg.timestamp);

            return (
              <React.Fragment key={idx}>
                {showDate && (
                  <div className="date-separator">
                    {formatDate(msg.timestamp)}
                  </div>
                )}
                <div className={`message ${msg.type}-message`}>
                  <div className="message-text">{msg.text}</div>
                  <div className="timestamp">{formatTime(msg.timestamp)}</div>
                </div>
                {msg.type === "bot" && msg.suggestions?.length > 0 && (
                  <div className="suggestions">
                    {msg.suggestions.map((opt, i) => (
                      <button
                        key={i}
                        className="suggestion-btn"
                        onClick={() => handleSend(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {typing && (
          <div className="typing-indicator">
            UNIGUIDE Assistant is typing...
          </div>
        )}

        <div className="chat-input" role="form" aria-label="Chat input">
          <textarea
            aria-label="Type your message"
            placeholder="Type your message here..."
            value={input}
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            type="button"
            onClick={startListening}
            aria-label="Speak"
            className="voice-btn"
          >
            <i className="fas fa-microphone" />
          </button>
          <button
            type="button"
            onClick={() => handleSend()}
            aria-label="Send message"
          >
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>

      {showFeedbackBtn && (
        <button
          className="feedback-btn"
          onClick={() => setFeedbackOpen(true)}
        >
          <i className="fas fa-comment-alt" /> Feedback
        </button>
      )}

      <div
        className={`feedback-modal${feedbackOpen ? " open" : ""}`}
        onClick={() => setFeedbackOpen(false)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5">Excellent</option>
              <option value="4">Good</option>
              <option value="3">Average</option>
              <option value="2">Poor</option>
              <option value="1">Very Poor</option>
            </select>
            <textarea
              name="comments"
              placeholder="Comments"
              rows="5"
              value={formData.comments}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={submittingFeedback}>
              {submittingFeedback ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <footer ref={footerRef}>
        <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/hitecuni/">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://www.instagram.com/hitecuni/?hl=en">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </footer>
    </>
  );
}






// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../src/context/AuthContext";
// import axios from "axios";
// import "../css/chatbot.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Chat() {
//   const { user } = useAuth();
//   const token = localStorage.getItem("token");
//   const storageKey = `uniguide_chat_${user._id}`;

//   // 1) Load from localStorage, always falling back to an array
//   const [messages, setMessages] = useState(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem(storageKey));
//       if (Array.isArray(stored)) return stored;
//     } catch (err) {
//       console.error("Could not parse chat from storage:", err);
//     }
//     return [
//       {
//         text: "Hi! I'm HITEC UNIGUIDE. How can I assist you today?",
//         type: "bot",
//         timestamp: new Date().toISOString(),
//         suggestions: ["Admission criteria?", "Programs?", "Admission Policy?"],
//       },
//     ];
//   });

//   // 2) Persist to localStorage on every change
//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(messages));
//   }, [messages, storageKey]);

//   // 3) Also fetch from backend once
//   useEffect(() => {
//     const loadSaved = async () => {
//       try {
//         const base = import.meta.env.VITE_API_URL;
//         const { data } = await axios.get(
//           `${base}/api/users/${user._id}/saved-questions`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const saved = data.flatMap(({ question, answer, createdAt }) => [
//           { text: question, type: "user", timestamp: createdAt },
//           { text: answer, type: "bot", timestamp: createdAt },
//         ]);
//         if (saved.length) {
//           setMessages(saved);
//         }
//       } catch (err) {
//         console.error("Failed to load saved questions:", err);
//       }
//     };
//     loadSaved();
//   }, [user._id, token]);

//   // Other state
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [showFeedbackBtn, setShowFeedbackBtn] = useState(false);
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [submittingFeedback, setSubmittingFeedback] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: "",
//   });

//   const chatEndRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const footerRef = useRef(null);

//   // Scroll on new messages
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Request notification permission
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Show feedback button when footer is visible
//   useEffect(() => {
//     if (!footerRef.current || !window.IntersectionObserver) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => setShowFeedbackBtn(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     obs.observe(footerRef.current);
//     return () => obs.disconnect();
//   }, []);

//   const formatTime = (iso) =>
//     new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   const formatDate = (iso) => new Date(iso).toLocaleDateString();

//   const handleSend = async (overrideText) => {
//     const question = (overrideText ?? input).trim();
//     if (!question) return;
//     const now = new Date().toISOString();

//     // add user message
//     setMessages((m) => [
//       ...m,
//       { text: question, type: "user", timestamp: now },
//     ]);
//     setInput("");
//     setTyping(true);

//     try {
//       const base = import.meta.env.VITE_API_URL;
//       const { data } = await axios.post(
//         `${base}/api/chat`,
//         { question },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const answer = data.answer || "Sorry, I couldn't find an answer.";
//       const suggestions = Array.isArray(data.suggestions)
//         ? data.suggestions
//         : [];

//       // add bot message
//       setMessages((m) => [
//         ...m,
//         { text: answer, type: "bot", timestamp: now, suggestions },
//       ]);

//       // desktop notification
//       if (document.hidden && Notification.permission === "granted") {
//         new Notification("UniGuide replied", { body: answer });
//       }

//       // save back to server
//       await axios.post(
//         `${base}/api/users/${user._id}/saved-questions`,
//         { question, answer },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("Chat error:", err);
//       setMessages((m) => [
//         ...m,
//         {
//           text: "Assistant is currently unavailable. Please try again later.",
//           type: "bot",
//           timestamp: new Date().toISOString(),
//           suggestions: [],
//         },
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     setSubmittingFeedback(true);
//     try {
//       const base = import.meta.env.VITE_API_URL;
//       await axios.post(`${base}/api/feedback`, formData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Thank you for your feedback!");
//       setFormData({ name: "", email: "", rating: "5", comments: "" });
//       setFeedbackOpen(false);
//     } catch (err) {
//       console.error("Feedback error:", err);
//       alert("Failed to submit feedback. Please try again.");
//     } finally {
//       setSubmittingFeedback(false);
//     }
//   };

//   const startListening = () => {
//     const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SR) {
//       return alert("Speech recognition not supported in this browser.");
//     }
//     const recog = new SR();
//     recog.lang = "en-US";
//     recog.interimResults = false;
//     recog.onresult = (e) =>
//       setInput((prev) => prev + " " + e.results[0][0].transcript);
//     recog.start();
//     recognitionRef.current = recog;
//   };

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | CHAT ASSISTANT</title>
//        <header className="landing-header">
//               <nav>
//                 <Link to="/homepage">Home</Link>
//                 <Link to="/chatbot">Chat Assistant</Link>
//                 <Link to="/admissions">Admissions</Link>
//                 <Link to="/events">Events</Link>
//                 <Link to="/tour">Tour</Link>
//                 <Link to="/dashboard">Dashboard</Link>
//                 <Link to="/alumni">Alumni</Link>
//                 <Link to="/industry-integration">Industry Integration</Link>
//                 <Link to="/studentresources">Student Resources</Link>
//               </nav>
//             </header>

//       <div className="chat-container" role="log" aria-live="polite">
//         <div className="chat-header" role="banner">
//           <i className="fas fa-robot" /> UniGuide Assistant
//         </div>

//         <div className="chat-messages">
//           {Array.isArray(messages) &&
//             messages.map((msg, i) => {
//               const prev = messages[i - 1];
//               const showDate =
//                 !prev || formatDate(prev.timestamp) !== formatDate(msg.timestamp);

//               return (
//                 <React.Fragment key={i}>
//                   {showDate && (
//                     <div className="date-separator">
//                       {formatDate(msg.timestamp)}
//                     </div>
//                   )}
//                   <div className={`message ${msg.type}-message`}>
//                     <div className="message-text">{msg.text}</div>
//                     <div className="timestamp">
//                       {formatTime(msg.timestamp)}
//                     </div>
//                   </div>
//                   {msg.type === "bot" && msg.suggestions?.length > 0 && (
//                     <div className="suggestions">
//                       {msg.suggestions.map((opt, idx) => (
//                         <button
//                           key={idx}
//                           className="suggestion-btn"
//                           onClick={() => handleSend(opt)}
//                         >
//                           {opt}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </React.Fragment>
//               );
//             })}
//           <div ref={chatEndRef} />
//         </div>

//         {typing && (
//           <div className="typing-indicator">
//             UniGuide Assistant is typing...
//           </div>
//         )}

//         <div className="chat-input" role="form" aria-label="Chat input">
//           <textarea
//             aria-label="Type your message"
//             placeholder="Type your message here..."
//             value={input}
//             rows={1}
//             onChange={(e) => {
//               setInput(e.target.value);
//               e.target.style.height = "auto";
//               e.target.style.height = `${e.target.scrollHeight}px`;
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSend();
//               }
//             }}
//           />
//           <button
//             type="button"
//             onClick={startListening}
//             aria-label="Speak"
//             className="voice-btn"
//           >
//             <i className="fas fa-microphone" />
//           </button>
//           <button
//             type="button"
//             onClick={() => handleSend()}
//             aria-label="Send message"
//           >
//             <i className="fas fa-paper-plane" />
//           </button>
//         </div>
//       </div>

//       {showFeedbackBtn && (
//         <button
//           className="feedback-btn"
//           onClick={() => setFeedbackOpen(true)}
//         >
//           <i className="fas fa-comment-alt" /> Feedback
//         </button>
//       )}

//       <div
//         className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//         onClick={() => setFeedbackOpen(false)}
//       >
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h2>Feedback</h2>
//           <form onSubmit={handleFeedbackSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//               required
//             >
//               <option value="5">Excellent</option>
//               <option value="4">Good</option>
//               <option value="3">Average</option>
//               <option value="2">Poor</option>
//               <option value="1">Very Poor</option>
//             </select>
//             <textarea
//               name="comments"
//               placeholder="Comments"
//               rows="5"
//               value={formData.comments}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" disabled={submittingFeedback}>
//               {submittingFeedback ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
