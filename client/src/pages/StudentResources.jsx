// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/feedback.css";
// import API from "../api";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Feedback = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Feedback submitted successfully:", result);
//         alert("Thank you for your feedback!");
//         setFormData({ name: "", email: "", rating: "5", comments: "" });
//       } else {
//         const errorData = await response.json();
//         console.error("Feedback submission failed:", errorData);
//         alert("Failed to submit feedback. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | FEEDBACK</title>

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
//       <div className="feedback-container">
//         <section className="feedback-intro">
//           <h1>Feedback</h1>
//           <p>
//             We value your input! Share your thoughts and help us improve
//             UniGuide Chatbot.
//           </p>
//         </section>

//         <section className="feedback-form-container">
//           <h2>Submit Your Feedback</h2>
//           <form onSubmit={handleSubmit} className="feedback-form">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />

//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <label htmlFor="rating">Rate Your Experience:</label>
//             <select
//               id="rating"
//               name="rating"
//               value={formData.rating}
//               onChange={handleChange}
//             >
//               <option value="5">Excellent</option>
//               <option value="4">Good</option>
//               <option value="3">Average</option>
//               <option value="2">Poor</option>
//               <option value="1">Very Poor</option>
//             </select>

//             <label htmlFor="comments">Comments:</label>
//             <textarea
//               id="comments"
//               name="comments"
//               rows="5"
//               placeholder="Share your thoughts..."
//               value={formData.comments}
//               onChange={handleChange}
//               required
//             />

//             <button type="submit">Submit Feedback</button>
//           </form>
//         </section>

//         <footer className="feedback-footer">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="feedback-social-icons">
//             <a href="https://www.facebook.com/hitecuni/">
//               <i className="fab fa-facebook-f"></i>
//             </a>

//             <a href="https://www.instagram.com/hitecuni/?hl=en">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Feedback;


////////////////////////////////////////////////////////////////////////////////



// import React from 'react';
// import { Link } from "react-router-dom";
// import '../css/studentresources.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilePdf, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// const forms = [
//   { title: 'BEGUM Razia Sultan Scholarship Form', link: '../FORMS/BEGUM Razia Sultan Scholarship Form.doc' },
//   { title: 'Change of Supervisor', link: '../FORMS/Change of Supervisor PG-11 Form.docx' },
//   { title: 'Class Reschedule Form', link: '../FORMS/Class Reschedual Form CS.docx' },
//   { title: 'Clearance Form', link: '../FORMS/Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Additional Subject Enrollment Form', link: '../FORMS/DCS - Additional Subject Enrollment Form.pdf' },
//   { title: 'PhD Progress Report Proforma 2024', link: '../FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx' },
//   { title: 'Degree Application Form', link: '../FORMS/Degree Application Form.pdf' },
//   { title: 'Enrollment Form Additional Fall 2025', link: '../FORMS/Enrollment Form Addiional Fall 2025 F.doc' },
//   { title: 'Exit Survey Form', link: '../FORMS/Exit survey form.docx' },
//   { title: 'FYP Form', link: 'FORMS/FYP form.pdf' },
//   { title: 'HITEC Financial Assistance Form', link: '../FORMS/HITEC_Financial_Assistance_Form (2).doc' },
//   { title: 'Plagiarism Checking Updated Form', link: '../FORMS/Plagiarism Checking Updated Form 14.docx' },
//   { title: 'Revised Student Clearance Form', link: '../FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Transport Requisition Form', link: '../FORMS/Transport Requisition Oct 2024.doc' },
//   { title: 'Transcript Application Form', link: '../FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf' },
// ];

// export default function StudentForms() {
//   return (
//     <>
//       <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>


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
//           <Link to="/studentresources">Student Resources</Link>
//         </nav>
//       </header>


//       <section className="form-section">
//         <h2>Student Forms &amp; Documents</h2>
//         <div className="form-grid">
//           {forms.map((form, idx) => (
//             <div key={idx} className="form-card">
//               <FontAwesomeIcon icon={faFilePdf} />
//               <div className="form-title">{form.title}</div>
//               <a
//                 className="form-link"
//                 href={form.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Open &amp; Download <FontAwesomeIcon icon={faExternalLinkAlt} />
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }





// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/studentresources.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilePdf, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// const navItems = [
//   { to: '/homepage', label: 'Home' },
//   { to: '/chatbot', label: 'Chat' },
//   { to: '/admissions', label: 'Admissions' },
//   { to: '/events', label: 'Events' },
//   { to: '/tour', label: 'Tour' },
//   { to: '/dashboard', label: 'Dashboard' },
//   { to: '/alumni', label: 'Alumni' },
//   { to: '/industry-integration', label: 'Industry Integration' },
//   { to: '/studentresources', label: 'Student Resources' },
// ];

// const forms = [
//   { title: 'BEGUM Razia Sultan Scholarship Form',      href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc' },
//   { title: 'Change of Supervisor',                      href: '/FORMS/Change of Supervisor PG-11 Form.docx' },
//   { title: 'Class Reschedule Form',                     href: '/FORMS/Class Reschedual Form CS.docx' },
//   { title: 'Clearance Form',                            href: '/FORMS/Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Additional Subject Enrollment Form',        href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf' },
//   { title: 'PhD Progress Report Proforma 2024',         href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx' },
//   { title: 'Degree Application Form',                   href: '/FORMS/Degree Application Form.pdf' },
//   { title: 'Enrollment Form Additional Fall 2025',      href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc' },
//   { title: 'Exit Survey Form',                          href: '/FORMS/Exit survey form.docx' },
//   { title: 'FYP Form',                                  href: '/FORMS/FYP form.pdf' },
//   { title: 'HITEC Financial Assistance Form',           href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc' },
//   { title: 'Plagiarism Checking Updated Form',          href: '/FORMS/Plagiarism Checking Updated Form 14.docx' },
//   { title: 'Revised Student Clearance Form',            href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Transport Requisition Form',                href: '/FORMS/Transport Requisition Oct 2024.doc' },
//   { title: 'Transcript Application Form',               href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf' },
// ];

// export default function StudentResources() {
//   // set page title
//   useEffect(() => {
//     document.title = 'HITEC | UNIGUIDE | STUDENT RESOURCES';
//   }, []);

//   return (
//     <>
//       <header className="landing-header">
//         <nav>
//           {navItems.map((item) => (
//             <Link key={item.to} to={item.to}>
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </header>

//       <section className="form-section">
//         <h2>Student Forms &amp; Documents</h2>
//         <div className="form-grid">
//           {forms.map(({ title, href }, idx) => (
//             <div key={idx} className="form-card">
//               <FontAwesomeIcon icon={faFilePdf} />
//               <div className="form-title">{title}</div>
//               <a
//                 className="form-link"
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 download={href.split('/').pop()}
//               >
//                 Open &amp; Download <FontAwesomeIcon icon={faExternalLinkAlt} />
//               </a>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }






// // src/pages/StudentResources.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/studentresources.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFilePdf, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// const forms = [
//   { title: 'BEGUM Razia Sultan Scholarship Form', href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc' },
//   { title: 'Change of Supervisor', href: '/FORMS/Change of Supervisor PG-11 Form.docx' },
//   { title: 'Class Reschedule Form', href: '/FORMS/Class Reschedual Form CS.docx' },
//   { title: 'Clearance Form', href: '/FORMS/Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Additional Subject Enrollment Form', href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf' },
//   { title: 'PhD Progress Report Proforma 2024', href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx' },
//   { title: 'Degree Application Form', href: '/FORMS/Degree Application Form.pdf' },
//   { title: 'Enrollment Form Additional Fall 2025', href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc' },
//   { title: 'Exit Survey Form', href: '/FORMS/Exit survey form.docx' },
//   { title: 'FYP Form', href: '/FORMS/FYP form.pdf' },
//   { title: 'HITEC Financial Assistance Form', href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc' },
//   { title: 'Plagiarism Checking Updated Form', href: '/FORMS/Plagiarism Checking Updated Form 14.docx' },
//   { title: 'Revised Student Clearance Form', href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf' },
//   { title: 'Transport Requisition Form', href: '/FORMS/Transport Requisition Oct 2024.doc' },
//   { title: 'Transcript Application Form', href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf' },
// ];
// const StudentResources = () => {

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

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>


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

