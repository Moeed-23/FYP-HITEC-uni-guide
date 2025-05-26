// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";
// import Homepage from "./pages/Homepage";
// import Admission from "./pages/Admission";
// import Alumni from "./pages/Alumni";
// import Chat from "./pages/ChatBot";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Events from "./pages/Events";
// import StudentResources from "./pages/StudentResources";
// import Tour from "./pages/Tour";
// import IndustryIntegration from "./pages/IndustryIntegration";
// import Signup from "./pages/Signup";
// import './index.css';
// import PrivateRoute from "./components/PrivateRoute";
// import 'leaflet/dist/leaflet.css';
// //dashboard
// import Profile from "./pages/Dash/Profile"
// import SavedQuestions from "./pages/Dash/SavedQuestions"
// import Notifications from "./pages/Dash/Notifications"
// import AcademicSchedule from "./pages/Dash/AcademicSchedule"

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/homepage" element={<Homepage />} />
//         <Route path="/admissions" element={<Admission />} />
//         <Route path="/alumni" element={<Alumni />} />
//         <Route path="/chatbot" element={<Chat />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/studentresources" element={<StudentResources />} />
//         <Route path="/tour" element={<Tour />} />
//         <Route path="/industry-integration" element={<IndustryIntegration />} />

//         {/* Dashboard Routes */}
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/saved-questions" element={<SavedQuestions />} />
//         <Route path="/notifications" element={<Notifications />} />
//         <Route path="/academic-schedule" element={<AcademicSchedule />} />

//       </Routes>
//     </Router>
//   );
// }
// export default App;


// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ChatProvider } from "./context/chatContext";    // ← new
// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";
// import Homepage from "./pages/Homepage";
// import Admission from "./pages/Admission";
// import Alumni from "./pages/Alumni";
// import Chat from "./pages/ChatBot";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Events from "./pages/Events";
// import StudentResources from "./pages/StudentResources";
// import Tour from "./pages/Tour";
// import IndustryIntegration from "./pages/IndustryIntegration";
// import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
// // dashboard sub-pages…
// import Profile from "./pages/Dash/Profile";
// import SavedQuestions from "./pages/Dash/SavedQuestions";
// import Notifications from "./pages/Dash/Notifications";
// import AcademicSchedule from "./pages/Dash/AcademicSchedule";
// import "./index.css";
// import "leaflet/dist/leaflet.css";

// function App() {
//   return (
//     <Router>
//       <ChatProvider>               {/* ← wrap everything so it never unmounts */}
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/admissions" element={<Admission />} />
//           <Route path="/alumni" element={<Alumni />} />
//           <Route path="/chatbot" element={<Chat />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/studentresources" element={<StudentResources />} />
//           <Route path="/tour" element={<Tour />} />
//           <Route path="/industry-integration" element={<IndustryIntegration />} />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/saved-questions" element={<SavedQuestions />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/academic-schedule" element={<AcademicSchedule />} />
//         </Routes>
//       </ChatProvider>
//     </Router>
//   );
// }
// export default App;








// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ChatProvider from "./context/chatProvider";    // ← default‐import your provider
// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";
// import Homepage from "./pages/Homepage";
// import Admission from "./pages/Admission";
// import Alumni from "./pages/Alumni";
// import Chat from "./pages/ChatBot";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Events from "./pages/Events";
// import StudentResources from "./pages/StudentResources";
// import Tour from "./pages/Tour";
// import IndustryIntegration from "./pages/IndustryIntegration";
// import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
// // dashboard sub-pages
// import Profile from "./pages/Dash/Profile";
// import SavedQuestions from "./pages/Dash/SavedQuestions";
// import Notifications from "./pages/Dash/Notifications";
// import AcademicSchedule from "./pages/Dash/AcademicSchedule";

// import "./index.css";
// import "leaflet/dist/leaflet.css";

// function App() {
//   return (
//     <Router>
//       <ChatProvider>  {/* ← lives above all routes, never unmounts */}
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/admissions" element={<Admission />} />
//           <Route path="/alumni" element={<Alumni />} />
//           <Route path="/chatbot" element={<Chat />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/studentresources" element={<StudentResources />} />
//           <Route path="/tour" element={<Tour />} />
//           <Route
//             path="/industry-integration"
//             element={<IndustryIntegration />}
//           />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/saved-questions" element={<SavedQuestions />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route
//             path="/academic-schedule"
//             element={<AcademicSchedule />}
//           />
//         </Routes>
//       </ChatProvider>
//     </Router>
//   );
// }

