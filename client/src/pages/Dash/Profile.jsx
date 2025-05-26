// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProfileData(response.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         profileData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSuccess("Profile updated successfully.");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>My Profile</h2>
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name: </label>
//           <input
//             type="text"
//             value={profileData.name || ""}
//             onChange={(e) =>
//               setProfileData({ ...profileData, name: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             value={profileData.email || ""}
//             onChange={(e) =>
//               setProfileData({ ...profileData, email: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


//////////////////////////////////////////////


// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   // Initialize with empty fields to avoid undefined errors
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfileData(response.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, profileData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <>
//     <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>
//     <div>
//       <h2>My Profile</h2>
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name: </label>
//           <input
//             type="text"
//             value={profileData.firstName || ""}
//             onChange={(e) =>
//               setProfileData({ ...profileData, firstName: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label>Last Name: </label>
//           <input
//             type="text"
//             value={profileData.lastName || ""}
//             onChange={(e) =>
//               setProfileData({ ...profileData, lastName: e.target.value })
//             }
//           />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             value={profileData.email || ""}
//             onChange={(e) =>
//               setProfileData({ ...profileData, email: e.target.value })
//             }
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default Profile;



////////////////////////////////////

// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../css/dash/profile.css";

// const Profile = () => {
  // const { user } = useAuth();
//   const navigate = useNavigate();

//   // State to hold profile details
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Set the profile data; note that for security reasons password is not fetched.
//         setProfileData({
//           firstName: response.data.firstName || "",
//           lastName: response.data.lastName || "",
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           password: "" // kept empty since it is not retrieved from the backend
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   // Handle form submission in edit mode
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       // Update the user details (email is not being updated)
//       await axios.put(`${apiUrl}/api/users/${user._id}`, profileData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       // Return to read-only view after updating
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   // Toggle to edit mode
//   const handleEdit = () => {
//     setEditMode(true);
//     // Clear any previous messages
//     setError("");
//     setSuccess("");
//   };

//   // Cancel edit and go back to display mode
//   const handleCancel = () => {
//     setEditMode(false);
//     // Optionally, you could re-fetch the original details if the user cancels editing
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div>{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>
//       <div className="user-profile">
//         {!editMode ? (
//           // Read-only view of profile details
//           <>
//             <h2>My Profile</h2>
//             <div>
//               <strong>First Name:</strong> {profileData.firstName}
//             </div>
//             <div>
//               <strong>Last Name:</strong> {profileData.lastName}
//             </div>
//             <div>
//               <strong>Email:</strong> {profileData.email}
//             </div>
//             <div>
//               <strong>Phone Number:</strong> {profileData.phone}
//             </div>
//             <div>
//               <strong>Password:</strong> {profileData.password ? "********" : "Not Set"}
//             </div>
//             <button type="button" onClick={handleEdit}>Edit personal details</button>
//           </>
//         ) : (
//           // Edit mode: allow updating first name, last name, phone number, and password.
//           <div>
//             <h2>Updata Personal Information</h2>
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>First Name: </label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div>
//                 <label>Last Name: </label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div>
//                 <label>Phone Number: </label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div>
//                 <label>Password: </label>
//                 <input
//                   type="password"
//                   value={profileData.password}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, password: e.target.value })
//                   }
//                   placeholder="Enter new password (optional)"
//                 />
//               </div>
//               <div>
//                 <label>Email: </label>
//                 {/* Email is fixed and not editable */}
//                 <span>{profileData.email}</span>
//               </div>
//               <button type="submit">Update Profile</button>
//               <button type="button" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Profile;



//////////////////////////////////////////////////////////////////////////////////////////////



// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../css/dash/profile.css";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // State to hold profile details
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Set the profile data; password is intentionally kept empty
//         setProfileData({
//           firstName: response.data.firstName || "",
//           lastName: response.data.lastName || "",
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           password: ""
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   // Handle form submission in edit mode to update only non-empty fields
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     // Build an update payload with only non-empty fields.
//     // Fields left empty will be excluded so they remain unchanged.
//     const updatePayload = {};
//     if (profileData.firstName.trim() !== "") {
//       updatePayload.firstName = profileData.firstName;
//     }
//     if (profileData.lastName.trim() !== "") {
//       updatePayload.lastName = profileData.lastName;
//     }
//     if (profileData.phone.trim() !== "") {
//       updatePayload.phone = profileData.phone;
//     }
//     // Only update password if a new one is provided.
//     if (profileData.password.trim() !== "") {
//       updatePayload.password = profileData.password;
//     }
//     // The email field is fixed; it will not be updated.

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, updatePayload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       // Optionally, you can update the state here if needed before leaving edit mode.
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   // Toggle to edit mode
//   const handleEdit = () => {
//     setEditMode(true);
//     // Clear any previous messages
//     setError("");
//     setSuccess("");
//   };

//   // Cancel edit and go back to display mode
//   const handleCancel = () => {
//     setEditMode(false);
//     // Optionally, re-fetch original data if needed
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div>{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>
//       <div className="user-profile">
//         {!editMode ? (
//           // Read-only view of profile details
//           <>
//             <h2>My Profile</h2>
//             <div>
//               <strong>First Name:</strong> {profileData.firstName}
//             </div>
//             <div>
//               <strong>Last Name:</strong> {profileData.lastName}
//             </div>
//             <div>
//               <strong>Email:</strong> {profileData.email}
//             </div>
//             <div>
//               <strong>Phone Number:</strong> {profileData.phone}
//             </div>
//             <div>
//               <strong>Password:</strong> {profileData.password ? "********" : "Not Set"}
//             </div>
//             <button type="button" onClick={handleEdit}>Edit personal details</button>
//           </>
//         ) : (
//           // Edit mode: allow updating specific fields.
//           <div>
//             <h2>Update Personal Information</h2>
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>First Name: </label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div>
//                 <label>Last Name: </label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div>
//                 <label>Phone Number: </label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div>
//                 <label>Password: </label>
//                 <input
//                   type="password"
//                   value={profileData.password}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, password: e.target.value })
//                   }
//                   placeholder="Enter new password (optional)"
//                 />
//               </div>
//               <div>
//                 <label>Email: </label>
//                 {/* Email is fixed and not editable */}
//                 <span>{profileData.email}</span>
//               </div>
//               <div className="button-group">
//                 <button type="submit">Update Profile</button>
//                 <button type="button" onClick={handleCancel}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Profile;







////////////////////////////////////////////
//////////////////////////////
/////////4/13/2025

// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   AiFillEye, 
//   AiFillEyeInvisible, 
//   AiOutlineArrowLeft 
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/dash/profile.css";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // State to hold profile details
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);

//   // Local state to manage password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // NOTE: Typically, the server won't return the plain-text password.
//         // This example is for demonstration purposes only.
//         setProfileData({
//           firstName: response.data.firstName || "",
//           lastName: response.data.lastName || "",
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           password: response.data.password || "",
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   // Handle form submission in edit mode
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     // Build an update payload with only non-empty fields.
//     const updatePayload = {};
//     if (profileData.firstName.trim() !== "") {
//       updatePayload.firstName = profileData.firstName;
//     }
//     if (profileData.lastName.trim() !== "") {
//       updatePayload.lastName = profileData.lastName;
//     }
//     if (profileData.phone.trim() !== "") {
//       updatePayload.phone = profileData.phone;
//     }
//     // Only update password if a new value is provided.
//     if (profileData.password.trim() !== "") {
//       updatePayload.password = profileData.password;
//     }

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, updatePayload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   // Toggle to edit mode
//   const handleEdit = () => {
//     setEditMode(true);
//     setError("");
//     setSuccess("");
//   };

//   // Cancel edit and return to read-only view
//   const handleCancel = () => {
//     setEditMode(false);
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div>{error}</div>;

//   return (
//     <>
      // <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

      // <header className="landing-header">
      //   <nav>
      //     <Link to="/homepage">Home</Link>
      //     <Link to="/chatbot">Chat</Link>
      //     <Link to="/admissions">Admissions</Link>
      //     <Link to="/events">Events</Link>
      //     <Link to="/tour">Tour</Link>
      //     <Link to="/dashboard">Dashboard</Link>
      //     <Link to="/alumni">Alumni</Link>
      //     <Link to="/industry-integration">Industry Integration</Link>
      //     <Link to="/feedback">Feedback</Link>
      //   </nav>
      // </header>

//       <div className="user-profile">
//         {!editMode ? (
//           // ---------- Read-only view of profile details ----------
//           <>
//             {/* Back arrow button */}
//             <div className="back-arrow" onClick={() => navigate("/dashboard")}>
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2>My Profile</h2>
//             <div className="profile-details">
//             <div>
//               <strong>First Name:</strong> {profileData.firstName}
//             </div>
//             <div>
//               <strong>Last Name:</strong> {profileData.lastName}
//             </div>
//             <div>
//               <strong>Email:</strong> {profileData.email}
//             </div>
//             <div>
//               <strong>Phone Number:</strong> {profileData.phone}
//             </div>
//             </div>
//             <button
//               type="button"
//               onClick={handleEdit}
//               className="edit-btn"
//               style={{ marginTop: "1em" }}
//             >
//               Edit personal details
//             </button>
//           </>
//         ) : (
//           // ---------- Edit mode: allow updating specific fields ----------
//           <div>
//             <div className="back-arrow" onClick={handleCancel}>
//               <AiOutlineArrowLeft size={30} />
//             </div>

//             <h2>Update Personal Information</h2>
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="form-group password-group">
//                 <label>Password:</label>
//                 <div className="password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={(e) =>
//                       setProfileData({ ...profileData, password: e.target.value })
//                     }
//                     placeholder="Enter new password (optional)"
//                   />
//                   <button type="button" onClick={togglePasswordVisibility} className="toggle-btn">
//                     {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                   </button>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Email:</label>
//                 <span>{profileData.email}</span>
//               </div>
//               <div className="button-group">
//                 <button type="submit" className="update-btn" style={{ marginRight: "10px" }}>
//                   Update Profile
//                 </button>
//                 <button type="button" onClick={handleCancel} className="cancel-btn">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

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
//     </>
//   );
// };

// export default Profile;
// src/components/dash/Profile.jsx



// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   AiFillEye, 
//   AiFillEyeInvisible, 
//   AiOutlineArrowLeft 
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfileData({
//           firstName: res.data.firstName || "",
//           lastName:  res.data.lastName  || "",
//           email:     res.data.email     || "",
//           phone:     res.data.phone     || "",
//           password:  "",  // always start with blank
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user, navigate]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const payload = {};
//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => { setEditMode(false);                    };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

//         <header className="landing-header">
//           <nav>
//             <Link to="/homepage">Home</Link>
//             <Link to="/chatbot">Chat Assistant</Link>
//             <Link to="/admissions">Admissions</Link>
//             <Link to="/events">Events</Link>
//             <Link to="/tour">Tour</Link>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/alumni">Alumni</Link>
//             <Link to="/industry-integration">Industry Integration</Link>
//             <Link to="/studentresources">Student Resources</Link>
//           </nav>
//         </header>

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => {
//               if (editMode) {
//                 // Cancel edits
//                 handleCancel();
//               } else {
//                 // Go back to Dashboard (or use navigate(-1) for browser back)
//                 navigate("/dashboard");
//                 // navigate(-1);
//               }
//             }}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>
//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>
//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">Update Personal Information</h2>
//               {success && <p className="profile-success">{success}</p>}
//               {error   && <p className="profile-error">{error}</p>}

//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
//                     placeholder="Enter last name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={e => setProfileData({ ...profileData, password: e.target.value })}
//                       placeholder="Enter new password"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
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
// };

// export default Profile;

////////................///////////


// // src/components/dash/Profile.jsx
// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   AiFillEye, 
//   AiFillEyeInvisible, 
//   AiOutlineArrowLeft 
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // static avatar imports
// import avatar1 from "../../images/avatar/A_1.avif";
// import avatar2 from "../../images/avatar/A_1.avif";
// import avatar3 from "../../images/avatar/A_2.avif";
// import avatar4 from "../../images/avatar/A_3.avif";
// import avatar5 from "../../images/avatar/A_5.webp";

// const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     avatar: "",
//   });
//   const [loading, setLoading]   = useState(true);
//   const [error,   setError]     = useState("");
//   const [success, setSuccess]   = useState("");
//   const [editMode,     setEditMode]     = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword(v => !v);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res = await axios.get(
//           `${apiUrl}/api/users/${user._id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setProfileData({
//           firstName: res.data.firstName || "",
//           lastName:  res.data.lastName  || "",
//           email:     res.data.email     || "",
//           phone:     res.data.phone     || "",
//           password:  "",
//           avatar:    res.data.avatar    || ""
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user, navigate]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const payload = {};

//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;
//     payload.avatar = profileData.avatar;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => { setEditMode(false);                            };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => {
//               if (editMode) handleCancel();
//               else          navigate("/dashboard");
//             }}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>

//               {profileData.avatar && (
//                 <div className="avatar-selected">
//                   <img src={profileData.avatar} alt="Your avatar" />
//                 </div>
//               )}

//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>

//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">Update Personal Information</h2>
//               {success && <p className="profile-success">{success}</p>}
//               {error   && <p className="profile-error">{error}</p>}

//               {/* Avatar picker */}
//               <div className="avatar-selection">
//                 <div className="avatar-selection__title">Choose an Avatar</div>
//                 <div className="avatar-options">
//                   {ALL_AVATARS.map((url, i) => (
//                     <div
//                       key={i}
//                       className={
//                         "avatar-option" +
//                         (profileData.avatar === url ? " selected" : "")
//                       }
//                       onClick={() =>
//                         setProfileData(d => ({ ...d, avatar: url }))
//                       }
//                     >
//                       <img src={url} alt={`Avatar ${i + 1}`} />
//                     </div>
//                   ))}
//                   <div
//                     className="avatar-option remove"
//                     onClick={() =>
//                       setProfileData(d => ({ ...d, avatar: "" }))
//                     }
//                   >
//                     &times;
//                   </div>
//                 </div>
//               </div>

//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, firstName: e.target.value })
//                     }
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, lastName: e.target.value })
//                     }
//                     placeholder="Enter last name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={e =>
//                       setProfileData({ ...profileData, phone: e.target.value })
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={e =>
//                         setProfileData({ ...profileData, password: e.target.value })
//                       }
//                       placeholder="Enter new password (optional)"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
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
// };


// // src/components/dash/Profile.jsx
// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   AiFillEye, 
//   AiFillEyeInvisible, 
//   AiOutlineArrowLeft 
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // static avatar imports
// import avatar1 from "../../images/avatar/A_1.avif";
// import avatar2 from "../../images/avatar/A_2.avif";
// import avatar3 from "../../images/avatar/A_3.avif";
// import avatar4 from "../../images/avatar/A_1.avif";  
// import avatar5 from "../../images/avatar/A_5.webp";

// const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

// export default function Profile() {
//   const { user, updateUser } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName:  "",
//     email:     "",
//     phone:     "",
//     password:  "",
//     avatar:    "",
//   });
//   const [loading,      setLoading] = useState(true);
//   const [error,        setError]   = useState("");
//   const [success,      setSuccess] = useState("");
//   const [editMode,     setEditMode]     = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword(v => !v);

//   // Fetch on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res = await axios.get(
//           `${apiUrl}/api/users/${user._id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const fetched = {
//           firstName: res.data.firstName || "",
//           lastName:  res.data.lastName  || "",
//           email:     res.data.email     || "",
//           phone:     res.data.phone     || "",
//           password:  "",
//           avatar:    res.data.avatar    || ""
//         };

//         setProfileData(fetched);
//         updateUser({ avatar: fetched.avatar });  // sync context
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user, navigate, updateUser]);

