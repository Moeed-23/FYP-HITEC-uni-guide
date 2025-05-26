// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/tour.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Tour = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const locations = [
//     {
//       title: "Main Campus",
//       description: "Central hub of academics with main departments and admin blocks.",
//       iframe: "https://www.google.com/maps/embed?...MainCampusURL",
//       subBlocks: [
//         {
//           title: "Israr Block",
//           description: "Engineering block housing multiple academic departments.",
//           iframe: "https://www.google.com/maps/embed?...NusratBlockURL",
//         },
//         {
//           title: "Rumi Block",
//           description: "Block dedicated to humanities and social sciences.",
//           iframe: "https://www.google.com/maps/embed?...RumiBlockURL",
//         },
//         {
//           title: "Sir Syed Block",
//           description: "Center for innovation and entrepreneurship studies.",
//           iframe: "https://www.google.com/maps/embed?...SirSyedBlockURL",
//         },
//         {
//           title: "Secretariat Block",
//           description: "Core administrative center of the university.",
//           iframe: "https://www.google.com/maps/embed?...SecretariatBlockURL",
//         },
//       ]
//     },
//     {
//       title: "Library",
//       description: "Navigate to the heart of knowledge with a detailed map of the library.",
//       iframe: "https://www.google.com/maps/embed?...LibraryURL"
//     },
//     {
//       title: "Sports Complex",
//       description: "Find your way to recreational and sporting activities.",
//       iframe: "https://www.google.com/maps/embed?...SoprtsComplexURL"
//     },
//     {
//       title: "Jinnah Hostel",
//       description: "Residential facility for students with all basic amenities.",
//       iframe: "https://www.google.com/maps/embed?...JinnahHostelURL"
//     },
//     {
//       title: "Secretariat",
//       description: "Administrative office for faculty and student affairs.",
//       iframe: "https://www.google.com/maps/embed?...SecretariatURL"
//     },
//     {
//       title: "Entry Gate",
//       description: "Main entrance to the university campus.",
//       iframe: "https://www.google.com/maps/embed?...EntryGateURL"
//     },
//     {
//       title: "Exit Gate",
//       description: "Exit point for university traffic.",
//       iframe: "https://www.google.com/maps/embed?...ExitGateURL"
//     },
//     {
//       title: "Mosque",
//       description: "Prayer area located within the campus for spiritual well-being.",
//       iframe: "https://www.google.com/maps/embed?...MosqueURL"
//     }
//   ];

//   // Flatten locations and subBlocks into one searchable list
//   const getAllCards = () => {
//     let all = [];
//     locations.forEach((loc) => {
//       all.push(loc);
//       if (loc.subBlocks) {
//         loc.subBlocks.forEach(sub => all.push({ ...sub, parent: loc.title }));
//       }
//     });
//     return all;
//   };

//   // Filter locations and sub-blocks based on search term
//   const filteredLocations = getAllCards().filter(location => {
//     const searchLower = searchTerm.trim().toLowerCase();
//     return (
//       location.title.toLowerCase().includes(searchLower) ||
//       location.description.toLowerCase().includes(searchLower)
//     );
//   });
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
//       <title>HITEC | UNIGUIDE | TOUR</title>
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
//           <Link to="/feedback">Feedback</Link>
//         </nav>
//       </header>

//       <section className="tourIntro">
//         <h1>Campus Tour</h1>
//         <p>Navigate your way through the campus with our interactive maps and guides.</p>
//       </section>

//       <section className="tourSearchBar">
//         <input
//           type="text"
//           placeholder="Search for a campus location..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button disabled><i className="fas fa-search"></i></button>
//       </section>

//       <section className="mapSection">
//         {filteredLocations.length > 0 ? (
//           filteredLocations.map((location, index) => (
//             <div className="mapCard" key={index}>
//               <iframe
//                 src={location.iframe}
//                 allowFullScreen
//                 loading="lazy"
//                 title={location.title}
//               ></iframe>

//               <h3>{location.title}</h3>
//               {location.parent && <h4 className="subBlockLabel">Inside {location.parent}</h4>}
//               <p>{location.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="noResults">No locations found.</p>
//         )}
//       </section>

//       <section className="faqSection">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faqCard">
//           <h3>How do I access the campus tour?</h3>
//           <p>You can use the search bar or browse the cards below.</p>
//         </div>
//         <div className="faqCard">
//           <h3>Can I get live navigation?</h3>
//           <p>Yes! Click on the map pin to open Google Maps navigation.</p>
//         </div>
//         <div className="faqCard">
//           <h3>Are there event-specific pins?</h3>
//           <p>Yes, we highlight ongoing and upcoming events on the map as well.</p>
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
//               <option value="">Rate Your Experience</option>
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
//       <footer className="tourFooter">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="tourSocialIcons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Tour;