//       <section className="form-section">
//         <h2>Student Forms &amp; Documents</h2>
//         <div className="form-grid">
//           {forms.map(({ title, href }, idx) => (
//             <div key={idx} className="form-card">
//               <FontAwesomeIcon icon={faFilePdf} />
//               <div className="form-title">{title}</div>
//               <a
//                 className="form-link"
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Download <FontAwesomeIcon icon={faExternalLinkAlt} />
//               </a>
//             </div>
//           ))}
//         </div>
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

//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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
// }
// export default StudentResources;









// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/studentresources.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faFilePdf, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// const forms = [
//   {
//     title: 'BEGUM Razia Sultan Scholarship Form',
//     href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc',
//     category: 'Scholarship',
//     theme: 'orange'
//   },
//   {
//     title: 'Change of Supervisor',
//     href: '/FORMS/Change of Supervisor PG-11 Form.docx',
//     category: 'Academic',
//     theme: 'blue'
//   },
//   {
//     title: 'Class Reschedule Form',
//     href: '/FORMS/Class Reschedual Form CS.docx',
//     category: 'Academic',
//     theme: 'green'
//   },
//   {
//     title: 'Clearance Form',
//     href: '/FORMS/Clearance Form - Jan 2020 (2).pdf',
//     category: 'Administrative',
//     theme: 'red'
//   },
//   {
//     title: 'Additional Subject Enrollment Form',
//     href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf',
//     category: 'Academic',
//     theme: 'teal'
//   },
//   {
//     title: 'PhD Progress Report Proforma 2024',
//     href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx',
//     category: 'Academic',
//     theme: 'purple'
//   },
//   {
//     title: 'Degree Application Form',
//     href: '/FORMS/Degree Application Form.pdf',
//     category: 'Graduation',
//     theme: 'orange'
//   },
//   {
//     title: 'Enrollment Form Additional Fall 2025',
//     href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc',
//     category: 'Admissions',
//     theme: 'blue'
//   },
//   {
//     title: 'Exit Survey Form',
//     href: '/FORMS/Exit survey form.docx',
//     category: 'Feedback',
//     theme: 'green'
//   },
//   {
//     title: 'FYP Form',
//     href: '/FORMS/FYP form.pdf',
//     category: 'Academic',
//     theme: 'teal'
//   },
//   {
//     title: 'HITEC Financial Assistance Form',
//     href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc',
//     category: 'Finance',
//     theme: 'red'
//   },
//   {
//     title: 'Plagiarism Checking Updated Form',
//     href: '/FORMS/Plagiarism Checking Updated Form 14.docx',
//     category: 'Academic',
//     theme: 'teal'
//   },
//   {
//     title: 'Revised Student Clearance Form',
//     href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf',
//     category: 'Administrative',
//     theme: 'purple'
//   },
//   {
//     title: 'Transport Requisition Form',
//     href: '/FORMS/Transport Requisition Oct 2024.doc',
//     category: 'Transport',
//     theme: 'blue'
//   },
//   {
//     title: 'Transcript Application Form',
//     href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf',
//     category: 'Graduation',
//     theme: 'orange'
//   },
// ];


// export default function StudentResources() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory]   = useState("");

//   // fade‐in effect on mount (mimics your body onload)
//   useEffect(() => {
//     document.body.style.opacity = "1";
//   }, []);

//   const filtered = forms.filter(f =>
//     f.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (category === "" || f.category === category)
//   );
//  // State for feedback modal visibility
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
//   return (
//     <>
//     <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>
//        <header className="landing-header">
//              <nav>
//                <Link to="/homepage">Home</Link>
//                <Link to="/chatbot">Chat Assistant</Link>
//                <Link to="/admissions">Admissions</Link>
//                <Link to="/events">Events</Link>
//                <Link to="/tour">Tour</Link>
//                <Link to="/dashboard">Dashboard</Link>
//                <Link to="/alumni">Alumni</Link>
//                <Link to="/industry-integration">Industry Integration</Link>
//                <Link to="/studentresources">Student Resources</Link>
//              </nav>
//            </header>

//       <main>
//         <h2>Student Resources</h2>
//         <p className="intro">
//           Welcome to your central hub for important academic, administrative, and support documents. Whether you're a new student or graduating, find all downloadable forms here.
//         </p>

