// // src/pages/Dash/SavedQuestions.jsx
// import  { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";   // adjust if needed
// import "../../css/dash/savedquestions.css";
// import "../../css/theme.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function SavedQuestions() {
//   const { user } = useAuth();
//   const token    = localStorage.getItem("token");
//   const [saved, setSaved]     = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState("");

//   useEffect(() => {
//     if (!user?._id || !token) return;
//     (async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/users/${user._id}/saved-questions`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSaved(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load your questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user, token]);

//   if (loading) {
//     return <div className="loader">Loading your saved questions…</div>;
//   }

//   if (error) {
//     return <p className="error-message">{error}</p>;
//   }

//   if (saved.length === 0) {
//     return <p className="no-results">You haven’t asked any questions yet.</p>;
//   }

//   return (
//     <>
//      <title>HITEC | UNIGUIDE | DASHBOARD | SAVED QUESTIONS</title>
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

//     <div className="saved-questions-page">
//       <h2>Saved Questions</h2>
//       <div className="saved-questions-grid">
//         {saved.map((q) => (
//           <div className="saved-card" key={q._id}>
//             <div className="card-icon">
//               <i className="fas fa-question-circle" />
//             </div>
//             <div className="card-content">
//               <time className="card-date">
//                 {new Date(q.createdAt).toLocaleString()}
//               </time>
//               <div className="qa">
//                 <p><strong>Q:</strong> {q.question}</p>
//                 <p><strong>A:</strong> {q.answer}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <footer className="landing-footer">
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




import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../css/dash/savedquestions.css";
import "../../css/theme.css";
import "../../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function SavedQuestions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = `${import.meta.env.VITE_API_URL}/api/users/${user?._id}/saved-questions`;

  // Fetch on mount
  useEffect(() => {
    if (!user?._id || !token) return;

    (async () => {
      const baseUrl = `${import.meta.env.VITE_API_URL}/api/users/${user._id}/saved-questions`;
      try {
        const { data } = await axios.get(baseUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSaved(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your questions. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, token]);

  // Delete one question
  const handleDelete = async (qid) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await axios.delete(`${baseUrl}/${qid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaved((prev) => prev.filter((q) => q._id !== qid));
    } catch (err) {
      console.error(err);
      alert("Couldn’t delete. Try again.");
    }
  };

  // Clear all
  const handleClearAll = async () => {
    if (!window.confirm("Clear all saved questions?")) return;
    try {
      await axios.delete(baseUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaved([]);
    } catch (err) {
      console.error(err);
      alert("Couldn’t clear. Try again.");
    }
  };
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  if (loading) return <div className="loader">Loading your saved questions…</div>;
  if (error) return <p className="error-message">{error}</p>;
  if (!saved.length)
    return <p className="no-results">You haven’t asked any questions yet.</p>;

  return (
    <>
      <title>HITEC | UNIGUIDE | RECENT_QUESTIONS</title>

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

      {/* user chat history*/}
      <div className="saved-questions-page">
        <div className="sq-header">
          <h2>Recent Chats</h2>
          <button className="clear-all-btn" onClick={handleClearAll}>
            <i className="fas fa-trash-alt" /> Clear All
          </button>
        </div>

        <div className="saved-questions-grid">
          {saved.map((q) => (
            <div className="saved-card" key={q._id}>
              <button
                className="delete-btn"
                onClick={() => handleDelete(q._id)}
                aria-label="Delete question"
              >
                <i className="fas fa-times" />
              </button>

              <div className="card-icon">
                <i className="fas fa-question-circle" />
              </div>
              <div className="card-content">
                <time className="card-date">
                  {new Date(q.createdAt).toLocaleString()}
                </time>
                <div className="qa">
                  <p><strong>Q:</strong> {q.question}</p>
                  <p><strong>A:</strong> {q.answer}</p>
                </div>
              </div>
            </div>
          ))}
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


      <footer className="landing-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} HITEC University. All rights reserved.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
