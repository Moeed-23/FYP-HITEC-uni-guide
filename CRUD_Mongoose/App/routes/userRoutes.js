// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getUserById } = require("../controllers/userController");
// const { protect } = require('../middleware/authMiddleware');

// router.get("/:id", getUserById);
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get("/dashboard", authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");
//   res.json(user);
// });


// module.exports = router;



////////////////////////

// routes/userRoutes.js


// const express = require("express");
// const router = express.Router();
// const { getUserById } = require("../controllers/userController");
// const User = require("../models/User"); // ✅ needed for inline route logic
// const { protect } = require("../middleware/authMiddleware"); // ✅ confirm this file exists


// // Use either the controller OR the inline route (not both)
// router.get("/:id", protect, getUserById);

// // Optional: Dashboard route
// router.get("/dashboard", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


///
/////////////////////
/////////



// import express from "express";
// import { authenticateUser } from "../middleware/authMiddleware.js"; // Ensure file name and extension are correct
// import AcademicSchedule from "../models/AcademicSchedule.js";
// import User from "../models/User.js"; // Import the User model if not already

// const router = express.Router();

// // GET user profile data: /api/users/:userId
// router.get("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Only allow if the logged in user matches the requested user
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).select("-password");
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile data: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       req.body,
//       { new: true }
//     ).select("-password");
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;



//////////



// import express from "express";
// import { authenticateUser } from "../middleware/authMiddleware.js";
// import AcademicSchedule from "../models/AcademicSchedule.js"; // Ensure this file exists and uses ES module syntax
// import User from "../models/User.js";

// const router = express.Router();

// // GET user profile: /api/users/:userId
// router.get("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).select("-password");
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       req.body,
//       { new: true }
//     ).select("-password");
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// export default router;




//////////////////////


// const express = require("express");
// const { authenticateUser } = require("../middleware/authMiddleware");
// const AcademicSchedule = require("../models/AcademicSchedule");
// const User = require("../models/User");

// const router = express.Router();

// // GET user profile data: /api/users/:userId
// router.get("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Only allow if the logged in user matches the requested user
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).select("-password");
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile data: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       req.body,
//       { new: true }
//     ).select("-password");
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;



///////////////////////////////////////////////////////////////////////////////////////////////////////
// // routes/userRoutes.js

const express = require("express");
const bcrypt  = require("bcryptjs");
const  authenticateUser  = require("../middleware/authMiddleware");
const AcademicSchedule      = require("../models/AcademicSchedule");
const User                  = require("../models/User");
const router = express.Router();

