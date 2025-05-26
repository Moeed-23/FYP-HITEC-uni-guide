// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../css/dash/academicschedule.css";

// const AcademicSchedule = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(
//           `${apiUrl}/api/users/${user._id}/academic-schedule`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setSchedule(response.data);
//       } catch (err) {
//         console.error("Error fetching academic schedule:", err);
//         setError("Failed to load academic schedule. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSchedule();
//   }, [user, navigate]);

//   if (loading) return <div>Loading academic schedule...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | DASHBOARD | ACADEMIC_SCHEDULE</title>
//     <div>
//       <h2>Your Academic Schedule</h2>
//       {schedule && schedule.length > 0 ? (
//         schedule.map((item) => (
//           <div key={item._id}>
//             <h4>{item.courseName}</h4>
//             <p>
//               {new Date(item.date).toLocaleDateString()} at {item.time}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No academic schedule found.</p>
//       )}
//     </div>
//     </>
//   );
// };

// export default AcademicSchedule;






// //AcademicSchedule.jsx
// import React, { useEffect, useState } from "react"
// import { useAuth } from "../../context/AuthContext"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import "../../css/dash/academicschedule.css"

// export default function AcademicSchedule() {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   const [schedule, setSchedule] = useState([])
//   const [loading, setLoading]   = useState(true)
//   const [error, setError]       = useState("")
//   const [form, setForm] = useState({
//     courseName: "",
//     date: "",
//     time: ""
//   })
//   const [submitting, setSubmitting] = useState(false)

//   // Fetch schedule on mount
//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const token = localStorage.getItem("token")
//       if (!user?._id || !token) {
//         navigate("/login", { replace: true })
//         return
//       }

//       try {
//         const apiUrl = import.meta.env.VITE_API_URL
//         const resp = await axios.get(
//           `${apiUrl}/api/users/${user._id}/academic-schedule`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         setSchedule(resp.data)
//       } catch (err) {
//         console.error("Error fetching academic schedule:", err)
//         setError("Failed to load academic schedule. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSchedule()
//   }, [user, navigate])

//   // Handle form field changes
//   const handleChange = e => {
//     const { name, value } = e.target
//     setForm(f => ({ ...f, [name]: value }))
//   }

//   // Add new event
//   const handleAdd = async e => {
//     e.preventDefault()
//     if (!form.courseName || !form.date || !form.time) return
//     setSubmitting(true)
//     const token = localStorage.getItem("token")
//     const apiUrl = import.meta.env.VITE_API_URL

//     try {
//       const resp = await axios.post(
//         `${apiUrl}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       // Append the new event to schedule
//       setSchedule(s => [...s, resp.data])
//       setForm({ courseName: "", date: "", time: "" })

//       // If within 48h, also send a reminder
//       const evtDate = new Date(form.date)
//       const now = new Date()
//       if (evtDate - now <= 48*60*60*1000 && evtDate >= now) {
//         const msg = `Reminder: '${form.courseName}' on ${evtDate.toLocaleDateString()} at ${form.time}`
//         axios.post(
//           `${apiUrl}/api/users/${user._id}/notifications`,
//           { message: msg },
//           { headers: { Authorization: `Bearer ${token}` } }
//         ).catch(console.error)
//       }
//     } catch (err) {
//       console.error("Error adding event:", err)
//       setError("Could not add event. Please try again.")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // Delete an event
//   const handleDelete = async id => {
//     const token = localStorage.getItem("token")
//     const apiUrl = import.meta.env.VITE_API_URL
//     try {
//       await axios.delete(
//         `${apiUrl}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       setSchedule(s => s.filter(item => item._id !== id))
//     } catch (err) {
//       console.error("Error deleting event:", err)
//       setError("Could not delete event. Please try again.")
//     }
//   }

//   if (loading) return <div className="loading">Loading academic schedule...</div>
//   if (error)   return <div className="error">{error}</div>

//   return (
//     <div className="schedule-page">
//       <h2>Your Academic Schedule</h2>

