// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // // ✅ Signup Controller 

// // exports.signup = async (req, res) => {
// //   try {
// //     const { name, email, password, phone } = req.body;

// //     // Check if user already exists
// //     const userExists = await User.findOne({ email });
// //     if (userExists) {
// //       return res.status(400).json({ message: "Email already exists!" });
// //     }

// //     // Log the original password (for debugging only, remove after testing)
// //     console.log("🔍 Original Password:", password);

// //     // Hash password before storing
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Log the hashed password
// //     console.log("🔑 Hashed Password:", hashedPassword);

// //     // Save user
// //     const user = new User({
// //       name,
// //       email,
// //       password: hashedPassword, // Store hashed password
// //       phone: phone || null,
// //     });

// //     await user.save();
// //     res.status(201).json({ message: "Signup successful!" });
// //   } catch (error) {
// //     console.error("🔥 Signup Error:", error);
// //     res.status(500).json({ message: "Server error!" });
// //   }
// // };

// // //login user
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     console.log("🔍 Login attempt with:", email, password);

// //     // Find user by email
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       console.log("❌ User not found for email:", email);
// //       return res.status(400).json({ message: "User not found!" });
// //     }

// //     console.log("✅ User found:", user.email);
// //     console.log("🔑 Stored Hashed Password:", user.password);

// //     // Compare entered password with stored hashed password
// //     const isMatch = await bcrypt.compare(password, user.password);
    
// //     console.log("🔍 Password match result:", isMatch);

// //     if (!isMatch) {
// //       console.log("❌ Incorrect password");
// //       return res.status(400).json({ message: "Invalid credentials!" });
// //     }

// //     // Generate JWT Token
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1d",
// //     });

// //     console.log("✅ Login successful! Token:", token);
// //     res.json({ message: "Login successful!", token });
// //   } catch (error) {
// //     console.error("🔥 Login Error:", error);
// //     res.status(500).json({ message: "Server error!" });
// //   }
// // };

// ////////////////////2

// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");

// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// // };

// // exports.signup = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     const userExists = await User.findOne({ email });
// //     if (userExists) return res.status(400).json({ message: "User already exists" });

// //     const user = await User.create({ name, email, password });
// //     res.status(201).json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       token: generateToken(user._id),
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Signup failed", error: err.message });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user || !(await user.matchPassword(password)))
// //       return res.status(401).json({ message: "Invalid credentials" });

// //     res.json({
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       token: generateToken(user._id),
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: "Login failed", error: err.message });
// //   }
// // };




// ///////////////////3


// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// exports.registerUser = async (req, res) => {
//   const { name, email, password, phone } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, password: hashedPassword, phone });
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Helper function to generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// exports.registerUser = async (req, res) => {
//   // Destructure expected fields from the request
//   const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

//   // Ensure the password and confirmPassword match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   try {
//     // Check if a user already exists with this email
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     // Generate salt and hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // If phone is an empty string, set it to null (or remove it)
//     const phoneValue = phone && phone.trim() !== "" ? phone : null;

//     // Create the new user record.
//     // Make sure your User model has firstName, lastName, email, password, and phone fields.
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phone: phoneValue,
//     });

//     res.status(201).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       avatar: user.avatar, 
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// controllers/authController.js

const User   = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");

// Helper to sign a JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, phone, avatar } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt           = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone?.trim() ? phone : null,
      avatar: avatar || "",  
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        _id:       user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        phone:     user.phone,
        avatar:    user.avatar,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: {
        _id:       user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        phone:     user.phone,
        avatar:    user.avatar,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // authenticateUser middleware must have set req.user.id
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("GET /auth/me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



///////


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// export const registerUser = async (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword, phone } = req.body;
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const phoneValue = phone && phone.trim() !== "" ? phone : null;
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       phone: phoneValue
//     });
//     res.status(201).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     res.json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