// GET user profile data: /api/users/:userId
router.get("/:userId", authenticateUser, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error("GET /users/:userId error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// GET notifications: /api/users/:userId/notifications
router.get("/:userId/notifications", authenticateUser, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const user = await User.findById(req.params.userId).populate("notifications");
    return res.json(user.notifications || []);
  } catch (error) {
    console.error("GET /users/:userId/notifications error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// GET academic schedule: /api/users/:userId/academic-schedule
router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const schedule = await AcademicSchedule.find({ userId: req.params.userId });
    return res.json(schedule);
  } catch (error) {
    console.error("GET /users/:userId/academic-schedule error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE user profile data: /api/users/:userId
router.put("/:userId", authenticateUser, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const userDoc = await User.findById(req.params.userId);
    if (!userDoc) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, phone, password, avatar } = req.body;

    if (firstName  != null) userDoc.firstName = firstName;
    if (lastName   != null) userDoc.lastName  = lastName;
    if (phone      != null) userDoc.phone     = phone;
    if (avatar     != null) userDoc.avatar    = avatar;

    if (password != null && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      userDoc.password = await bcrypt.hash(password, salt);
    }

    await userDoc.save();

    const safe = userDoc.toObject();
    delete safe.password;
    return res.json(safe);
  } catch (error) {
    console.error("PUT /users/:userId error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;


//////////////////////////////////////////////////////////////////////////



// const express = require("express");
// const bcrypt = require("bcrypt");
// const { authenticateUser } = require("../middleware/authMiddleware");
// const AcademicSchedule = require("../models/AcademicSchedule");
// const User = require("../models/User");

// const router = express.Router();

// // GET user profile data: /api/users/:userId
// router.get("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Only allow access if the logged-in user matches the requested user
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).select("-password");
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile data: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Ensure that only the authenticated user can update their data
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Create a copy of the update payload
//     const updatedData = { ...req.body };

//     // If a new password is provided (non-empty), hash it before updating.
//     // Otherwise, remove the password field to avoid overwriting the existing hash.
//     if (updatedData.password && updatedData.password.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       updatedData.password = await bcrypt.hash(updatedData.password, salt);
//     } else {
//       delete updatedData.password;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       updatedData,
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;






// const express = require('express');
// const bcrypt  = require('bcrypt');
// const multer  = require('multer');
// const path    = require('path');
// const fs      = require('fs');
// const { authenticateUser } = require('../middleware/authMiddleware');
// const User    = require('../models/User');
// const router  = express.Router();

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = path.join(__dirname, '../public/uploads/avatars');
//     fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${req.user.id}-${Date.now()}${ext}`);
//   }
// });
// const upload = multer({ storage });

// // GET /api/users/:userId
// router.get('/:userId', authenticateUser, async (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   const user = await User.findById(req.user.id).select('-password');
//   res.json(user);
// });

// // PUT /api/users/:userId
// router.put('/:userId', authenticateUser, async (req, res) => {
//   if (req.user.id !== req.params.userId) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   const updates = { ...req.body };
//   if (updates.password?.trim()) {
//     updates.password = await bcrypt.hash(updates.password, 10);
//   } else {
//     delete updates.password;
//   }
//   const user = await User.findByIdAndUpdate(
//     req.user.id,
//     updates,
//     { new: true }
//   ).select('-password');
//   res.json(user);
// });

// // POST /api/users/:userId/avatar
// router.post(
//   '/:userId/avatar',
//   authenticateUser,
//   upload.single('avatar'),
//   async (req, res) => {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const avatarUrl = `/uploads/avatars/${req.file.filename}`;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatarUrl },
//       { new: true }
//     ).select('-password');
//     res.json({ avatarUrl: user.avatarUrl });
//   }
// );
// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile data: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Ensure that only the authenticated user can update their data
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Create a copy of the update payload
//     const updatedData = { ...req.body };

//     // If a new password is provided (non-empty), hash it before updating.
//     // Otherwise, remove the password field to avoid overwriting the existing hash.
//     if (updatedData.password && updatedData.password.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       updatedData.password = await bcrypt.hash(updatedData.password, salt);
//     } else {
//       delete updatedData.password;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       updatedData,
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });


// module.exports = router;



///////////////////////////////////////////////////




// const express = require("express");
// const bcrypt = require("bcrypt");
// const multer  = require("multer");
// const path    = require("path");
// const fs      = require("fs");
// const { authenticateUser } = require("../middleware/authMiddleware");
// const AcademicSchedule     = require("../models/AcademicSchedule");
// const User                 = require("../models/User");

// const router = express.Router();

// // — Multer setup for avatar uploads —
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = path.join(__dirname, "../public/uploads/avatars");
//     fs.mkdirSync(dir, { recursive: true });
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${req.user.id}-${Date.now()}${ext}`);
//   }
// });
// const upload = multer({ storage });

// // GET user profile
// router.get("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).select("-password");
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile (fields)
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const updatedData = { ...req.body };

//     // Handle password hashing
//     if (updatedData.password && updatedData.password.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       updatedData.password = await bcrypt.hash(updatedData.password, salt);
//     } else {
//       delete updatedData.password;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       updatedData,
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPLOAD avatar
// // multipart/form-data with field name "avatar"
// router.post(
//   "/:userId/avatar",
//   authenticateUser,
//   upload.single("avatar"),
//   async (req, res) => {
//     try {
//       if (req.user.id !== req.params.userId) {
//         return res.status(403).json({ message: "Access denied" });
//       }
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       // public URL for client
//       const avatarUrl = `/uploads/avatars/${req.file.filename}`;

//       const user = await User.findByIdAndUpdate(
//         req.params.userId,
//         { avatarUrl },
//         { new: true }
//       ).select("-password");

//       return res.status(200).json({ avatarUrl: user.avatarUrl });
//     } catch (error) {
//       console.error("Avatar upload error:", error);
//       return res.status(500).json({ message: "Server Error" });
//     }
//   }
// );
// // GET saved questions: /api/users/:userId/saved-questions
// router.get("/:userId/saved-questions", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("savedQuestions");
//     return res.status(200).json(user.savedQuestions || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET notifications: /api/users/:userId/notifications
// router.get("/:userId/notifications", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const user = await User.findById(req.params.userId).populate("notifications");
//     return res.status(200).json(user.notifications || []);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // GET academic schedule: /api/users/:userId/academic-schedule
// router.get("/:userId/academic-schedule", authenticateUser, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     const schedule = await AcademicSchedule.find({ userId: req.params.userId });
//     return res.status(200).json(schedule);
//   } catch (error) {
//     return res.status(500).json({ message: "Server Error" });
//   }
// });

// // UPDATE user profile data: /api/users/:userId
// router.put("/:userId", authenticateUser, async (req, res) => {
//   try {
//     // Ensure that only the authenticated user can update their data
//     if (req.user.id !== req.params.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     // Create a copy of the update payload
//     const updatedData = { ...req.body };

//     // If a new password is provided (non-empty), hash it before updating.
//     // Otherwise, remove the password field to avoid overwriting the existing hash.
//     if (updatedData.password && updatedData.password.trim() !== "") {
//       const salt = await bcrypt.genSalt(10);
//       updatedData.password = await bcrypt.hash(updatedData.password, salt);
//     } else {
//       delete updatedData.password;
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.userId,
//       updatedData,
//       { new: true }
//     ).select("-password");

//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// });


// module.exports = router;



