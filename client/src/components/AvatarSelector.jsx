// // import React, { useState, useEffect } from "react";
// // import { useAuth } from "../context/AuthContext";

// // const AVATARS = [
// //   "../images/avatar/A_1.avif",
// //   "../images/avatar/A_2.avif",
// //   "../images/avatar/A_3.avif",
// //   "../images/avatar/A_1.avif",
// // ];

// // export default function AvatarSelector() {
// //   const { user, updateProfile } = useAuth();
// //   const [selected, setSelected] = useState(user?.avatarUrl || "");

// //   useEffect(() => {
// //     if (user?.avatarUrl) setSelected(user.avatarUrl);
// //   }, [user?.avatarUrl]);

// //   const pick = async (url) => {
// //     setSelected(url);
// //     try {
// //       await updateProfile({ avatarUrl: url });
// //     } catch (err) {
// //       console.error("Avatar update failed:", err);
// //     }
// //   };

// //   return (
// //     <div className="avatar-selection">
// //       <div className="avatar-selection__title">Choose your avatar</div>
// //       <div className="avatar-options">
// //         {AVATARS.map((url) => (
// //           <button
// //             key={url}
// //             onClick={() => pick(url)}
// //             className={`avatar-option${selected === url ? " selected" : ""}`}
// //             aria-label="Select avatar"
// //           >
// //             <img src={url} alt="" />
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// //////////////



// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

// // Explicit list of your predefined avatars:
// import A1 from "../images/avatar/A_1.avif";
// import A2 from "../images/avatar/A_2.avif";
// import A3 from "../images/avatar/A_3.avif";
// // …add as many as you need

// const AVATARS = [A1, A2, A3];

// export default function AvatarSelector() {
//   const { user, updateProfile } = useAuth();
//   const [selected, setSelected] = useState(user?.avatarUrl || "");

//   useEffect(() => {
//     if (user?.avatarUrl !== undefined) {
//       setSelected(user.avatarUrl);
//     }
//   }, [user?.avatarUrl]);

//   const pick = async (url) => {
//     setSelected(url);
//     try {
//       await updateProfile({ avatarUrl: url });
//     } catch (err) {
//       console.error("Avatar update failed:", err);
//     }
//   };

//   return (
//     <div className="avatar-selection">
//       <div className="avatar-selection__title">Choose your avatar</div>

//       <div className="avatar-options">
//         {AVATARS.map((src, idx) => (
//           <button
//             key={`${src}-${idx}`}
//             type="button"
//             className={`avatar-option${selected === src ? " selected" : ""}`}
//             onClick={() => pick(src)}
//             aria-label={`Select avatar ${idx + 1}`}
//           >
//             <img src={src} alt={`Avatar ${idx + 1}`} />
//           </button>
//         ))}

//         {/* Remove avatar option */}
//         <button
//           type="button"
//           className={`avatar-option remove${
//             selected === "" ? " selected" : ""
//           }`}
//           onClick={() => pick("")}
//           aria-label="Remove avatar"
//         >
//           <i className="fas fa-user-slash fa-2x"></i>
//         </button>
//       </div>
//     </div>
//   );
// }


// // // src/components/AvatarSelector.jsx
// // import React, { useState, useEffect } from "react";
// // import {
// //   // if you have an upload feature, otherwise omit this:
// //   AiOutlineUpload
// // } from "react-icons/ai";

// // // Explicitly import each avatar so Vite/Webpack gives you the right URL:
// // import A1 from "../images/avatar/A_1.avif";
// // import A2 from "../images/avatar/A_2.avif";
// // import B1 from "../images/avatar/A_3.avif";
// // import B2 from "../images/avatar/A_5.webp";
// // // …and so on for all your files

// // const avatars = [A1, A2, B1, B2 /* … */];

// // export default function AvatarSelector({ currentAvatar, onChange }) {
// //   const [selected, setSelected] = useState(currentAvatar || "");

// //   useEffect(() => {
// //     // if parent ever changes the avatar, keep in sync
// //     if (currentAvatar) setSelected(currentAvatar);
// //   }, [currentAvatar]);

// //   const pick = (src) => {
// //     setSelected(src);
// //     onChange(src);
// //   };

