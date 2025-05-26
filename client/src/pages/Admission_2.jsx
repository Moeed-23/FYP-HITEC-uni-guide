import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/admission.css';
import "../css/Header.css";
import { Link } from 'react-router-dom';

export default function AdmissionsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // initialize AOS animations
    AOS.init();

    // hide the status popup after 6s
    const popupTimer = setTimeout(() => setShowPopup(false), 6000);

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(popupTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <>
      <title>HITEC | UNIGUIDE | ADMISSIONS</title>
      <header className="landing-header">
        {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
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

      <div className="admissions-page">
        {/* ===== HERO ===== */}
        <section className="hero">
          <h1>Admissions Open — Fall 2025</h1>
          <p>Unlock your future with world-class education at HITEC University.</p>
          <a href="#apply" className="cta-button">
            <i className="fas fa-pen-nib" /> Apply Now
          </a>
        </section>

        {/* ===== STATUS POPUP ===== */}
        {showPopup && (
          <div className="popup" data-aos="fade-up">
            <strong>📣 Live Update:</strong>
            <p>
              Admissions open till <strong>August 30th</strong>. Don’t miss the deadline!
            </p>
          </div>
        )}

        {/* ===== WHY HITEC ===== */}
        <section className="features">
          <h2>Why Choose HITEC?</h2>
          <div className="cards">
            <div className="card" data-aos="fade-up">
              <i className="fas fa-award" />
              <h3>Top Accreditation</h3>
              <p>Recognized by PEC, NCEAC & HEC for excellence in education.</p>
            </div>
            <div className="card" data-aos="fade-up">
              <i className="fas fa-building" />
              <h3>Smart Campus</h3>
              <p>Cutting-edge labs, digital classrooms, and modern learning spaces.</p>
            </div>
            <div className="card" data-aos="fade-up">
              <i className="fas fa-handshake" />
              <h3>Industry Linkage</h3>
              <p>Strong ties with HIT, PAC Kamra, and other major industries.</p>
            </div>
          </div>
        </section>

        {/* ===== PROGRAMS ===== */}
        <section className="features" id="apply">
          <h2>Explore Our Programs</h2>
          <div className="cards">
            <div className="card" data-aos="fade-up">
              <h3>Engineering</h3>
              <p>Mechanical, Electrical, Civil & Mechatronics.</p>
            </div>
            <div className="card" data-aos="fade-up">
              <h3>Computer Science</h3>
              <p>BSCS, BSSE, AI, and Data Science specializations.</p>
            </div>
            <div className="card" data-aos="fade-up">
              <h3>Management Sciences</h3>
              <p>BBA, BS Accounting & Finance, and MBA tracks.</p>
            </div>
          </div>
        </section>


        {/* ===== SCROLL-TO-TOP BUTTON ===== */}
        {showScroll && (
          <button
            id="scrollTopBtn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="fas fa-chevron-up" />
          </button>
        )}
      </div>
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

      {/* css file in Events.css */}
      <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
        <i className="fas fa-comment-dots"></i>
      </Link>

      <footer>
        <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </>

  );
}
