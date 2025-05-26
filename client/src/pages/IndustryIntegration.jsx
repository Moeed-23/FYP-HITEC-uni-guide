// import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import '../css/industry_integration.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

// // TODO: Replace with real data fetched from API

// const IndustryIntegration = () => {
//   // State for feedback modal visibility
//       const [feedbackOpen, setFeedbackOpen] = useState(false);

//       // State for feedback form data
//       const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         rating: "5",
//         comments: ""
//       });

//       // Handle form inputs changing
//       const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData(fd => ({ ...fd, [name]: value }));
//       };

//       // Submit feedback to backend
//       const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//           const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//           });
//           if (!res.ok) throw new Error("Network response was not ok");
//           alert("Thank you for your feedback!");
//           setFormData({ name: "", email: "", rating: "5", comments: "" });
//           setFeedbackOpen(false);
//         } catch (err) {
//           console.error("Feedback submission failed:", err);
//           alert("Failed to submit feedback. Please try again.");
//         }
//       };

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | INDUSTRY_INTEGRATION</title>

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
//       <div className="industry-integration">
//         <section className="intro">
//           <h2>Get Started with Industry Integration</h2>
//           <p>
//             Enhance your career by exploring exclusive internship opportunities,
//             attending job fairs, and gaining access to industry partnerships.
//           </p>
//           <a href="#internships">Explore Opportunities</a>
//         </section>

//         <section className="section" id="internships">
//           <h2>Internships, Job Fairs, and Partnerships</h2>
//           <p>
//             Keep up with the latest openings and industry collaborations to
//             fast-track your career.
//           </p>

//           <div className="feature-cards">
//             <div className="feature-card">
//               <h3>Tech Internship Program</h3>
//               <p>
//                 Explore cutting-edge opportunities in the tech industry through
//                 our partner companies.
//               </p>
//             </div>
//             <div className="feature-card">
//               <h3>Exclusive Job Fairs</h3>
//               <p>
//                 Meet top recruiters at our job fairs and connect with potential
//                 employers.
//               </p>
//             </div>
//             <div className="feature-card">
//               <h3>Industry Partner Program</h3>
//               <p>
//                 Gain access to exclusive internships and job roles through our
//                 ongoing partnerships.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="profile-section" id="complete-profile">
//           <h2>Personalized Job Matching</h2>
//           <p>
//             Let us match you with job roles that align with your skills and
//             interests. Complete your profile for personalized recommendations.
//           </p>

//           <div className="job-match-card">
//             <h3>Complete Your Profile</h3>
//             <p>
//               Filling out your profile helps us match you with the right
//               opportunities that fit your background and career aspirations.
//             </p>
//             <Link to="/profile">Complete Profile</Link>
//           </div>
//         </section>

//         {/* Feedback Button */}
//         <button
//           className="feedback-btn"
//           onClick={() => setFeedbackOpen(true)}
//         >
//           <i className="fas fa-comment-alt" /> Feedback
//         </button>

//         {/* Feedback Modal */}
//         <div
//           className={`feedback-modal${feedbackOpen ? " open" : ""}`}
//           onClick={() => setFeedbackOpen(false)}
//         >
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <h2>Feedback</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <select
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Rate Your Experience</option>
//                 <option value="5">Excellent</option>
//                 <option value="4">Good</option>
//                 <option value="3">Average</option>
//                 <option value="2">Poor</option>
//                 <option value="1">Very Poor</option>
//               </select>
//               <textarea
//                 name="comments"
//                 placeholder="Comments"
//                 rows="5"
//                 value={formData.comments}
//                 onChange={handleChange}
//                 required
//               />
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//         <footer>
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default IndustryIntegration;






////////////////////////////////////////////////////////////




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/industry_integration.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import industryImg from '../images/industry/industry-integration.jfif';
import "../css/Header.css";

