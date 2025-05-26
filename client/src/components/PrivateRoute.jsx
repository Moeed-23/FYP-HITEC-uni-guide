// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();

//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;

///////////////////////
//////////////////


// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;




// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /**
//  * Wrap any route you want protected:
//  *   <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
//  */
// export default function PrivateRoute({ children }) {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated
//     ? children
//     : <Navigate to="/login" replace />;
// }


// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



{/* <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/> */}

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // While session is being rehydrated, show a loader
  if (loading) {
    return <div className="loader">Checking your session…</div>;
  }

  // Once loading is false, either render or redirect
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}




// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'

// export default function PrivateRoute() {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600">Checking authentication…</p>
//       </div>
//     )
//   }

//   return user
//     ? <Outlet />
//     : <Navigate to="/login" replace />
// }