//   // Single-click avatar change
//   const handleAvatarClick = async (newAvatar) => {
//     setError(""); setSuccess("");
//     // 1) optimistic update
//     setProfileData(d => ({ ...d, avatar: newAvatar }));
//     updateUser({ avatar: newAvatar });

//     // 2) persist
//     try {
//       const token  = localStorage.getItem("token");
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         { avatar: newAvatar },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Avatar saved.");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save avatar.");
//     }
//   };

//   // Full-form submit (first/last/phone/password)
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError(""); setSuccess("");
//     const token = localStorage.getItem("token");
//     const payload = {};

//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;
//     payload.avatar = profileData.avatar;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       updateUser({ avatar: payload.avatar });  // sync context again
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => { setEditMode(false);                            };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => (editMode ? handleCancel() : navigate("/dashboard"))}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>
//               {profileData.avatar && (
//                 <div className="avatar-selected">
//                   <img src={profileData.avatar} alt="Your avatar" />
//                 </div>
//               )}
//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>
//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">Update Personal Information</h2>
//               {error   && <p className="profile-error">{error}</p>}
//               {success && <p className="profile-success">{success}</p>}

//               {/* Avatar picker */}
//               <div className="avatar-selection">
//                 <div className="avatar-selection__title">Choose an Avatar</div>
//                 <div className="avatar-options">
//                   {ALL_AVATARS.map((url, i) => (
//                     <div
//                       key={i}
//                       className={
//                         "avatar-option" +
//                         (profileData.avatar === url ? " selected" : "")
//                       }
//                       onClick={() => handleAvatarClick(url)}
//                     >
//                       <img src={url} alt={`Avatar ${i + 1}`} />
//                     </div>
//                   ))}
//                   <div
//                     className="avatar-option remove"
//                     onClick={() => handleAvatarClick("")}
//                   >
//                     &times;
//                   </div>
//                 </div>
//               </div>

