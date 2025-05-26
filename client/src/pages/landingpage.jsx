import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import '../css/l.css';
import videoMp4 from '../video/videoo.mp4';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/Header.css';

const headings = [
  "Your Smart University Companion",
  "Simplifying Campus Life with AI",
  "24/7 Support for Every Student",
  "Discover, Connect, Succeed"
];

const subtexts = [
  "Explore programs and events with ease.",
  "Navigate academics with intelligent support.",
  "Stay connected to your campus, always.",
  "Plan your path with confidence and clarity."
];

function Landingpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  // Rotate hero text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % headings.length);
    }, 5000);
    return () => clearInterval(interval);
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

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  return (
    <>
      <title>HITEC | UNIGUIDE</title>
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

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>

        <div className="hero-text">
          <h2 id="hero-heading">{headings[index]}</h2>
          <p id="hero-subtext">{subtexts[index]}</p>
          <a href="#features" className="cta-button">Start Exploring</a>
          <a href="/Login" className="secondary-btn">Login</a>
          <a href="/Signup" className="secondary-btn orange">Sign Up</a>
        </div>

        <svg
          className="floating-svg-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="20" fill="rgba(247, 127, 0, 0.2)" />
        </svg>

        <svg
          className="floating-svg-icon shape-triangle"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64">
          <polygon points="32,10 10,54 54,54" fill="rgba(247, 127, 0, 0.15)" />
        </svg>

        <svg
          className="floating-svg-icon shape-star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64">
          <path
            d="M32 4l6.9 20.8H60l-16.4 12 6.3 20.8L32 44.6 14.1 58l6.3-20.8L4 24.8h21.1z"
            fill="rgba(247, 127, 0, 0.1)"
          />
        </svg>

        <div className="video-container" data-aos="zoom-in">
          <video autoPlay muted loop playsInline>
            <source src={videoMp4} type="video/mp4" />
            {/* optional fallback */}
            Your browser doesn’t support MP4 videos.
          </video>
        </div>
      </section>

      {/* UniBot Chat Prompt */}
      <div
        className="unibot"
        onClick={() => window.location.href = '/chatbot'}>
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="UniBot"
          />
        </div>
        <div className="speech-bubble">
          <p>Hi! I'm UniBot — here to guide your journey!</p>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="wave"></div>

      {/* Features Section */}
      <section id="features" className="features">
        <h3 data-aos="fade-up">What You Can Do</h3>
        <div className="cards">
          <div className="card" data-aos="fade-right">
            <i className="fas fa-university"></i>
            <h4>Explore Programs</h4>
            <p>Find your ideal academic path.</p>
          </div>
          <div className="card" data-aos="fade-up">
            <i className="fas fa-comments"></i>
            <h4>AI Chat Support</h4>
            <p>24/7 student help & guidance.</p>
          </div>
          <div className="card" data-aos="fade-left">
            <i className="fas fa-calendar-alt"></i>
            <h4>Event Updates</h4>
            <p>Keep track of seminars & activities.</p>
          </div>
          <div className="card" data-aos="zoom-in">
            <i className="fas fa-map-marked-alt"></i>
            <h4>Campus Tour</h4>
            <p>Visualize and explore campus areas.</p>
          </div>
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

      {/* ===== SCROLL-TO-TOP BUTTON ===== */}
      {showScroll && (
        <button
          id="scrollTopBtn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-chevron-up" />
        </button>
      )}


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
}

export default Landingpage;
