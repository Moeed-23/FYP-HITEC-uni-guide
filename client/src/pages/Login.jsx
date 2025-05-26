// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";  // Use axios for API requests
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:2500/api/auth/login", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, // Ensure cookies are sent if your backend uses sessions
//       });

//       login(response.data.token); // Save token to context
//       localStorage.setItem("token", response.data.token); // Save token to localStorage
//       setMessage("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed!");
//     }
//   };

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | LOGIN</title>
//     <div className="login-container">
//     <header className="landing-header">
//             {/* <h1><a href="landing-page.html" className="brand-link">HITEC UniGude ChatBot</a></h1> */}
//             <nav>
//               <Link to="/homepage">Home</Link>
//               <Link to="/chatbot">Chat</Link>
//               <Link to="/admissions">Admissions</Link>
//               <Link to="/events">Events</Link>
//               <Link to="/tour">Tour</Link>
//               <Link to="/dashboard">Dashboard</Link>
//               <Link to="/alumni">Alumni</Link>
//               <Link to="/industry-integration">Industry Integration</Link>
//               <Link to="/feedback">Feedback</Link>
//             </nav>
//           </header>

//     <section className="login-section">
//       <h2>Login to Your Account</h2>
//       <p>Access your personalized experience by logging into your UniGuide account.</p>
//       <div className="login-form">
//         {message && <p className="message">{message}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//       <a href="/signup" className="auth-button">Don't have an account? Sign Up</a>
//     </section>

//     <footer>
//       <p>&copy; 2025 HITEC University. All rights reserved.</p>
//       <div className="social-icons">
//       <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//         <a href="#"><i className="fab fa-twitter"></i></a>
//         <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//         <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//       </div>
//     </footer>
//   </div>
//   </>
//   );
// };

// export default Login;
///


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ 
//     email: "", 
//     password: "" 
//   });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear messages when user starts typing
//     if (message.text) setMessage({ text: "", type: "" });
//   };

//   const validateForm = () => {
//     if (!formData.email) {
//       setMessage({ text: "Email is required", type: "error" });
//       return false;
//     }

//     if (!formData.email.includes('@')) {
//       setMessage({ text: "Please enter a valid email address", type: "error" });
//       return false;
//     }

//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" });
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be at least 6 characters", type: "error" });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:2500/api/auth/login", 
//         formData, 
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("Login response:", response.data);

//       if (response.data.token) {
//         login(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         setMessage({ text: "Login successful! Redirecting...", type: "success" });

//         // Redirect after a short delay
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1500);
//       } else {
//         throw new Error("No token received");
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       let errorMessage = "Login failed";
//       if (error.response) {
//         errorMessage = error.response.data?.message || 
//                       error.response.statusText || 
//                       `Login failed (${error.response.status})`;
//       } else if (error.request) {
//         errorMessage = "No response from server. Check your network connection.";
//       } else {
//         errorMessage = error.message || "Error setting up login request";
//       }

//       setMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | LOGIN</title>
//       <div className="login-container">
//         <header className="landing-header">
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

//         <section className="login-section">
//           <h2>Login to Your Account</h2>
//           <p>Access your personalized experience by logging into your UniGuide account.</p>

//           <div className="login-form">
//             {message.text && (
//               <div className={`message ${message.type}`}>
//                 {message.text}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//                 <i className="fas fa-envelope input-icon"></i>
//               </div>

//               <div className="form-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//                 <i className="fas fa-lock input-icon"></i>
//                 <button 
//                   type="button" 
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                 </button>
//               </div>

//               <div className="form-options">
//                 <Link to="/forgot-password" className="forgot-password">
//                   Forgot Password?
//                 </Link>
//               </div>

//               <button 
//                 type="submit" 
//                 className="submit-button"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <i className="fas fa-spinner fa-spin"></i> Logging in...
//                   </>
//                 ) : (
//                   "Login"
//                 )}
//               </button>
//             </form>

