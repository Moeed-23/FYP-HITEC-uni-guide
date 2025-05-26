// const User = require("../models/User"); // adjust the path if different

// // GET /api/User/:id
// const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId).select("-password"); // exclude password
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error("Error fetching user:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   getUserById,
// };





// controllers/userController.js
const User   = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * GET /api/users/:userId
 * Returns the user (minus password)
 */
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/users/:userId
 * Updates the user's profile, including avatar
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, phone, password, avatar } = req.body;

    if (firstName != null) userDoc.firstName = firstName;
    if (lastName  != null) userDoc.lastName  = lastName;
    if (phone     != null) userDoc.phone     = phone;
    if (avatar    != null) userDoc.avatar    = avatar;

    if (password != null && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      userDoc.password = await bcrypt.hash(password, salt);
    }

    await userDoc.save();

    const safe = userDoc.toObject();
    delete safe.password;
    return res.json(safe);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

////


// import User from "../models/User.js";

// export const getUserById = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findById(userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("Error fetching user:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