const IndustryIntegration = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = () => {
    alert('📧 Email: placement@hitecuni.edu.pk\n📱 Phone: +92-303-7908404');
  };
  // State for feedback modal visibility
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // State for feedback form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: ""
  });

  // Handle form inputs changing
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  // Submit feedback to backend
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Network response was not ok");
      alert("Thank you for your feedback!");
      setFormData({ name: "", email: "", rating: "5", comments: "" });
      setFeedbackOpen(false);
    } catch (err) {
      console.error("Feedback submission failed:", err);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  return (
    <>
      {/* Document title (you can also set this via React Helmet or in your index.html) */}
      <title>HITEC | UNIGUIDE | INDUSTRY_INTEGRATION</title>

      {/* Navigation */}
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

      {/* Hero / Intro */}
      <section className="intro">
        <div className="intro-content">
          <div className="intro-text">
            <h2>Get Started with Industry Integration</h2>
            <p>
              Enhance your career by exploring exclusive internship opportunities,
              attending job fairs, and gaining access to industry partnerships.
            </p>
            <a href="#internships">Explore Opportunities</a>
          </div>
          <div className="intro-image">
            <img src={industryImg} alt="Industry Integration" />
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="section">
        <h2>Internships, Job Fairs, and Partnerships</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Tech Internship Program</h3>
            <p>🚀 <strong><a href="https://infoserv360.com/index.html" target="_blank">Infoserv360 </a></strong> is hiring a web development/design intern.</p>
            <p>⏱️ <strong>Deadline:</strong> April 24, 2025, 2pm.</p>
            <p><strong>Email At:</strong> <a className="link" href="mailto:placement@hitecuni.edu.pk" target="_blank">placement@hitecuni.edu.pk</a></p>
          </div>

          <div className="feature-card">
            <h3>Exclusive Job Fairs</h3>
            <p>🎯 <strong><a href="https://nayatel.com/" target="_blank">Nayatel </a></strong> is hiring for Assistant Sales Executive in B‑17 Islamabad.</p>
            <p><strong>Email At:</strong> <a className="link" href="mailto:zayeem.haq@nayatel.com" target="_blank">zayeem.haq@nayatel.com</a></p>
          </div>

          <div className="feature-card">
            <h3>Industry Partner Program</h3>
            <p>🌍 <strong><a href="https://www.cci.com.tr/en/" target="_blank">Coca Cola İçecek A Multinational Comapny</a></strong> Management Trainee Program is open.</p>
            <p>⏱️ <strong>Deadline:</strong> April 10, 2025</p>
            <p><strong>Apply Now:</strong> <a className="link" href="https://careerscci.com/job-invite/39859/" target="_blank">https://careerscci.com/job-invite/39859/</a></p>
          </div>
        </div>
      </section>

      {/* Featured Recruiters */}
      <section id="featured-partners" className="profile-section">
        <h2>Featured Recruiters & Industry Partners</h2>
        <div className="job-match-card">
          <h3>Current Industry Collaborations</h3>
          <ul>
            <li><strong>Coca Cola İçecek:</strong> Management Trainee Program 2025</li>
            <li><strong>Huawei:</strong> Technical role for fresh engineers</li>
            <li><strong>Nayatel:</strong> Assistant Sales Executive openings</li>
            <li><strong>Infoserv360:</strong> Web development internship</li>
          </ul>
          <a href="#internships">Click Here To Apply</a>
        </div>
      </section>

      {/* Feedback Button */}
      <button
        className="feedback-btn"
        onClick={() => setFeedbackOpen(true)}
      >
        <i className="fas fa-comment-alt" /> Feedback
      </button>

      {/* Feedback Modal */}
      <div
        className={`feedback-modal${feedbackOpen ? " open" : ""}`}
        onClick={() => setFeedbackOpen(false)}
      >
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>Feedback</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Floating Contact Widget */}
      <div className="contact-widget" onClick={handleContactClick}>
        📞 Contact Placement
      </div>

      {/* css file in Events.css */}
      <Link to="/chatbot" className="chat-assistant-fab1" aria-label="Chat Assistant">
        <i className="fas fa-comment-dots"></i>
      </Link>

      {/* ===== SCROLL-TO-TOP BUTTON ===== */}
      {showScroll && (
        <button
          id="scrollTopBtn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-chevron-up" />
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
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
};

export default IndustryIntegration;