//             <div className="auth-redirect">
//               Don't have an account? <Link to="/signup">Sign Up</Link>
//             </div>
//           </div>
//         </section>

//         <footer>
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="#" aria-label="Twitter">
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn">
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Login;




///////////////////////////3



// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (message.text) setMessage({ text: "", type: "" });
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" });
//       return false;
//     }

//     if (!emailRegex.test(formData.email)) {
//       setMessage({ text: "Please enter a valid email address", type: "error" });
//       return false;
//     }

//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" });
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setMessage({
//         text: "Password must be at least 6 characters",
//         type: "error"
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         formData,
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         }
//       );

//       if (response.data.token) {
//         login(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         setMessage({
//           text: "Login successful! Redirecting...",
//           type: "success"
//         });

//         setTimeout(() => navigate("/dashboard"), 1500);
//       } else {
//         throw new Error("Authentication failed");
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       let errorMessage = "Login failed. Please try again.";

//       if (error.response) {
//         errorMessage = error.response.data?.message;
//       }
//        else if (error.request) {
//         errorMessage = "No response from server. Check your connection.";
//       } else if (error.message.includes("timeout")) {
//         errorMessage = "Request timed out. Please try again.";
//       }

//       setMessage({
//         text: errorMessage,
//         type: "error",
//         details: error.response?.data?.details
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <title>HITEC | UNIGUIDE | LOGIN</title>

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

//       <main className="login-main">
//         <section className="login-section">
//           <div className="login-card">
//             <div className="login-header">
//               <h2>Login to Your Account</h2>
//               <p>Access your personalized experience at UniGuide</p>
//             </div>

//             <div className="login-form-container">
//               {message.text && (
//                 <div className={`message ${message.type}`}>
//                   <i className={`fas ${message.type === "success" ? "fa-check-circle" :
//                       message.type === "error" ? "fa-exclamation-circle" :
//                         "fa-info-circle"
//                     }`}></i>
//                   <span>{message.text}</span>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="login-form">
//                 <div className="form-group">
//                   <i className="fas fa-envelope input-icon"></i>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="username"
//                     required
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <i className="fas fa-lock input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     disabled={loading}
//                   >
//                     <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                   </button>
//                 </div>

//                 <div className="form-options">
//                   <label className="remember-me">
//                     <input type="checkbox" name="remember" disabled={loading} />
//                     <span>Remember me</span>
//                   </label>
//                   <Link to="/forgot-password" className="forgot-password">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 <button
//                   type="submit"
//                   className="submit-button"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin"></i>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <i className="fas fa-sign-in-alt"></i>
//                       <span>Login</span>
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="auth-redirect">
//                 <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//                 <div className="social-login">
//                   <p>Or login with:</p>
//                   <div className="social-buttons">
//                     <button type="button" className="social-btn google">
//                       <i className="fab fa-google"></i>
//                     </button>
//                     <button type="button" className="social-btn facebook">
//                       <i className="fab fa-facebook-f"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//               <i className="fab fa-facebook-f"></i>
//             </a>
//             <a href="#" aria-label="Twitter">
//               <i className="fab fa-twitter"></i>
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
//     </div>
//   );
// };

// export default Login;



///////////////////////////////////////////
////////////////////////


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (message.text) setMessage({ text: "", type: "" });
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" });
//       return false;
//     }

//     if (!emailRegex.test(formData.email)) {
//       setMessage({ text: "Please enter a valid email address", type: "error" });
//       return false;
//     }

//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" });
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be at least 6 characters", type: "error" });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true
//       });

//       if (response.data.token) {
//         login(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         setMessage({ text: "Login successful! Redirecting...", type: "success" });

//         setTimeout(() => navigate("/dashboard"), 1500);
//       } else {
//         throw new Error("Authentication failed");
//       }
//     } catch (error) {
//       let errorMessage = "Login failed. Please try again.";

//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//       } else if (error.request) {
//         errorMessage = "No response from server. Check your connection.";
//       } else if (error.message.includes("timeout")) {
//         errorMessage = "Request timed out. Please try again.";
//       }

//       setMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <title>HITEC | UNIGUIDE | LOGIN</title>

//       {/* Navigation Header */}
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

//       {/* Main Login Section */}
//       <main className="login-main">
//         <section className="login-section">
//           <div className="login-card">
//             <div className="login-header">
//               <h2>Login to Your Account</h2>
//               <p>Access your personalized experience at HITEC UNIGUIDE.</p>
//             </div>

//             <div className="login-form-container">
//               {message.text && (
//                 <div
//                   className={`message ${message.type}`}
//                   aria-live="polite"
//                   role="alert"
//                 >
//                   <i
//                     className={`fas ${
//                       message.type === "success"
//                         ? "fa-check-circle"
//                         : "fa-exclamation-circle"
//                     }`}
//                   ></i>
//                   <span>{message.text}</span>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="login-form" noValidate>
//                 <div className="form-group">
//                   <i className="fas fa-envelope input-icon"></i>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="username"
//                     required
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <i className="fas fa-lock input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     disabled={loading}
//                   >
//                     <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                   </button>
//                 </div>

//                 <div className="form-options">
//                   <label className="remember-me">
//                     <input type="checkbox" name="remember" disabled={loading} />
//                     <span>Remember me</span>
//                   </label>
//                   <Link to="/forgot-password" className="forgot-password">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 <button type="submit" className="submit-button" disabled={loading}>
//                   {loading ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin"></i>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <i className="fas fa-sign-in-alt"></i>
//                       <span>Login</span>
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="auth-redirect">
//                 <p>
//                   Don't have an account? <Link to="/signup">Sign Up</Link>
//                 </p>
//                 {/* <div className="social-login">
//                   <p>Or login with:</p>
//                   <div className="social-buttons">
//                     <button
//                       type="button"
//                       className="social-btn google"
//                       onClick={() => handleSocialLogin("Google")}
//                     >
//                       <i className="fab fa-google"></i>
//                     </button>
//                     <button
//                       type="button"
//                       className="social-btn facebook"
//                       onClick={() => handleSocialLogin("Facebook")}
//                     >
//                       <i className="fab fa-facebook-f"></i>
//                     </button>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook">
//               <i className="fab fa-facebook-f"></i>
//             </a>

//             <a
//               href="https://www.instagram.com/hitecuni/?hl=en"
//               aria-label="Instagram"
//             >
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a
//               href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"
//               aria-label="LinkedIn"
//             >
//               <i className="fab fa-linkedin-in"></i>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Login;



///////////////////////////////////////
///////////////


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (message.text) setMessage({ text: "", type: "" });
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" });
//       return false;
//     }
//     if (!emailRegex.test(formData.email)) {
//       setMessage({ text: "Please enter a valid email address", type: "error" });
//       return false;
//     }
//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" });
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be at least 6 characters", type: "error" });
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true
//       });

//       if (response.data.token) {
//         // Pass the complete user object plus the token
//         login(response.data, response.data.token);
//         setMessage({ text: "Login successful! Redirecting...", type: "success" });

//         setTimeout(() => navigate("/dashboard"), 1500);
//       } else {
//         throw new Error("Authentication failed");
//       }
//     } catch (error) {
//       let errorMessage = "Login failed. Please try again.";
//       if (error.response) {
//         errorMessage = error.response.data?.message || errorMessage;
//       } else if (error.request) {
//         errorMessage = "No response from server. Check your connection.";
//       } else if (error.message.includes("timeout")) {
//         errorMessage = "Request timed out. Please try again.";
//       }
//       setMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <title>HITEC | UNIGUIDE | LOGIN</title>

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


//       <main className="login-main">
//         <section className="login-section">
//           <div className="login-card">
//             <div className="login-header">
//               <h2>Login to Your Account</h2>
//               <p>Access your personalized experience at HITEC UNIGUIDE.</p>
//             </div>

//             <div className="login-form-container">
//               {message.text && (
//                 <div className={`message ${message.type}`} aria-live="polite" role="alert">
//                   <i className={`fas ${message.type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
//                   <span>{message.text}</span>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="login-form" noValidate>
//                 <div className="form-group">
//                   <i className="fas fa-envelope input-icon"></i>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="username"
//                     required
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <i className="fas fa-lock input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     disabled={loading}
//                   >
//                     <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                   </button>
//                 </div>

//                 <div className="form-options">
//                   <label className="remember-me">
//                     <input type="checkbox" name="remember" disabled={loading} />
//                     <span>Remember me</span>
//                   </label>
//                   <Link to="/forgot-password" className="forgot-password">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 <button type="submit" className="submit-button" disabled={loading}>
//                   {loading ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin"></i>
//                       <span>Logging in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <i className="fas fa-sign-in-alt"></i>
//                       <span>Login</span>
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="auth-redirect">
//                 <p>
//                   Don't have an account? <Link to="/signup">Sign Up</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
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
//     </div>
//   );
// };

// export default Login;




/////////////////////////////////////////////////////////////////////////////////////////




// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import "../css/login.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export default function Login() {
//   const [formData,    setFormData]    = useState({ email:"", password:"" });
//   const [message,     setMessage]     = useState({ text:"", type:"" });
//   const [loading,     setLoading]     = useState(false);
//   const [showPassword,setShowPassword]= useState(false);
//   const { login }      = useAuth();
//   const navigate      = useNavigate();

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (message.text) setMessage({ text:"", type:"" });
//   };

//   const validateForm = () => {
//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim())          return setMessage({ text:"Email is required",            type:"error" }), false;
//     if (!emailRe.test(formData.email))   return setMessage({ text:"Enter a valid email address", type:"error" }), false;
//     if (!formData.password)              return setMessage({ text:"Password is required",         type:"error" }), false;
//     if (formData.password.length < 6)    return setMessage({ text:"Password must be ≥ 6 characters", type:"error" }), false;
//     return true;
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const resp   = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         formData,
//         { headers:{ "Content-Type":"application/json" }, withCredentials:true }
//       );

//       const { user: userData, token } = resp.data;
//       if (!userData || !token) throw new Error("Invalid server response");

//       await login(userData, token);
//       setMessage({ text:"Login successful! Redirecting…", type:"success" });
//       setTimeout(() => navigate("/dashboard", { replace:true }), 1000);

//     } catch (err) {
//       let txt = "Login failed. Please try again.";
//       if (err.response) txt = err.response.data?.message || txt;
//       else if (err.request) txt = "No response from server. Check your connection.";
//       else txt = err.message;
//       setMessage({ text: txt, type:"error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <title>HITEC | UNIGUIDE | LOGIN</title>
//       <header className="landing-header">
//       <nav className="dashboard-nav">
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

//       <main className="login-main">
//         <section className="login-section">
//           <div className="login-card">
//             <div className="login-header">
//               <h2>Login to Your Account</h2>
//               <p>Access your personalized experience at HITEC UNIGUIDE.</p>
//             </div>

//             <div className="login-form-container">
//               {message.text && (
//                 <div className={`message ${message.type}`} role="alert" aria-live="polite">
//                   <i className={`fas ${message.type==="success"?"fa-check-circle":"fa-exclamation-circle"}`}></i>
//                   <span>{message.text}</span>
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="login-form" noValidate>
//                 {/* Email */}
//                 <div className="form-group">
//                   <i className="fas fa-envelope input-icon"></i>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="username"
//                     required
//                   />
//                 </div>

//                 {/* Password */}
//                 <div className="form-group password-group">
//                   <i className="fas fa-lock input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     disabled={loading}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(p => !p)}
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     disabled={loading}
//                   >
//                     <i className={`fas ${showPassword?"fa-eye-slash":"fa-eye"}`}></i>
//                   </button>
//                 </div>

//                 {/* Options */}
//                 <div className="form-options">
//                   <label className="remember-me">
//                     <input type="checkbox" name="remember" disabled={loading} />
//                     <span>Remember me</span>
//                   </label>
//                   <Link to="/forgot-password" className="forgot-password">
//                     Forgot Password?
//                   </Link>
//                 </div>

//                 {/* Submit */}
//                 <button type="submit" className="submit-button" disabled={loading}>
//                   {loading
//                     ? <><i className="fas fa-spinner fa-spin"></i><span>Logging in...</span></>
//                     : <><i className="fas fa-sign-in-alt"></i><span>Login</span></>
//                   }
//                 </button>
//               </form>

//               <div className="auth-redirect">
//                 <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="landing-footer">
//         {/* …footer social icons… */}
//       </footer>
//     </div>
//   );
// }







// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import "../css/login.css"
// import "@fortawesome/fontawesome-free/css/all.min.css"

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" })
//   const [message, setMessage]     = useState({ text: "", type: "" })
//   const [loading, setLoading]     = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const { login } = useAuth()
//   const navigate  = useNavigate()

//   // set page title
//   useEffect(() => {
//     document.title = "HITEC UNIGUIDE | Login"
//   }, [])

//   const handleChange = e => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (message.text) setMessage({ text: "", type: "" })
//   }

//   const validateForm = () => {
//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" })
//       return false
//     }
//     if (!emailRe.test(formData.email)) {
//       setMessage({ text: "Enter a valid email address", type: "error" })
//       return false
//     }
//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" })
//       return false
//     }
//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be at least 6 characters", type: "error" })
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!validateForm()) return
//     setLoading(true)

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL
//       const resp = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         formData,
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       )