//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, firstName: e.target.value })
//                     }
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, lastName: e.target.value })
//                     }
//                     placeholder="Enter last name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={e =>
//                       setProfileData({ ...profileData, phone: e.target.value })
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={e =>
//                         setProfileData({ ...profileData, password: e.target.value })
//                       }
//                       placeholder="Enter new password (optional)"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
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




// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { 
//   AiFillEye, 
//   AiFillEyeInvisible, 
//   AiOutlineArrowLeft 
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // static avatar imports
// import avatar1 from "../../images/avatar/A_1.avif";
// import avatar2 from "../../images/avatar/A_2.avif";
// import avatar3 from "../../images/avatar/A_3.avif";
// import avatar4 from "../../images/avatar/A_1.avif";  // corrected
// import avatar5 from "../../images/avatar/A_5.webp";

// const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

// export default function Profile() {
//   const { user, updateUser } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName:  "",
//     email:     "",
//     phone:     "",
//     password:  "",
//     avatar:    "",
//   });
//   const [loading,      setLoading] = useState(true);
//   const [error,        setError]   = useState("");
//   const [success,      setSuccess] = useState("");
//   const [editMode,     setEditMode]     = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword(v => !v);

//   // Fetch on mount
//   useEffect(() => {
//     // only when we know the user ID (and on first mount)
//     if (!user?._id) {
//       navigate("/login");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res = await axios.get(
//           `${apiUrl}/api/users/${user._id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setProfileData({
//           firstName: res.data.firstName || "",
//           lastName: res.data.lastName || "",
//           email: res.data.email || "",
//           phone: res.data.phone || "",
//           password: "",
//           avatar: res.data.avatar || ""
//         });
//         updateUser({ avatar: res.data.avatar || "" });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user._id, navigate]);;

//   // Avatar click (optimistic + persist)
//   const handleAvatarClick = async (newAvatar) => {
//     setError(""); setSuccess("");
//     setProfileData(d => ({ ...d, avatar: newAvatar }));
//     updateUser({ avatar: newAvatar });
//     try {
//       const token  = localStorage.getItem("token");
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         { avatar: newAvatar },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Avatar saved.");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save avatar.");
//     }
//   };

//   // Other fields submit
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError(""); setSuccess("");
//     const token = localStorage.getItem("token");
//     const payload = {};
//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;
//     payload.avatar = profileData.avatar;
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${user._id}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       updateUser({ avatar: payload.avatar });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => { setEditMode(false); };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => (editMode ? handleCancel() : navigate("/dashboard"))}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>
//               {profileData.avatar && (
//                 <div className="avatar-selected">
//                   <img src={profileData.avatar} alt="Your avatar" />
//                 </div>
//               )}
//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>
//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">Update Personal Information</h2>
//               {error   && <p className="profile-error">{error}</p>}
//               {success && <p className="profile-success">{success}</p>}

//               {/* Avatar picker */}
//               <div className="avatar-selection">
//                 <div className="avatar-selection__title">Choose an Avatar</div>
//                 <div className="avatar-options">
//                   {ALL_AVATARS.map((url, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       className={`avatar-option${profileData.avatar === url ? " selected" : ""}`}
//                       onClick={() => handleAvatarClick(url)}
//                       aria-pressed={profileData.avatar === url}
//                       aria-label={`Avatar ${i + 1}`}
//                     >
//                       <img src={url} alt={`Avatar ${i + 1}`} />
//                     </button>
//                   ))}
//                   <button
//                     type="button"
//                     className={`avatar-option remove${profileData.avatar === "" ? " selected" : ""}`}
//                     onClick={() => handleAvatarClick("")}
//                     aria-pressed={profileData.avatar === ""}
//                     aria-label="Remove Avatar"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               </div>

