// import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
// import Chart from 'chart.js/auto';
// import '../css/dashboard.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Dashboard = () => {
//   useEffect(() => {
//     // User Engagement Bar ChartJS
//     const ctx1 = document.getElementById('engagementChart').getContext('2d');
//     new Chart(ctx1, {
//       type: 'bar',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//         datasets: [{
//           label: 'Active Users (%)',
//           data: [80, 75, 90, 85, 92],
//           backgroundColor: '#f77f00',
//           borderColor: '#f77f00',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true
//       }
//     });

//     // Response Accuracy Pie ChartJS
//     const ctx2 = document.getElementById('accuracyChart').getContext('2d');
//     new Chart(ctx2, {
//       type: 'pie',
//       data: {
//         labels: ['Correct', 'Incorrect'],
//         datasets: [{
//           label: 'Response Accuracy',
//           data: [85, 15],
//           backgroundColor: ['#2a9d8f', '#e63946']
//         }]
//       },
//       options: {
//         responsive: true
//       }
//     });

//     // User Satisfaction Line ChartJS
//     const ctx3 = document.getElementById('satisfactionChart').getContext('2d');
//     new Chart(ctx3, {
//       type: 'line',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//         datasets: [{
//           label: 'User Satisfaction (%)',
//           data: [70, 75, 80, 85, 90],
//           fill: false,
//           borderColor: '#e63946',
//           tension: 0.1
//         }]
//       },
//       options: {
//         responsive: true
//       }
//     });

//     // Total Interactions Radar ChartJS
//     const ctx4 = document.getElementById('interactionsChart').getContext('2d');
//     new Chart(ctx4, {
//       type: 'radar',
//       data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//         datasets: [{
//           label: 'Interactions',
//           data: [120, 150, 170, 160, 190],
//           backgroundColor: 'rgba(231, 97, 97, 0.5)',
//           borderColor: '#e63946',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true
//       }
//     });
//   }, []);

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
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

//       <section className="heroSection">
//         <h1>Welcome to Your Dashboard</h1>
//         <p>Track your progress, stay updated, and access key features.</p>
//       </section>

//       <section className="dashboardSection">
//         <h2>Your Dashboard</h2>
//         <div className="cardContainer">
//           <div className="dashboardCard">
//             <h3><i className="fas fa-user"></i> My Profile</h3>
//             <p>Update your personal information and preferences.</p>
//           </div>
//           <div className="dashboardCard">
//             <h3><i className="fas fa-save"></i> Saved Questions</h3>
//             <p>Access and manage your saved queries.</p>
//           </div>
//           <div className="dashboardCard">
//             <h3><i className="fas fa-bell"></i> Notifications</h3>
//             <p>Stay updated with important alerts and announcements.</p>
//           </div>
//           <div className="dashboardCard">
//             <h3><i className="fas fa-calendar-alt"></i> Academic Schedule</h3>
//             <p>Keep track of your academic activities and deadlines.</p>
//           </div>
//         </div>
//       </section>

//       <section className="graphContainer">
//         <div className="chartCard">
//           <h3>User Engagement</h3>
//           <canvas id="engagementChart" width="400" height="400"></canvas>
//         </div>
//         <div className="chartCard">
//           <h3>Response Accuracy</h3>
//           <canvas id="accuracyChart" width="400" height="400"></canvas>
//         </div>
//         <div className="chartCard">
//           <h3>User Satisfaction</h3>
//           <canvas id="satisfactionChart" width="400" height="400"></canvas>
//         </div>
//         <div className="chartCard">
//           <h3>Total Interactions</h3>
//           <canvas id="interactionsChart" width="400" height="400"></canvas>
//         </div>
//       </section>

//       <footer className="footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="socialIcons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//           <a href="#"><i className="fab fa-twitter"></i></a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;



/////////////2


// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import '../css/dashboard.css'; // You can extract styles here

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (user?._id) {
//       const fetchUserData = async () => {
//         try {
//           const apiUrl = import.meta.env.VITE_API_URL;
//           const res = await axios.get(`${apiUrl}/api/User/${user._id}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           });
//           setUserData(res.data);
//         } catch (err) {
//           console.error("Error fetching user data:", err);
//         }
//       };
//       fetchUserData();
//     }
//   }, [user]);

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>

//         <header className="landing-header">
//           {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
//           <nav>
//             <Link to="/homepage">Home</Link>
//             <Link to="/chatbot">Chat</Link>
//             <Link to="/admissions">Admissions</Link>
//             <Link to="/events">Events</Link>
//             <Link to="/tour">Tour</Link>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/alumni">Alumni</Link>
//             <Link to="/industry-integration">Industry Integration</Link>
//             <Link to="/feedback">Feedback</Link>
//           </nav>
//         </header>

//         <div className="dashboard-wrapper">
//         <h1>Welcome, {userData?.name || "User"}!</h1>
//           <section className="dashboard-hero">
//             <h1>Welcome to Your Dashboard</h1>
//             <p>Track your progress, stay updated, and access key features.</p>
//           </section>

//           <section className="dashboard-main">
//             <h2>Your Dashboard</h2>
//             <div className="dashboard-cards">
//               <div className="dashboard-card">
//                 <h3><i className="fas fa-user"></i> My Profile</h3>
//                 <p>Update your personal information and preferences.</p>
//               </div>
//               <div className="dashboard-card">
//                 <h3><i className="fas fa-save"></i> Saved Questions</h3>
//                 <p>Access and manage your saved queries.</p>
//               </div>
//               <div className="dashboard-card">
//                 <h3><i className="fas fa-bell"></i> Notifications</h3>
//                 <p>Stay updated with important alerts and announcements.</p>
//               </div>
//               <div className="dashboard-card">
//                 <h3><i className="fas fa-calendar-alt"></i> Academic Schedule</h3>
//                 <p>Keep track of your academic activities and deadlines.</p>
//               </div>
//             </div>
//           </section>

//           <section className="dashboard-graphs">
//             <div className="dashboard-graph">
//               <h3>User Engagement</h3>
//               <canvas id="engagementChart" width="400" height="400"></canvas>
//             </div>
//             <div className="dashboard-graph">
//               <h3>Response Accuracy</h3>
//               <canvas id="accuracyChart" width="400" height="400"></canvas>
//             </div>
//             <div className="dashboard-graph">
//               <h3>User Satisfaction</h3>
//               <canvas id="satisfactionChart" width="400" height="400"></canvas>
//             </div>
//             <div className="dashboard-graph">
//               <h3>Total Interactions</h3>
//               <canvas id="interactionsChart" width="400" height="400"></canvas>
//             </div>
//           </section>

//           <footer className="dashboard-footer">
//             <p>&copy; 2025 HITEC University. All rights reserved.</p>
//             <div className="dashboard-social-icons">
//               <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//               <a href="#"><i className="fab fa-twitter"></i></a>
//               <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//               <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//           </footer>
//         </div>

//       </>
//       );
// };

// export default Dashboard;










////////////////////////







// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | DASHBOARD";
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user?._id) {
//         setLoading(false); // << Add this!
//         return;
//       }

//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/User/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setUserData(response.data);
//       } catch (err) {
//         setError("Failed to load user data. Please try again later.");
//         console.error("Error fetching user data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user]);


//   return (
//     <>
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

//       <main className="dashboard-wrapper">
//         {loading ? (
//           <div className="dashboard-loading">
//             <i className="fas fa-spinner fa-spin"></i>
//             <span>Loading your dashboard...</span>
//           </div>
//         ) : error ? (
//           <div className="dashboard-error" role="alert">
//             <i className="fas fa-exclamation-triangle"></i>
//             <span>{error}</span>
//           </div>
//         ) : (
//           <>
//             <h1>Welcome, {userData?.name || "User"}!</h1>

//             <section className="dashboard-hero">
//               <h1>Welcome to Your Dashboard</h1>
//               <p>Track your progress, stay updated, and access key features.</p>
//             </section>

//             <section className="dashboard-main">
//               <h2>Your Dashboard</h2>
//               <div className="dashboard-cards">
//                 <div className="dashboard-card">
//                   <h3><i className="fas fa-user"></i> My Profile</h3>
//                   <p>Update your personal information and preferences.</p>
//                 </div>
//                 <div className="dashboard-card">
//                   <h3><i className="fas fa-save"></i> Saved Questions</h3>
//                   <p>Access and manage your saved queries.</p>
//                 </div>
//                 <div className="dashboard-card">
//                   <h3><i className="fas fa-bell"></i> Notifications</h3>
//                   <p>Stay updated with important alerts and announcements.</p>
//                 </div>
//                 <div className="dashboard-card">
//                   <h3><i className="fas fa-calendar-alt"></i> Academic Schedule</h3>
//                   <p>Keep track of your academic activities and deadlines.</p>
//                 </div>
//               </div>
//             </section>

//             <section className="dashboard-graphs">
//               <div className="dashboard-graph">
//                 <h3>User Engagement</h3>
//                 <canvas id="engagementChart" width="400" height="400"></canvas>
//               </div>
//               <div className="dashboard-graph">
//                 <h3>Response Accuracy</h3>
//                 <canvas id="accuracyChart" width="400" height="400"></canvas>
//               </div>
//               <div className="dashboard-graph">
//                 <h3>User Satisfaction</h3>
//                 <canvas id="satisfactionChart" width="400" height="400"></canvas>
//               </div>
//               <div className="dashboard-graph">
//                 <h3>Total Interactions</h3>
//                 <canvas id="interactionsChart" width="400" height="400"></canvas>
//               </div>
//             </section>
//           </>
//         )}
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="#" aria-label="Twitter">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;










///////////////////





// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [setLoading] = useState(true);
//   const [setError] = useState("");
// useEffect(() => {
//   const fetchUserData = async () => {
//     const token = localStorage.getItem("token");

//     // Log the user data and token
//     console.log("user:", user);
//     console.log("token:", token);

//     if (!user?._id || !token) {
//       setLoading(false);
//       navigate("/login"); // Optional: redirect to login
//       return;
//     }

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${apiUrl}/api/User/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserData(response.data);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//       setError("Failed to load user data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUserData();
// }, [user, navigate]);


//   return (
//     <>
//     <title>HITEC | UNIGUIDE | DASHBOARD</title>
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

//       <main className="dashboard-wrapper">
//         <h1>Welcome, {userData?.name || "User"}!</h1>

//         <section className="dashboard-hero">
//           <h1>Welcome to Your Dashboard</h1>
//           <p>Track your progress, stay updated, and access key features.</p>
//         </section>

//         <section className="dashboard-main">
//           <h2>Your Dashboard</h2>
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <h3><i className="fas fa-user"></i> My Profile</h3>
//               <p>Update your personal information and preferences.</p>
//             </div>
//             <div className="dashboard-card">
//               <h3><i className="fas fa-save"></i> Saved Questions</h3>
//               <p>Access and manage your saved queries.</p>
//             </div>
//             <div className="dashboard-card">
//               <h3><i className="fas fa-bell"></i> Notifications</h3>
//               <p>Stay updated with important alerts and announcements.</p>
//             </div>
//             <div className="dashboard-card">
//               <h3><i className="fas fa-calendar-alt"></i> Academic Schedule</h3>
//               <p>Keep track of your academic activities and deadlines.</p>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-graphs">
//           {["Engagement", "Accuracy", "Satisfaction", "Interactions"].map((label) => (
//             <div className="dashboard-graph" key={label}>
//               <h3>User {label}</h3>
//               <canvas id={`${label.toLowerCase()}Chart`} width="400" height="400"></canvas>
//             </div>
//           ))}
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>

//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;



/////////////////////
////////////////
///////


// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");

//       // Check if user exists and if the token is available
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const apiUrl = import.meta.env.VITE_API_URL; // e.g. http://localhost:2500
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUserData(response.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load user data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user, navigate]);

//   if (loading) return <div>Loading your dashboard...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
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

//       <main className="dashboard-wrapper">
//         <h1>Welcome, {userData?.name || "User"}!</h1>

//         <section className="dashboard-hero">
//           <h1>Welcome to Your Dashboard</h1>
//           <p>Track your progress, stay updated, and access key features.</p>
//         </section>

//         <section className="dashboard-main">
//           <h2>Your Dashboard</h2>
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <Link to="/profile">
//                 <h3>
//                   <i className="fas fa-user"></i> My Profile
//                 </h3>
//                 <p>Update your personal information and preferences.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/saved-questions">
//                 <h3>
//                   <i className="fas fa-save"></i> Saved Questions
//                 </h3>
//                 <p>Access and manage your saved queries.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/notifications">
//                 <h3>
//                   <i className="fas fa-bell"></i> Notifications
//                 </h3>
//                 <p>Stay updated with important alerts and announcements.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/academic-schedule">
//                 <h3>
//                   <i className="fas fa-calendar-alt"></i> Academic Schedule
//                 </h3>
//                 <p>Keep track of your academic activities and deadlines.</p>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-graphs">
//           {["Engagement", "Accuracy", "Satisfaction", "Interactions"].map(label => (
//             <div className="dashboard-graph" key={label}>
//               <h3>User {label}</h3>
//               <canvas
//                 id={`${label.toLowerCase()}Chart`}
//                 width="400"
//                 height="400"
//               ></canvas>
//             </div>
//           ))}
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a
//             href="https://www.instagram.com/hitecuni/?hl=en"
//             aria-label="Instagram"
//           >
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a
//             href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"
//             aria-label="LinkedIn"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;



//////////////////////
/////////////


// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Remove userData since it's not used
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // If you still want to verify the user by fetching data, you can use a dummy variable
//   useEffect(() => {
//     const verifyUser = async () => {
//       const token = localStorage.getItem("token");