//       const { user: userData, token } = resp.data
//       if (!userData || !token) throw new Error("Invalid server response")

//       await login(userData, token)
//       setMessage({ text: "Login successful! Redirecting…", type: "success" })
//       setTimeout(() => navigate("/dashboard", { replace: true }), 1000)

//     } catch (err) {
//       let txt = "Login failed. Please try again."
//       if (err.response) txt = err.response.data?.message || txt
//       else if (err.request) txt = "No response from server. Check your connection."
//       else txt = err.message
//       setMessage({ text: txt, type: "error" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="login-page">
//       <main className="login-container" aria-labelledby="login-heading">
//         <section className="login-card" role="form">
//           <header className="login-header">
//             <h1 id="login-heading">Sign in to HITEC UNIGUIDE</h1>
//             <p>Welcome back! Enter your credentials to continue.</p>
//           </header>

//           {message.text && (
//             <div
//               className={`message ${message.type}`}
//               role="alert"
//               aria-live="polite"
//             >
//               <i
//                 className={`fas ${
//                   message.type === "success"
//                     ? "fa-check-circle"
//                     : "fa-exclamation-circle"
//                 }`}
//               ></i>
//               <span>{message.text}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="login-form" noValidate>
//             {/* Email */}
//             <div className="form-group">
//               <label htmlFor="email" className="visually-hidden">
//                 Email Address
//               </label>
//               <i className="fas fa-envelope input-icon" />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={loading}
//                 autoComplete="username"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="form-group password-group">
//               <label htmlFor="password" className="visually-hidden">
//                 Password
//               </label>
//               <i className="fas fa-lock input-icon" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 disabled={loading}
//                 autoComplete="current-password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(p => !p)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 disabled={loading}
//               >
//                 <i
//                   className={`fas ${
//                     showPassword ? "fa-eye-slash" : "fa-eye"
//                   }`}
//                 />
//               </button>
//             </div>

