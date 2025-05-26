// // src/pages/Dash/Notifications.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";
// import "../../css/dash/notifications.css";

// export default function Notifications() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [personal, setPersonal] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [loadError, setLoadError] = useState(false);
//   const [upcoming, setUpcoming] = useState([]);

//   // 1) Fetch personal notifications
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios.get(
//       `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//     .then(res => {
//       // sort newest first
//       const sorted = res.data.sort(
//         (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPersonal(sorted);
//     })
//     .catch(err => {
//       console.error("Error fetching notifications:", err);
//       setLoadError(true);
//       setPersonal([]);
//     })
//     .finally(() => setLoading(false));

//     // 2) Compute upcoming official calendar events (next 7 days)
//     const now = new Date();
//     const cutoff = new Date(now.getTime() + 7*24*60*60*1000);
//     const upcomingList = [];

//     ["fall","spring","summer"].forEach(sem => {
//       officialCalendar[sem].forEach(evt => {
//         const start = new Date(evt.start);
//         if (start >= now && start <= cutoff) {
//           upcomingList.push({
//             message: `Upcoming: ${evt.title} on ${start.toLocaleDateString()}`,
//             date: start.toLocaleDateString(),
//           });
//         }
//       });
//     });

//     setUpcoming(upcomingList);
//   }, [authLoading, user, token, navigate]);

//   if (authLoading || loading) {
//     return <div className="loader">Loading notifications…</div>;
//   }

//   return (
//     <div className="notifications-page">
//       <h2>Your Notifications</h2>

//       {loadError && (
//         <div className="error-banner">
//           Couldn’t load personal notifications; showing what we have.
//         </div>
//       )}

//       {/* A. Upcoming Official Events */}
//       {upcoming.length > 0 && (
//         <section className="upcoming-official">
//           <h3>University Events in the Next 7 Days</h3>
//           <ul className="notifications-list">
//             {upcoming.map((u,i) => (
//               <li key={i} className="notification-item official">
//                 <span className="notif-icon event">📅</span>
//                 <div className="notif-body">
//                   <p className="notif-msg">{u.message}</p>
//                   <time className="notif-time">{u.date}</time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* B. Personal Notifications */}
//       {personal.length === 0 ? (
//         <p className="empty">No personal notifications found.</p>
//       ) : (
//         <ul className="notifications-list">
//           {personal.map(n => (
//             <li
//               key={n._id}
//               className={`notification-item ${n.isRead ? "" : "unread"}`}
//             >
//               <span className={`notif-icon ${n.type}`}>
//                 {{
//                   announcement: "📢",
//                   assignment:   "📝",
//                   event:        "📅",
//                   reminder:     "⏰"
//                 }[n.type] || "🔔"}
//               </span>
//               <div className="notif-body">
//                 <p className="notif-msg">{n.message}</p>
//                 <time className="notif-time">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </time>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }







// // src/pages/Dash/Notifications.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";  // ensure filename matches
// import "../../css/dash/notifications.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Notifications() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token    = localStorage.getItem("token");

//   const [personal, setPersonal]   = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [loadError, setLoadError] = useState(false);
//   const [upcoming, setUpcoming]   = useState([]);

//   // Fetch personal notifications
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios.get(
//       `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//     .then(res => {
//       // newest first
//       const sorted = res.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPersonal(sorted);
//     })
//     .catch(err => {
//       console.error("Error fetching personal notifications:", err);
//       setLoadError(true);
//       setPersonal([]);
//     })
//     .finally(() => setLoading(false));

//   }, [authLoading, user, token, navigate]);

//   // Compute the single next official calendar event
//   useEffect(() => {
//     const now = new Date();
//     // flatten all semester events
//     const allEvents = ["fall","spring","summer"]
//       .flatMap(sem => officialCalendar[sem]);
//     // sort by start date
//     allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
//     // find the next one that hasn't started yet
//     const next = allEvents.find(evt => new Date(evt.start) >= now);
//     if (next) {
//       setUpcoming([{
//         message: `Upcoming: ${next.title} on ${new Date(next.start).toLocaleDateString()}`,
//         date: new Date(next.start).toLocaleDateString(),
//       }]);
//     } else {
//       setUpcoming([]);
//     }
//   }, []);

//   // show loader until both auth & data are ready
//   if (authLoading || loading) {
//     return <div className="loader">Loading notifications…</div>;
//   }

//   return (
//     <div className="notifications-page">
//       <h2>Notifications</h2>

//       {loadError && (
//         <div className="error-banner">
//           Couldn’t load personal notifications; showing what we have.
//         </div>
//       )}

//       {/* Next Official Event */}
//       {upcoming.length > 0 && (
//         <section className="upcoming-official">
//           <h3>Next University Event</h3>
//           <ul className="notifications-list">
//             {upcoming.map((u, i) => (
//               <li key={i} className="notification-item official">
//                 <span className="notif-icon event">📅</span>
//                 <div className="notif-body">
//                   <p className="notif-msg">{u.message}</p>
//                   <time className="notif-time">{u.date}</time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Personal Notifications */}
//       {personal.length === 0 ? (
//         <p className="empty">No personal notifications found.</p>
//       ) : (
//         <ul className="notifications-list">
//           {personal.map(n => (
//             <li
//               key={n._id}
//               className={`notification-item ${n.isRead ? "" : "unread"}`}
//             >
//               <span className={`notif-icon ${n.type}`}>
//                 {{
//                   announcement: "📢",
//                   assignment:   "📝",
//                   event:        "📅",
//                   reminder:     "⏰"
//                 }[n.type] || "🔔"}
//               </span>
//               <div className="notif-body">
//                 <p className="notif-msg">{n.message}</p>
//                 <time className="notif-time">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </time>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




// // src/pages/Dash/Notifications.jsx

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";
// import "../../css/dash/notifications.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Notifications() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [personal, setPersonal] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [loadError, setLoadError] = useState(false);
//   const [upcoming, setUpcoming] = useState([]);

//   // 1) Fetch personal notifications
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         // newest first
//         const sorted = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setPersonal(sorted);
//       })
//       .catch((err) => {
//         console.error("Error fetching personal notifications:", err);
//         setLoadError(true);
//         setPersonal([]);
//       })
//       .finally(() => setLoading(false));
//   }, [authLoading, user, token, navigate]);

//   // 2) Compute next official event (unchanged)
//   useEffect(() => {
//     const now = new Date();
//     const allEvents = ["fall", "spring", "summer"]
//       .flatMap((sem) => officialCalendar[sem]);
//     allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
//     const next = allEvents.find((evt) => new Date(evt.start) >= now);
//     if (next) {
//       setUpcoming([
//         {
//           message: `Upcoming: ${next.title} on ${new Date(
//             next.start
//           ).toLocaleDateString()}`,
//           date: new Date(next.start).toLocaleDateString(),
//         },
//       ]);
//     }
//   }, []);

//   // 3) Delete a single notification
//   const handleDelete = async (notifId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications/${notifId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPersonal((list) => list.filter((n) => n._id !== notifId));
//     } catch (err) {
//       console.error("Failed to delete notification:", err);
//     }
//   };

//   // 4) Clear all notifications
//   const handleClearAll = async () => {
//     if (!window.confirm("Are you sure you want to clear all notifications?")) {
//       return;
//     }
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPersonal([]);
//     } catch (err) {
//       console.error("Failed to clear all notifications:", err);
//     }
//   };

//   // 5) Loading / error states
//   if (authLoading || loading) {
//     return <div className="loader">Loading notifications…</div>;
//   }

//   return (
//     <div className="notifications-page">
//       <h2>Notifications</h2>

//       {/* Clear All button */}
//       {personal.length > 0 && (
//         <button className="clear-all-btn1" onClick={handleClearAll}>
//           <i className="fas fa-trash-alt"></i> Clear All
//         </button>
//       )}

//       {/* Error banner */}
//       {loadError && (
//         <div className="error-banner">
//           Couldn’t load personal notifications; showing what we have.
//         </div>
//       )}

//       {/* Next Official Event */}
//       {upcoming.length > 0 && (
//         <section className="upcoming-official">
//           <h3>Next University Event</h3>
//           <ul className="notifications-list">
//             {upcoming.map((u, i) => (
//               <li key={i} className="notification-item official">
//                 <span className="notif-icon event">📅</span>
//                 <div className="notif-body">
//                   <p className="notif-msg">{u.message}</p>
//                   <time className="notif-time">{u.date}</time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Personal Notifications */}
//       {personal.length === 0 ? (
//         <p className="empty">No personal notifications found.</p>
//       ) : (
//         <ul className="notifications-list">
//           {personal.map((n) => (
//             <li
//               key={n._id}
//               className={`notification-item ${n.isRead ? "" : "unread"}`}
//             >
//               <span className={`notif-icon ${n.type}`}>
//                 {{
//                   announcement: "📢",
//                   assignment:   "📝",
//                   event:        "📅",
//                   reminder:     "⏰",
//                 }[n.type] || "🔔"}
//               </span>

//               <div className="notif-body">
//                 <p className="notif-msg">{n.message}</p>
//                 <time className="notif-time">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </time>
//               </div>

//               {/* Individual delete button */}
//               <button
//                 className="delete-notif-btn"
//                 onClick={() => handleDelete(n._id)}
//                 aria-label="Delete notification"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState, useCallback } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";
// import "../../css/dash/notifications.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Notifications() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [personal, setPersonal]     = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [loadError, setLoadError]   = useState(false);
//   const [upcoming, setUpcoming]     = useState([]);

//   // helper to fetch & sort your personal notifications
//   const fetchNotifications = useCallback(() => {
//     if (!user?._id || !token) return;

//     setLoading(true);
//     setLoadError(false);

//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => {
//         const sorted = res.data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setPersonal(sorted);
//       })
//       .catch((err) => {
//         console.error("Error fetching personal notifications:", err);
//         setLoadError(true);
//         setPersonal([]);
//       })
//       .finally(() => setLoading(false));
//   }, [user, token]);

//   // 1) Initial load & re-fetch when `notifUpdated` is dispatched
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     // first fetch
//     fetchNotifications();

//     // listen for manual refresh events
//     const onUpdate = () => fetchNotifications();
//     window.addEventListener("notifUpdated", onUpdate);
//     return () => window.removeEventListener("notifUpdated", onUpdate);
//   }, [authLoading, user, token, navigate, fetchNotifications]);

//   // 2) Compute next official event (unchanged)
//   useEffect(() => {
//     const now = new Date();
//     const allEvents = ["fall", "spring", "summer"]
//       .flatMap((sem) => officialCalendar[sem]);
//     allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
//     const next = allEvents.find((evt) => new Date(evt.start) >= now);
//     if (next) {
//       setUpcoming([{
//         message: `Upcoming: ${next.title} on ${new Date(next.start).toLocaleDateString()}`,
//         date:    new Date(next.start).toLocaleDateString(),
//       }]);
//     }
//   }, []);

//   // 3) Delete a single notification
//   const handleDelete = async (notifId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications/${notifId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       // locally remove it (optimistic UI)
//       setPersonal((list) => list.filter((n) => n._id !== notifId));
//     } catch (err) {
//       console.error("Failed to delete notification:", err);
//     }
//   };

//   // 4) Clear all notifications
//   const handleClearAll = async () => {
//     if (!window.confirm("Are you sure you want to clear all notifications?"))
//       return;
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPersonal([]);
//     } catch (err) {
//       console.error("Failed to clear all notifications:", err);
//     }
//   };

//   // 5) Loading / error states
//   if (authLoading || loading) {
//     return <div className="loader">Loading notifications…</div>;
//   }

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | NOTIFICATIONS</title>
//     <div className="notifications-page">
//       <h2>Notifications</h2>

//       {personal.length > 0 && (
//         <button className="clear-all-btn1" onClick={handleClearAll}>
//           <i className="fas fa-trash-alt"></i> Clear All
//         </button>
//       )}

//       {loadError && (
//         <div className="error-banner">
//           Couldn’t load personal notifications; showing what we have.
//         </div>
//       )}

//       {upcoming.length > 0 && (
//         <section className="upcoming-official">
//           <h3>Next University Event</h3>
//           <ul className="notifications-list">
//             {upcoming.map((u, i) => (
//               <li key={i} className="notification-item official">
//                 <span className="notif-icon event">📅</span>
//                 <div className="notif-body">
//                   <p className="notif-msg">{u.message}</p>
//                   <time className="notif-time">{u.date}</time>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {personal.length === 0 ? (
//         <p className="empty">No personal notifications found.</p>
//       ) : (
//         <ul className="notifications-list">
//           {personal.map((n) => (
//             <li
//               key={n._id}
//               className={`notification-item ${n.isRead ? "" : "unread"}`}
//             >
//               <span className={`notif-icon ${n.type}`}>
//                 {{
//                   announcement: "📢",
//                   assignment:   "📝",
//                   event:        "📅",
//                   reminder:     "⏰",
//                 }[n.type] || "🔔"}
//               </span>
//               <div className="notif-body">
//                 <p className="notif-msg">{n.message}</p>
//                 <time className="notif-time">
//                   {new Date(n.createdAt).toLocaleString()}
//                 </time>
//               </div>
//               <button
//                 className="delete-notif-btn"
//                 onClick={() => handleDelete(n._id)}
//                 aria-label="Delete notification"
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     </>
//   );
// }








import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { officialCalendar } from "../../data/OfficialCalender";
import "../../css/dash/notifications.css";
import "../../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Notifications() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [upcoming, setUpcoming] = useState([]);

  // Fetch & sort personal notifications
  const fetchNotifications = useCallback(() => {
    if (!user?._id || !token) return;
    setLoading(true);
    setLoadError(false);

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPersonal(sorted);
      })
      .catch((err) => {
        console.error("Error fetching personal notifications:", err);
        setLoadError(true);
        setPersonal([]);
      })
      .finally(() => setLoading(false));
  }, [user, token]);

  // On mount + when notifUpdated fires
  useEffect(() => {
    if (authLoading) return;
    if (!user?._id || !token) {
      navigate("/login", { replace: true });
      return;
    }
    fetchNotifications();
    window.addEventListener("notifUpdated", fetchNotifications);
    return () => window.removeEventListener("notifUpdated", fetchNotifications);
  }, [authLoading, user, token, navigate, fetchNotifications]);

  // Compute next official event
  useEffect(() => {
    const now = new Date();
    const allEvents = ["fall", "spring", "summer"]
      .flatMap((sem) => officialCalendar[sem]);
    allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
    const next = allEvents.find((evt) => new Date(evt.start) >= now);
    if (next) {
      setUpcoming([{
        message: `Upcoming: ${next.title} on ${new Date(next.start).toLocaleDateString()}`,
        date: new Date(next.start).toLocaleDateString(),
      }]);
    }
  }, []);

  // Delete one
  const handleDelete = async (notifId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications/${notifId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonal((list) => list.filter((n) => n._id !== notifId));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Clear all
  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear all notifications?"))
      return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPersonal([]);
    } catch (err) {
      console.error("Failed to clear all notifications:", err);
    }
  };

  if (authLoading || loading) {
    return <div className="loader">Loading notifications…</div>;
  }

  return (
    <>
      <title>HITEC | UNIGUIDE | NOTIFICATIONS</title>
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

      <div className="notifications-page">
        <h2>Notifications</h2>

        {personal.length > 0 && (
          <button className="clear-all-btn1" onClick={handleClearAll}>
            <i className="fas fa-trash-alt"></i> Clear All
          </button>
        )}

        {loadError && (
          <div className="error-banner">
            Couldn’t load personal notifications; showing what we have.
          </div>
        )}

        {upcoming.length > 0 && (
          <section className="upcoming-official">
            <h3>Next University Event</h3>
            <ul className="notifications-list">
              {upcoming.map((u, i) => (
                <li key={i} className="notification-item official">
                  <span className="notif-icon event">📅</span>
                  <div className="notif-body">
                    <p className="notif-msg">{u.message}</p>
                    <time className="notif-time">{u.date}</time>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {personal.length === 0 ? (
          <p className="empty">No personal notifications found.</p>
        ) : (
          <ul className="notifications-list">
            {personal.map((n) => (
              <li
                key={n._id}
                className={`notification-item ${n.isRead ? "" : "unread"}`}
              >
                <span className={`notif-icon ${n.type}`}>
                  {{
                    announcement: "📢",
                    assignment: "📝",
                    event: "📅",
                    reminder: "⏰",
                  }[n.type] || "🔔"}
                </span>
                <div className="notif-body">
                  <p className="notif-msg">{n.message}</p>
                  <time className="notif-time">
                    {new Date(n.createdAt).toLocaleString()}
                  </time>
                </div>
                <button
                  className="delete-notif-btn"
                  onClick={() => handleDelete(n._id)}
                  aria-label="Delete notification"
                >
                  <i className="fas fa-times"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
