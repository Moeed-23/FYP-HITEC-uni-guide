// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/Landing.css";

// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Landing = () => {
//   // State for feedback modal visibility
//   const [feedbackOpen, setFeedbackOpen] = useState(false);

//   // State for feedback form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: ""
//   });

//   // Handle form inputs changing
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(fd => ({ ...fd, [name]: value }));
//   };

//   // Submit feedback to backend
//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//       if (!res.ok) throw new Error("Network response was not ok");
//       alert("Thank you for your feedback!");
//       setFormData({ name: "", email: "", rating: "5", comments: "" });
//       setFeedbackOpen(false);
//     } catch (err) {
//       console.error("Feedback submission failed:", err);
//       alert("Failed to submit feedback. Please try again.");
//     }
//   };

//   return (

//     <>
//       <title>HITEC | UNIGUIDE</title>

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

//       <section className="hero_1">
//         <div className="text-section">
//           <h1>Your AI University Assistant</h1>
//           <p>
//             Your one-stop solution for university-related assistance.
//             Whether you need help with admissions, events, or campus navigation,
//             our chatbot is here to guide you every step of the way. Discover tailored insights,
//             upcoming events, and explore campuses like never before with our interactive tools and real-time
//             assistance.
//           </p>
//           <Link to="/signup" className="cta-button_1">
//             Get Started
//           </Link>
//         </div>
//         <div className="image-section">
//           <img
//             src="https://botnation.ai/site/wp-content/uploads/2024/01/chatbot-leads.webp"
//             alt="Chatbot Illustration"
//           />
//         </div>
//       </section>

//       <section className="auth-section_1">
//         <h2>Join the HITEC UNIGUIDE Community</h2>
//         <p>
//           Sign up to access personalized features or log in if you already have
//           an account. Start your journey today!
//         </p>
//         <div className="auth-buttons">
//           <Link to="/signup" className="auth-button">
//             Sign Up
//           </Link>
//           <Link to="/login" className="auth-button">
//             Login
//           </Link>
//         </div>
//       </section>
//       {/* Feedback Button */}
//       <button
//         className="feedback-btn"
//         onClick={() => setFeedbackOpen(true)}
//       >
//         <i className="fas fa-comment-alt" /> Feedback
//       </button>

//       {/* Feedback Modal */}
//       <div
//         className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//         onClick={() => setFeedbackOpen(false)}
//       >
//         <div className="modal-content" onClick={e => e.stopPropagation()}>
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
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>

//       {/* css file in Events.css */}
//       <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
//         <i className="fas fa-comment-dots"></i>
//       </Link>


//       <footer className="footer">
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

// export default Landing;