// //   return (
// //     <div className="avatar-selector">
// //       {avatars.map((src, idx) => (
// //         <button
// //           key={`${src}-${idx}`}
// //           type="button"
// //           className={`avatar-option ${selected === src ? "selected" : ""}`}
// //           onClick={() => pick(src)}
// //         >
// //           <img src={src} alt={`Avatar ${idx + 1}`} />
// //         </button>
// //       ))}

// //       {/* Optional: upload button */}
// //       <button
// //         type="button"
// //         className="avatar-upload-btn"
// //         onClick={() => {
// //           /* your upload handler here */
// //         }}
// //       >
// //         <AiOutlineUpload size={24} />
// //       </button>
// //     </div>
// //   );
// // }







// // import React, { useState, useEffect, useRef } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import catImg from "../images/avatar/A_1.avif";
// // import dogImg from "../images/avatar/A_2.avif";
// // import owlImg from "../images/avatar/A_1.avif";
// // import foxImg from "../images/avatar/A_1.avif";

// // const AVATARS = [catImg, dogImg, owlImg, foxImg];

// // export default function AvatarSelector() {
// //   const { user, updateProfile } = useAuth();
// //   const [selected, setSelected] = useState(user?.avatarUrl || "");
// //   const [uploading, setUploading] = useState(false);
// //   const fileInputRef = useRef();

// //   // Keep selected in sync if user.avatarUrl changes externally
// //   useEffect(() => {
// //     if (user?.avatarUrl) setSelected(user.avatarUrl);
// //   }, [user?.avatarUrl]);

// //   // Pick one of the default avatars
// //   const pickDefault = async (url) => {
// //     setSelected(url);
// //     try {
// //       await updateProfile({ avatarUrl: url });
// //     } catch (err) {
// //       console.error("Avatar update failed:", err);
// //     }
// //   };

// //   // Handle a user‐uploaded file
// //   const handleUpload = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     // Preview immediately
// //     const previewUrl = URL.createObjectURL(file);
// //     setSelected(previewUrl);

// //     // Prepare to upload
// //     const form = new FormData();
// //     form.append("avatar", file);

// //     setUploading(true);
// //     try {
// //       // Suppose your API endpoint for file upload is /api/users/:id/avatar
// //       const token = localStorage.getItem("token");
// //       const apiUrl = import.meta.env.VITE_API_URL;
// //       const resp = await fetch(
// //         `${apiUrl}/api/users/${user._id}/avatar`,
// //         {
// //           method: "POST",
// //           headers: { Authorization: `Bearer ${token}` },
// //           body: form,
// //         }
// //       );
// //       const data = await resp.json();
// //       // Server returns the new URL in data.avatarUrl
// //       await updateProfile({ avatarUrl: data.avatarUrl });
// //       setSelected(data.avatarUrl);
// //     } catch (err) {
// //       console.error("Upload failed:", err);
// //       // Optionally show an error
// //     } finally {
// //       setUploading(false);
// //       fileInputRef.current.value = ""; // reset input
// //     }
// //   };

// //   return (
// //     <div className="avatar-selection">
// //       <div className="avatar-selection__title">Choose your avatar</div>

// //       <div className="avatar-options">
// //         {AVATARS.map((url) => (
// //           <button
// //             key={url}
// //             onClick={() => pickDefault(url)}
// //             className={`avatar-option${selected === url ? " selected" : ""}`}
// //             aria-label="Select avatar"
// //           >
// //             <img src={url} alt="avatar option" />
// //           </button>
// //         ))}

// //         {/* Uploaded preview as an option */}
// //         {selected && !AVATARS.includes(selected) && (
// //           <div className="avatar-option selected">
// //             <img src={selected} alt="custom avatar" />
// //           </div>
// //         )}
// //       </div>

// //       <label className="avatar-upload-label">
// //         {uploading ? "Uploading…" : "Upload your own"}
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           accept="image/*"
// //           onChange={handleUpload}
// //           disabled={uploading}
// //         />
// //       </label>
// //     </div>
// //   );
// // }






// // import React, { useState, useEffect } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import Img1 from "../images/avatar/A_1.avif";
// // import Img2 from "../images/avatar/A_2.avif";
// // import Img3 from "../images/avatar/A_3.avif";
// // import Img4 from "../images/avatar/A_1.avif";

