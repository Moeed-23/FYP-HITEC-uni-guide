// import { Link } from "react-router-dom";
// import "../css/navbar.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Navbar = () => {
//   return (
    
        
//     <nav className="navbar">
      
//       <h1>
//         <Link to="/" style={{  color: "#f77f00", textDecoration: "none" }}>
//         HITEC UNIGUIDE
//       </Link>
//       </h1>
      
//       { <ul>
        
//         {/* <li><Link to="/home">Home</Link></li>
//         <li><Link to="/chat">Chat</Link></li>
//         <li><Link to="/admissions">Admissions</Link></li>
//         <li><Link to="/events">Events</Link></li>
//         <li><Link to="/tour">Tour</Link></li>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/alumni">Alumni</Link></li>
//         <li><Link to="/industry-integration">Industry Integration</Link></li>
//         <li><Link to="/feedback">Feedback</Link></li> */}
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/signup">Signup</Link></li>
//       </ul> }
//     </nav>
//   );
// };

// export default Navbar;



/////////////////////////////////

// import { Link } from "react-router-dom";
// import "../css/navbar.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import logo from "../../Logo_round.png"; 
     

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h1>
//       <Link to="/" className="navbar-brand">
//         <img src={logo} alt="HITEC UniGuide Logo" className="navbar-logo" />
//         HITEC UNIGUIDE
//       </Link>
//       </h1>
//       <ul className="navbar-nav">
//         <li><Link to="/login">Login</Link></li>
//         <li><Link to="/signup">Signup</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;








// import React from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import ProfileMenu from "./ProfileMenu"
// import "../css/navbar.css"
// import "@fortawesome/fontawesome-free/css/all.min.css"
// import logo from "../../Logo_round.png"

// export default function Navbar() {
//   const { isAuthenticated } = useAuth()

//   return (
//     <nav className="navbar">
//       <h1 className="navbar-brand">
//         <Link to="/">
//           <img src={logo} alt="HITEC UniGuide Logo" className="navbar-logo" />
//           HITEC UNIGUIDE
//         </Link>
//       </h1>

//       <ul className="navbar-nav">
//         {/* if logged in, show avatar + dropdown menu */}
//         {isAuthenticated ? (
//           <li className="nav-item">
//             <ProfileMenu />
//           </li>
//         ) : (
//           <>
//             <li className="nav-item">
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/signup" className="nav-link">
//                 Signup
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   )
// }





import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ProfileMenu from "./ProfileMenu"
import "../css/navbar.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import logo from "../../Logo_round.png"

export default function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <nav className="top-bar">
      <h1 className="navbar-brand">
        <Link to="/" className="brand-link">
          <span className="logo-wrapper">
            <img
              src={logo}
              alt="HITEC UniGuide Logo"
              className="navbar-logo"
            />
          </span>
          <span className="uniguide-text">HITEC UNIGUIDE</span>
        </Link>
      </h1>

      <ul className="navbar-nav">
        {isAuthenticated ? (
          <li className="nav-item">
            <ProfileMenu />
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
