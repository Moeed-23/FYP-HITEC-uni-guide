// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import "../css/admissionpage.css";
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Admissions = () => {
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
//       <title>HITEC | UNIGUIDE | ADMISSIONS</title>
//       <header className="landing-header">
//         {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
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

//       <section className="hero_admission">
//         <h1>Join the HITEC University Family</h1>
//         <p>
//           Your journey to success begins here. At HITEC University, we provide
//           the tools, resources, and community to help you thrive academically
//           and professionally.
//         </p>
//         <p>
//           Our world-class faculty, state-of-the-art facilities, and extensive
//           alumni network will empower you to become a leader in your field.
//           Join us for the Fall 2025 intake and unlock endless opportunities!
//         </p>
//         <a
//           href="http://111.68.98.206/Default.aspx"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="cta-button_2">
//           Apply Now
//         </a>
//       </section>

//       <section className="admissions-section">
//         <h2>Admissions Overview</h2>
//         <p>
//           We offer diverse programs to help you shape your future. With
//           excellent faculty, state-of-the-art facilities, and a vibrant campus
//           life, HITEC University provides all you need to succeed.
//         </p>
//         <img
//           src="https://cm.hitecuni.edu.pk/_FLS_/2661_Event.JPG"
//           alt="University Admissions"
//         />

//         <div className="requirements">
//           <div>
//             <h3>Admission Requirements</h3>
//             <ul>
//               <li>Minimum 60% in HSSC or equivalent for undergraduate programs.</li>
//               <li>Minimum 50% for postgraduate admissions.</li>
//               <li>Valid NTS/Entry Test Scores for some programs.</li>
//               <li>English Proficiency Test (if applicable).</li>
//             </ul>
//           </div>
//           <div>
//             <h3>Required Documents</h3>
//             <ul>
//               <li>Completed Application Form.</li>
//               <li>Photocopies of Academic Transcripts & Certificates.</li>
//               <li>Valid CNIC or B-Form.</li>
//               <li>Passport-sized Photographs (3).</li>
//               <li>Proof of Entry Test Scores (if applicable).</li>
//             </ul>
//           </div>
//         </div>

//         <div className="process">
//           <div>
//             <h3>Application Process</h3>
//             <p>Follow these simple steps to complete your application:</p>
//             <ul>
//               <li>Step 1: Fill out the application form on our website.</li>
//               <li>Step 2: Upload required documents.</li>
//               <li>Step 3: Take the entry test (if applicable).</li>
//               <li>Step 4: Wait for confirmation and admission details.</li>
//             </ul>
//           </div>
//           <div>
//             <h3>Important Dates</h3>
//             <p>Keep track of application deadlines and admission test dates:</p>
//             <ul>
//               <li>Application Deadline: April 30, 2025.</li>
//               <li>Entry Test Date: May 15, 2025.</li>
//               <li>Result Announcement: June 1, 2025.</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       <section className="features_1">
//         <h2>Why Choose HITEC University?</h2>
//         <p>
//           Discover the benefits of studying at HITEC University, where
//           innovation and excellence are at the heart of everything we do.
//         </p>
//         <a
//           href="homepage"
//           className="cta-button_2"
//         >
//           Discover
//         </a>
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

//       <footer>
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Admissions;