///////////////////////////////////////////////////////////////////////



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../css/tour.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";


// import mainCampusImg from "../images/tour/uni_campus.png";
// import israrBlockImg from "../images/tour/israr_block.jpeg";
// import rumiBlockImg from "../images/tour/rumi_block.png";
// import sirSyedBlockImg from "../images/tour/sirsyed.png";
// import secretariatBlockImg from "../images/tour/secretariat.jpeg";
// import libraryImg from "../images/tour/library.jpg";
// import cricketstad from "../images/tour/cricket.png";
// import basketball from "../images/tour/basketball.jpeg";
// import football from "../images/tour/futsal.jpeg";
// import jinnahHostelImg from "../images/tour/jinnah(2).png";
// import entryGateImg from "../images/tour/entry_gate.png";
// import exitGateImg       from "../images/tour/exit.png";
// import mosqueImg from "../images/tour/mosque.jpeg";
// import daycare from "../images/tour/daycare.png";

// const Tour = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [feedbackOpen, setFeedbackOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5",
//     comments: ""
//   });

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

//   const locations = [
//     {
//       title: "University Campus",
//       description: "Central hub of academics with main departments and admin blocks.",
//       image: mainCampusImg,
//       mapLink: "https://maps.app.goo.gl/u2R3xcPYcBVGpgZ98"
//     },
//     {
//       title: "Israr Block",
//       description: "Engineering block housing multiple academic departments.",
//       image: israrBlockImg,
//       mapLink: "https://maps.app.goo.gl/dXG79pSi7kkJ79jt9"
//     },
//     {
//       title: "Secretariat Block",
//       description: "Core administrative center of the university.",
//       image: secretariatBlockImg,
//       mapLink: "https://maps.app.goo.gl/xSL2S9BwtUizC7GQA"
//     },
//     {
//       title: "Sir Syed Block",
//       description: "Center for innovation and entrepreneurship studies.",
//       image: sirSyedBlockImg,
//       mapLink: "https://maps.app.goo.gl/GjEEPreuogUBbqDP8"
//     },
//     {
//       title: "Rumi Block",
//       description: "Block dedicated to humanities and social sciences.",
//       image: rumiBlockImg,
//       mapLink: "https://maps.app.goo.gl/QY53K8DZpCe97eueA"
//     },
//     {
//       title: "Mosque",
//       description: "Prayer area located within the campus for spiritual well-being.",
//       image: mosqueImg,
//       mapLink: "https://maps.app.goo.gl/AzprR4Kd54obQvaa9"
//     },
//     {
//       title: "Library",
//       description: "Navigate to the heart of knowledge with a detailed map of the library.",
//       image: libraryImg,
//       mapLink: "https://maps.app.goo.gl/uA2anB39YTXr5BFt8"
//     },
//     {
//       title: "Stadium",
//       description: "Stadium for hard‑ball, tape‑ball, and volleyball matches.",
//       image: cricketstad,
//       mapLink: "https://maps.app.goo.gl/GczYtvmcqXd3WJKJA"
//     },
//     {
//       title: "Basketball Court",
//       description: "Full‑size basketball court with professional hoops",
//       image: basketball,
//       mapLink: "https://maps.app.goo.gl/XVfAWRoypJxMAUyN9"
//     },
//     {
//       title: "Football Ground",
//       description: "Regulation‑size football ground with full‑length pitch, goalposts.",
//       image: football,
//       mapLink: "https://maps.app.goo.gl/BSs34hqoqy1G8kYz6"
//     },
//     {
//       title: "Jinnah Hostel",
//       description: "Residential facility for students with all basic amenities.",
//       image: jinnahHostelImg,
//       mapLink: "https://maps.app.goo.gl/nugvudk7aEYi7fxy6"
//     },
//     {
//       title: "Day Care",
//       description: "On‑campus day care with qualified caregivers and engaging activities.",
//       image: daycare,
//       mapLink: "https://maps.app.goo.gl/4CuHWC8e8PC3nHGP6"
//     },
//     {
//       title: "Entry Gate",
//       description: "Main entrance to the university campus.",
//       image: entryGateImg,
//       mapLink: "https://maps.app.goo.gl/vLFbdFvnepRK2vbZA"
//     },
//     {
//       title: "Exit Gate",
//       description: "Exit point for university traffic.",
//       image: exitGateImg,
//       mapLink: "https://maps.app.goo.gl/ixZSYJUbn1YMAW5WA"
//     },