//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, firstName: e.target.value })
//                     }
//                     placeholder="Enter first name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={e =>
//                       setProfileData({ ...profileData, lastName: e.target.value })
//                     }
//                     placeholder="Enter last name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={e =>
//                       setProfileData({ ...profileData, phone: e.target.value })
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </div>

//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={e =>
//                         setProfileData({ ...profileData, password: e.target.value })
//                       }
//                       placeholder="Enter new password (optional)"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
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

// // src/pages/Dash/Profile.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate, Navigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft,
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // static avatar imports
// import avatar1 from "../../images/avatar/A_1.avif";
// import avatar2 from "../../images/avatar/A_2.avif";
// import avatar3 from "../../images/avatar/A_3.avif";
// import avatar4 from "../../images/avatar/A_1.avif";
// import avatar5 from "../../images/avatar/A_5.webp";

// const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5];

// export default function Profile() {
//   const { user, updateUser } = useAuth();
//   const navigate             = useNavigate();

//   // 1) Hooks up front
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName:  "",
//     email:     "",
//     phone:     "",
//     password:  "",
//     avatar:    "",
//   });
//   const [loading,    setLoading]  = useState(true);
//   const [error,      setError]    = useState("");
//   const [success,    setSuccess]  = useState("");
//   const [editMode,   setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const userId = user?._id;

//   const togglePasswordVisibility = () =>
//     setShowPassword((v) => !v);

//   // 2) Fetch profile once on mount / when userId changes
//   useEffect(() => {
//     if (!userId) return;