//       // Check if user exists and if the token is available
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // We are fetching the user data for verification only
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } catch (err) {
//         console.error("Error verifying user data:", err);
//         setError("Failed to load user data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyUser();
//   }, [user, navigate]);

//   if (loading) return <div>Loading your dashboard...</div>;
//   if (error) return <div>{error}</div>;


//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
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

//       <main className="dashboard-wrapper">
//         <section className="dashboard-hero">
//           <h1>Welcome to Your Dashboard</h1>
//           <p>Track your progress, stay updated, and access key features.</p>
//         </section>

//         <section className="dashboard-main">
//           <h2>Your Dashboard</h2>
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <Link to="/profile">
//                 <h3>
//                   <i className="fas fa-user"></i> My Profile
//                 </h3>
//                 <p>Update your personal information and preferences.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/saved-questions">
//                 <h3>
//                   <i className="fas fa-save"></i> Saved Questions
//                 </h3>
//                 <p>Access and manage your saved queries.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/notifications">
//                 <h3>
//                   <i className="fas fa-bell"></i> Notifications
//                 </h3>
//                 <p>Stay updated with important alerts and announcements.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/academic-schedule">
//                 <h3>
//                   <i className="fas fa-calendar-alt"></i> Academic Schedule
//                 </h3>
//                 <p>Keep track of your academic activities and deadlines.</p>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-graphs">
//           {["Engagement", "Accuracy", "Satisfaction", "Interactions"].map(label => (
//             <div className="dashboard-graph" key={label}>
//               <h3>User {label}</h3>
//               <canvas id={`${label.toLowerCase()}Chart`} width="400" height="400"></canvas>
//             </div>
//           ))}
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;



////////////////////
/////////
//////

// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Chart from "chart.js/auto"; // Import Chart.js for graphs
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // States for loading and error verification
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Verify user existence on component mount (no userData state)
//   useEffect(() => {
//     const verifyUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // Fetching user data solely for verification purposes.
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } catch (err) {
//         console.error("Error verifying user data:", err);
//         setError("Failed to load user data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyUser();
//   }, [user, navigate]);

//   // Initialize Charts when not loading
//   useEffect(() => {
//     if (!loading) {
//       // Engagement Chart (Bar)
//       const ctx1 = document.getElementById("engagementchart")?.getContext("2d");
//       if (ctx1) {
//         new Chart(ctx1, {
//           type: "bar",
//           data: {
//             labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//             datasets: [
//               {
//                 label: "Active Users (%)",
//                 data: [80, 75, 90, 85, 92], // Dummy Data
//                 backgroundColor: "rgba(247, 119, 0, 0.2)",
//                 borderColor: "rgba(247, 119, 0, 1)",
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         });
//       }
//       // Accuracy Chart (Pie)
//       const ctx2 = document.getElementById("accuracychart")?.getContext("2d");
//       if (ctx2) {
//         new Chart(ctx2, {
//           type: "pie",
//           data: {
//             labels: ["Correct", "Incorrect"],
//             datasets: [
//               {
//                 label: "Response Accuracy",
//                 data: [85, 15], // Dummy Data
//                 backgroundColor: ["#2a9d8f", "#e63946"],
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         });
//       }
//       // Satisfaction Chart (Line)
//       const ctx3 = document.getElementById("satisfactionchart")?.getContext("2d");
//       if (ctx3) {
//         new Chart(ctx3, {
//           type: "line",
//           data: {
//             labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//             datasets: [
//               {
//                 label: "User Satisfaction (%)",
//                 data: [70, 75, 80, 85, 90], // Dummy Data
//                 fill: false,
//                 borderColor: "#e63946",
//                 tension: 0.1,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         });
//       }
//       // Interactions Chart (Radar)
//       const ctx4 = document.getElementById("interactionschart")?.getContext("2d");
//       if (ctx4) {
//         new Chart(ctx4, {
//           type: "radar",
//           data: {
//             labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//             datasets: [
//               {
//                 label: "Total Interactions",
//                 data: [120, 150, 170, 160, 190], // Dummy Data
//                 backgroundColor: "rgba(231, 97, 97, 0.5)",
//                 borderColor: "#e63946",
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//           },
//         });
//       }
//     }
//   }, [loading]);

//   if (loading) return <div>Loading your dashboard...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
//       <header className="landing-header">
//         <nav className="dashboard-nav">
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

//       <main className="dashboard-wrapper">
//         <section className="dashboard-hero">
//           <h1>Welcome to Your Dashboard</h1>
//           <p>Track your progress, stay updated, and access key features.</p>
//         </section>

//         <section className="dashboard-main">
//           <h2>Your Dashboard</h2>
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <Link to="/profile">
//                 <h3>
//                   <i className="fas fa-user"></i> My Profile
//                 </h3>
//                 <p>Update your personal information and preferences.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/saved-questions">
//                 <h3>
//                   <i className="fas fa-save"></i> Saved Questions
//                 </h3>
//                 <p>Access and manage your saved queries.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/notifications">
//                 <h3>
//                   <i className="fas fa-bell"></i> Notifications
//                 </h3>
//                 <p>Stay updated with important alerts and announcements.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/academic-schedule">
//                 <h3>
//                   <i className="fas fa-calendar-alt"></i> Academic Schedule
//                 </h3>
//                 <p>Keep track of your academic activities and deadlines.</p>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-graphs">
//           <div className="dashboard-graph">
//             <h3>User Engagement</h3>
//             <canvas id="engagementchart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>Response Accuracy</h3>
//             <canvas id="accuracychart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>User Satisfaction</h3>
//             <canvas id="satisfactionchart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>Total Interactions</h3>
//             <canvas id="interactionschart"></canvas>
//           </div>
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a
//             href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"
//             aria-label="LinkedIn"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Dashboard;




////////////////////////




// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Chart from "chart.js/auto";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../css/dashboard.css";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError]   = useState("");