//             {/* Options */}
//             <div className="form-options">
//               <label className="remember-me">
//                 <input
//                   type="checkbox"
//                   name="remember"
//                   disabled={loading}
//                 />
//                 <span>Remember me</span>
//               </label>
//               <Link
//                 to="/forgot-password"
//                 className="forgot-password"
//                 aria-disabled={loading}
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="submit-button"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin" /> Logging in…
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-sign-in-alt" /> Login
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="auth-redirect">
//             <p>
//               Don’t have an account?{" "}
//               <Link to="/signup">Sign Up</Link>
//             </p>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }




/////////////////////////////////////////////////////////////////////////////////




// // src/pages/Login.jsx
// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import "../css/login.css"
// import "@fortawesome/fontawesome-free/css/all.min.css"

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" })
//   const [message, setMessage] = useState({ text: "", type: "" })
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const { login } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | Login"
//   }, [])

//   const handleChange = e => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (message.text) setMessage({ text: "", type: "" })
//   }

//   const validateForm = () => {
//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" })
//       return false
//     }
//     if (!emailRe.test(formData.email)) {
//       setMessage({ text: "Enter a valid email address", type: "error" })
//       return false
//     }
//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" })
//       return false
//     }
//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be ≥ 6 characters", type: "error" })
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!validateForm()) return
//     setLoading(true)

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL
//       const resp = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         formData,
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       )