//   ];

//   const filteredLocations = locations.filter(loc => {
//     const q = searchTerm.trim().toLowerCase();
//     return (
//       loc.title.toLowerCase().includes(q) ||
//       loc.description.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | TOUR</title>

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
//           <Link to="/feedback">Feedback</Link>
//         </nav>
//       </header>

//       <section className="tourIntro">
//         <h1>Campus Tour</h1>
//         <p>Navigate your way through the campus with our interactive guides.</p>
//       </section>

//       <section className="tourSearchBar">
//         <input
//           type="text"
//           placeholder="Search for a campus location..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//         <button disabled><i className="fas fa-search" /></button>
//       </section>

//       <section className="mapSection">
//         {filteredLocations.length > 0 ? (
//           filteredLocations.map((loc, idx) => (
//             <div className="mapCard" key={idx}>
//               <img
//                 src={loc.image}
//                 alt={loc.title}
//                 className="mapThumbnail"
//               />
//               <h3>{loc.title}</h3>
//               <p>{loc.description}</p>
//               <a
//                 href={loc.mapLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="viewMapBtn"
//               >
//                 <i className="fas fa-map-marker-alt" /> View on Map
//               </a>
//             </div>
//           ))
//         ) : (
//           <p className="noResults">No locations found.</p>
//         )}
//       </section>

//       <section className="faqSection">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faqCard">
//           <h3>How do I access the campus tour?</h3>
//           <p>You can use the search bar or browse the cards below.</p>
//         </div>
//         <div className="faqCard">
//           <h3>Can I get live navigation?</h3>
//           <p>Yes! Click “View on Map” to open Google Maps navigation.</p>
//         </div>
//         <div className="faqCard">
//           <h3>Are there event-specific pins?</h3>
//           <p>Yes, we highlight ongoing and upcoming events on the map as well.</p>
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
//       {feedbackOpen && (
//         <div className="feedback-modal open" onClick={() => setFeedbackOpen(false)}>
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
//       )}

//       <footer className="landing-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="tourSocialIcons">
//           <a href="https://www.facebook.com/hitecuni/" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-instagram" />
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/" target="_blank" rel="noopener noreferrer">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Tour;



//////////////////////////////////////////////////////




import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/tour.css";
import "../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import mainCampusImg from "../images/tour/uni_campus.png";
import israrBlockImg from "../images/tour/israr_block.jpeg";
import rumiBlockImg from "../images/tour/rumi_block.png";
import sirSyedBlockImg from "../images/tour/sirsyed.png";
import secretariatBlockImg from "../images/tour/secretariat.jpeg";
import libraryImg from "../images/tour/library.jpg";
import cricketstad from "../images/tour/cricket.png";
import basketball from "../images/tour/basketball.jpeg";
import football from "../images/tour/futsal.jpeg";
import jinnahHostelImg from "../images/tour/jinnah(2).png";
import entryGateImg from "../images/tour/entry_gate.png";
import exitGateImg from "../images/tour/exit.png";
import mosqueImg from "../images/tour/mosque.jpeg";
import daycare from "../images/tour/daycare.png";