//   // First, verify we actually have a user + token
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!user?._id || !token) {
//       return navigate("/login", { replace: true });
//     }

//     // Optionally verify via API
//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } catch (e) {
//         console.error("Session invalid:", e);
//         setError("Session expired. Redirecting to login…");
//         return setTimeout(() => navigate("/login", { replace: true }), 2000);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user, navigate]);

//   // Once verified, spin up charts
//   useEffect(() => {
//     if (loading || error) return;

//     const init = (id, cfg) => {
//       const ctx = document.getElementById(id)?.getContext("2d");
//       if (ctx) new Chart(ctx, cfg);
//     };

//     init("engagementchart", {
//       type: "bar",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//         datasets: [{ 
//           label: "Active Users (%)",
//           data: [80,75,90,85,92],
//           backgroundColor: "rgba(247,119,0,0.2)",
//           borderColor: "rgba(247,119,0,1)",
//           borderWidth: 1
//         }]
//       },
//       options: { responsive:true, maintainAspectRatio:false }
//     });

//     init("accuracychart", {
//       type: "pie",
//       data: {
//         labels: ["Correct","Incorrect"],
//         datasets: [{ data:[85,15], backgroundColor:["#2a9d8f","#e63946"] }]
//       },
//       options: { responsive:true, maintainAspectRatio:false }
//     });

//     init("satisfactionchart", {
//       type: "line",
//       data: {
//         labels: ["Jan","Feb","Mar","Apr","May"],
//         datasets: [{ 
//           label: "User Satisfaction (%)",
//           data: [70,75,80,85,90],
//           fill:false,
//           borderColor:"#e63946",
//           tension:0.1
//         }]
//       },
//       options: { responsive:true, maintainAspectRatio:false }
//     });

//     init("interactionschart", {
//       type: "radar",
//       data: {
//         labels: ["Jan","Feb","Mar","Apr","May"],
//         datasets: [{ 
//           label: "Total Interactions",
//           data: [120,150,170,160,190],
//           backgroundColor:"rgba(231,97,97,0.5)",
//           borderColor:"#e63946",
//           borderWidth:1
//         }]
//       },
//       options: { responsive:true, maintainAspectRatio:false }
//     });

//   }, [loading, error]);

//   if (loading) return <div className="p-4 text-center">Loading your dashboard…</div>;
//   if (error)   return <div className="p-4 text-center text-red-500">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
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

//       <main className="dashboard-wrapper">
//         <section className="dashboard-hero">
//           <h1>Welcome to Your Dashboard</h1>
//           <p>Track your progress, stay updated, and access key features.</p>
//         </section>

//         <section className="dashboard-main">
//           <h2>Your Dashboard</h2>
//           <div className="dashboard-cards">
//             <div className="dashboard-card">
//               <Link to="/profile">
//                 <h3>
//                   <i className="fas fa-user"></i> My Profile
//                 </h3>
//                 <p>Update your personal information and preferences.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/saved-questions">
//                 <h3>
//                   <i className="fas fa-save"></i> Saved Questions
//                 </h3>
//                 <p>Access and manage your saved queries.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/notifications">
//                 <h3>
//                   <i className="fas fa-bell"></i> Notifications
//                 </h3>
//                 <p>Stay updated with important alerts and announcements.</p>
//               </Link>
//             </div>
//             <div className="dashboard-card">
//               <Link to="/academic-schedule">
//                 <h3>
//                   <i className="fas fa-calendar-alt"></i> Academic Schedule
//                 </h3>
//                 <p>Keep track of your academic activities and deadlines.</p>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="dashboard-graphs">
//           <div className="dashboard-graph">
//             <h3>User Engagement</h3>
//             <canvas id="engagementchart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>Response Accuracy</h3>
//             <canvas id="accuracychart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>User Satisfaction</h3>
//             <canvas id="satisfactionchart"></canvas>
//           </div>
//           <div className="dashboard-graph">
//             <h3>Total Interactions</h3>
//             <canvas id="interactionschart"></canvas>
//           </div>
//         </section>
//       </main>

//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a
//             href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"
//             aria-label="LinkedIn"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// };

///////////////////////////////////////



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/d.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading]           = useState(true);
//   const [sessionError, setSessionError] = useState("");
//   const [metrics, setMetrics] = useState({
//     savedQuestions:    0,
//     notifications:     0,
//     upcomingDeadlines: 0
//   });

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | Dashboard";
//     const token = localStorage.getItem("token");
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // verify session
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         // fetch metrics
//         const resp = await axios.get(`${apiUrl}/api/dashboard/metrics`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const { savedQuestions, notifications, upcomingDeadlines } = resp.data;
//         setMetrics({ savedQuestions, notifications, upcomingDeadlines });
//       } catch (e) {
//         console.error("Dashboard load error:", e);
//         if (e.response?.status === 401) {
//           setSessionError("Session expired. Redirecting to login…");
//           setTimeout(() => navigate("/login", { replace: true }), 2000);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user, navigate]);

//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>;
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

//       {sessionError && <div className="error-banner">{sessionError}</div>}

//       <main className="dashboard-wrapper">
//         <h2 className="welcome-text">Welcome to Dashboard</h2>

//         <section className="summary-cards one-row">
//           <div className="card metric-card">
//             <i className="fas fa-save icon" />
//             <div>
//               <h3>{metrics.savedQuestions}</h3>
//               <p>Saved Questions</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-bell icon" />
//             <div>
//               <h3>{metrics.notifications}</h3>
//               <p>Notifications</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-calendar-alt icon" />
//             <div>
//               <h3>{metrics.upcomingDeadlines}</h3>
//               <p>Upcoming Deadlines</p>
//             </div>
//           </div>
//         </section>

//         <section className="quick-links">
//           <h3>Quick Actions</h3>
//           <div className="card-grid">
//             <Link to="/profile" className="card action-card">
//               <i className="fas fa-user fa-2x"></i>
//               <span>My Profile</span>
//             </Link>
//             <Link to="/saved-questions" className="card action-card">
//               <i className="fas fa-save fa-2x"></i>
//               <span>Saved Questions</span>
//             </Link>
//             <Link to="/notifications" className="card action-card">
//               <i className="fas fa-bell fa-2x"></i>
//               <span>Notifications</span>
//             </Link>
//             <Link to="/academic-schedule" className="card action-card">
//               <i className="fas fa-calendar-alt fa-2x"></i>
//               <span>Academic Schedule</span>
//             </Link>
//           </div>
//         </section>
//       </main>

//       <footer>
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f" /></a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram" /></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in" /></a>
//         </div>
//       </footer>
//     </>
//   );
// }




//////////////////////////////




// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/d.css";


// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [sessionError, setSessionError] = useState("");


//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | DASHBOARD";
//     const token = localStorage.getItem("token");
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // verify session
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });


//       } catch (e) {
//         console.error("Dashboard load error:", e);
//         if (e.response?.status === 401) {
//           setSessionError("Session expired. Redirecting to login…");
//           setTimeout(() => navigate("/login", { replace: true }), 2000);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user, navigate]);
  
//   // State for feedback modal visibility
//   const [feedbackOpen, setFeedbackOpen] = useState(false);

//   // State for feedback form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     rating: "5", // <-- use "rating" everywhere, default to "5"
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
//         body: JSON.stringify(formData) // This will now send { name, email, rating, comments }
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

//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>;
//   }
 
  
//   return (
//     <>
//       {/* Header */}
//       <header className="landing-header">
//               <nav>
//                 <Link to="/homepage">Home</Link>
//                 <Link to="/chatbot">Chat Assistant</Link>
//                 <Link to="/admissions">Admissions</Link>
//                 <Link to="/events">Events</Link>
//                 <Link to="/tour">Tour</Link>
//                 <Link to="/dashboard">Dashboard</Link>
//                 <Link to="/alumni">Alumni</Link>
//                 <Link to="/industry-integration">Industry Integration</Link>
//                 <Link to="/studentresources">Student Resources</Link>
//               </nav>
//             </header>
//       <div className="dashboard-page">
//       {/* Session error banner */}
//       {sessionError && (
//         <div className="error-banner">{sessionError}</div>
//       )}

  

