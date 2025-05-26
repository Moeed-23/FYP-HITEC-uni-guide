// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/alumni.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Assuming you will move your CSS to a separate file for this component

// const Alumni = () => {
//   return (
//     <>
//       <title>HITEC | UNIGUIDE | ALUMNI</title>
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
//       <div>
//         <section className="landing-hero">
//           <h1 className="hero-title">Student and Alumni Networking</h1>
//           <p className="hero-description">Connecting students with alumni for mentorship, collaboration, and opportunities.</p>
//           <a href="#join" className="cta-button">Join the Network</a>
//         </section>

//         <section className="landing-section" id="features">
//           <h2 className="section-title">Why Network with Alumni?</h2>
//           <div className="feature-cards">
//             <div className="feature-card">
//               <h3 className="feature-card-title">Mentorship Opportunities</h3>
//               <p className="feature-card-description">Get valuable advice and guidance on career development from experienced alumni.</p>
//             </div>
//             <div className="feature-card">
//               <h3 className="feature-card-title">Collaboration on Projects</h3>
//               <p className="feature-card-description">Work together on exciting projects with alumni from diverse fields.</p>
//             </div>
//             <div className="feature-card">
//               <h3 className="feature-card-title">Networking for Job Opportunities</h3>
//               <p className="feature-card-description">Build your professional network and find job openings through alumni connections.</p>
//             </div>
//           </div>
//         </section>

//         <section className="landing-section" id="alumni">
//           <h2 className="section-title">Meet Our Alumni</h2>
//           <p className="section-description">Our alumni are not just successful professionals; they are mentors, collaborators, and a valuable part of the Uniguide community. Here are a few of our distinguished alumni who are helping shape the future of various industries:</p>

//           <div className="alumni-cards">
//             <div className="alumni-card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQca6sAq-Xpg5Dw2oeALjVYQIfLP7l7JLpqbw&s" alt="John Doe" className="alumni-photo" />
//               <h3 className="alumni-name">M.Ahmad</h3>
//               <p className="alumni-job-title">Software Engineer at TechCorp</p>
//               <p className="alumni-description">John has over 10 years of experience in software engineering and currently leads a team at TechCorp, where they build innovative solutions to improve technology infrastructure.</p>
//             </div>
//             <div className="alumni-card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVMmnITUcvL9I9uyLwaWzttwUBNo2UxLQCcw&s" alt="Hira Khan" className="alumni-photo" />
//               <h3 className="alumni-name">Hira Khan</h3>
//               <p className="alumni-job-title">Data Scientist at DataWave</p>
//               <p className="alumni-description">Hira specializes in machine learning and big data analytics. As a data scientist at DataWave, she helps businesses make data-driven decisions.</p>
//             </div>
//             <div className="alumni-card">
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlnapa_okcX2WDOh-ypMm_1YPY1WKMeYXv-LPx3-RaJJd8I7kLg5bCyYpriE412J7hFlY&usqp=CAU" alt="Amna Tahir" className="alumni-photo" />
//               <h3 className="alumni-name">Amna Tahir</h3>
//               <p className="alumni-job-title">Product Manager at InnovateX</p>
//               <p className="alumni-description">Amna Tahir is a seasoned product manager at InnovateX, where she drives product development from ideation to launch.</p>
//             </div>
//           </div>
//         </section>

//         <section className="landing-section" id="join">
//           <h2 className="section-title">Ready to Join?</h2>
//           <p className="section-description">Become a part of our growing community of students and alumni. Networking is the key to unlocking opportunities, and we want you to connect with the right people who can help you achieve your goals.</p>
//           <br />
//           <a href="/signup" className="cta-button cta-signup">Sign Up Now</a>
//         </section>

//         <footer className="landing-footer">
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

// export default Alumni;



//////////////////////////////////////////////////////////////



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/alumni.css";
import "../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CountUp from 'react-countup';

import photo1 from '../images/alumni_images/successStoryPhoto1.jpg';
import photo2 from '../images/alumni_images/successStoryPhoto2.jpg';
import photo3 from '../images/alumni_images/successStoryPhoto3.jpg';

