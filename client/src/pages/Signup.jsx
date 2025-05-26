// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../api"; // Ensure API is correctly imported
// import "../css/signup.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await API.post("http://localhost:2500/api/auth/signup", formData);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Signup failed!");
//     }
//   };

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | SIGNUP</title>
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

//       <section className="signup-section">
//         <h2>Create Your Account</h2>
//         <p>Fill in the details to sign up and access your personalized experience at UniGuide.</p>
//         <div className="signup-form">
//           <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
//             <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
//             <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
//             <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} />

//             <div className="terms-checkbox">
//               <label htmlFor="terms">
//                 <input type="checkbox" id="terms" name="terms" required />
//                 <span>I have read <a href="#">Terms & Conditions</a> and agree</span>
//               </label>
//             </div>

//             <br />
//             <button type="submit">Sign Up</button>
//           </form>
//           {message && <p className="message">{message}</p>}
//         </div>
//         <a href="/login" className="auth-button">Already have an account? Log in</a>
//       </section>

//       <footer>
//         <p>&copy; 2025 HITEC University. All rights reserved.</p>
//         <div className="social-icons">
//           <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f"></i></a>
//           <a href="#"><i className="fab fa-twitter"></i></a>
//           <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram"></i></a>
//           <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all"><i className="fab fa-linkedin-in"></i></a>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default SignUp;


///

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api";
// import "../css/signup.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/im;

//     if (!formData.name.trim()) newErrors.name = "Full name is required";
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }
//     if (formData.phone && !phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//     }
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const checkPasswordStrength = (password) => {
//     if (password.length === 0) return "";
//     if (password.length < 6) return "weak";
//     if (password.length < 10) return "medium";
//     return "strong";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }

//     if (name === "password") {
//       setPasswordStrength(checkPasswordStrength(value));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const response = await API.post("http://localhost:2500/api/auth/signup", formData);
//       setMessage({ text: response.data.message, type: "success" });

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
//       setMessage({ text: errorMsg, type: "error" });

//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <title>HITEC | UNIGUIDE | SIGNUP</title>

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

//       <section className="signup-section">
//         <div className="signup-container">
//           <div className="signup-header">
//             <h2>Create Your Account</h2>
//             <p>Fill in the details to sign up and access your personalized experience at HITEC UNIGUIDE.</p>
//           </div>

//           <div className="signup-form">
//             {message.text && (
//               <div className={`message ${message.type}`}>
//                 {message.text}
//                 {message.type === "success" && <i className="fas fa-check-circle"></i>}
//                 {message.type === "error" && <i className="fas fa-exclamation-circle"></i>}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={errors.name ? "error" : ""}
//                 />
//                 {errors.name && <span className="error-message"><i className="fas fa-exclamation-circle"></i> {errors.name}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={errors.email ? "error" : ""}
//                 />
//                 {errors.email && <span className="error-message"><i className="fas fa-exclamation-circle"></i> {errors.email}</span>}
//               </div>

//               <div className="form-group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={errors.password ? "error" : ""}
//                   id="password-field"
//                 />
//                 <button
//                   type="button"
//                   className="passsword-toggle_1"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   aria-controls="password-field"
//                 >
//                   <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                 </button>
//                 {errors.password && <span className="error-message"><i className="fas fa-exclamation-circle"></i> {errors.password}</span>}
//                 {formData.password && (
//                   <div className="password-strength">
//                     <div className={`strength-bar ${passwordStrength}`}></div>
//                   </div>
//                 )}
//               </div>

//               <div className="form-group">
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number (Optional)"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className={errors.phone ? "error" : ""}
//                 />
//                 {errors.phone && <span className="error-message"><i className="fas fa-exclamation-circle"></i> {errors.phone}</span>}
//               </div>

//               <div className="terms-checkbox">
//                 <label htmlFor="terms">
//                   <input type="checkbox" id="terms" name="terms" required />
//                   <span>I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link></span>
//                 </label>
//               </div>

//               <button type="submit" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <i className="fas fa-spinner fa-spin"></i> Processing...
//                   </>
//                 ) : (
//                   "Sign Up"
//                 )}
//               </button>
//             </form>

//             <div className="auth-redirect">
//               Already have an account? <Link to="/login">Log in</Link>
//             </div>

//             {/* <div className="social-signup">
//               <p>Or sign up with:</p>
//               <div className="social-icons">
//                 <button type="button" className="social-btn google">
//                   <i className="fab fa-google"></i> Google
//                 </button>
//                 <button type="button" className="social-btn facebook">
//                   <i className="fab fa-facebook-f"></i> Facebook
//                 </button>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>

//             <a href="https://www.instagram.com/hitecuni/?hl=en" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SignUp;






//////////


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../css/signup.css";
import "../css/Header.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignUp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: false, // Field for terms acceptance
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/im;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: fieldValue });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Send the complete formData including confirmPassword to the server
      const response = await API.post("http://localhost:2500/api/auth/signup", formData);
      setMessage({ text: response.data.message, type: "success" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup error response:", error.response);
      const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
      setMessage({ text: errorMsg, type: "error" });
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>HITEC | UNIGUIDE | SIGNUP</title>

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

      <div className="signup-page">
        <section className="signup-section">
          <div className="signup-container">
            <div className="signup-header-text">
              <h2>Create Your Account</h2>
              <p>
                Fill in the details to sign up and access your personalized
                experience at HITEC UNIGUIDE.
              </p>
            </div>

            <div className="signup-form-container">
              {message.text && (
                <div className={`signup-message ${message.type}`}>
                  {message.text}
                  {message.type === "success" && (
                    <i className="fas fa-check-circle"></i>
                  )}
                  {message.type === "error" && (
                    <i className="fas fa-exclamation-circle"></i>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="signup-form-group signup-icon-field">
                  <i className="fas fa-user signup-input-icon"></i>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "signup-error signup-with-icon" : "signup-with-icon"}
                  />
                  {errors.firstName && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.firstName}
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div className="signup-form-group signup-icon-field">
                  <i className="fas fa-user signup-input-icon"></i>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "signup-error signup-with-icon" : "signup-with-icon"}
                  />
                  {errors.lastName && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.lastName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="signup-form-group signup-icon-field">
                  <i className="fas fa-envelope signup-input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "signup-error signup-with-icon" : "signup-with-icon"}
                  />
                  {errors.email && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="signup-form-group signup-icon-field signup-password-group">
                  <i className="fas fa-lock signup-input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "signup-error signup-with-icon" : "signup-with-icon"}
                    id="signup-password-field"
                  />
                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-controls="signup-password-field"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                  {errors.password && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.password}
                    </span>
                  )}
                  {formData.password && (
                    <div className="signup-password-strength">
                      <div className={`signup-strength-bar ${passwordStrength}`}></div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="signup-form-group signup-icon-field">
                  <i className="fas fa-lock signup-input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "signup-error signup-with-icon" : "signup-with-icon"}
                  />
                  {errors.confirmPassword && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div className="signup-form-group signup-icon-field">
                  <i className="fas fa-phone signup-input-icon"></i>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "signup-error signup-with-icon" : "signup-with-icon"}
                  />
                  {errors.phone && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="signup-terms-checkbox">
                  <label htmlFor="termsAccepted">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and{" "}
                      <Link to="/privacy">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <span className="signup-error-message">
                      <i className="fas fa-exclamation-circle"></i> {errors.termsAccepted}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="signup-submit-button">
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Processing...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="signup-auth-redirect">
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="signup-footer">
          <div className="signup-footer-content">
          <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
            <div className="signup-social-icons">
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
      </div>
    </>
  );
};

export default SignUp;

