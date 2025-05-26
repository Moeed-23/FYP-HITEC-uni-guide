// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token });
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setUser({ token });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

/////////////////
////////
///////

// import { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from "jwt-decode";


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUser(decoded); // contains user id etc
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

////////////
/////////
/////////
//////
////

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Invalid token", err);
//         localStorage.removeItem('token');
//         setUser(null);
//       }
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);




///////////////////////////
/////////////////////



// import { createContext, useContext, useState, useEffect } from "react";
// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
  
//   // Possibly load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData, token) => {
//     // Save user and token in localStorage
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const value = { user, login, logout };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }


//////////////////////
///////////////////

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
  
//   // Load user from localStorage on mount, if available
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Expects full user data and the token
//   const login = (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const value = { user, login, logout };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }



////////////////////////////////////// last ////////////////////////////////


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext({
//   user: null,
//   loading: true,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: () => {}
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Restore session from localStorage (or call token‑refresh API)
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Replace with real API call:
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }




// src/context/AuthContext.jsx

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext({
//   user:            null,
//   loading:         true,
//   isAuthenticated: false,
//   login:           async () => {},
//   logout:          () => {},
//   updateUser:      () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user,    setUser]   = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On mount, restore from localStorage (or refresh token)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token      = localStorage.getItem("token");
//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Simulated login: store both user & token
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // Merge partial updates into `user`, persist to localStorage
//   const updateUser = (updates) => {
//     setUser(prev => {
//       if (!prev) return prev;
//       const next = { ...prev, ...updates };
//       localStorage.setItem("user", JSON.stringify(next));
//       return next;
//     });
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         isAuthenticated,
//         login,
//         logout,
//         updateUser,  // <-- exposed here
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }



/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext({
//   user:            null,
//   isAuthenticated: false,
//   login:           async () => {},
//   logout:          () => {},
//   updateUser:      () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   // 1) Hydrate `user` synchronously from localStorage
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem("user");
//       const token  = localStorage.getItem("token");
//       if (stored && token) {
//         return JSON.parse(stored);
//       }
//     } catch {
//       // ignore parse errors
//     }
//     return null;
//   });

//   const isAuthenticated = Boolean(user);

//   /**
//    * Call after receiving `{ user: userData, token }` from your /login or /signup endpoint.
//    */
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   /** Clears out both user & token */
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   /**
//    * Merge in partial updates (e.g. only avatar) and persist them back to localStorage.
//    */
//   const updateUser = (updates) => {
//     setUser((prev) => {
//       if (!prev) return prev;
//       const next = { ...prev, ...updates };
//       localStorage.setItem("user", JSON.stringify(next));
//       return next;
//     });
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         login,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext({
//   user:            null,
//   isAuthenticated: false,
//   loading:         true,
//   login:           async () => {},
//   logout:          () => {},
//   updateUser:      () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user,    setUser]    = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 1) On mount: if we have a token, fetch /auth/me
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUser(res.data))
//       .catch(() => {
//         localStorage.removeItem("token");
//         setUser(null);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // 2) Call this after receiving `{ user: userData, token }` from /login or /signup
//   const login = async (userData, token) => {
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   // 3) Clears token + user
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // 4) Merge in partial updates (e.g. new avatar) into in-memory user
//   const updateUser = (updates) => {
//     setUser((prev) => (prev ? { ...prev, ...updates } : prev));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }




// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  user:            null,
  isAuthenticated: false,
  loading:         true,
  login:           async () => {},
  logout:          () => {},
  updateUser:      () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) On mount: if we have a token, fetch /auth/me
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        // invalid/expired token
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 2) login: save token, then fetch full user to pick up avatar
  const login = async (userData, token) => {
    localStorage.setItem("token", token);
    // option A: trust the passed userData (must include avatar):
    // setUser(userData);

    // option B (recommended): always re-fetch “me”
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
    } catch {
      // fallback to whatever they sent
      setUser(userData);
    }
  };

  // 3) logout: clears token + user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 4) updateUser: merge partial changes (avatar, etc.)
  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
    
  );
}

//////


// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext({
//   user: null,
//   loading: true,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: () => {},
//   updateProfile: async () => {}
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser]     = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Rehydrate from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("user");
//     const token  = localStorage.getItem("token");
//     if (stored && token) {
//       setUser(JSON.parse(stored));
//     }
//     setLoading(false);
//   }, []);

//   // login: store user + token
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   // logout: clear everything
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   // updateProfile: calls PUT /api/users/me, updates context + localStorage
//   const updateProfile = async (updates) => {
//     const token  = localStorage.getItem("token");
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const { data } = await axios.put(
//       `${apiUrl}/api/users/me`,
//       updates,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     const updatedUser = data.user || data;
//     setUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     return updatedUser;
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAuthenticated, login, logout, updateProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }



// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext({
//   user: null,
//   loading: true,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: () => {}
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser]       = useState(null);
//   const [loading, setLoading] = useState(true);

//   // On mount: try to restore session from token
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(({ data }) => {
//         setUser(data.user);
//       })
//       .catch((err) => {
//         console.error("Session restore failed:", err);
//         localStorage.removeItem("token");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Call this after a successful login API call
//   const login = async (userData, token) => {
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAuthenticated, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }





/////////////////////////////////// 15/5/2025 ////////////////////////////////

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext({
//   user: null,
//   loading: true,
//   isAuthenticated: false,
//   login: async () => {},
//   logout: () => {},
//   updateProfile: async () => {},
// });

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Restore session from localStorage
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");
//     if (storedUser && token) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Fake‐API login (swap out for your real endpoint)
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   /**
//    * Merge updates into user, persist to localStorage, and update React state.
//    * Example: updateProfile({ avatarUrl, firstName, phone })
//    */
//   const updateProfile = async (updates) => {
//     if (!user) throw new Error("Not signed in");
//     const merged = { ...user, ...updates };
//     localStorage.setItem("user", JSON.stringify(merged));
//     setUser(merged);
//     return merged;
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, isAuthenticated, login, logout, updateProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }




// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// /**
//  * Hook to read auth state + actions
//  */
// export function useAuth() {
//   return useContext(AuthContext);
// }

// /**
//  * Wrap your app in this to get user / login / logout
//  */
// export function AuthProvider({ children }) {
//   // 1) Lazy‐init so refreshes “remember” the user immediately
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem("user");
//       const token  = localStorage.getItem("token");
//       return stored && token ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   });

//   // 2) Log in: store user + token
//   const login = async (userData, token) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", token);
//     setUser(userData);
//   };

//   // 3) Log out: clear storage
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const isAuthenticated = Boolean(user);

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
