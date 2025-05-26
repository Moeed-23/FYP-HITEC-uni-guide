import { useState } from 'react';
import '../css/home.css';
import 'aos/dist/aos.css';
import "../css/Header.css"
import { Link } from "react-router-dom";


const HomePage = () => {

  const [menuOpen, setMenuOpen] = useState(false);

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
      <title>HITEC | UNIGUIDE | HOME</title>
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

      <section className="intro-banner">
        <div className="intro-text">
          <h1 className="gradient-title"><span>Inside </span>Campus Daily</h1>
          <h2 className="badge-slide">Your window into HITEC life</h2>
          <p className="typewriter">Stay informed • Join events • Elevate your academics</p>
          <a href="/dashboard" className="btn-primary">Open Dashboard</a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095"
          alt="Campus Life"
        />
      </section>

      <section className="snapshots">
        <div className="snapshot">
          <h3>Today’s Focus</h3>
          <p>Stay sharp with daily briefs and campus-wide highlights.</p>
        </div>
        <div className="snapshot">
          <h3>Student Life</h3>
          <p>Join clubs, attend events, and connect with peers.</p>
        </div>
        <div className="snapshot">
          <h3>Tech Highlights</h3>
          <p>Explore tools and digital spaces curated for students.</p>
        </div>
      </section>

      <div className="floating-card">
        <h3>“Success begins with awareness.”</h3>
        <p>Check your dashboard daily for alerts, messages and updates.</p>
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
export default HomePage;