//         <div className="controls">
//           <input
//             type="text"
//             placeholder="Search forms..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           <select
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Academic">Academic</option>
//             <option value="Administrative">Administrative</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Scholarship">Scholarship</option>
//             <option value="Admissions">Admissions</option>
//             <option value="Finance">Finance</option>
//             <option value="Transport">Transport</option>
//             <option value="Feedback">Feedback</option>
//           </select>
//         </div>

//         <div className="grid">
//           {filtered.length > 0 ? (
//             filtered.map(f => (
//               <div key={f.title} className={`card theme-${f.theme}`}>
//                 <i className="fas fa-file-alt" />
//                 <h3>{f.title}</h3>
//                 <p>{f.category}</p>
//                 <a href={f.href}target="_blank" rel="noopener noreferrer">
//                   Open Form
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="no-forms">
//               No forms found for your search.
//             </p>
//           )}
//         </div>
//       </main>

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

//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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
// }



///////////////////////////////////////////////////////////



// StudentResources.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/studentresources.css';
import "../css/Header.css";

const forms = [
  { title: 'BEGUM Razia Sultan Scholarship Form', href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc', category: 'Scholarship', theme: 'orange' },
  { title: 'Change of Supervisor', href: '/FORMS/Change of Supervisor PG-11 Form.docx', category: 'Academic', theme: 'blue' },
  { title: 'Class Reschedule Form', href: '/FORMS/Class Reschedual Form CS.docx', category: 'Academic', theme: 'green' },
  { title: 'Clearance Form', href: '/FORMS/Clearance Form - Jan 2020 (2).pdf', category: 'Administrative', theme: 'red' },
  { title: 'Additional Subject Enrollment Form', href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf', category: 'Academic', theme: 'teal' },
  { title: 'PhD Progress Report Proforma 2024', href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx', category: 'Academic', theme: 'purple' },
  { title: 'Degree Application Form', href: '/FORMS/Degree Application Form.pdf', category: 'Graduation', theme: 'orange' },
  { title: 'Enrollment Form Additional Fall 2025', href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc', category: 'Admissions', theme: 'blue' },
  { title: 'Exit Survey Form', href: '/FORMS/Exit survey form.docx', category: 'Feedback', theme: 'green' },
  { title: 'FYP Form', href: '/FORMS/FYP form.pdf', category: 'Academic', theme: 'teal' },
  { title: 'HITEC Financial Assistance Form', href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc', category: 'Finance', theme: 'red' },
  { title: 'Plagiarism Checking Updated Form', href: '/FORMS/Plagiarism Checking Updated Form 14.docx', category: 'Academic', theme: 'teal' },
  { title: 'Revised Student Clearance Form', href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf', category: 'Administrative', theme: 'purple' },
  { title: 'Transport Requisition Form', href: '/FORMS/Transport Requisition Oct 2024.doc', category: 'Transport', theme: 'blue' },
  { title: 'Transcript Application Form', href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf', category: 'Graduation', theme: 'orange' },
];

export default function StudentResources() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: ""
  });
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  // scoped fade-in
  useEffect(() => {
    const mainEl = document.querySelector('.sr-main');
    if (mainEl) {
      mainEl.classList.add('fade-in');
    }
  }, []);

  const filtered = forms.filter(f =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category === "" || f.category === category)
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

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
      <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>

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

      <main className="sr-main">
        <h2>Student Resources</h2>
        <p className="sr-intro">
          Welcome to your central hub for important academic, administrative,
          and support documents. Whether you're a new student or graduating,
          find all downloadable forms here.
        </p>

        <div className="sr-controls">
          <input
            type="text"
            placeholder="Search forms..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
            <option value="Graduation">Graduation</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Admissions">Admissions</option>
            <option value="Finance">Finance</option>
            <option value="Transport">Transport</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>

        <div className="sr-grid">
          {filtered.length > 0 ? (
            filtered.map(f => (
              <div key={f.title} className={`sr-card theme-${f.theme}`}>
                <i className="fas fa-file-alt" />
                <h3>{f.title}</h3>
                <p>{f.category}</p>
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Form
                </a>
              </div>
            ))
          ) : (
            <p className="sr-no-forms">
              No forms found for your search.
            </p>
          )}
        </div>
      </main>
      

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

      <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
        <i className="fas fa-comment-dots" />
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



///////////////////////////////////////////////////////////////


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/studentresources.css';

// const forms = [
//   { title: 'BEGUM Razia Sultan Scholarship Form', href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc', category: 'Scholarship', theme: 'orange' },
//   { title: 'Change of Supervisor', href: '/FORMS/Change of Supervisor PG-11 Form.docx', category: 'Academic', theme: 'blue' },
//   { title: 'Class Reschedule Form', href: '/FORMS/Class Reschedual Form CS.docx', category: 'Academic', theme: 'green' },
//   { title: 'Clearance Form', href: '/FORMS/Clearance Form - Jan 2020 (2).pdf', category: 'Administrative', theme: 'red' },
//   { title: 'Additional Subject Enrollment Form', href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf', category: 'Academic', theme: 'teal' },
//   { title: 'PhD Progress Report Proforma 2024', href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx', category: 'Academic', theme: 'purple' },
//   { title: 'Degree Application Form', href: '/FORMS/Degree Application Form.pdf', category: 'Graduation', theme: 'orange' },
//   { title: 'Enrollment Form Additional Fall 2025', href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc', category: 'Admissions', theme: 'blue' },
//   { title: 'Exit Survey Form', href: '/FORMS/Exit survey form.docx', category: 'Feedback', theme: 'green' },
//   { title: 'FYP Form', href: '/FORMS/FYP form.pdf', category: 'Academic', theme: 'teal' },
//   { title: 'HITEC Financial Assistance Form', href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc', category: 'Finance', theme: 'red' },
//   { title: 'Plagiarism Checking Updated Form', href: '/FORMS/Plagiarism Checking Updated Form 14.docx', category: 'Academic', theme: 'teal' },
//   { title: 'Revised Student Clearance Form', href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf', category: 'Administrative', theme: 'purple' },
//   { title: 'Transport Requisition Form', href: '/FORMS/Transport Requisition Oct 2024.doc', category: 'Transport', theme: 'blue' },
//   { title: 'Transcript Application Form', href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf', category: 'Graduation', theme: 'orange' },
// ];

// export default function StudentResources() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: ""
//   });

//   // fade‐in page
//   useEffect(() => {
//     document.body.style.opacity = "1";
//   }, []);

//   const filtered = forms.filter(f =>
//     f.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (category === "" || f.category === category)
//   );

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(fd => ({ ...fd, [name]: value }));
//   };

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

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>

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

//       <main className="sr-main">
//         <h2>Student Resources</h2>
//         <p className="sr-intro">
//           Welcome to your central hub for important academic, administrative,
//           and support documents. Whether you're a new student or graduating,
//           find all downloadable forms here.
//         </p>

//         <div className="sr-controls">
//           <input
//             type="text"
//             placeholder="Search forms..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           <select
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Academic">Academic</option>
//             <option value="Administrative">Administrative</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Scholarship">Scholarship</option>
//             <option value="Admissions">Admissions</option>
//             <option value="Finance">Finance</option>
//             <option value="Transport">Transport</option>
//             <option value="Feedback">Feedback</option>
//           </select>
//         </div>

//         <div className="sr-grid">
//           {filtered.length > 0 ? (
//             filtered.map(f => (
//               <div key={f.title} className={`sr-card theme-${f.theme}`}>
//                 <i className="fas fa-file-alt" />
//                 <h3>{f.title}</h3>
//                 <p>{f.category}</p>
//                 <a
//                   href={f.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Open Form
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="sr-no-forms">
//               No forms found for your search.
//             </p>
//           )}
//         </div>
//       </main>

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


//       <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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
// }




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/studentresources.css';

// const forms = [
//   { title: 'BEGUM Razia Sultan Scholarship Form', href: '/FORMS/BEGUM Razia Sultan Scholarship Form.doc', category: 'Scholarship', theme: 'orange' },
//   { title: 'Change of Supervisor',                          href: '/FORMS/Change of Supervisor PG-11 Form.docx', category: 'Academic',    theme: 'blue'   },
//   { title: 'Class Reschedule Form',                         href: '/FORMS/Class Reschedual Form CS.docx',       category: 'Academic',    theme: 'green'  },
//   { title: 'Clearance Form',                                 href: '/FORMS/Clearance Form - Jan 2020 (2).pdf',  category: 'Administrative', theme: 'red'    },
//   { title: 'Additional Subject Enrollment Form',             href: '/FORMS/DCS - Additional Subject Enrollment Form.pdf', category: 'Academic', theme: 'teal'   },
//   { title: 'PhD Progress Report Proforma 2024',              href: '/FORMS/DCS DCE - Phd Progess Report Proforma 2024.docx', category: 'Academic', theme: 'purple' },
//   { title: 'Degree Application Form',                       href: '/FORMS/Degree Application Form.pdf',       category: 'Graduation',  theme: 'orange' },
//   { title: 'Enrollment Form Additional Fall 2025',           href: '/FORMS/Enrollment Form Addiional Fall 2025 F.doc', category: 'Admissions', theme: 'blue'   },
//   { title: 'Exit Survey Form',                               href: '/FORMS/Exit survey form.docx',             category: 'Feedback',    theme: 'green'  },
//   { title: 'FYP Form',                                       href: '/FORMS/FYP form.pdf',                     category: 'Academic',    theme: 'teal'   },
//   { title: 'HITEC Financial Assistance Form',               href: '/FORMS/HITEC_Financial_Assistance_Form (2).doc', category: 'Finance',  theme: 'red'    },
//   { title: 'Plagiarism Checking Updated Form',               href: '/FORMS/Plagiarism Checking Updated Form 14.docx', category: 'Academic', theme: 'teal'   },
//   { title: 'Revised Student Clearance Form',                 href: '/FORMS/Revised Student Clearance Form - Jan 2020 (2).pdf', category: 'Administrative', theme: 'purple' },
//   { title: 'Transport Requisition Form',                     href: '/FORMS/Transport Requisition Oct 2024.doc', category: 'Transport',  theme: 'blue'   },
//   { title: 'Transcript Application Form',                    href: '/FORMS/TRANSCRIPT APPLICATIONFORM SP 24 (1).pdf', category: 'Graduation', theme: 'orange' },
// ];

// export default function StudentResources() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory]   = useState("");
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: ""
//   });

//   // Fade‐in on mount
//   useEffect(() => {
//     document.body.style.opacity = "1";
//   }, []);

//   // Filter logic
//   const filtered = forms.filter(f =>
//     f.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (category === "" || f.category === category)
//   );

//   // Feedback handlers
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(fd => ({ ...fd, [name]: value }));
//   };
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

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | STUDENT_RESOURCES</title>
//     {/* Navigation */}
//           <header className="landing-header">
//             <nav>
//               <Link to="/homepage">Home</Link>
//               <Link to="/chatbot">Chat Assistant</Link>
//               <Link to="/admissions">Admissions</Link>
//               <Link to="/events">Events</Link>
//               <Link to="/tour">Tour</Link>
//               <Link to="/dashboard">Dashboard</Link>
//               <Link to="/alumni">Alumni</Link>
//               <Link to="/industry-integration">Industry Integration</Link>
//               <Link to="/studentresources">Student Resources</Link>
//             </nav>
//           </header>

//       <main className="sr-main">
//         <h2>Student Resources</h2>
//         <p className="sr-intro">
//           Welcome to your central hub for important academic, administrative, and support documents. Whether you're a new student or graduating, find all downloadable forms here.
//         </p>

//         <div className="sr-controls">
//           <input
//             type="text"
//             placeholder="Search forms..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//           <select
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             <option value="Academic">Academic</option>
//             <option value="Administrative">Administrative</option>
//             <option value="Graduation">Graduation</option>
//             <option value="Scholarship">Scholarship</option>
//             <option value="Admissions">Admissions</option>
//             <option value="Finance">Finance</option>
//             <option value="Transport">Transport</option>
//             <option value="Feedback">Feedback</option>
//           </select>
//         </div>

//         <div className="sr-grid">
//           {filtered.length > 0 ? (
//             filtered.map(f => (
//               <div key={f.title} className={`sr-card sr-theme-${f.theme}`}>
//                 <i className="fas fa-file-alt" />
//                 <h3>{f.title}</h3>
//                 <p>{f.category}</p>
//                 <a href={encodeURI(f.href)} target="_blank" rel="noopener noreferrer">
//                   Open Form
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="sr-no-forms">No forms found for your search.</p>
//           )}
//         </div>
//       </main>

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

//       {/* Chat Assistant FAB (unchanged) */}
//       <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
//         <i className="fas fa-comment-dots"></i>
//       </Link>

//        <footer className="footer">
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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
// }