//       // Inspect what the server actually sent you
//       console.log("💡 login response:", resp.data)

//       // Normalize common payload shapes
//       const payload = resp.data.data || resp.data || {}
//       const userData = payload.user    // e.g. { user, token }
//         || payload.userData // e.g. { userData, authToken }
//         || payload          // fallback
//       const token = payload.token
//         || payload.authToken

//       if (!userData || !token) {
//         console.error("Malformed login response:", resp.data)
//         throw new Error("Invalid server response")
//       }

//       await login(userData, token)
//       setMessage({ text: "Login successful! Redirecting…", type: "success" })
//       setTimeout(() => navigate("/dashboard", { replace: true }), 1000)

//     } catch (err) {
//       let txt = "Login failed. Please try again."
//       if (err.response) txt = err.response.data?.message || txt
//       else if (err.request) txt = "No response from server. Check your connection."
//       else txt = err.message
//       setMessage({ text: txt, type: "error" })
//     } finally {
//       setLoading(false)
//     }
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
//       <div className="login-page">
//         <main className="login-main">
//           <section className="login-section">
//             <div className="login-card">
//               <div className="login-header">
//                 <h2>Login to Your Account</h2>
//                 <p>Access your personalized experience at HITEC UNIGUIDE.</p>
//               </div>