//       {/* Add‑Event Form */}
//       <form className="schedule-form" onSubmit={handleAdd}>
//         <input
//           type="text"
//           name="courseName"
//           placeholder="Course Name"
//           value={form.courseName}
//           onChange={handleChange}
//           disabled={submitting}
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           disabled={submitting}
//           required
//         />
//         <input
//           type="time"
//           name="time"
//           value={form.time}
//           onChange={handleChange}
//           disabled={submitting}
//           required
//         />
//         <button type="submit" disabled={submitting}>
//           {submitting ? "Adding…" : "Add Event"}
//         </button>
//       </form>

//       {/* Schedule Table */}
//       {schedule.length > 0 ? (
//         <table className="schedule-table">
//           <thead>
//             <tr>
//               <th>Course</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {schedule.map(item => {
//               // highlight upcoming within 48h
//               const isSoon = new Date(item.date) - new Date() < 48*60*60*1000
//               return (
//                 <tr key={item._id} className={isSoon ? "upcoming" : ""}>
//                   <td>{item.courseName}</td>
//                   <td>{new Date(item.date).toLocaleDateString()}</td>
//                   <td>{item.time}</td>
//                   <td>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(item._id)}
//                     >✕</button>
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       ) : (
//         <p>No academic schedule found.</p>
//       )}
//     </div>
//   )
// }







// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "../../css/dash/academicschedule.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function AcademicSchedule() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [form, setForm]         = useState({ courseName: "", date: "", time: "" });
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login", { replace: true });
//         return;
//       }
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSchedule(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load academic schedule.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSchedule();
//   }, [user, navigate]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(f => ({ ...f, [name]: value }));
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     if (!form.courseName || !form.date || !form.time) return;
//     setSubmitting(true);
//     const token = localStorage.getItem("token");
//     try {
//       const { data: newEvent } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => [...s, newEvent]);
//       setForm({ courseName: "", date: "", time: "" });
//     } catch {
//       setError("Could not add event.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async id => {
//     const token = localStorage.getItem("token");
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => s.filter(evt => evt._id !== id));
//     } catch {
//       setError("Could not delete event.");
//     }
//   };

//   if (loading) return <div className="loader">Loading…</div>;
//   if (error)   return <div className="error-message">{error}</div>;

//   return (
//     <>
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

//       <div className="schedule-page">
//         <h2>Your Academic Schedule</h2>

//         {/* Add‐Event Form */}
//         <form className="schedule-form" onSubmit={handleAdd}>
//           <input
//             name="courseName"
//             placeholder="Course Name"
//             value={form.courseName}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Adding…" : "Add Event"}
//           </button>
//         </form>

//         {/* Events as Cards */}
//         <div className="schedule-cards">
//           {schedule.map(evt => {
//             const isSoon = new Date(evt.date) - Date.now() < 48 * 3600 * 1000;
//             return (
//               <div key={evt._id} className={`schedule-card${isSoon ? " upcoming" : ""}`}>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(evt._id)}
//                   aria-label="Delete event"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//                 <h3 className="course">{evt.courseName}</h3>
//                 <div className="datetime">
//                   <time>{new Date(evt.date).toLocaleDateString()}</time>
//                   <span>{evt.time}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <footer className="landing-footer">
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





// // src/pages/Dash/AcademicSchedule.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";  // fixed path/name
// import "../../css/dash/academicschedule.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function AcademicSchedule() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token    = localStorage.getItem("token");

//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [form, setForm]         = useState({ courseName: "", date: "", time: "" });
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch user’s personal schedule once we know auth state
//   useEffect(() => {
//     if (authLoading) return;           // wait for auth to resolve
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(res => setSchedule(res.data))
//       .catch(() => setError("Failed to load your events."))
//       .finally(() => setLoading(false));
//   }, [authLoading, user, token, navigate]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(f => ({ ...f, [name]: value }));
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     if (!form.courseName || !form.date || !form.time) return;
//     setSubmitting(true);
//     try {
//       const { data: newEvt } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => [...s, newEvt]);
//       setForm({ courseName: "", date: "", time: "" });
//     } catch {
//       setError("Could not add event.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async id => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => s.filter(evt => evt._id !== id));
//     } catch {
//       setError("Could not delete event.");
//     }
//   };

//   // Show loader until auth & data are ready
//   if (authLoading || loading) {
//     return <div className="loader">Loading your schedule…</div>;
//   }
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
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

//       <div className="schedule-page">
//         {/* Official Calendar */}
//         <h2>Official Academic Calendar 2024–25</h2>
//         {["fall", "spring", "summer"].map(sem => (
//           <section key={sem} className="official-section">
//             <h3 className="sem-title">
//               {sem.charAt(0).toUpperCase() + sem.slice(1)} Semester{" "}
//               {sem === "fall" ? "2024" : "2025"}
//             </h3>
//             <div className="official-grid">
//               {officialCalendar[sem].map((evt, i) => (
//                 <div key={i} className="official-card">
//                   <h4>{evt.title}</h4>
//                   <div className="dates">
//                     <time>{new Date(evt.start).toLocaleDateString()}</time>
//                     {evt.end !== evt.start && (
//                       <> – <time>{new Date(evt.end).toLocaleDateString()}</time></>
//                     )}
//                   </div>
//                   {evt.weeks > 0 && (
//                     <div className="weeks">
//                       {evt.weeks} week{evt.weeks > 1 && "s"}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {/* Gazetted Holidays */}
//         <section className="official-section holidays">
//           <h3>Gazetted Holidays 2024–25</h3>
//           <ul className="holiday-list">
//             {officialCalendar.holidays.map((h, i) => (
//               <li key={i}>
//                 <time>{new Date(h.date).toLocaleDateString()}</time> – {h.name}
//                 {h.note && <span className="note"> ({h.note})</span>}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Personal Schedule */}
//         <h2 className="personal-title">My Personal Schedule</h2>

//         <form className="schedule-form" onSubmit={handleAdd}>
//           <input
//             name="courseName"
//             placeholder="Course Name"
//             value={form.courseName}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Adding…" : "Add Event"}
//           </button>
//         </form>

//         <div className="schedule-cards">
//           {schedule.map(evt => {
//             const isSoon = new Date(evt.date) - Date.now() < 48 * 3600 * 1000;
//             return (
//               <div key={evt._id} className={`schedule-card${isSoon ? " upcoming" : ""}`}>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(evt._id)}
//                   aria-label="Delete event"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//                 <h3 className="course">{evt.courseName}</h3>
//                 <div className="datetime">
//                   <time>{new Date(evt.date).toLocaleDateString()}</time>
//                   <span>{evt.time}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <footer className="landing-footer">
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






// // src/pages/Dash/AcademicSchedule.jsx

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";  // correct path/name
// import "../../css/dash/academicschedule.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function AcademicSchedule() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token    = localStorage.getItem("token");

//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [form, setForm]         = useState({ courseName: "", date: "", time: "" });
//   const [submitting, setSubmitting] = useState(false);

//   // 1) Wait for auth, then fetch personal schedule
//   useEffect(() => {
//     if (authLoading) return;            // wait for AuthContext to settle
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios.get(
//       `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//     .then(res => setSchedule(res.data))
//     .catch(() => setError("Failed to load your events."))
//     .finally(() => setLoading(false));
//   }, [authLoading, user, token, navigate]);

//   // 2) Handle form inputs
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(f => ({ ...f, [name]: value }));
//   };

//   // 3) Add a new personal event
//   const handleAdd = async e => {
//     e.preventDefault();
//     if (!form.courseName || !form.date || !form.time) return;
//     setSubmitting(true);
//     try {
//       const { data: newEvt } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // update UI
//       setSchedule(s => [...s, newEvt]);
//       setForm({ courseName: "", date: "", time: "" });

//       // optional: send yourself a notification so you see it on the Notifications page
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         {
//           message: `Added: "${newEvt.courseName}" on ${new Date(newEvt.date).toLocaleDateString()} at ${newEvt.time}`,
//           type: "reminder"
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch {
//       setError("Could not add event.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // 4) Delete an event
//   const handleDelete = async id => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => s.filter(evt => evt._id !== id));
//     } catch {
//       setError("Could not delete event.");
//     }
//   };

//   // 5) Show loader / errors
//   if (authLoading || loading) {
//     return <div className="loader">Loading your schedule…</div>;
//   }
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       {/* Navbar */}
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

//       <div className="schedule-page">
//         {/* Official Academic Calendar */}
//         <h2>Official Academic Calendar 2024 – 25</h2>
//         {["fall","spring","summer"].map(sem => (
//           <section key={sem} className="official-section">
//             <h3 className="sem-title">
//               {sem[0].toUpperCase()+sem.slice(1)} Semester {sem==="fall"?"2024":"2025"}
//             </h3>
//             <div className="official-grid">
//               {officialCalendar[sem].map((evt,i) => (
//                 <div key={i} className="official-card">
//                   <h4>{evt.title}</h4>
//                   <div className="dates">
//                     <time>{new Date(evt.start).toLocaleDateString()}</time>
//                     {evt.end !== evt.start && <> – <time>{new Date(evt.end).toLocaleDateString()}</time></>}
//                   </div>
//                   {evt.weeks > 0 && (
//                     <div className="weeks">{evt.weeks} week{evt.weeks>1?"s":""}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {/* Gazetted Holidays */}
//         <section className="official-section holidays">
//           <h3>Gazetted Holidays 2024 – 25</h3>
//           <ul className="holiday-list">
//             {officialCalendar.holidays.map((h,i) => (
//               <li key={i}>
//                 <time>{new Date(h.date).toLocaleDateString()}</time> – {h.name}
//                 {h.note && <span className="note"> ({h.note})</span>}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Personal Schedule */}
//         <h2 className="personal-title">Reminders</h2>

//         <form className="schedule-form" onSubmit={handleAdd}>
//           <input
//             name="courseName"
//             placeholder="Course Name"
//             value={form.courseName}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Adding…" : "Add Event"}
//           </button>
//         </form>

//         <div className="schedule-cards">
//           {schedule.map(evt => {
//             const isSoon = new Date(evt.date) - Date.now() < 48*3600*1000;
//             return (
//               <div key={evt._id} className={`schedule-card${isSoon?" upcoming":""}`}>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(evt._id)}
//                   aria-label="Delete event"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//                 <h3 className="course">{evt.courseName}</h3>
//                 <div className="datetime">
//                   <time>{new Date(evt.date).toLocaleDateString()}</time>
//                   <span>{evt.time}</span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//               <i className="fab fa-facebook-f" />
//             </a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//               <i className="fab fa-instagram" />
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//               <i className="fab fa-linkedin-in" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }


// // src/pages/Dash/AcademicSchedule.jsx

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender"; // exact filename
// import "../../css/dash/academicschedule.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function AcademicSchedule() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token    = localStorage.getItem("token");

//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [form, setForm]         = useState({
//     reminder: "",
//     date:     "",
//     time:     ""
//   });
//   const [submitting, setSubmitting] = useState(false);

//   // 1) Fetch initial data
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     axios.get(
//       `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//     .then(res => setSchedule(res.data))
//     .catch(() => setError("Failed to load your reminders."))
//     .finally(() => setLoading(false));
//   }, [authLoading, user, token, navigate]);

//   // 2) Form handlers
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(f => ({ ...f, [name]: value }));
//   };

//   const handleAdd = async e => {
//     e.preventDefault();
//     if (!form.reminder || !form.date) return;
//     setSubmitting(true);

//     try {
//       const { data: newEntry } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSchedule(s => [...s, newEntry]);
//       setForm({ reminder: "", date: "", time: "" });

//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         {
//           message: `Reminder set: "${newEntry.reminder}" on ${new Date(newEntry.date).toLocaleDateString()}${newEntry.time ? " at " + newEntry.time : ""}`,
//           type: "reminder"
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("Add reminder failed:", err);
//       setError("Could not add reminder.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async id => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule(s => s.filter(evt => evt._id !== id));
//     } catch (err) {
//       console.error("Delete reminder failed:", err);
//       setError("Could not delete reminder.");
//     }
//   };

//   // 3) Loading & error
//   if (authLoading || loading) {
//     return <div className="loader">Loading your reminders…</div>;
//   }
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       {/* Navbar */}
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

//       <div className="schedule-page">
//         {/* Official Calendar */}
//         <h2>Official Academic Calendar 2024–25</h2>
//         {["fall","spring","summer"].map(sem => (
//           <section key={sem} className="official-section">
//             <h3 className="sem-title">
//               {sem[0].toUpperCase()+sem.slice(1)} Semester {sem==="fall"?"2024":"2025"}
//             </h3>
//             <div className="official-grid">
//               {officialCalendar[sem].map((evt,i) => (
//                 <div key={i} className="official-card">
//                   <h4>{evt.title}</h4>
//                   <div className="dates">
//                     <time>{new Date(evt.start).toLocaleDateString()}</time>
//                     {evt.end !== evt.start && <> – <time>{new Date(evt.end).toLocaleDateString()}</time></>}
//                   </div>
//                   {evt.weeks > 0 && (
//                     <div className="weeks">{evt.weeks} week{evt.weeks>1?"s":""}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         <section className="official-section holidays">
//           <h3>Gazetted Holidays 2024–25</h3>
//           <ul className="holiday-list">
//             {officialCalendar.holidays.map((h,i) => (
//               <li key={i}>
//                 <time>{new Date(h.date).toLocaleDateString()}</time> – {h.name}
//                 {h.note && <span className="note"> ({h.note})</span>}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Personal Reminders */}
//         <h2 className="personal-title">Reminders</h2>

//         <form className="schedule-form" onSubmit={handleAdd}>
//           <textarea
//             name="reminder"
//             rows="3"
//             placeholder="Enter reminder details…"
//             value={form.reminder}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />

//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             disabled={submitting}
//           />

//           <button type="submit" disabled={submitting}>
//             {submitting ? "Adding…" : "Add Reminder"}
//           </button>
//         </form>

//         {/* Reminder Cards */}
//         <div className="schedule-cards">
//           {schedule.map(evt => {
//             const isSoon = new Date(evt.date) - Date.now() < 48*3600*1000;
//             return (
//               <div key={evt._id} className={`schedule-card${isSoon?" upcoming":""}`}>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(evt._id)}
//                   aria-label="Delete reminder"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//                 <p className="reminder-text">{evt.reminder}</p>
//                 <div className="datetime">
//                   <time>{new Date(evt.date).toLocaleDateString()}</time>
//                   {evt.time && <span> at {evt.time}</span>}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"/></a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"/></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts"><i className="fab fa-linkedin-in"/></a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////


// // src/pages/Dash/AcademicSchedule.jsx
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { officialCalendar } from "../../data/OfficialCalender";
// import "../../css/dash/academicschedule.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function AcademicSchedule() {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [schedule, setSchedule] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({ reminder: "", date: "", time: "" });
//   const [submitting, setSubmitting] = useState(false);

//   // 1) Fetch initial reminders
//   useEffect(() => {
//     if (authLoading) return;
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }
//     axios
//       .get(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => setSchedule(res.data))
//       .catch(() => setError("Failed to load your reminders."))
//       .finally(() => setLoading(false));
//   }, [authLoading, user, token, navigate]);

//   // 2) Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };
//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!form.reminder || !form.date) return;
//     setSubmitting(true);

//     try {
//       const { data: newEntry } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule((s) => [...s, newEntry]);
//       setForm({ reminder: "", date: "", time: "" });

//       // Also create an initial notification
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//         {
//           message: `Reminder set: "${newEntry.reminder}" on ${new Date(
//             newEntry.date
//           ).toLocaleDateString()}${newEntry.time ? " at " + newEntry.time : ""}`,
//           type: "reminder",
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error("Add reminder failed:", err);
//       setError("Could not add reminder.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSchedule((s) => s.filter((evt) => evt._id !== id));
//     } catch (err) {
//       console.error("Delete reminder failed:", err);
//       setError("Could not delete reminder.");
//     }
//   };

//   // 3) Schedule browser + server notifications
//   useEffect(() => {
//     if (Notification.permission !== "granted") return;
//     const now = Date.now();

//     schedule.forEach((evt) => {
//       // Build the target Date
//       const [y, m, d] = evt.date.split("-").map(Number);
//       let target = new Date(y, m - 1, d);
//       if (evt.time) {
//         const [hh, mm] = evt.time.split(":").map(Number);
//         target.setHours(hh, mm, 0, 0);
//       }

//       // Helper: schedule one notification
//       const scheduleOne = (timeMs, label) => {
//         const delay = timeMs - now;
//         if (delay <= 0 || delay > 0x7fffffff) return;
//         setTimeout(async () => {
//           // 1) Show browser notification
//           new Notification(label, { body: evt.reminder });

//           // 2) Push to server so Notifications.jsx will pick it up
//           try {
//             await axios.post(
//               `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
//               { message: `${label}: ${evt.reminder}`, type: "reminder" },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//           } catch (e) {
//             console.error("Push-server-notif failed:", e);
//           }
//         }, delay);
//       };

//       // 3 days before
//       scheduleOne(target.getTime() - 3 * 24 * 60 * 60 * 1000, "In 3 days");
//       // 1 day before
//       scheduleOne(target.getTime() - 1 * 24 * 60 * 60 * 1000, "Tomorrow");
//       // if they picked a time, also:
//       if (evt.time) {
//         scheduleOne(target.getTime() - 3 * 60 * 60 * 1000, "In 3 hours");
//         scheduleOne(target.getTime() - 30 * 60 * 1000, "In 30 minutes");
//         scheduleOne(target.getTime() - 5 * 60 * 1000, "In 5 minutes");
//       }
//       // At the moment itself
//       scheduleOne(target.getTime(), "Now");
//     });
//   }, [schedule, user, token]);

//   const [showScroll, setShowScroll] = useState(false);
//   useEffect(() => {

//     // show scroll-to-top button after scrolling down 200px
//     const handleScroll = () => setShowScroll(window.scrollY > 200);
//     window.addEventListener('scroll', handleScroll);

//   }, []);

//   // 4) Render
//   if (authLoading || loading) {
//     return <div className="loader">Loading your reminders…</div>;
//   }
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | ACADEMIC_SCHEDULE</title>
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

//       <div className="schedule-page">
//         <h2>Official Academic Calendar 2024–25</h2>
//         {["fall", "spring", "summer"].map((sem) => (
//           <section key={sem} className="official-section">
//             <h3 className="sem-title">
//               {sem[0].toUpperCase() + sem.slice(1)} Semester{" "}
//               {sem === "fall" ? "2024" : "2025"}
//             </h3>
//             <div className="official-grid">
//               {officialCalendar[sem].map((evt, i) => (
//                 <div key={i} className="official-card">
//                   <h4>{evt.title}</h4>
//                   <div className="dates">
//                     <time>{new Date(evt.start).toLocaleDateString()}</time>
//                     {evt.end !== evt.start && (
//                       <>
//                         {" "}
//                         – <time>{new Date(evt.end).toLocaleDateString()}</time>
//                       </>
//                     )}
//                   </div>
//                   {evt.weeks > 0 && (
//                     <div className="weeks">
//                       {evt.weeks} week{evt.weeks > 1 ? "s" : ""}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         <section className="official-section holidays">
//           <h3>Gazetted Holidays 2024–25</h3>
//           <ul className="holiday-list">
//             {officialCalendar.holidays.map((h, i) => (
//               <li key={i}>
//                 <time>{new Date(h.date).toLocaleDateString()}</time> – {h.name}
//                 {h.note && <span className="note"> ({h.note})</span>}
//               </li>
//             ))}
//           </ul>
//         </section>

//         <h2 className="personal-title">Reminders</h2>
//         <form className="schedule-form" onSubmit={handleAdd}>
//           <textarea
//             name="reminder"
//             rows="3"
//             placeholder="Enter reminder details…"
//             value={form.reminder}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             disabled={submitting}
//             required
//           />
//           <input
//             type="time"
//             name="time"
//             value={form.time}
//             onChange={handleChange}
//             disabled={submitting}
//           />
//           <button type="submit" disabled={submitting}>
//             {submitting ? "Adding…" : "Add Reminder"}
//           </button>
//         </form>

//         <div className="schedule-cards">
//           {schedule.map((evt) => {
//             const isSoon =
//               new Date(evt.date).getTime() - Date.now() <
//               48 * 3600 * 1000;
//             return (
//               <div
//                 key={evt._id}
//                 className={`schedule-card${isSoon ? " upcoming" : ""}`}
//               >
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(evt._id)}
//                   aria-label="Delete reminder"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//                 <p className="reminder-text">{evt.reminder}</p>
//                 <div className="datetime">
//                   <time>{new Date(evt.date).toLocaleDateString()}</time>
//                   {evt.time && <span> at {evt.time}</span>}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ===== SCROLL-TO-TOP BUTTON ===== */}
//       {showScroll && (
//         <button
//           id="scrollTopBtn"
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <i className="fas fa-chevron-up" />
//         </button>
//       )}

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/">
//               <i className="fab fa-facebook-f" />
//             </a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en">
//               <i className="fab fa-instagram" />
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts">
//               <i className="fab fa-linkedin-in" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }




// src/pages/Dash/AcademicSchedule.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { officialCalendar } from "../../data/OfficialCalender";
import "../../css/dash/academicschedule.css";
import "../../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AcademicSchedule() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ reminder: "", date: "", time: "" });
  const [submitting, setSubmitting] = useState(false);

  // store timer IDs so we can clear them when schedule changes
  const timersRef = useRef([]);

  // 1) Load saved reminders
  useEffect(() => {
    if (authLoading) return;
    if (!user?._id || !token) {
      navigate("/login", { replace: true });
      return;
    }

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(res => setSchedule(res.data))
      .catch(() => setError("Failed to load your reminders."))
      .finally(() => setLoading(false));
  }, [authLoading, user, token, navigate]);

  // 2) Ask for notification permission once
  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  // 3) Schedule all alarms whenever `schedule` changes
  const scheduleAllNotifications = useCallback(() => {
    // clear any existing timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (Notification.permission !== "granted") return;
    const now = Date.now();

    schedule.forEach(evt => {
      // build exact timestamp from date + time (or midnight if no time)
      const iso = `${evt.date}T${(evt.time || "00:00")}:00`;
      const targetMs = Date.parse(iso);
      if (isNaN(targetMs)) return;

      // helper to schedule one notification
      const scheduleOne = (atMs, label, persist = false) => {
        const delay = atMs - now;
        if (delay <= 0 || delay > 0x7fffffff) return;
        const id = setTimeout(async () => {
          // browser toast
          new Notification(label, { body: evt.reminder });

          // only persist the “Now” alarm
          if (persist) {
            try {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
                { message: `${label}: ${evt.reminder}`, type: "reminder" },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              window.dispatchEvent(new Event("notifUpdated"));
            } catch (e) {
              console.error("Push-server-notif failed:", e);
            }
          }
        }, delay);

        timersRef.current.push(id);
      };

      // schedule interim browser‐only alerts
      scheduleOne(targetMs - 3 * 24 * 3600 * 1000, "3 days left");
      scheduleOne(targetMs - 1 * 24 * 3600 * 1000, "1 day left");

      if (evt.time) {
        scheduleOne(targetMs - 3 * 3600 * 1000, "3 hours left");
        scheduleOne(targetMs - 1 * 3600 * 1000, "1 hour left");
        scheduleOne(targetMs - 30 * 60 * 1000, "30 minutes left");
        scheduleOne(targetMs - 5 * 60 * 1000, "5 minutes left");
      }

      // final “Now” alert (browser + server persist)
      scheduleOne(targetMs, "Now", true);
    });
  }, [schedule, user, token]);

  useEffect(() => {
    scheduleAllNotifications();
    return () => timersRef.current.forEach(clearTimeout);
  }, [scheduleAllNotifications]);

  // 4) Form handlers (plain JS, no TS types)
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.reminder || !form.date) return;
    setSubmitting(true);

    try {
      const { data: newEntry } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSchedule(s => [...s, newEntry]);
      setForm({ reminder: "", date: "", time: "" });

      // push an immediate “set” notification
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/notifications`,
        {
          message: `Reminder set: "${newEntry.reminder}" on ${new Date(
            newEntry.date + "T" + (newEntry.time || "00:00") + ":00"
          ).toLocaleString()}`,
          type: "reminder",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.dispatchEvent(new Event("notifUpdated"));
    } catch {
      setError("Could not add reminder.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}/academic-schedule/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSchedule(s => s.filter(evt => evt._id !== id));
    } catch {
      setError("Could not delete reminder.");
    }
  }

  // 5) Scroll‐to‐top
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (authLoading || loading) {
    return <div className="loader">Loading your reminders…</div>;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }


  return (
    <>
      <title>HITEC | UNIGUIDE | ACADEMIC_SCHEDULE</title>
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

      <div className="schedule-page">
        <h2>Official Academic Calendar 2024–25</h2>
        {["fall", "spring", "summer"].map((sem) => (
          <section key={sem} className="official-section">
            <h3 className="sem-title">
              {sem[0].toUpperCase() + sem.slice(1)} Semester{" "}
              {sem === "fall" ? "2024" : "2025"}
            </h3>
            <div className="official-grid">
              {officialCalendar[sem].map((evt, i) => (
                <div key={i} className="official-card">
                  <h4>{evt.title}</h4>
                  <div className="dates">
                    <time>{new Date(evt.start).toLocaleDateString()}</time>
                    {evt.end !== evt.start && (
                      <> – <time>{new Date(evt.end).toLocaleDateString()}</time></>
                    )}
                  </div>
                  {evt.weeks > 0 && (
                    <div className="weeks">
                      {evt.weeks} week{evt.weeks > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="official-section holidays">
          <h3>Gazetted Holidays 2024–25</h3>
          <ul className="holiday-list">
            {officialCalendar.holidays.map((h, i) => (
              <li key={i}>
                <time>{new Date(h.date).toLocaleDateString()}</time> – {h.name}
                {h.note && <span className="note"> ({h.note})</span>}
              </li>
            ))}
          </ul>
        </section>

        <h2 className="personal-title">Reminders</h2>
        <form className="schedule-form" onSubmit={handleAdd}>
          <textarea
            name="reminder"
            rows="3"
            placeholder="Enter reminder details…"
            value={form.reminder}
            onChange={handleChange}
            disabled={submitting}
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            disabled={submitting}
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            disabled={submitting}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Adding…" : "Add Reminder"}
          </button>
        </form>

        <div className="schedule-cards">
          {schedule.map((evt) => {
            const isSoon =
              new Date(evt.date).getTime() - Date.now() < 48 * 3600 * 1000;
            return (
              <div
                key={evt._id}
                className={`schedule-card${isSoon ? " upcoming" : ""}`}
              >
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(evt._id)}
                  aria-label="Delete reminder"
                >
                  <i className="fas fa-times" />
                </button>
                <p className="reminder-text">{evt.reminder}</p>
                <div className="datetime">
                  <time>{new Date(evt.date).toLocaleDateString()}</time>
                  {evt.time && <span> at {evt.time}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {showScroll && (
          <button
            id="scrollTopBtn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <i className="fas fa-chevron-up" />
          </button>
        )}
      </div>

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