//     const fetchProfile = async () => {
//       try {
//         const token  = localStorage.getItem("token");
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res    = await axios.get(
//           `${apiUrl}/api/users/${userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setProfileData({
//           firstName: res.data.firstName || "",
//           lastName:  res.data.lastName  || "",
//           email:     res.data.email     || "",
//           phone:     res.data.phone     || "",
//           password:  "",
//           avatar:    res.data.avatar    || "",
//         });
//         updateUser({ avatar: res.data.avatar || "" });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   // 3) Redirect if not authenticated
//   if (!userId) {
//     return <Navigate to="/login" replace />;
//   }

//   // 4) Handlers
//   const handleAvatarClick = async (newAvatar) => {
//     setError("");
//     setSuccess("");
//     setProfileData((d) => ({ ...d, avatar: newAvatar }));
//     updateUser({ avatar: newAvatar });

//     try {
//       const token  = localStorage.getItem("token");
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${userId}`,
//         { avatar: newAvatar },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Avatar saved.");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save avatar.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const token   = localStorage.getItem("token");
//     const payload = {};
//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;
//     payload.avatar = profileData.avatar;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${userId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       updateUser({ avatar: payload.avatar });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => setEditMode(false);

//   // 5) Early returns
//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   // 6) Main render
//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>
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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() =>
//               editMode ? handleCancel() : navigate("/dashboard")
//             }
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>
//               {profileData.avatar && (
//                 <div className="avatar-selected">
//                   <img src={profileData.avatar} alt="Your avatar" />
//                 </div>
//               )}
//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>
//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">
//                 Update Personal Information
//               </h2>
//               {error   && <p className="profile-error">{error}</p>}
//               {success && <p className="profile-success">{success}</p>}

//               {/* Avatar picker */}
//               <div className="avatar-selection">
//                 <div className="avatar-selection__title">Choose an Avatar</div>
//                 <div className="avatar-options">
//                   {ALL_AVATARS.map((url, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       className={`avatar-option${
//                         profileData.avatar === url ? " selected" : ""
//                       }`}
//                       onClick={() => handleAvatarClick(url)}
//                       aria-pressed={profileData.avatar === url}
//                       aria-label={`Avatar ${i + 1}`}
//                     >
//                       <img src={url} alt={`Avatar ${i + 1}`} />
//                     </button>
//                   ))}
//                   <button
//                     type="button"
//                     className={`avatar-option remove${
//                       profileData.avatar === "" ? " selected" : ""
//                     }`}
//                     onClick={() => handleAvatarClick("")}
//                     aria-pressed={profileData.avatar === ""}
//                     aria-label="Remove Avatar"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               </div>

//               {/* Profile form */}
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         firstName: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter first name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         lastName: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter last name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         phone: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={(e) =>
//                         setProfileData((prev) => ({
//                           ...prev,
//                           password: e.target.value,
//                         }))
//                       }
//                       placeholder="Enter new password (optional)"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
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




// // src/pages/Dash/Profile.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate, Navigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft,
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // static avatar imports
// import avatar1 from "../../images/avatar/A_1.avif";
// import avatar2 from "../../images/avatar/A_5.webp";
// import avatar3 from "../../images/avatar/A_6.jpeg";
// import avatar4 from "../../images/avatar/A_2.avif";
// import avatar5 from "../../images/avatar/A_3.avif";
// import avatar6 from "../../images/avatar/A_4.jpg";

// const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

// export default function Profile() {
//   const { user, updateUser } = useAuth();
//   const navigate = useNavigate();
//   const userId = user?._id;

//   // 1) Hooks up front
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     // initialize avatar from context if present
//     avatar: user?.avatar || "",
//   });
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [success, setSuccess]   = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword((v) => !v);

//   // 2) Fetch other profile fields once, but keep context avatar
//   useEffect(() => {
//     if (!userId) return;

//     const fetchProfile = async () => {
//       try {
//         const token  = localStorage.getItem("token");
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const res    = await axios.get(
//           `${apiUrl}/api/users/${userId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setProfileData({
//           firstName: res.data.firstName || "",
//           lastName:  res.data.lastName  || "",
//           email:     res.data.email     || "",
//           phone:     res.data.phone     || "",
//           password:  "",
//           // **use context avatar if set**, otherwise server’s
//           avatar:    user.avatar || res.data.avatar || "",
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [userId, user.avatar]);

//   // 3) Redirect if not logged in
//   if (!userId) {
//     return <Navigate to="/login" replace />;
//   }

//   // 4) Handlers

//   const handleAvatarClick = async (newAvatar) => {
//     setError(""); setSuccess("");
//     // optimistic update in state + context
//     setProfileData((d) => ({ ...d, avatar: newAvatar }));
//     updateUser({ avatar: newAvatar });

//     try {
//       const token  = localStorage.getItem("token");
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${userId}`,
//         { avatar: newAvatar },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSuccess("Avatar saved.");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to save avatar.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess("");

//     const token   = localStorage.getItem("token");
//     const payload = {};
//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     if (profileData.phone.trim())     payload.phone     = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;
//     payload.avatar = profileData.avatar;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(
//         `${apiUrl}/api/users/${userId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       updateUser({ avatar: payload.avatar });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   const handleEdit   = () => { setEditMode(true);  setError(""); setSuccess(""); };
//   const handleCancel = () => setEditMode(false);

//   // 5) Early returns
//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div className="profile-error">{error}</div>;

//   // 6) Main render
//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>
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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() =>
//               editMode ? handleCancel() : navigate("/dashboard")
//             }
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           {!editMode ? (
//             <>
//               <h2 className="profile-card__title">My Profile</h2>
//               {profileData.avatar && (
//                 <div className="avatar-selected">
//                   <img src={profileData.avatar} alt="Your avatar" />
//                 </div>
//               )}
//               <div className="profile-details">
//                 <p><strong>First Name:</strong> {profileData.firstName}</p>
//                 <p><strong>Last Name:</strong>  {profileData.lastName}</p>
//                 <p><strong>Email:</strong>      {profileData.email}</p>
//                 <p><strong>Phone:</strong>      {profileData.phone}</p>
//               </div>
//               <button className="btn" onClick={handleEdit}>
//                 Edit Personal Details
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="profile-card__title">
//                 Update Personal Information
//               </h2>
//               {error   && <p className="profile-error">{error}</p>}
//               {success && <p className="profile-success">{success}</p>}

//               {/* Avatar picker */}
//               <div className="avatar-selection">
//                 <div className="avatar-selection__title">Choose an Avatar</div>
//                 <div className="avatar-options">
//                   {ALL_AVATARS.map((url, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       className={`avatar-option${
//                         profileData.avatar === url ? " selected" : ""
//                       }`}
//                       onClick={() => handleAvatarClick(url)}
//                       aria-pressed={profileData.avatar === url}
//                       aria-label={`Avatar ${i + 1}`}
//                     >
//                       <img src={url} alt={`Avatar ${i + 1}`} />
//                     </button>
//                   ))}
//                   <button
//                     type="button"
//                     className={`avatar-option remove${
//                       profileData.avatar === "" ? " selected" : ""
//                     }`}
//                     onClick={() => handleAvatarClick("")}
//                     aria-pressed={profileData.avatar === ""}
//                     aria-label="Remove Avatar"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               </div>

//               {/* Profile form */}
//               <form className="profile-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name:</label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     value={profileData.firstName}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         firstName: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter first name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name:</label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     value={profileData.lastName}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         lastName: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter last name"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number:</label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         phone: e.target.value,
//                       }))
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="form-group password-group">
//                   <label htmlFor="password">Password:</label>
//                   <div className="password-wrapper">
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={profileData.password}
//                       onChange={(e) =>
//                         setProfileData((prev) => ({
//                           ...prev,
//                           password: e.target.value,
//                         }))
//                       }
//                       placeholder="Enter new password (optional)"
//                     />
//                     <button
//                       type="button"
//                       className="toggle-btn"
//                       onClick={togglePasswordVisibility}
//                       aria-label="Toggle password visibility"
//                     >
//                       {showPassword ? (
//                         <AiFillEyeInvisible />
//                       ) : (
//                         <AiFillEye />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-actions">
//                   <button type="submit" className="btn">
//                     Update Profile
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn--ghost"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>
//             &copy; {new Date().getFullYear()} HITEC University. All rights
//             reserved.
//           </p>
//           <div className="social-icons">
//             <a
//               href="https://www.facebook.com/hitecuni/"
//               aria-label="Facebook"
//             >
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
//     </>
//   );
// }



// src/pages/Dash/Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../css/theme.css";
import "../../css/dash/profile.css";
import "../../css/Header.css";

// static avatar imports
import avatar1 from "../../images/avatar/A_1.avif";
import avatar2 from "../../images/avatar/A_5.webp";
import avatar3 from "../../images/avatar/A_6.jpeg";
import avatar4 from "../../images/avatar/A_2.avif";
import avatar5 from "../../images/avatar/A_3.avif";
import avatar6 from "../../images/avatar/A_4.jpg";

const ALL_AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function Profile() {
  const [menuOpen, setMenuOpen] = useState(false);
  // ── 1) Hooks up front ───────────────────────────────────
  const { user, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    avatar: user?.avatar || "",
  });
  const [loading,    setLoading]      = useState(true);
  const [error,      setError]        = useState("");
  const [success,    setSuccess]      = useState("");
  const [editMode,   setEditMode]     = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const token  = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;
        const { data } = await axios.get(
          `${apiUrl}/api/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfileData({
          firstName: data.firstName || "",
          lastName:  data.lastName  || "",
          email:     data.email     || "",
          phone:     data.phone     || "",
          password:  "",
          avatar:    user.avatar    || data.avatar || "",
        });
      } catch (err) {
        console.error("Fetch profile failed:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, user?.avatar]);

  // ── 2) Early returns ───────────────────────────────────
  if (authLoading) {
    return <div className="profile-page">Loading authentication…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <div className="profile-page">Loading profile…</div>;
  }
  if (error && !editMode) {
    return (
      <div className="profile-page">
        <p className="profile-error">{error}</p>
      </div>
    );
  }

  // ── 3) Handlers ────────────────────────────────────────
  const togglePasswordVisibility = () =>
    setShowPassword((v) => !v);

  const handleAvatarClick = async (newAvatar) => {
    setError(""); setSuccess("");
    setProfileData((p) => ({ ...p, avatar: newAvatar }));
    updateUser({ avatar: newAvatar });

    try {
      const token  = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(
        `${apiUrl}/api/users/${userId}`,
        { avatar: newAvatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Avatar saved.");
    } catch (err) {
      console.error("Save avatar failed:", err);
      setError("Failed to save avatar.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const payload = {};
    if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
    if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
    if (profileData.phone.trim())     payload.phone     = profileData.phone;
    if (profileData.password.trim())  payload.password  = profileData.password;
    payload.avatar = profileData.avatar;

    try {
      const token  = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(
        `${apiUrl}/api/users/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser({ avatar: payload.avatar });
      setSuccess("Profile updated successfully.");
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile.");
    }
  };

  const handleEdit   = () => { setEditMode(true); setError(""); setSuccess(""); };
  const handleCancel = () => setEditMode(false);

  // ── 4) Main render ──────────────────────────────────────
  return (
    <>
      <title>HITEC | UNIGUIDE | PROFILE</title>
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
      
      <div className="profile-page">
        <div className="profile-card">
          <div
            className="profile-back-arrow"
            onClick={() =>
              editMode ? handleCancel() : navigate("/dashboard")
            }
          >
            <AiOutlineArrowLeft size={24} />
          </div>

          {!editMode ? (
            <>
              <h2 className="profile-card__title">My Profile</h2>
              {profileData.avatar && (
                <div className="avatar-selected">
                  <img src={profileData.avatar} alt="Your avatar" />
                </div>
              )}
              <div className="profile-details">
                <p><strong>First Name:</strong> {profileData.firstName}</p>
                <p><strong>Last Name:</strong>  {profileData.lastName}</p>
                <p><strong>Email:</strong>      {profileData.email}</p>
                <p><strong>Phone:</strong>      {profileData.phone}</p>
              </div>
              <button className="btn" onClick={handleEdit}>
                Edit Personal Details
              </button>
            </>
          ) : (
            <>
              <h2 className="profile-card__title">Update Personal Information</h2>
              {error   && <p className="profile-error">{error}</p>}
              {success && <p className="profile-success">{success}</p>}

              {/* Avatar picker */}
              <div className="avatar-selection">
                <div className="avatar-selection__title">Choose an Avatar</div>
                <div className="avatar-options">
                  {ALL_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`avatar-option${profileData.avatar === url ? " selected" : ""}`}
                      onClick={() => handleAvatarClick(url)}
                      aria-pressed={profileData.avatar === url}
                      aria-label={`Avatar ${i + 1}`}
                    >
                      <img src={url} alt={`Avatar ${i + 1}`} />
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`avatar-option remove${profileData.avatar === "" ? " selected" : ""}`}
                    onClick={() => handleAvatarClick("")}
                    aria-pressed={profileData.avatar === ""}
                    aria-label="Remove Avatar"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Profile form */}
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    id="firstName"
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, firstName: e.target.value }))
                    }
                    placeholder="Enter first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    id="lastName"
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, lastName: e.target.value }))
                    }
                    placeholder="Enter last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group password-group">
                  <label htmlFor="password">Password:</label>
                  <div className="password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={profileData.password}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      placeholder="Enter new password (optional)"
                    />
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn">Update Profile</button>
                  <button type="button" className="btn btn--ghost" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      
      {/* css file in Events.css
      <Link to="/chatbot" className="chat-assistant-fab" aria-label="Chat Assistant">
        <i className="fas fa-comment-dots"></i>
      </Link> */}
            
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