//               <div className="login-form-container">
//                 {message.text && (
//                   <div
//                     className={`message ${message.type}`}
//                     role="alert"
//                     aria-live="polite"
//                   >
//                     <i
//                       className={`fas ${message.type === "success"
//                           ? "fa-check-circle"
//                           : "fa-exclamation-circle"
//                         }`}
//                     />
//                     <span>{message.text}</span>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="login-form" noValidate>
//                   {/* Email */}
//                   <div className="form-group">
//                     <i className="fas fa-envelope input-icon" />
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email Address"
//                       value={formData.email}
//                       onChange={handleChange}
//                       disabled={loading}
//                       autoComplete="username"
//                       required
//                     />
//                   </div>

//                   {/* Password */}
//                   <div className="form-group password-group">
//                     <i className="fas fa-lock input-icon" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       disabled={loading}
//                       autoComplete="current-password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="password-toggle"
//                       onClick={() => setShowPassword(p => !p)}
//                       aria-label={showPassword ? "Hide password" : "Show password"}
//                       disabled={loading}
//                     >
//                       <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
//                     </button>
//                   </div>

//                   {/* Options */}
//                   {/* <div className="form-options"> */}
//                     {/* <label className="remember-me">
//                     <input type="checkbox" name="remember" disabled={loading} />
//                     <span>Remember me</span>
//                   </label> */}
//                     {/* <Link to="/forgot-password" className="forgot-password">
//                       Forgot Password?
//                     </Link>
//                   </div> */}