// export default App;



// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatProvider from "./context/chatProvider";
import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";
// import Homepage from "./pages/Homepage";
// import Admission from "./pages/Admission";
import Alumni from "./pages/Alumni";
import Chat from "./pages/ChatBot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import StudentResources from "./pages/StudentResources";
import Tour from "./pages/Tour";
import IndustryIntegration from "./pages/IndustryIntegration";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
// Dashboard sub-pages
import Profile from "./pages/Dash/Profile";
import SavedQuestions from "./pages/Dash/SavedQuestions";
import Notifications from "./pages/Dash/Notifications";
import AcademicSchedule  from "./pages/Dash/AcademicSchedule";
import Landingpage from "./pages/landingpage";
import "./index.css";
import "leaflet/dist/leaflet.css";
import  HomePage from "./pages/Home";
import AdmissionsPage from "./pages/Admission_2";

function App() {
  // Ask for Notification permission on load
  React.useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Router>
      <ChatProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/chatbot" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/studentresources" element={<StudentResources />} />
          <Route path="/tour" element={<Tour />} />
          <Route
            path="/industry-integration"
            element={<IndustryIntegration />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-questions" element={<SavedQuestions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/academic-schedule"
            element={<AcademicSchedule />}
          />
        </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";
// import Homepage from "./pages/Homepage";
// import Admission from "./pages/Admission";
// import Alumni from "./pages/Alumni";
// import Chat from "./pages/ChatBot";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Events from "./pages/Events";
// import StudentResources from "./pages/StudentResources";
// import Tour from "./pages/Tour";
// import IndustryIntegration from "./pages/IndustryIntegration";

// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Dash/Profile";
// import SavedQuestions from "./pages/Dash/SavedQuestions";
// import Notifications from "./pages/Dash/Notifications";
// import AcademicSchedule from "./pages/Dash/AcademicSchedule";

// import PrivateRoute from "./components/PrivateRoute";

// import 'leaflet/dist/leaflet.css';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/homepage" element={<Homepage />} />
//         <Route path="/admissions" element={<Admission />} />
//         <Route path="/alumni" element={<Alumni />} />
//         <Route path="/chatbot" element={<Chat />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/studentresources" element={<StudentResources />} />
//         <Route path="/tour" element={<Tour />} />
//         <Route path="/industry-integration" element={<IndustryIntegration />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Dashboard & Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <PrivateRoute>
//               <Profile />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/saved-questions"
//           element={
//             <PrivateRoute>
//               <SavedQuestions />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/notifications"
//           element={
//             <PrivateRoute>
//               <Notifications />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/academic-schedule"
//           element={
//             <PrivateRoute>
//               <AcademicSchedule />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;





// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useAuth } from './context/AuthContext.jsx'

// import Navbar from './components/Navbar'
// import PrivateRoute from './components/PrivateRoute.jsx'

// // Public pages
// import Landing from './pages/Landing'
// import Homepage from './pages/Homepage'
// import Admission from './pages/Admission'
// import Alumni from './pages/Alumni'
// import Chat from './pages/ChatBot'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import Events from './pages/Events'
// import Feedback from './pages/Feedback'
// import Tour from './pages/Tour'
// import IndustryIntegration from './pages/IndustryIntegration'

// // Dashboard entry / container
// import Dashboard from './pages/Dashboard'

// // Dashboard sub-pages
// import Profile from './pages/Dash/Profile'
// import SavedQuestions from './pages/Dash/SavedQuestions'
// import Notifications from './pages/Dash/Notifications'
// import AcademicSchedule from './pages/Dash/AcademicSchedule'

// export default function App() {
//   const { loading } = useAuth()

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600">Loading application…</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-gray-100">
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<Landing />} />
//           <Route path="/homepage" element={<Homepage />} />
//           <Route path="/admissions" element={<Admission />} />
//           <Route path="/alumni" element={<Alumni />} />
//           <Route path="/chatbot" element={<Chat />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/feedback" element={<Feedback />} />
//           <Route path="/tour" element={<Tour />} />
//           <Route path="/industry-integration" element={<IndustryIntegration />} />

//           {/* All dashboard‑area routes require auth */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/saved-questions" element={<SavedQuestions />} />
//             <Route path="/notifications" element={<Notifications />} />
//             <Route path="/academic-schedule" element={<AcademicSchedule />} />
//           </Route>

//           {/* Catch‑all */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//     </>
//   )
// }