///////////////////
//////////////////////
/////////////////////////


// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AvatarSelector from "../../components/AvatarSelector";
// import "../../css/dash/profile.css";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // State to hold profile details
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);

//   // Local state to manage password visibility
//   const [showPassword, setShowPassword] = useState(false);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const response = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // NOTE: Typically, the server won't return the plain-text password.
//         // This example is for demonstration purposes only.
//         setProfileData({
//           firstName: response.data.firstName || "",
//           lastName: response.data.lastName || "",
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           password: response.data.password || "",
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   // Handle form submission in edit mode
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     // Build an update payload.
//     // For first name, last name, and password, update only if non-empty.
//     // For phone number, always include its current value (even if empty).
//     const updatePayload = {};
//     if (profileData.firstName.trim() !== "") {
//       updatePayload.firstName = profileData.firstName;
//     }
//     if (profileData.lastName.trim() !== "") {
//       updatePayload.lastName = profileData.lastName;
//     }
//     // Always update phone number—if cleared it will be an empty string.
//     updatePayload.phone = profileData.phone;
//     // Only update password if a new value is provided.
//     if (profileData.password.trim() !== "") {
//       updatePayload.password = profileData.password;
//     }

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, updatePayload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   // Toggle to edit mode
//   const handleEdit = () => {
//     setEditMode(true);
//     setError("");
//     setSuccess("");
//   };