//       {/* Quick Actions (also using .cards/.card) */}
//       <section className="cards">
//         <Link to="/profile" className="card">
//           <i className="fas fa-user-circle"></i>
//           <h3>My Profile</h3>
//         </Link>
//         <Link to="/saved-questions" className="card">
//           <i className="fas fa-save"></i>
//           <h3>Saved Questions</h3>
//         </Link>
//         <Link to="/notifications" className="card">
//           <i className="fas fa-bell"></i>
//           <h3>Notifications</h3>
//         </Link>
//         <Link to="/academic-schedule" className="card">
//           <i className="fas fa-calendar-alt"></i>
//           <h3>Academic Schedule</h3>
//         </Link>
//       </section>

      // {/* Learning Bites */}
      // <section className="learning-bites">
      //   <h2>Quick Learning Bites</h2>
      //   <div className="tiles">
      //     <div className="tile">
      //       <h4>📄 Resume Tips</h4>
      //       <ul>
      //         <li>Use active language</li>
      //         <li>Highlight achievements</li>
      //         <li>Keep to one page</li>
      //       </ul>
      //     </div>
      //     <div className="tile">
      //       <h4>💬 Interview Prep</h4>
      //       <ul>
      //         <li>Tell me about yourself</li>
      //         <li>Practice confidently</li>
      //         <li>Know your strengths</li>
      //         </ul>
      //       </div>
      //       <div className="tile">
      //         <h4>🧠 Skill Building</h4>
      //         <ul>
      //           <li>LinkedIn Learning</li>
      //           <li>Grammarly, Canva</li>
      //           <li>Certifications</li>
      //         </ul>
      //       </div>
      //       <div className="tile">
      //         <h4>🌐 Talk to Employers</h4>
      //         <ul>
      //           <li>Be curious</li>
      //           <li>Understand the roles</li>
      //           <li>Ask insightful questions</li>
      //         </ul>
      //       </div>
      //       <div className="tile">
      //         <h4>🧭 Time Management</h4>
      //         <ul>
      //           <li>Use a calendar app</li>
      //           <li>Prioritize tasks</li>
      //           <li>Take short breaks</li>
      //         </ul>
      //       </div>
      //       <div className="tile">
      //         <h4>🧑‍💼 Professional Etiquette</h4>
      //         <ul>
      //           <li>Use formal email greetings</li>
      //           <li>Dress appropriately</li>
      //           <li>Be punctual in meetings</li>
      //         </ul>
      //       </div>
      //     </div>
      //   </section>

//         {/* Quote Box */}
//         <section className="quote-box">
//           <i className="fas fa-quote-left"></i>
//           <blockquote>
//             Success is not final, failure is not fatal: It is the courage to continue that counts.
//           </blockquote>
//           <span>— Winston Churchill</span>
//         </section>


// {/* Feedback Button */}
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

//       <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
//         <i className="fas fa-comment-dots"></i>
//       </Link>


//         <footer>
//           <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//         </footer>

