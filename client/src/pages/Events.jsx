// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/events.css'; // Optionally extract the CSS for cleaner JSX
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Events = () => {
//   return (
//     <>
//       <title>HITEC | UNIGUIDE | Events</title>

//       <header className="landing-header">
//         {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
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
//       <div className="eventsPage">
//         <section className="eventsHero">
//           <h1>Upcoming Events</h1>
//           <p>
//             Stay updated with the latest happenings at HITEC University. Join us in
//             making learning an engaging and memorable experience.
//           </p>
//         </section>

//         <section className="eventsSection">
//           <h2>Featured Events</h2>

//           <div className="eventCard">
//             <h3>Annual Science and Technology Fair</h3>
//             <p>Date: March 15, 2025</p>
//             <p>Location: HITEC University Main Auditorium</p>
//             <p>
//               Explore innovative projects and ideas presented by our talented students
//               and faculty.
//             </p>
//             <a href="#">Learn More</a>
//           </div>

//           <div className="eventCard">
//             <h3>Career Counseling Workshop</h3>
//             <p>Date: April 10, 2025</p>
//             <p>Location: Conference Hall B</p>
//             <p>
//               Join industry experts to get insights and guidance for your future career
//               paths.
//             </p>
//             <a href="#">Register Now</a>
//           </div>

//           <div className="eventCard">
//             <h3>Alumni Networking Night</h3>
//             <p>Date: May 5, 2025</p>
//             <p>Location: HITEC University Lawn</p>
//             <p>
//               Reconnect with your batchmates and build meaningful professional
//               connections.
//             </p>
//             <a href="#">RSVP Here</a>
//           </div>
//         </section>

//         <footer className="eventsFooter">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="eventsSocialIcons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>        </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Events;






import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/events.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../css/Header.css";

import banner1 from '../images/event_images/event-img2.jpeg';
import pic1a from '../images/event_images/event-img1.jfif';
import pic1b from '../images/event_images/event-img3.jfif';
import pic1c from '../images/event_images/event-img4.jfif';
import pic1d from '../images/event_images/event-img5.jfif';
import pic1e from '../images/event_images/event-img6.jpeg';

// Event 2 images
import banner2 from '../images/event_images/event2-img1.jpg';
import pic2a from '../images/event_images/event2-img2.jpg';
import pic2b from '../images/event_images/event2-img3.jpg';
import pic2c from '../images/event_images/event2-img4.jpg';
import pic2d from '../images/event_images/event2-img5.jpg';
import pic2e from '../images/event_images/event2-img6.jpg';

const EVENTS = [
  {
    id: 1,
    title: "Men’s Futsal Final – Sports Battle 2024",
    date: "17 Dec 2024",
    location: "Futsal Ground",
    bannerImg: banner1,
    summary: "The final showdown between Management Sciences and Computer Science ended 5–3 in favor of CS. Usman Aziz’s hat‑trick sealed it!",
    facts: [
      ["Participants", "22"],
      ["Teams", "2"],
      ["Final Score", "5 – 3"],
      ["Player of the Match", "Usman Aziz"]
    ],
    gallery: [pic1a, pic1b, pic1c, pic1d, pic1e],
    timeline: [
      ["Opening Goal", "CS struck first in the 3rd minute."],
      ["Equalizer", "MS leveled just before halftime."],
      ["Hat‑trick", "Usman Aziz completed three goals."],
      ["Final Whistle", "Match ends 5–3 to CS."]
    ]
  },
  {
    id: 2,
    title: "Business Idea Summit (HI‑BIS)",
    date: "8 Nov 2023",
    location: "Iqbal Auditorium",
    bannerImg: banner2,
    summary: "HI‑BIS supports and promotes entrepreneurial ideas and startups. The inaugural edition was free, with future editions introducing a nominal registration fee to foster sustainable growth.",
    facts: [
      ["Type", "Expos"],
      ["Date", "8 Nov 2023"],
      ["Venue", "Iqbal Auditorium"],
      ["Dept.", "Mechanical Engineering"]
    ],
    gallery: [pic2a, pic2b, pic2c, pic2d, pic2e],
    timeline: [
      ["Free Entry", "The first edition was completely free for all student teams to participate."],
      ["Judge Panel", "Experts from industry evaluated pitches and provided feedback."],
      ["Workshops", "Pre‑summit workshops helped teams refine their business models."],
      ["Future Editions", "Subsequent events will have a small registration fee for sustainability."]
    ]
  }
];

const Events = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [openAccordions, setOpenAccordions] = useState({
    1: true,
    2: false
  });

  const toggleAccordion = (eventId, idx) => {
    setOpenAccordions(acc => ({
      ...acc,
      [`${eventId}-${idx}`]: !acc[`${eventId}-${idx}`]
    }));
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

      <title>HITEC | UNIGUIDE | EVENTS</title>


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

      {EVENTS.map(event => (
        <React.Fragment key={event.id}>
          {/* Banner */}
          <div
            className="banner"
            style={{ backgroundImage: `url('${event.bannerImg}')` }}
          >
            <div className="hero-text_1">
              <h1>{event.title}</h1>
              <div className="meta">
                <i className="far fa-calendar-alt"></i> {event.date} &nbsp;
                <i className="fas fa-map-marker-alt"></i> {event.location}
              </div>
            </div>
          </div>

          {/* Summary & Facts */}
          <div className="content">
            <div className="summary-facts">
              <div className="card">
                <h2>{event.id === 1 ? "Match Summary" : "Event Overview"}</h2>
                <p>{event.summary}</p>
              </div>
              <div className="card facts">
                <h2>{event.id === 1 ? "Match Facts" : "Summit Facts"}</h2>
                {event.facts.map(([label, value], i) => (
                  <div className="stat" key={i}>
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <section className="gallery">
              {event.gallery.map((src, i) => (
                <img key={i} src={src} alt="" />
              ))}
            </section>

            {/* Timeline Accordion */}
            <section className="accordion">
              {event.timeline.map(([heading, detail], idx) => {
                const isOpen = openAccordions[`${event.id}-${idx}`] ?? (idx === 0);
                return (
                  <div
                    key={idx}
                    className={`ac-item${isOpen ? ' open' : ''}`}
                  >
                    <div
                      className="ac-head"
                      onClick={() => toggleAccordion(event.id, idx)}
                    >
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <h4>{heading}</h4>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                    <div className="ac-content">
                      <p>{detail}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Separator */}
          {event.id === 1 && <div className="event-separator"></div>}
        </React.Fragment>
      ))}

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
export default Events;