//                   {/* Submit */}
//                   <button type="submit" className="submit-button" disabled={loading}>
//                     {loading ? (
//                       <>
//                         <i className="fas fa-spinner fa-spin" /> Logging in…
//                       </>
//                     ) : (
//                       <>
//                         <i className="fas fa-sign-in-alt" /> Login
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 <div className="auth-redirect">
//                   <p>
//                     Don’t have an account? <Link to="/signup">Sign Up</Link>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//       <footer>
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>

//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   )
// }







// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import axios from "axios"
// import "../css/login.css"
// import "@fortawesome/fontawesome-free/css/all.min.css"

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" })
//   const [message, setMessage] = useState({ text: "", type: "" })
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const { login } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     document.title = "HITEC | UNIGUIDE | Login"
//   }, [])

//   const handleChange = e => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (message.text) setMessage({ text: "", type: "" })
//   }

//   const validateForm = () => {
//     const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!formData.email.trim()) {
//       setMessage({ text: "Email is required", type: "error" })
//       return false
//     }
//     if (!emailRe.test(formData.email)) {
//       setMessage({ text: "Enter a valid email address", type: "error" })
//       return false
//     }
//     if (!formData.password) {
//       setMessage({ text: "Password is required", type: "error" })
//       return false
//     }
//     if (formData.password.length < 6) {
//       setMessage({ text: "Password must be ≥ 6 characters", type: "error" })
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     if (!validateForm()) return
//     setLoading(true)

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL
//       const resp = await axios.post(
//         `${apiUrl}/api/auth/login`,
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true
//         }
//       )

//       console.log("💡 login response:", resp.data)

//       const payload = resp.data.data || resp.data || {}
//       const userData = payload.user || payload.userData || payload
//       const token = payload.token || payload.authToken

//       if (!userData || !token) {
//         console.error("Malformed login response:", resp.data)
//         throw new Error("Invalid server response")
//       }

//       await login(userData, token)
//       setMessage({ text: "Login successful! Redirecting…", type: "success" })
//       setTimeout(() => navigate("/dashboard", { replace: true }), 1000)

//     } catch (err) {
//       let txt = "Login failed. Please try again."
//       if (err.response) txt = err.response.data?.message || txt
//       else if (err.request) txt = "No response from server. Check your connection."
//       else txt = err.message
//       setMessage({ text: txt, type: "error" })
//     } finally {
//       setLoading(false)
//     }
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

//       <div className="login-page">
//         <main className="login-main">
//           <section className="login-section">
//             <div className="login-card">
//               <div className="login-header">
//                 <h2>Login to Your Account</h2>
//                 <p>Access your personalized experience at HITEC UNIGUIDE.</p>
//               </div>

//               <div className="login-form-container">
//                 {message.text && (
//                   <div className={`message ${message.type}`}>
//                     {message.text}
//                   </div>
//                 )}

//                 <form className="login-form" onSubmit={handleSubmit}>
//                   {/* Email Field */}
//                   <div className="login-form__field">
//                     <i className="fas fa-envelope login-form__icon" />
//                     <input
//                       className="login-form__input"
//                       type="email"
//                       name="email"
//                       placeholder="Email Address"
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Password Field */}
//                   <div className="login-form__field login-form__field--password">
//                     <i className="fas fa-lock login-form__icon" />
//                     <button
//                       type="button"
//                       className="login-form__toggle"
//                       onClick={() => setShowPassword(s => !s)}
//                     >
//                       <i className={`fas fa-eye${showPassword ? "-slash" : ""}`} />
//                     </button>
//                     <input
//                       className="login-form__input"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="Password"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* Options
//                   <div className="form-options">
//                     <label className="remember-me">
//                       <input type="checkbox" />
//                       Remember me
//                     </label>
//                     <Link to="/forgot-password" className="forgot-password">
//                       Forgot Password?
//                     </Link>
//                   </div> */}

