// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/homepage.css"; 
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Homepage = () => {
//   return (
//     <>
//     <title>HITEC | UNIGUIDE | HOME</title>
//     <header className="landing-header">
//             {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
//             <nav>
//               <Link to="/homepage">Home</Link>
//               <Link to="/chatbot">Chat</Link>
//               <Link to="/admissions">Admissions</Link>
//               <Link to="/events">Events</Link>
//               <Link to="/tour">Tour</Link>
//               <Link to="/dashboard">Dashboard</Link>
//               <Link to="/alumni">Alumni</Link>
//               <Link to="/industry-integration">Industry Integration</Link>
//               <Link to="/feedback">Feedback</Link>
//             </nav>
//           </header>

//       <section className="hero_2">
//         <h1>Welcome to HITEC University's UNIGUIDE</h1>
//         <p>
//           Join one of Pakistan's premier institutions offering state-of-the-art
//           facilities and top-tier programs in Engineering, Sciences, and
//           Management.
//         </p>
//         <a href="/signup" className="cta-button_0">Start Your Journey</a>
//       </section>

//       <section className="features" id="why-hitec">
//         <h2>Why Choose HITEC?</h2>
//         <div className="feature-item">
//           <h3>Accredited Programs</h3>
//           <p>
//             Our programs are accredited by PEC, NCEAC, and HEC, ensuring global
//             recognition and quality education.
//           </p>
//         </div>
//         <div className="feature-item">
//           <h3>State-of-the-Art Campus</h3>
//           <p>
//             Experience unmatched facilities, modern labs, and a conducive
//             learning environment at our Taxila campus.
//           </p>
//         </div>
//         <div className="feature-item">
//           <h3>Industry Linkages</h3>
//           <p>
//             Close ties with HIT, POFs, and PAC Kamra provide abundant internship
//             and employment opportunities.
//           </p>
//         </div>
//       </section>

//       <section className="features" id="programs">
//         <h2>Our Programs</h2>
//         <div className="feature-item">
//           <h3>Engineering</h3>
//           <p>
//             BS, MS, and PhD programs in Mechanical, Electrical, and Computer
//             Engineering.
//           </p>
//         </div>
//         <div className="feature-item">
//           <h3>Computer Science</h3>
//           <p>
//             Explore Computer Science and Software Engineering with
//             cutting-edge curricula.
//           </p>
//         </div>
//         <div className="feature-item">
//           <h3>Management Sciences</h3>
//           <p>
//             Develop business acumen with degrees in Business Administration and
//             Finance.
//           </p>
//         </div>
//       </section>

//       <section className="features" id="apply">
//         <h2>Ready to Apply?</h2>
//         <p>
//           Admissions are open for Fall 2025. Take the first step towards your
//           future with HITEC University.
//         </p>
//         <a
//           href="http://111.68.98.206/Default.aspx"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="cta-button_0"
//         >
//           Apply Now
//         </a>
//       </section>


//       <footer className="footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="social-icons">
//         <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//         <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//         <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Homepage ;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import "../css/homepage.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Homepage = () => {
//   // State for the feedback modal
//   const [feedbackOpen, setFeedbackOpen] = useState(false);

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | HOME</title>

//       <header className="landing-header">
//         <nav>
//           <Link to="/homepage">Home</Link>
//           <Link to="/chatbot">Chat</Link>
//           <Link to="/admissions">Admissions</Link>
//           <Link to="/events">Events</Link>
//           <Link to="/tour">Tour</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/alumni">Alumni</Link>
//           <Link to="/industry-integration">Industry Integration</Link>
//           <Link to="/feedback">Feedback</Link>
//         </nav>
//       </header>
//       <div>
//         <section className="hero_2">
//           <h1>Welcome to HITEC University's UNIGUIDE</h1>
//           <p>
//             Join one of Pakistan's premier institutions offering state-of-the-art
//             facilities and top-tier programs in Engineering, Sciences, and
//             Management.
//           </p>
//           <a href="/signup" className="cta-button_0">
//             Start Your Journey
//           </a>
//         </section>

        // <section className="features" id="why-hitec">
        //   <h2>Why Choose HITEC?</h2>
        //   <div className="feature-item">
        //     <h3>Accredited Programs</h3>
        //     <p>
        //       Our programs are accredited by PEC, NCEAC, and HEC, ensuring global
        //       recognition and quality education.
        //     </p>
        //   </div>
        //   <div className="feature-item">
        //     <h3>State-of-the-Art Campus</h3>
        //     <p>
        //       Experience unmatched facilities, modern labs, and a conducive
        //       learning environment at our Taxila campus.
        //     </p>
        //   </div>
        //   <div className="feature-item">
        //     <h3>Industry Linkages</h3>
        //     <p>
        //       Close ties with HIT, POFs, and PAC Kamra provide abundant internship
        //       and employment opportunities.
        //     </p>
        //   </div>
        // </section>

        // <section className="features" id="programs">
        //   <h2>Our Programs</h2>
        //   <div className="feature-item">
        //     <h3>Engineering</h3>
        //     <p>
        //       BS, MS, and PhD programs in Mechanical, Electrical, and Computer
        //       Engineering.
        //     </p>
        //   </div>
        //   <div className="feature-item">
        //     <h3>Computer Science</h3>
        //     <p>
        //       Explore Computer Science and Software Engineering with
        //       cutting-edge curricula.
        //     </p>
        //   </div>
        //   <div className="feature-item">
        //     <h3>Management Sciences</h3>
        //     <p>
        //       Develop business acumen with degrees in Business Administration and
        //       Finance.
        //     </p>
        //   </div>
        // </section>

//         <section className="features" id="apply">
//           <h2>Ready to Apply?</h2>
//           <p>
//             Admissions are open for Fall 2025. Take the first step towards your
//             future with HITEC University.
//           </p>
//           <a
//             href="http://111.68.98.206/Default.aspx"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="cta-button_0"
//           >
//             Apply Now
//           </a>
//         </section>

//         {/* ─── Feedback Button & Modal ──────────────────────── */}
//         <button
//           className="feedback-btn"
//           onClick={() => setFeedbackOpen(true)}
//         >
//           <i className="fas fa-comment-alt" /> Feedback
//         </button>

//         <div
//           className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//           onClick={() => setFeedbackOpen(false)}
//         >
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <h2>Feedback</h2>
//             <form>
//               <input type="text" placeholder="Name" required />
//               <input type="email" placeholder="Email" required />
//               <select required>
//                 <option value="">Rate Your Experience</option>
//                 <option value="5">Excellent</option>
//                 <option value="4">Good</option>
//                 <option value="3">Average</option>
//                 <option value="2">Poor</option>
//               </select>
//               <textarea placeholder="Comments" rows="5" required />
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
      
//       <footer className="footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
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

// export default Homepage;









// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../css/homepage.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/Header.css"

// const Homepage = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

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

//   const [showScroll, setShowScroll] = useState(false);
//     useEffect(() => {
  
//       // show scroll-to-top button after scrolling down 200px
//       const handleScroll = () => setShowScroll(window.scrollY > 200);
//       window.addEventListener('scroll', handleScroll);
  
//     }, []);
//   return (
//     <>

//         <title>HITEC | UNIGUIDE | HOME</title>

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

//       <section className="hero_2">
//         <h1>Welcome to HITEC UNIGUIDE</h1>
//         <p>
//           Join one of Pakistan's premier institutions offering state-of-the-art
//           facilities and top-tier programs in Engineering, Sciences, and
//           Management.
//         </p>
//         <a href="/signup" className="cta-button_0">
//           Start Your Journey
//         </a>
//       </section>

//       <section className="features" id="why-hitec">
//           <h2>Why Choose HITEC?</h2>
//           <div className="feature-item">
//             <h3>Accredited Programs</h3>
//             <p>
//               Our programs are accredited by PEC, NCEAC, and HEC, ensuring global
//               recognition and quality education.
//             </p>
//           </div>
//           <div className="feature-item">
//             <h3>State-of-the-Art Campus</h3>
//             <p>
//               Experience unmatched facilities, modern labs, and a conducive
//               learning environment at our Taxila campus.
//             </p>
//           </div>
//           <div className="feature-item">
//             <h3>Industry Linkages</h3>
//             <p>
//               Close ties with HIT, POFs, and PAC Kamra provide abundant internship
//               and employment opportunities.
//             </p>
//           </div>
//         </section>

//         <section className="features" id="programs">
//           <h2>Our Programs</h2>
//           <div className="feature-item">
//             <h3>Engineering</h3>
//             <p>
//               BS, MS, and PhD programs in Mechanical, Electrical, and Computer
//               Engineering.
//             </p>
//           </div>
//           <div className="feature-item">
//             <h3>Computer Science</h3>
//             <p>
//               Explore Computer Science and Software Engineering with
//               cutting-edge curricula.
//             </p>
//           </div>
//           <div className="feature-item">
//             <h3>Management Sciences</h3>
//             <p>
//               Develop business acumen with degrees in Business Administration and
//               Finance.
//             </p>
//           </div>
//         </section>


//       <section className="features" id="apply">
//         <h2>Ready to Apply?</h2>
//         <p>Admissions are open for Fall 2025. Take the first step towards your future with HITEC University.</p>
//         <a
//           href="http://111.68.98.206/Default.aspx"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="cta-button_0"
//         >
//           Apply Now
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

//      {/* ===== SCROLL-TO-TOP BUTTON ===== */}
//       {showScroll && (
//         <button
//           id="scrollTopBtn"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <i className="fas fa-chevron-up" />
//         </button>
//       )}

//       <footer className="footer">
//       <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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

// export default Homepage;