const Tour = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Feedback modal state
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Feedback form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: ""
  });

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

  const locations = [
    {
      title: "University Campus",
      description: "Central hub of academics with main departments and admin blocks.",
      image: mainCampusImg,
      mapLink: "https://maps.app.goo.gl/u2R3xcPYcBVGpgZ98"
    },
    {
      title: "Israr Block",
      description: "Engineering block housing multiple academic departments.",
      image: israrBlockImg,
      mapLink: "https://maps.app.goo.gl/dXG79pSi7kkJ79jt9"
    },
    {
      title: "Secretariat Block",
      description: "Core administrative center of the university.",
      image: secretariatBlockImg,
      mapLink: "https://maps.app.goo.gl/xSL2S9BwtUizC7GQA"
    },
    {
      title: "Sir Syed Block",
      description: "Center for innovation and entrepreneurship studies.",
      image: sirSyedBlockImg,
      mapLink: "https://maps.app.goo.gl/GjEEPreuogUBbqDP8"
    },
    {
      title: "Rumi Block",
      description: "Block dedicated to humanities and social sciences.",
      image: rumiBlockImg,
      mapLink: "https://maps.app.goo.gl/QY53K8DZpCe97eueA"
    },
    {
      title: "Mosque",
      description: "Prayer area located within the campus for spiritual well‑being.",
      image: mosqueImg,
      mapLink: "https://maps.app.goo.gl/AzprR4Kd54obQvaa9"
    },
    {
      title: "Library",
      description: "Navigate to the heart of knowledge with a detailed map of the library.",
      image: libraryImg,
      mapLink: "https://maps.app.goo.gl/uA2anB39YTXr5BFt8"
    },
    {
      title: "Stadium",
      description: "Stadium for hard‑ball, tape‑ball, and volleyball matches.",
      image: cricketstad,
      mapLink: "https://maps.app.goo.gl/GczYtvmcqXd3WJKJA"
    },
    {
      title: "Basketball Court",
      description: "Full‑size court with professional hoops.",
      image: basketball,
      mapLink: "https://maps.app.goo.gl/XVfAWRoypJxMAUyN9"
    },
    {
      title: "Football Ground",
      description: "Regulation‑size pitch with goalposts.",
      image: football,
      mapLink: "https://maps.app.goo.gl/BSs34hqoqy1G8kYz6"
    },
    {
      title: "Jinnah Hostel",
      description: "Residential facility for students with all basic amenities.",
      image: jinnahHostelImg,
      mapLink: "https://maps.app.goo.gl/nugvudk7aEYi7fxy6"
    },
    {
      title: "Day Care",
      description: "On‑campus care with qualified caregivers.",
      image: daycare,
      mapLink: "https://maps.app.goo.gl/4CuHWC8e8PC3nHGP6"
    },
    {
      title: "Entry Gate",
      description: "Main entrance to the campus.",
      image: entryGateImg,
      mapLink: "https://maps.app.goo.gl/vLFbdFvnepRK2vbZA"
    },
    {
      title: "Exit Gate",
      description: "Exit point for campus traffic.",
      image: exitGateImg,
      mapLink: "https://maps.app.goo.gl/ixZSYJUbn1YMAW5WA"
    },
  ];
  const onSearchChange = e => {
    const q = e.target.value;
    setSearchTerm(q);

    if (!q.trim()) {
      setSuggestions([]);
      return;
    }

    const matches = locations
      .map(loc => loc.title)
      .filter(title =>
        title.toLowerCase().startsWith(q.toLowerCase())
      )
      .slice(0, 5); // limit to 5 suggestions

    setSuggestions(matches);
  };

  // When user clicks a suggestion
  const pickSuggestion = title => {
    setSearchTerm(title);
    setSuggestions([]);
  };
  // Filter by the committed searchTerm
  const filteredLocations = locations.filter(loc => {
    const q = searchTerm.trim().toLowerCase();
    return (
      loc.title.toLowerCase().includes(q) ||
      loc.description.toLowerCase().includes(q)
    );
  });

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {

    // show scroll-to-top button after scrolling down 200px
    const handleScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);

  }, []);

  return (
    <>
      <title>HITEC | UNIGUIDE | TOUR</title>

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

      <section className="tourIntro">
        <h1>Campus Tour</h1>
        <p>Navigate your way through the campus with our interactive guides.</p>
      </section>

      <section className="tourSearchBar">
        <form
          className="searchContainer"
          onSubmit={e => {
            e.preventDefault();
            setSuggestions([]);
          }}
        >
          <input
            type="text"
            placeholder="Search for a campus location..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button type="submit">
            <i className="fas fa-search" />
          </button>

          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => pickSuggestion(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </form>
      </section>

      <section className="mapSection">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc, idx) => (
            <div className="mapCard" key={idx}>
              <img src={loc.image} alt={loc.title} className="mapThumbnail" />
              <h3>{loc.title}</h3>
              <p>{loc.description}</p>
              <a
                href={loc.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="viewMapBtn"
              >
                <i className="fas fa-map-marker-alt" /> View on Map
              </a>
            </div>
          ))
        ) : (
          <p className="noResults">No locations found.</p>
        )}
      </section>

      <section className="faqSection">
        <h2>Frequently Asked Questions</h2>
        <div className="faqCard">
          <h3>How do I access the campus tour?</h3>
          <p>You can type a location and click Search or press Enter.</p>
        </div>
        <div className="faqCard">
          <h3>Can I get live navigation?</h3>
          <p>Yes! Click “View on Map” to open Google Maps navigation.</p>
        </div>
        <div className="faqCard">
          <h3>Are there event‑specific pins?</h3>
          <p>Yes, we highlight ongoing and upcoming events on the map as well.</p>
        </div>
      </section>

      <button
        className="feedback-btn"
        onClick={() => setFeedbackOpen(true)}
      >
        <i className="fas fa-comment-alt" /> Feedback
      </button>

      {feedbackOpen && (
        <div className="feedback-modal open" onClick={() => setFeedbackOpen(false)}>
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
      )}


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
};

export default Tour;