//                   {/* Submit */}
//                   <button
//                     type="submit"
//                     className="submit-button"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <span className="spinner" />
//                     ) : (
//                       <>
//                         <i className="fas fa-sign-in-alt" />
//                         Login
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 <div className="auth-redirect">
//                   Don’t have an account? <Link to="/signup">Sign Up</Link>
//                 </div>

//                 {/* (optional) Social Login
//                 <div className="social-login">
//                   <p>Or sign in with</p>
//                   <div className="social-buttons">
//                     <button className="social-btn google">
//                       <i className="fab fa-google" />
//                     </button>
//                     <button className="social-btn facebook">
//                       <i className="fab fa-facebook-f" />
//                     </button>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>

//       <footer className="footer">
//       <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
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
//   )
// }





// src/pages/Login.jsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import "../css/login.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "../css/Header.css"

export default function Login() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message,  setMessage]  = useState({ text: "", type: "" })
  const [loading,  setLoading]  = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login }  = useAuth()
  const navigate   = useNavigate()

  useEffect(() => {
    document.title = "HITEC | UNIGUIDE | LOGIN"
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (message.text) setMessage({ text: "", type: "" })
  }

  const validateForm = () => {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      setMessage({ text: "Email is required", type: "error" })
      return false
    }
    if (!emailRe.test(formData.email)) {
      setMessage({ text: "Enter a valid email address", type: "error" })
      return false
    }
    if (!formData.password) {
      setMessage({ text: "Password is required", type: "error" })
      return false
    }
    if (formData.password.length < 6) {
      setMessage({ text: "Password must be ≥ 6 characters", type: "error" })
      return false
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const resp = await axios.post(
        `${apiUrl}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      )

      // 1) Log the raw response so you can see avatar:
      console.log("🔍 login raw response:", resp.data)

      // 2) Extract payload, userData, and token:
      const payload  = resp.data.data || resp.data || {}
      const userData = payload.user || payload.userData || payload
      const token    = payload.token || payload.authToken

      if (!userData || !token) {
        console.error("Malformed login response:", resp.data)
        throw new Error("Invalid server response")
      }

      // 3) Perform login → this sets user (including avatar) in context:
      await login(userData, token)

      setMessage({ text: "Login successful! Redirecting…", type: "success" })
      setTimeout(() => navigate("/dashboard", { replace: true }), 1000)

    } catch (err) {
      let txt = "Login failed. Please try again."
      if (err.response)      txt = err.response.data?.message || txt
      else if (err.request)  txt = "No response from server. Check your connection."
      else                   txt = err.message
      setMessage({ text: txt, type: "error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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

      <div className="login-page">
        <main className="login-main">
          <section className="login-section">
            <div className="login-card">
              <div className="login-header">
                <h2>Login to Your Account</h2>
                <p>Access your personalized experience at HITEC UNIGUIDE.</p>
              </div>

              <div className="login-form-container">
                {message.text && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="login-form__field">
                    <i className="fas fa-envelope login-form__icon" />
                    <input
                      className="login-form__input"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="login-form__field login-form__field--password">
                    <i className="fas fa-lock login-form__icon" />
                    <button
                      type="button"
                      className="login-form__toggle"
                      onClick={() => setShowPassword(s => !s)}
                    >
                      <i className={`fas fa-eye${showPassword ? "-slash" : ""}`} />
                    </button>
                    <input
                      className="login-form__input"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner" />
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt" />
                        Login
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-redirect">
                  Don’t have an account? <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </div>
          </section>
        </main>
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
  )
}