// // const AVATARS = [Img1, Img2, Img3, Img4];

// // export default function AvatarSelector() {
// //   const { user, updateProfile } = useAuth();
// //   const [selected, setSelected] = useState(user?.avatarUrl || "");

// //   // Sync if avatarUrl changes elsewhere
// //   useEffect(() => {
// //     if (user?.avatarUrl) {
// //       setSelected(user.avatarUrl);
// //     }
// //   }, [user?.avatarUrl]);

// //   const pickDefault = async (url) => {
// //     setSelected(url);
// //     try {
// //       await updateProfile({ avatarUrl: url });
// //     } catch (err) {
// //       console.error("Avatar update failed:", err);
// //     }
// //   };

// //   return (
// //     <div className="avatar-selection">
// //       <div className="avatar-selection__title">Choose your avatar</div>
// //       <div className="avatar-options">
// //         {AVATARS.map((url) => (
// //           <button
// //             key={url}
// //             type="button"
// //             onClick={() => pickDefault(url)}
// //             className={`avatar-option${selected === url ? " selected" : ""}`}
// //             aria-label="Select avatar"
// //           >
// //             <img src={url} alt="avatar option" />
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useState, useEffect } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import Img1 from "../images/avatar/A_1.avif";
// // import Img2 from "../images/avatar/A_2.avif";
// // import Img3 from "../images/avatar/A_3.avif";
// // import Img4 from "../images/avatar/A_5.webp";  // fixed import

// // const AVATARS = [Img1, Img2, Img3, Img4];

// // export default function AvatarSelector() {
// //   const { user, updateProfile } = useAuth();
// //   const [selected, setSelected] = useState(user?.avatarUrl || "");

// //   // keep selected in sync if changed elsewhere
// //   useEffect(() => {
// //     if (user?.avatarUrl) {
// //       setSelected(user.avatarUrl);
// //     }
// //   }, [user?.avatarUrl]);

// //   const pickDefault = async url => {
// //     setSelected(url);
// //     try {
// //       await updateProfile({ avatarUrl: url });
// //     } catch (err) {
// //       console.error("Avatar update failed:", err);
// //     }
// //   };

// //   return (
// //     <div
// //       className="avatar-selection"
// //       role="group"
// //       aria-label="Choose your avatar"
// //     >
// //       <div className="avatar-selection__title">Choose your avatar</div>
// //       <div className="avatar-options">
// //         {AVATARS.map((url, idx) => (
// //           <button
// //             key={`${url}-${idx}`}                     // unique key
// //             type="button"
// //             onClick={() => pickDefault(url)}
// //             className={`avatar-option${selected === url ? " selected" : ""}`}
// //             aria-pressed={selected === url}
// //             aria-label={`Select avatar ${idx + 1}`}
// //           >
// //             <img src={url} alt={`Avatar option ${idx + 1}`} />
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AvatarSelector.css';

const AVATARS = [
  '../images/avatar/A_1.avif',
  '../images/avatar/A_2.avif',
  '../images/avatar/A_3.avif',
  '../images/avatar/A_4.jpg',
  '../images/avatar/A_5.webp',
  '../images/avatar/A_6.jpeg',
];

export default function AvatarSelector({ current, onChange }) {
  const [selected, setSelected] = useState(current || '');

  // whenever parent gives us a new current, update local state
  useEffect(() => {
    if (current) setSelected(current);
  }, [current]);

  const handleClick = (url) => {
    setSelected(url);
    onChange(url);
  };

  return (
    <div className="avatar-selector">
      <h2>Select Your Avatar</h2>
      <div className="avatar-grid">
        {AVATARS.map((url, idx) => (
          <button
            key={url}
            type="button"
            className={`avatar-option${selected === url ? ' selected' : ''}`}
            onClick={() => handleClick(url)}
            aria-pressed={selected === url}
            aria-label={`Avatar ${idx + 1}`}
          >
            <img src={url} alt={`Avatar ${idx + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

AvatarSelector.propTypes = {
  /** URL of the avatar that should start off selected */
  current: PropTypes.string,
  /** Called with the new avatar URL whenever the user picks one */
  onChange: PropTypes.func.isRequired,
};

AvatarSelector.defaultProps = {
  current: '',
};