//       </div>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../css/d.css";
import "../css/tour.css";
import "../css/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  useEffect(() => {
    document.title = "HITEC | UNIGUIDE | DASHBOARD";
    const token = localStorage.getItem("token");
    if (!user?._id || !token) {
      navigate("/login", { replace: true });
      return;
    }

    (async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        // verify session
        await axios.get(`${apiUrl}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        console.error("Dashboard load error:", e);
        if (e.response?.status === 401) {
          setSessionError("Session expired. Redirecting to login…");
          setTimeout(() => navigate("/login", { replace: true }), 2000);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  // Feedback modal state
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );
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

  if (loading) {
    return <div className="loader">Loading your dashboard…</div>;
  }

  return (
    <>
    <title>HITEC | UNIGUIDE | DASHBOARD</title>
      {/* Header */}
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
            

      <div className="dashboard-page">
        {/* Session error banner */}
        {sessionError && <div className="error-banner">{sessionError}</div>}

        {/* Quick Actions */}
        <section className="cards">
          <Link to="/profile" className="card">
            <i className="fas fa-user-circle"></i>
            <h3>My Profile</h3>
          </Link>
          {/* user chat history */}
          <Link to="/saved-questions" className="card">
            <i className="fas fa-save"></i>
            <h3>Recent Chats</h3>
          </Link>
          <Link to="/notifications" className="card">
            <i className="fas fa-bell"></i>
            <h3>Notifications</h3>
          </Link>
          <Link to="/academic-schedule" className="card">
            <i className="fas fa-calendar-alt"></i>
            <h3>Academic Schedule</h3>
          </Link>
        </section>

             {/* Learning Bites */}
      <section className="learning-bites">
        <h2>Quick Learning Bites</h2>
        <div className="tiles">
          <div className="tile">
            <h4>📄 Resume Tips</h4>
            <ul>
              <li>Use active language</li>
              <li>Highlight achievements</li>
              <li>Keep to one page</li>
            </ul>
          </div>
          <div className="tile">
            <h4>💬 Interview Prep</h4>
            <ul>
              <li>Tell me about yourself</li>
              <li>Practice confidently</li>
              <li>Know your strengths</li>
              </ul>
            </div>
            <div className="tile">
              <h4>🧠 Skill Building</h4>
              <ul>
                <li>LinkedIn Learning</li>
                <li>Grammarly, Canva</li>
                <li>Certifications</li>
              </ul>
            </div>
            <div className="tile">
              <h4>🌐 Talk to Employers</h4>
              <ul>
                <li>Be curious</li>
                <li>Understand the roles</li>
                <li>Ask insightful questions</li>
              </ul>
            </div>
            <div className="tile">
              <h4>🧭 Time Management</h4>
              <ul>
                <li>Use a calendar app</li>
                <li>Prioritize tasks</li>
                <li>Take short breaks</li>
              </ul>
            </div>
            <div className="tile">
              <h4>🧑‍💼 Professional Etiquette</h4>
              <ul>
                <li>Use formal email greetings</li>
                <li>Dress appropriately</li>
                <li>Be punctual in meetings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quote Box */}
        <section className="quote-box">
          <i className="fas fa-quote-left"></i>
          <blockquote>
            Success is not final, failure is not fatal: It is the courage to continue that counts.
          </blockquote>
          <span>— Winston Churchill</span>
        </section>

        {/* Feedback Button */}
        <button
          className="dashboard-feedback-btn"
          onClick={() => setFeedbackOpen(true)}
        >
          <i className="fas fa-comment-alt" /> Feedback
        </button>

        {/* Feedback Modal */}
        {feedbackOpen && (
          <div
            className={`dashboard-feedback-modal${feedbackOpen ? " open" : ""}`}
            onClick={() => setFeedbackOpen(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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

        {/* Floating Chat FAB */}
        <Link
          to="/chatbot"
          className="chat-assistant-fab"
          aria-label="Chat Assistant"
        >
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
            <a href="https://www.facebook.com/hitecuni/">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/hitecuni/?hl=en">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/d.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading]           = useState(true);
//   const [sessionError, setSessionError] = useState("");

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | DASHBOARD";
//     const token = localStorage.getItem("token");
//     if (!token) {
//       logout();
//       navigate("/login", { replace: true });
//       return;
//     }

//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // verify session via /me
//         await axios.get(`${apiUrl}/api/users/me`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       } catch (e) {
//         console.error("Dashboard load error:", e);
//         if (e.response?.status === 401) {
//           setSessionError("Session expired. Redirecting to login…");
//           setTimeout(() => {
//             logout();
//             navigate("/login", { replace: true });
//           }, 2000);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [logout, navigate]);

//   if (loading) return <div className="loader">Loading your dashboard…</div>;

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
//         <div className="header-avatar">
//           {user?.avatarUrl
//             ? <img src={user.avatarUrl} alt="Your avatar" />
//             : <i className="fas fa-user-circle"></i>
//           }
//         </div>
//       </header>

//       {sessionError && <div className="error-banner">{sessionError}</div>}

  

//       {/* Quick Actions (also using .cards/.card) */}
//       <section className="cards">
//         <Link to="/profile" className="card">
//           <i className="fas fa-user-circle"></i>
//           <h3>My Profile</h3>
//         </Link>
//         <Link to="/saved-questions" className="card">
//           <i className="fas fa-save"></i>
//           <h3>Saved Questions</h3>
//         </Link>
//         <Link to="/notifications" className="card">
//           <i className="fas fa-bell"></i>
//           <h3>Notifications</h3>
//         </Link>
//         <Link to="/academic-schedule" className="card">
//           <i className="fas fa-calendar-alt"></i>
//           <h3>Academic Schedule</h3>
//         </Link>
//       </section>

//       {/* Learning Bites */}
//       <section className="learning-bites">
//         <h2>Quick Learning Bites</h2>
//         <div className="tiles">
//           <div className="tile">
//             <h4>📄 Resume Tips</h4>
//             <ul>
//               <li>Use active language</li>
//               <li>Highlight achievements</li>
//               <li>Keep to one page</li>
//             </ul>
//           </div>
//           <div className="tile">
//             <h4>💬 Interview Prep</h4>
//             <ul>
//               <li>Tell me about yourself</li>
//               <li>Practice confidently</li>
//               <li>Know your strengths</li>
//             </ul>
//           </div>
//           <div className="tile">
//             <h4>🧠 Skill Building</h4>
//             <ul>
//               <li>LinkedIn Learning</li>
//               <li>Grammarly, Canva</li>
//               <li>Certifications</li>
//             </ul>
//           </div>
//           <div className="tile">
//             <h4>🌐 Talk to Employers</h4>
//             <ul>
//               <li>Be curious</li>
//               <li>Understand the roles</li>
//               <li>Ask insightful questions</li>
//             </ul>
//           </div>
//           <div className="tile">
//             <h4>🧭 Time Management</h4>
//             <ul>
//               <li>Use a calendar app</li>
//               <li>Prioritize tasks</li>
//               <li>Take short breaks</li>
//             </ul>
//           </div>
//           <div className="tile">
//             <h4>🧑‍💼 Professional Etiquette</h4>
//             <ul>
//               <li>Use formal email greetings</li>
//               <li>Dress appropriately</li>
//               <li>Be punctual in meetings</li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Quote Box */}
//       <section className="quote-box">
//         <i className="fas fa-quote-left"></i>
//         <blockquote>
//           Success is not final, failure is not fatal: It is the courage to continue that counts.
//         </blockquote>
//         <span>— Winston Churchill</span>
//       </section>

//       <footer>
//       <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// }




// // src/pages/Dashboard.jsx
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// // import axios from "axios";
// import "../css/d.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {
//   const { loading } = useAuth();

//   // Set the document title once
//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | DASHBOARD";
//   }, []);

//   // While AuthContext is restoring the session, show a loader
//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>;
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

//       <div className="dashboard-page">
//         <section className="cards">
//           <Link to="/profile" className="card">
//             <i className="fas fa-user-circle"></i>
//             <h3>My Profile</h3>
//           </Link>
//           <Link to="/saved-questions" className="card">
//             <i className="fas fa-save"></i>
//             <h3>Saved Questions</h3>
//           </Link>
//           <Link to="/notifications" className="card">
//             <i className="fas fa-bell"></i>
//             <h3>Notifications</h3>
//           </Link>
//           <Link to="/academic-schedule" className="card">
//             <i className="fas fa-calendar-alt"></i>
//             <h3>Academic Schedule</h3>
//           </Link>
//         </section>

//         <section className="learning-bites">
//           <h2>Quick Learning Bites</h2>
//           <div className="tiles">
//             <div className="tile">
//               <h4>📄 Resume Tips</h4>
//               <ul>
//                 <li>Use active language</li>
//                 <li>Highlight achievements</li>
//                 <li>Keep to one page</li>
//               </ul>
//             </div>
//             <div className="tile">
//               <h4>💬 Interview Prep</h4>
//               <ul>
//                 <li>Tell me about yourself</li>
//                 <li>Practice confidently</li>
//                 <li>Know your strengths</li>
//               </ul>
//             </div>
//             <div className="tile">
//               <h4>🧠 Skill Building</h4>
//               <ul>
//                 <li>LinkedIn Learning</li>
//                 <li>Grammarly, Canva</li>
//                 <li>Certifications</li>
//               </ul>
//             </div>
//             <div className="tile">
//               <h4>🌐 Talk to Employers</h4>
//               <ul>
//                 <li>Be curious</li>
//                 <li>Understand the roles</li>
//                 <li>Ask insightful questions</li>
//               </ul>
//             </div>
//             <div className="tile">
//               <h4>🧭 Time Management</h4>
//               <ul>
//                 <li>Use a calendar app</li>
//                 <li>Prioritize tasks</li>
//                 <li>Take short breaks</li>
//               </ul>
//             </div>
//             <div className="tile">
//               <h4>🧑‍💼 Professional Etiquette</h4>
//               <ul>
//                 <li>Use formal email greetings</li>
//                 <li>Dress appropriately</li>
//                 <li>Be punctual in meetings</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         <section className="quote-box">
//           <i className="fas fa-quote-left"></i>
//           <blockquote>
//             Success is not final, failure is not fatal: It is the courage to continue that counts.
//           </blockquote>
//           <span>— Winston Churchill</span>
//         </section>

//         <footer>
//           <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }



// // src/pages/Dashboard.jsx
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "../css/d.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {
//   const { loading } = useAuth();

//   // Set the document title once
//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | DASHBOARD";
//   }, []);

//   // While AuthContext is restoring the session, show a loader
//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>;
//   }

//   // Once loading is false, render the dashboard
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

//       <div className="dashboard-page">
//         {/* Quick Actions */}
//         <section className="cards">
//           <Link to="/profile" className="card">
//             <i className="fas fa-user-circle"></i>
//             <h3>My Profile</h3>
//           </Link>
//           <Link to="/saved-questions" className="card">
//             <i className="fas fa-save"></i>
//             <h3>Saved Questions</h3>
//           </Link>
//           <Link to="/notifications" className="card">
//             <i className="fas fa-bell"></i>
//             <h3>Notifications</h3>
//           </Link>
//           <Link to="/academic-schedule" className="card">
//             <i className="fas fa-calendar-alt"></i>
//             <h3>Academic Schedule</h3>
//           </Link>
//         </section>

//         {/* Learning Bites */}
//         <section className="learning-bites">
//           <h2>Quick Learning Bites</h2>
//           <div className="tiles">
//             {[
//               {
//                 title: "📄 Resume Tips",
//                 items: ["Use active language", "Highlight achievements", "Keep to one page"],
//               },
//               {
//                 title: "💬 Interview Prep",
//                 items: ["Tell me about yourself", "Practice confidently", "Know your strengths"],
//               },
//               {
//                 title: "🧠 Skill Building",
//                 items: ["LinkedIn Learning", "Grammarly, Canva", "Certifications"],
//               },
//               {
//                 title: "🌐 Talk to Employers",
//                 items: ["Be curious", "Understand the roles", "Ask insightful questions"],
//               },
//               {
//                 title: "🧭 Time Management",
//                 items: ["Use a calendar app", "Prioritize tasks", "Take short breaks"],
//               },
//               {
//                 title: "🧑‍💼 Professional Etiquette",
//                 items: ["Use formal email greetings", "Dress appropriately", "Be punctual in meetings"],
//               },
//             ].map(({ title, items }) => (
//               <div key={title} className="tile">
//                 <h4>{title}</h4>
//                 <ul>
//                   {items.map(item => (
//                     <li key={item}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Quote Box */}
//         <section className="quote-box">
//           <i className="fas fa-quote-left"></i>
//           <blockquote>
//             Success is not final, failure is not fatal: It is the courage to continue that counts.
//           </blockquote>
//           <span>— Winston Churchill</span>
//         </section>
//       </div>

//       <footer>
//         <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   );
// }



////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/d.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Dashboard() {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [sessionError, setSessionError] = useState("");
//   const [metrics, setMetrics] = useState({
//     savedQuestions: 0,
//     notifications: 0,
//     upcomingDeadlines: 0,
//   });
//   const [avatarPreview, setAvatarPreview] = useState("");
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | Dashboard";
//     const token = localStorage.getItem("token");
//     if (!user?._id || !token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     setAvatarPreview(user.avatarUrl || "");

//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         // Verify session
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Fetch metrics
//         const resp = await axios.get(`${apiUrl}/api/dashboard/metrics`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMetrics({
//           savedQuestions: resp.data.savedQuestions,
//           notifications: resp.data.notifications,
//           upcomingDeadlines: resp.data.upcomingDeadlines,
//         });
//       } catch (e) {
//         console.error("Dashboard load error:", e);
//         if (e.response?.status === 401) {
//           setSessionError("Session expired. Redirecting to login…");
//           setTimeout(() => navigate("/login", { replace: true }), 2000);
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [user, navigate]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setAvatarPreview(reader.result);
//     reader.readAsDataURL(file);
//     uploadAvatar(file);
//   };

//   const uploadAvatar = async (file) => {
//     setUploading(true);
//     const token = localStorage.getItem("token");
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const form = new FormData();
//     form.append("avatar", file);

//     try {
//       const resp = await axios.post(
//         `${apiUrl}/api/users/${user._id}/avatar`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       login(resp.data.user, token);
//     } catch (err) {
//       console.error("Avatar upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };
//   // State for feedback modal visibility
//     const [feedbackOpen, setFeedbackOpen] = useState(false);
  
//     // State for feedback form data
//     const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       rating: "5",
//       comments: ""
//     });
  
//     // Handle form inputs changing
//     const handleChange = e => {
//       const { name, value } = e.target;
//       setFormData(fd => ({ ...fd, [name]: value }));
//     };
  
//     // Submit feedback to backend
//     const handleSubmit = async e => {
//       e.preventDefault();
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData)
//         });
//         if (!res.ok) throw new Error("Network response was not ok");
//         alert("Thank you for your feedback!");
//         setFormData({ name: "", email: "", rating: "5", comments: "" });
//         setFeedbackOpen(false);
//       } catch (err) {
//         console.error("Feedback submission failed:", err);
//         alert("Failed to submit feedback. Please try again.");
//       }
//     };

//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>;
//   }

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD</title>
     
//            <header className="landing-header">
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

//       {sessionError && <div className="error-banner">{sessionError}</div>}


//       <main className="dashboard-wrapper">
//         {/* Avatar + Welcome */}
//         <section className="avatar-section">
//           <div className="avatar-wrapper">
//             <img
//               src={avatarPreview || "/default-avatar.png"}
//               alt="Your avatar"
//               className={`avatar-img ${uploading ? "uploading" : ""}`}
//             />
//             <button
//               type="button"
//               className="avatar-edit-btn"
//               onClick={() => fileInputRef.current.click()}
//               aria-label="Change avatar"
//             >
//               <i className="fas fa-camera"></i>
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               ref={fileInputRef}
//               className="avatar-input"
//               onChange={handleFileChange}
//             />
//           </div>
//           <h2>Welcome, {user.name}!</h2>
//         </section>

//         {/* Summary Metrics */}
//         <section className="summary-cards one-row">
//           <div className="card metric-card">
//             <i className="fas fa-save icon" />
//             <div>
//               <h3>{metrics.savedQuestions}</h3>
//               <p>Saved Questions</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-bell icon" />
//             <div>
//               <h3>{metrics.notifications}</h3>
//               <p>Notifications</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-calendar-alt icon" />
//             <div>
//               <h3>{metrics.upcomingDeadlines}</h3>
//               <p>Upcoming Deadlines</p>
//             </div>
//           </div>
//         </section>

//         {/* Hero */}
//         <section className="hero">
//           <h2>Your Academic Hub</h2>
//           <p>Everything you need in one place.</p>
//         </section>

//         {/* Quick Actions */}
//         <section className="quick-links">
//           <h3>Quick Actions</h3>
//           <div className="card-grid">
//             <Link to="/profile" className="card action-card">
//               <i className="fas fa-user fa-2x"></i>
//               <span>My Profile</span>
//             </Link>
//             <Link to="/saved-questions" className="card action-card">
//               <i className="fas fa-save fa-2x"></i>
//               <span>Saved Questions</span>
//             </Link>
//             <Link to="/notifications" className="card action-card">
//               <i className="fas fa-bell fa-2x"></i>
//               <span>Notifications</span>
//             </Link>
//             <Link to="/academic-schedule" className="card action-card">
//               <i className="fas fa-calendar-alt fa-2x"></i>
//               <span>Academic Schedule</span>
//             </Link>
//           </div>
//         </section>

//         {/* Learning Bites */}
//         <section className="learning-bites">
//           <h2>Quick Learning Bites</h2>
//           <div className="tiles">
//             {[
//               {
//                 title: "📄 Resume Tips",
//                 items: ["Use active language", "Highlight achievements", "Keep to one page"],
//               },
//               {
//                 title: "💬 Interview Prep",
//                 items: ["Tell me about yourself", "Practice confidently", "Know your strengths"],
//               },
//               {
//                 title: "🧠 Skill Building",
//                 items: ["LinkedIn Learning", "Grammarly, Canva", "Certifications"],
//               },
//               {
//                 title: "🌐 Talk to Employers",
//                 items: ["Be curious", "Understand the roles", "Ask insightful questions"],
//               },
//               {
//                 title: "🧭 Time Management",
//                 items: ["Use a calendar app", "Prioritize tasks", "Take short breaks"],
//               },
//               {
//                 title: "🧑‍💼 Professional Etiquette",
//                 items: [
//                   "Use formal email greetings",
//                   "Dress appropriately",
//                   "Be punctual in meetings",
//                 ],
//               },
//             ].map((bite) => (
//               <div key={bite.title} className="tile">
//                 <h4>{bite.title}</h4>
//                 <ul>
//                   {bite.items.map((it) => (
//                     <li key={it}>{it}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Quote Box */}
//         <section className="quote-box">
//           <i className="fas fa-quote-left"></i>
//           <blockquote>
//             Success is not final, failure is not fatal: It is the courage to continue that counts.
//           </blockquote>
//           <span>— Winston Churchill</span>
//         </section>
//       </main>

//       <footer className="footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
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
//     </>
//   );
// }






//////////////////////////////

// import React, { useEffect, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import Navbar from "../components/Navbar"
// import "../css/d.css"
// import "@fortawesome/fontawesome-free/css/all.min.css"

// export default function Dashboard() {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   // Loading & error state
//   const [loading, setLoading] = useState(true)
//   const [sessionError, setSessionError] = useState("")
//   const [metricsError, setMetricsError] = useState(false)

//   // Default/fallback metrics
//   const [metrics, setMetrics] = useState({
//     activeUsers: 0,
//     savedQuestions: 0,
//     notifications: 0,
//     upcomingDeadlines: 0
//   })

//   // On mount: verify session & fetch metrics
//   useEffect(() => {
//     document.title = "HITEC UNIGUIDE | Dashboard"

//     const token = localStorage.getItem("token")
//     if (!user?._id || !token) {
//       return navigate("/login", { replace: true })
//     }

//     (async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL
//         // 1) Verify session
//         await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//         // 2) Fetch dashboard metrics
//         const resp = await axios.get(`${apiUrl}/api/dashboard/metrics`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//         setMetrics(resp.data)
//       } catch (err) {
//         console.error("Dashboard error:", err)
//         if (err.response?.status === 401) {
//           setSessionError("Session expired. Redirecting to login…")
//           setTimeout(() => navigate("/login", { replace: true }), 2000)
//         } else {
//           setMetricsError(true)
//         }
//       } finally {
//         setLoading(false)
//       }
//     })()
//   }, [user, navigate])

//   if (loading) {
//     return <div className="loader">Loading your dashboard…</div>
//   }

//   return (
//     <>
    
//       {/* Sticky sub‑nav under the main navbar */}
//       <nav className="dashboard-subnav">
//         <ul>
//           <li><Link to="/homepage">Home</Link></li>
//           <li><Link to="/chatbot">Chat</Link></li>
//           <li><Link to="/admissions">Admissions</Link></li>
//           <li><Link to="/events">Events</Link></li>
//           <li><Link to="/tour">Tour</Link></li>
//           <li><Link to="/dashboard">Dashboard</Link></li>
//           <li><Link to="/alumni">Alumni</Link></li>
//           <li><Link to="/industry-integration">Industry Integration</Link></li>
//           <li><Link to="/feedback">Feedback</Link></li>
//         </ul>
//       </nav>

//       <main className="dashboard-wrapper">
//         {/* If session expired, show banner */}
//         {sessionError && (
//           <div className="error-banner">{sessionError}</div>
//         )}

//         {/* If metrics failed, show non‑blocking banner */}
//         {metricsError && (
//           <div className="error-banner">
//             Unable to load some metrics. Showing defaults.
//           </div>
//         )}

//         {/* Hero */}
//         <section className="dashboard-hero">
//           <h1>Welcome back, {user.name}!</h1>
//           <p>Your personalized dashboard at a glance.</p>
//         </section>

//         {/* Summary Metrics */}
//         <section className="summary-cards">
//           <div className="card metric-card">
//             <i className="fas fa-users icon" />
//             <div>
//               <h3>{metrics.activeUsers}</h3>
//               <p>Active Users</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-save icon" />
//             <div>
//               <h3>{metrics.savedQuestions}</h3>
//               <p>Saved Questions</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-bell icon" />
//             <div>
//               <h3>{metrics.notifications}</h3>
//               <p>Notifications</p>
//             </div>
//           </div>
//           <div className="card metric-card">
//             <i className="fas fa-calendar-alt icon" />
//             <div>
//               <h3>{metrics.upcomingDeadlines}</h3>
//               <p>Upcoming Deadlines</p>
//             </div>
//           </div>
//         </section>

//         {/* Quick Actions */}
//         <section className="quick-links">
//           <h2>Quick Actions</h2>
//           <div className="card-grid">
//             <Link to="/profile" className="card action-card">
//               <i className="fas fa-user fa-2x" />
//               <span>My Profile</span>
//             </Link>
//             <Link to="/saved-questions" className="card action-card">
//               <i className="fas fa-save fa-2x" />
//               <span>Saved Questions</span>
//             </Link>
//             <Link to="/notifications" className="card action-card">
//               <i className="fas fa-bell fa-2x" />
//               <span>Notifications</span>
//             </Link>
//             <Link to="/academic-schedule" className="card action-card">
//               <i className="fas fa-calendar-alt fa-2x" />
//               <span>Academic Schedule</span>
//             </Link>
//           </div>
//         </section>
//       </main>
      
//       <footer className="dashboard-footer">
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="dashboard-social-icons">
//           <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//             <i className="fab fa-instagram"></i>
//           </a>
//           <a
//             href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"
//             aria-label="LinkedIn"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>
//       </footer>
//     </>
//   )
// }