//   // Cancel edit and return to read-only view
//   const handleCancel = () => {
//     setEditMode(false);
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error && !editMode) return <div>{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | DASHBOARD | PROFILE</title>

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

//       <div className="profile-container">
//         <div className="profile-title">Your Profile</div>
//         <AvatarSelector />
//         {!editMode ? (
//           // ---------- Read-only view ----------
//           <>
//             <div className="profile-back-arrow" onClick={() => navigate("/dashboard")}>
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">My Profile</h2>
//             <div className="profile-details">
//               <div>
//                 <strong>First Name:</strong> {profileData.firstName}
//               </div>
//               <div>
//                 <strong>Last Name:</strong> {profileData.lastName}
//               </div>
//               <div>
//                 <strong>Email:</strong> {profileData.email}
//               </div>
//               <div>
//                 <strong>Phone Number:</strong> {profileData.phone}
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={handleEdit}
//               className="profile-edit-btn center-button"
//               style={{ marginTop: "1em" }}
//             >
//               Edit personal details
//             </button>
//           </>
//         ) : (
//           // ---------- Edit mode ----------
//           <div>
//             <div className="profile-back-arrow" onClick={handleCancel}>
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">Update Personal Information</h2>
//             {success && <p style={{ color: "green" }}>{success}</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSubmit} className="profile-form">
//               <div className="profile-form-group">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="profile-form-group profile-password-group">
//                 <label>Password:</label>
//                 <div className="profile-password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={(e) =>
//                       setProfileData({ ...profileData, password: e.target.value })
//                     }
//                     placeholder="Enter new password (optional)"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="profile-toggle-btn"
//                   >
//                     {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                   </button>
//                 </div>
//               </div>
//               <div className="profile-form-group">
//                 <label>Email:</label>
//                 <span>{profileData.email}</span>
//               </div>
//               <div className="profile-button-group">
//                 <button type="submit" className="profile-update-btn" style={{ marginRight: "10px" }}>
//                   Update Profile
//                 </button>
//                 <button type="button" onClick={handleCancel} className="profile-cancel-btn">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

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
//     </>
//   );
// };

// export default Profile;





///////,,,,,,,,,,,,,,,,,,,,,,,,,///////////

// // src/pages/Dash/Profile.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";

// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AvatarSelector from "../../components/AvatarSelector";
// import "../../css/dash/profile.css";

// export default function Profile() {
//   const { logout } = useAuth();
//   const navigate   = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: ""
//   });
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [success, setSuccess]   = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword((prev) => !prev);

//   // Fetch current user’s profile
//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         logout();
//         navigate("/login");
//         return;
//       }

//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const { data } = await axios.get(`${apiUrl}/api/auth/me`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const u = data.user || data; // adjust if your payload wraps differently
//         setProfileData({
//           firstName: u.firstName || "",
//           lastName:  u.lastName  || "",
//           email:     u.email     || "",
//           phone:     u.phone     || "",
//           password:  ""           // never trust plaintext from server
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           logout();
//           navigate("/login");
//         } else {
//           setError("Failed to load profile. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [logout, navigate]);

//   // Submit updates to /api/users/me
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess("");

//     const token = localStorage.getItem("token");
//     const payload = {};
//     const { firstName, lastName, phone, password } = profileData;

//     if (firstName.trim()) payload.firstName = firstName;
//     if (lastName.trim())  payload.lastName  = lastName;
//     payload.phone = phone; // always send phone (may be empty)
//     if (password.trim())   payload.password = password;

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/me`, payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       if (err.response?.status === 403) {
//         logout();
//         navigate("/login");
//       } else {
//         setError("Failed to update profile.");
//       }
//     }
//   };

//   if (loading) return <div>Loading profile…</div>;
//   if (error && !editMode) return <div className="error-banner">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | PROFILE</title>
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

//       <div className="profile-container">
//         {!editMode ? (
//           <>
//             <div
//               className="profile-back-arrow"
//               onClick={() => navigate("/dashboard")}
//             >
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">My Profile</h2>
//             <AvatarSelector />
//             <div className="profile-details">
//               <div><strong>First Name:</strong> {profileData.firstName}</div>
//               <div><strong>Last Name:</strong> {profileData.lastName}</div>
//               <div><strong>Email:</strong> {profileData.email}</div>
//               <div><strong>Phone Number:</strong> {profileData.phone}</div>
//             </div>
//             <button
//               type="button"
//               className="profile-edit-btn"
//               onClick={() => {
//                 setEditMode(true);
//                 setError("");
//                 setSuccess("");
//               }}
//             >
//               Edit personal details
//             </button>
//           </>
//         ) : (
//           <div>
//             <div
//               className="profile-back-arrow"
//               onClick={() => setEditMode(false)}
//             >
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">Update Personal Information</h2>
//             {success && <p className="success-msg">{success}</p>}
//             {error   && <p className="error-msg">{error}</p>}
//             <form onSubmit={handleSubmit} className="profile-form">
//               <div className="profile-form-group">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       firstName: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       lastName: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       phone: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group profile-password-group">
//                 <label>Password:</label>
//                 <div className="profile-password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={e =>
//                       setProfileData(prev => ({
//                         ...prev,
//                         password: e.target.value
//                       }))
//                     }
//                     placeholder="Enter new password (optional)"
//                   />
//                   <button
//                     type="button"
//                     className="profile-toggle-btn"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                   </button>
//                 </div>
//               </div>
//               <div className="profile-form-group">
//                 <label>Email:</label>
//                 <span>{profileData.email}</span>
//               </div>
//               <div className="profile-button-group">
//                 <button type="submit" className="profile-update-btn">
//                   Update Profile
//                 </button>
//                 <button
//                   type="button"
//                   className="profile-cancel-btn"
//                   onClick={() => setEditMode(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//           <div className="social-icons">
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
//         </div>
//       </footer>
//     </>
//   );
// }




// // src/pages/Dash/Profile.jsx
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AvatarSelector from "../../components/AvatarSelector";
// import "../../css/dash/profile.css";

// export default function Profile() {
//   const navigate   = useNavigate();
//   const { user } = useAuth();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: ""
//   });
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [success, setSuccess]   = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () =>
//     setShowPassword((prev) => !prev);

//   // Fetch current user’s profile
//   useEffect(() => {
//     (async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         // navigate("/login");
//         return;
//       }
    
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const { data } = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const u = data.user || data; // adjust if your payload wraps differently
//         setProfileData({
//           firstName: u.firstName || "",
//           lastName:  u.lastName  || "",
//           email:     u.email     || "",
//           phone:     u.phone     || "",
//           password:  ""           // never trust plaintext from server
//         });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         if (err.response?.status === 401 || err.response?.status === 403) {
          
//           // navigate("/login");
//         } else {
//           setError("Failed to load profile. Please try again later.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Submit updates to /api/users/me
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess("");

//     const token = localStorage.getItem("token");
//     const payload = {};
//     const { firstName, lastName, phone } = profileData;

//     if (firstName.trim()) payload.firstName = firstName;
//     if (lastName.trim())  payload.lastName  = lastName;
//     payload.phone = phone; // always send phone (may be empty)
    

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/me`, payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       if (err.response?.status === 403) {
        
//         navigate("/login");
//       } else {
//         setError("Failed to update profile.");
//       }
//     }
//   };

//   if (loading) return <div>Loading profile…</div>;
//   if (error && !editMode) return <div className="error-banner">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | PROFILE</title>
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

//       <div className="profile-container">
//         {!editMode ? (
//           <>
//             <div
//               className="profile-back-arrow"
//               onClick={() => navigate("/dashboard")}
//             >
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">My Profile</h2>
//             <AvatarSelector />
//             <div className="profile-details">
//               <div><strong>First Name:</strong> {profileData.firstName}</div>
//               <div><strong>Last Name:</strong> {profileData.lastName}</div>
//               <div><strong>Email:</strong> {profileData.email}</div>
//               <div><strong>Phone Number:</strong> {profileData.phone}</div>
//             </div>
//             <button
//               type="button"
//               className="profile-edit-btn"
//               onClick={() => {
//                 setEditMode(true);
//                 setError("");
//                 setSuccess("");
//               }}
//             >
//               Edit personal details
//             </button>
//           </>
//         ) : (
//           <div>
//             <div
//               className="profile-back-arrow"
//               onClick={() => setEditMode(false)}
//             >
//               <AiOutlineArrowLeft size={30} />
//             </div>
//             <h2 className="profile-title">Update Personal Information</h2>
//             {success && <p className="success-msg">{success}</p>}
//             {error   && <p className="error-msg">{error}</p>}
//             <form onSubmit={handleSubmit} className="profile-form">
//               <div className="profile-form-group">
//                 <label>First Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       firstName: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Last Name:</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       lastName: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group">
//                 <label>Phone Number:</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       phone: e.target.value
//                     }))
//                   }
//                 />
//               </div>
//               <div className="profile-form-group profile-password-group">
//                 <label>Password:</label>
//                 <div className="profile-password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={e =>
//                       setProfileData(prev => ({
//                         ...prev,
//                         password: e.target.value
//                       }))
//                     }
//                     placeholder="Enter new password (optional)"
//                   />
//                   <button
//                     type="button"
//                     className="profile-toggle-btn"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                   </button>
//                 </div>
//               </div>
//               <div className="profile-form-group">
//                 <label>Email:</label>
//                 <span>{profileData.email}</span>
//               </div>
//               <div className="profile-button-group">
//                 <button type="submit" className="profile-update-btn">
//                   Update Profile
//                 </button>
//                 <button
//                   type="button"
//                   className="profile-cancel-btn"
//                   onClick={() => setEditMode(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//           <div className="social-icons">
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
//         </div>
//       </footer>
//     </>
//   );
// }



/////////////////
///////////////////////////////
////////////////////////////////////////////



// import { useAuth } from "../../context/AuthContext";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AvatarSelector from "../../components/AvatarSelector";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// const Profile = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     avatar: null,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const apiUrl = import.meta.env.VITE_API_URL;
//         const resp = await axios.get(`${apiUrl}/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfileData({
//           firstName: resp.data.firstName || "",
//           lastName: resp.data.lastName || "",
//           email: resp.data.email || "",
//           phone: resp.data.phone || "",
//           password: "",
//           avatar: resp.data.avatar || null,
//         });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [user, navigate]);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const payload = {};

//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim()) payload.lastName = profileData.lastName;
//     payload.phone = profileData.phone;
//     if (profileData.password.trim()) payload.password = profileData.password;
//     // We no longer include avatar here, since it's chosen only in read-only

//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.put(`${apiUrl}/api/users/${user._id}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess("Profile updated successfully.");
//       setEditMode(false);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update profile.");
//     }
//   };

//   if (loading) return <div>Loading profile…</div>;
//   if (error && !editMode) return <div className="error-banner">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | PROFILE</title>
//       <header className="landing-header">
//                     <nav>
//                       <Link to="/homepage">Home</Link>
//                       <Link to="/chatbot">Chat Assistant</Link>
//                       <Link to="/admissions">Admissions</Link>
//                       <Link to="/events">Events</Link>
//                       <Link to="/tour">Tour</Link>
//                       <Link to="/dashboard">Dashboard</Link>
//                       <Link to="/alumni">Alumni</Link>
//                       <Link to="/industry-integration">Industry Integration</Link>
//                       <Link to="/studentresources">Student Resources</Link>
//                     </nav>
//                   </header>

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => navigate("/dashboard")}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           <h2 className="profile-card__title">
//             {editMode ? "Update Personal Information" : "My Profile"}
//           </h2>

//           {editMode && success && (
//             <p className="profile-success">{success}</p>
//           )}
//           {editMode && error && (
//             <p className="profile-error">{error}</p>
//           )}

//           {!editMode && (
//             <>
//               {/* Avatar picker only in read-only mode */}
//               <AvatarSelector
//                 selected={profileData.avatar}
//                 onSelect={avatar => setProfileData(prev => ({
//                   ...prev,
//                   avatar
//                 }))}
//               />

//               <div className="profile-details">
//                 <div><strong>First Name:</strong> {profileData.firstName}</div>
//                 <div><strong>Last Name:</strong>  {profileData.lastName}</div>
//                 <div><strong>Email:</strong>      {profileData.email}</div>
//                 <div><strong>Phone:</strong>      {profileData.phone}</div>
//                 <button
//                   onClick={() => { setEditMode(true); setError(""); setSuccess(""); }}
//                   className="btn"
//                 >
//                   Edit Details
//                 </button>
//               </div>
//             </>
//           )}

//           {editMode && (
//             <form onSubmit={handleSubmit} className="profile-form">
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={e =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={e =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={e =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="form-group password-group">
//                 <label>Password</label>
//                 <div className="password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={e =>
//                       setProfileData({ ...profileData, password: e.target.value })
//                     }
//                     placeholder="New password (optional)"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="toggle-btn"
//                   >
//                     {showPassword
//                       ? <AiFillEyeInvisible />
//                       : <AiFillEye />
//                     }
//                   </button>
//                 </div>
//               </div>
//               <div className="form-actions">
//                 <button type="submit" className="btn">Update</button>
//                 <button
//                   type="button"
//                   className="btn btn--ghost"
//                   onClick={() => setEditMode(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; 2025 HITEC University. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/"><i className="fab fa-facebook-f" /></a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en"><i className="fab fa-instagram" /></a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//               <i className="fab fa-linkedin-in" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Profile;





// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   AiFillEye,
//   AiFillEyeInvisible,
//   AiOutlineArrowLeft
// } from "react-icons/ai";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import AvatarSelector from "../../components/AvatarSelector";
// import "../../css/theme.css";
// import "../../css/dash/profile.css";

// // Centralized axios instance for API calls
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// export default function Profile() {
//   const { user, updateProfile } = useAuth();
//   const navigate = useNavigate();

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: ""
//   });
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState("");
//   const [success, setSuccess]   = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Fetch profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!user?._id || !token) {
//         return navigate("/login");
//       }
//       try {
//         const res = await api.get(`/api/users/${user._id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = res.data;
//         setProfileData({
//           firstName: data.firstName || "",
//           lastName:  data.lastName  || "",
//           email:     data.email     || "",
//           phone:     data.phone     || "",
//           password:  ""
//         });
//       } catch (err) {
//         if (axios.isAxiosError(err) && err.response?.status === 403) {
//           return navigate("/login");
//         }
//         console.error("Profile load error:", err);
//         setError("Failed to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [user, navigate]);

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const handleFieldSubmit = async e => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const payload = {};

//     if (profileData.firstName.trim()) payload.firstName = profileData.firstName;
//     if (profileData.lastName.trim())  payload.lastName  = profileData.lastName;
//     payload.phone  = profileData.phone;
//     if (profileData.password.trim())  payload.password  = profileData.password;

//     try {
//       await api.put(`/api/users/${user._id}`, payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSuccess("Profile updated successfully.");
//       setError("");
//       setEditMode(false);
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response?.status === 403) {
//         return navigate("/login");
//       }
//       console.error("Profile update error:", err);
//       setError("Failed to update profile.");
//     }
//   };

//   if (loading) return <div>Loading profile…</div>;
//   if (error && !editMode) return <div className="error-banner">{error}</div>;

//   return (
//     <>
//       <title>HITEC | UNIGUIDE | PROFILE</title>
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

//       <div className="profile-page">
//         <div className="profile-card">
//           <div
//             className="profile-back-arrow"
//             onClick={() => navigate("/dashboard")}
//           >
//             <AiOutlineArrowLeft size={24} />
//           </div>

//           <h2 className="profile-card__title">
//             {editMode ? "Update Personal Information" : "My Profile"}
//           </h2>

//           {editMode && success && (
//             <p className="profile-success">{success}</p>
//           )}
//           {editMode && error && (
//             <p className="profile-error">{error}</p>
//           )}

//           {!editMode ? (
//             <>
//               <AvatarSelector
//                 selected={user.avatarUrl}
//                 onSelect={async url => {
//                   try {
//                     await updateProfile({ avatarUrl: url });
//                   } catch (err) {
//                     console.error("Avatar update failed:", err);
//                   }
//                 }}
//               />

//               <div className="profile-details">
//                 <div><strong>First Name:</strong> {profileData.firstName}</div>
//                 <div><strong>Last Name:</strong> {profileData.lastName}</div>
//                 <div><strong>Email:</strong> {profileData.email}</div>
//                 <div><strong>Phone:</strong> {profileData.phone}</div>
//                 <button
//                   onClick={() => {
//                     setEditMode(true);
//                     setError("");
//                     setSuccess("");
//                   }}
//                   className="btn"
//                 >
//                   Edit Details
//                 </button>
//               </div>
//             </>
//           ) : (
//             <form onSubmit={handleFieldSubmit} className="profile-form">
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   value={profileData.firstName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       firstName: e.target.value
//                     }))
//                   }
//                   placeholder="Enter first name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   value={profileData.lastName}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       lastName: e.target.value
//                     }))
//                   }
//                   placeholder="Enter last name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   value={profileData.phone}
//                   onChange={e =>
//                     setProfileData(prev => ({
//                       ...prev,
//                       phone: e.target.value
//                     }))
//                   }
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="form-group password-group">
//                 <label>Password</label>
//                 <div className="password-wrapper">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={profileData.password}
//                     onChange={e =>
//                       setProfileData(prev => ({
//                         ...prev,
//                         password: e.target.value
//                       }))
//                     }
//                     placeholder="New password (optional)"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="toggle-btn"
//                   >
//                     {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//                   </button>
//                 </div>
//               </div>
//               <div className="form-actions">
//                 <button type="submit" className="btn">Update</button>
//                 <button
//                   type="button"
//                   className="btn btn--ghost"
//                   onClick={() => setEditMode(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>

//       <footer className="landing-footer">
//         <div className="footer-content">
//           <p>&copy; {new Date().getFullYear()} HITEC UNIGUIDE. All rights reserved.</p>
//           <div className="social-icons">
//             <a href="https://www.facebook.com/hitecuni/">
//               <i className="fab fa-facebook-f" />
//             </a>
//             <a href="https://www.instagram.com/hitecuni/?hl=en">
//               <i className="fab fa-instagram" />
//             </a>
//             <a href="https://www.linkedin.com/school/hitec-university/posts/?feedView=all">
//               <i className="fab fa-linkedin-in" />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
