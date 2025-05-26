// // src/components/ProfileMenu.jsx
// import React, { useState, useRef, useEffect } from 'react'
// import { useAuth } from '../context/AuthContext'
// // import "../css/dash/profile.css";

// export default function ProfileMenu() {
//   const { user, loading, logout } = useAuth()
//   const [open, setOpen] = useState(false)
//   const menuRef = useRef(null)
//   const btnRef = useRef(null)

//   // Close dropdown on outside click or Esc
//   useEffect(() => {
//     function handleClick(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false)
//       }
//     }
//     function handleKey(e) {
//       if (e.key === 'Escape') {
//         setOpen(false)
//         btnRef.current?.focus()
//       }
//     }
//     document.addEventListener('mousedown', handleClick)
//     document.addEventListener('keydown', handleKey)
//     return () => {
//       document.removeEventListener('mousedown', handleClick)
//       document.removeEventListener('keydown', handleKey)
//     }
//   }, [])

//   // If still loading (session restore), show a badge
//   const isLoading = loading && !user

//   return (
//     <div className="relative flex items-center" ref={menuRef}>
//       {/* Loading badge */}
//       {isLoading && (
//         <span
//           className="
//             absolute -top-2 right-0 
//             bg-yellow-100 text-yellow-800 text-xs font-medium 
//             px-2 py-0.5 rounded-full
//             border border-yellow-200
//           "
//         >
//           …
//         </span>
//       )}

//       {/* Avatar button */}
//       <button
//         ref={btnRef}
//         onClick={() => setOpen(o => !o)}
//         aria-haspopup="menu"
//         aria-expanded={open}
//         className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
//         title={
//           loading
//             ? 'Loading…'
//             : user
//             ? `Signed in as ${user.name}`
//             : 'Not signed in'
//         }
//       >
//         {user && user.avatarUrl
//           ? <img
//               src={user.avatarUrl}
//               alt={user.name || 'Your avatar'}
//               className="object-cover w-full h-full transition-colors duration-200 border-2 border-green-500 rounded-full hover:border-green-600"
//             />
//           : <div className="w-full h-full bg-gray-200" />
//         }
//       </button>

//       {/* Dropdown */}
//       {open && user && (
//         <div
//           className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg "
//           role="menu"
//           aria-label="Profile menu"
//         >
//           <div className="px-4 py-2 border-b border-gray-100">
//             <div className="text-sm font-semibold text-gray-800">{user.name}</div>
//             <div className="text-xs text-gray-500">{user.email}</div>
//           </div>
//           <button
//             onClick={() => { logout(); setOpen(false) }}
//             className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
//             role="menuitem"
//           >
//             Log out
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }





////////////////////////////



// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';

// export default function ProfileMenu() {
//   const { user, loading, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);
//   const btnRef = useRef(null);

//   // Close dropdown on outside click or Esc
//   useEffect(() => {
//     function handleClick(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     function handleKey(e) {
//       if (e.key === 'Escape') {
//         setOpen(false);
//         btnRef.current?.focus();
//       }
//     }
//     document.addEventListener('mousedown', handleClick);
//     document.addEventListener('keydown', handleKey);
//     return () => {
//       document.removeEventListener('mousedown', handleClick);
//       document.removeEventListener('keydown', handleKey);
//     };
//   }, []);

//   const isLoading = loading && !user;

//   return (
//     <div className="relative flex items-center" ref={menuRef}>
//       {isLoading && (
//         <span className="absolute -top-2 right-0 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full border border-yellow-200">
//           …
//         </span>
//       )}

//       <button
//         ref={btnRef}
//         onClick={() => setOpen((o) => !o)}
//         aria-haspopup="menu"
//         aria-expanded={open}
//         className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
//         title={loading ? 'Loading…' : user ? `Signed in as ${user.name}` : 'Not signed in'}
//       >
//         {user && user.avatarUrl ? (
//           <img
//             src={user.avatarUrl}
//             alt={user.name || 'Your avatar'}
//             className="object-cover w-full h-full transition-colors duration-200 border-2 border-green-500 rounded-full hover:border-green-600"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200" />
//         )}
//       </button>

//       {open && user && (
//         <div
//           className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
//           role="menu"
//           aria-label="Profile menu"
//         >
//           <div className="px-4 py-2 border-b border-gray-100">
//             <div className="text-sm font-semibold text-gray-800">{user.name}</div>
//             <div className="text-xs text-gray-500">{user.email}</div>
//           </div>
//           <button
//             onClick={() => {
//               logout();
//               setOpen(false);
//             }}
//             className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
//             role="menuitem"
//           >
//             Log out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }







// src/components/ProfileMenu.jsx
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfileMenu() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close on outside click or Esc
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const isLoading = loading && !user;
  const displayName = user?.name || user?.email;

  return (
    <div className="relative flex items-center" ref={menuRef} style={{ zIndex: 9999 }}>
      {isLoading && (
        <span className="absolute -top-2 right-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full border border-yellow-200">
          
          …
        </span>
      )}

      <button
        ref={btnRef}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={loading ? 'Loading…' : user ? `Signed in as ${displayName}` : 'Not signed in'}
        className="w-10 h-10 overflow-hidden border-2 border-green-500 rounded-full hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
      >
        {user && user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'Your avatar'}
            className=""
          />
        ) : (
          <div className="w-full h-full bg-orange-500" />
        )}
      </button>

      {open && user && (
        <div
          className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
          role="menu"
          aria-label="Profile menu"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