const slideData = [
  {
    imgSrc: photo1,
    alt: 'Muhammad Mudassar Shahbaz',
    name: 'Muhammad Mudassar Shahbaz',
    role: 'Co‑Founder, Torinex Consulting Engineers',
    text: `After graduating with a BSc in Mechanical Engineering from HITEC in June 2017, I moved to Australia in February 2018. Initially employed as a construction laborer in a residential tower project in Sydney, I transitioned to an engineering role within the same company when they recognized my capabilities extended beyond mere laboring tasks. During my initial year, I made valuable connections which led me to freelance engineering work and subcontracting for my former employer. This enabled me to make more valuable contacts. Collaborating with a former manager, Jim, we established Torinex Consulting Engineers in 2019, with Jim as the owner-director and myself as a shareholder Associate.`
  },
  {
    imgSrc: photo2,
    alt: 'Engr. Bilal Ahmed',
    name: 'Engr. Bilal Ahmed',
    role: 'Electrical Engineer, Jacobs',
    text: `I was part of HITEC University from 2015–2019, completing my BS in Electrical Engineering (Power) with distinction. After graduation, I worked as a research assistant with Dr. Kashif Imdad for six months at HITEC. Then I pursued a one‑year Master’s in Energy Management in Ireland. Post‑graduation I joined as a Junior Electrical Engineer, gained valuable Irish industry experience, and later moved to Jacobs on their two‑year Graduate Electrical Engineer program. I completed that in 2023 and was promoted to Electrical Engineer. I’m still with Jacobs, currently working on a major pharmaceutical project.`
  },
  {
    imgSrc: photo3,
    alt: 'Muhammad Haseebullah Khan',
    name: 'Muhammad Haseebullah Khan',
    role: 'MS Researcher, Electrical Engineering',
    text: `We are proud to announce that our talented student, Muhammad Haseebullah Khan, has successfully presented his research paper titled "LTI Model Order Reduction Using Wild Horse Optimization Algorithm" at the 21st International Conference on Frontiers of Information Technology. This remarkable achievement is a testament to his hard work, dedication, and innovative approach to solving complex engineering problems. Conducted under the expert guidance of Dr. Muhammad Ali Mughal at HITEC’s Electrical Engineering Department, this milestone not only celebrates Haseebullah but also reflects HITEC University’s commitment to academic excellence and impactful research. We congratulate him on this outstanding achievement and wish him many more successes ahead!`
  }
];

const AlumniNetwork = () => {
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
  const [current, setCurrent] = useState(0);
  const total = slideData.length;

  const handlePrev = () => setCurrent((current - 1 + total) % total);
  const handleNext = () => setCurrent((current + 1) % total);

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  return (
    <>
      <title>HITEC | UNIGUIDE | ALUMNI</title>
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

      <section className="hero">
        <div className="hero-text">
          <h2>From HITEC to the World!</h2>
          <p>Explore the inspiring journeys of our alumni & envision your path to success.</p>
          <a className="btn" href="#spotlight">See Spotlight</a>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>
              <CountUp start={0} end={3500} duration={2.5} suffix="+" separator="," />
            </h3>
            <p>Active Alumni</p>
          </div>
          <div className="stat-card">
            <h3>
              <CountUp start={0} end={45} duration={2} />
            </h3>
            <p>Countries</p>
          </div>
          <div className="stat-card">
            <h3>
              <CountUp start={0} end={30} duration={2} />
            </h3>
            <p>Industry Sectors</p>
          </div>
          <div className="stat-card">
            <h3>
              <CountUp start={0} end={12} duration={1.5} />
            </h3>
            <p>Associations</p>
          </div>
        </div>
      </section>

      <section className="spotlight" id="spotlight">
        <div className="spotlight-header">
          <h2>Alumni Success Stories</h2>
          <p>Read how HITEC grads are making waves around the world.</p>
        </div>
        <div
          className="slides"
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {slideData.map((slide, i) => (
            <div className="slide" key={i}>
              <img src={slide.imgSrc} alt={slide.alt} />
              <div className="info">
                <p className="name">{slide.name}</p>
                <p className="role">{slide.role}</p>
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button onClick={handlePrev}><i className="fas fa-chevron-left" /></button>
          <button onClick={handleNext}><i className="fas fa-chevron-right" /></button>
        </div>
      </section>

      {/* Feedback Button */}
      <button
        className="feedback-btn"
        onClick={() => setFeedbackOpen(true)}
      >
        <i className="fas fa-comment-alt" /> Feedback
      </button>

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

      {/* ===== SCROLL-TO-TOP BUTTON =====   CSS file studentresource.css*/}
      {showScroll && (
        <button
          id="scrollTopBtn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fas fa-chevron-up" />
        </button>
      )}


      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

          <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </footer>
    </>
  );
};

export default AlumniNetwork;
