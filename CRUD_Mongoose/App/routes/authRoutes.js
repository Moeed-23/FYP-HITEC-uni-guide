// const express = require("express");
// const { signup, login } = require("../controllers/authController");

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;
////////////////////////////////2

// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;


/////////////3

// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');
// const router = express.Router();

// router.post('/signup', registerUser);
// router.post('/login', loginUser);

// module.exports = router;


////
////////////////////////////////////


// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require("express-validator");
// const User = require("../models/User.js");
// const { loginUser, registerUser } = require('../controllers/authController.js');

// // Signup Route
// router.post(
//   "/signup",
//   [
//     check("firstName", "First name is required").not().isEmpty().trim(),
//     check("lastName", "Last name is required").not().isEmpty().trim(),
//     check("email", "Please enter a valid email").isEmail(),
//     check("password", "Password must be at least 8 characters").isLength({ min: 8 }),
//     // Validate that confirmPassword is provided
//     check("confirmPassword", "Confirm password is required").not().isEmpty(),
//     // Update the phone check so that empty strings are treated as missing:
//     check("phone").optional({ checkFalsy: true }).isMobilePhone(),
//   ],
//   async (req, res) => {
//     // Process validation results
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .json({ message: "Validation errors", errors: errors.array() });
//     }

//     const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

//     // Ensure passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     try {
//       let user = await User.findOne({ email });
//       if (user) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       user = new User({
//         firstName,
//         lastName,
//         email,
//         password,
//         phone,
//       });

//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();
//       res.status(201).json({ message: "User registered successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// // Login Route (unchanged)
// // const { loginUser } = require("../controllers/authController");
// router.post("/login", loginUser);

// module.exports = router;


// // routes/auth.js
// const express  = require("express");
// const router   = express.Router();
// const bcrypt   = require("bcryptjs");
// const jwt      = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");
// const User     = require("../models/User.js");

// // POST /api/auth/signup
// router.post(
//   "/signup",
//   [
//     check("firstName", "First name is required").not().isEmpty().trim(),
//     check("lastName",  "Last name is required").not().isEmpty().trim(),
//     check("email",     "Please enter a valid email").isEmail().normalizeEmail(),
//     check("password",  "Password must be at least 8 characters").isLength({ min: 8 }),
//     check("confirmPassword", "Confirm password is required").not().isEmpty(),
//     check("phone").optional({ checkFalsy: true }).isMobilePhone(),
//   ],
//   async (req, res) => {
//     // 1) Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .json({ message: "Validation errors", errors: errors.array() });
//     }

//     const { firstName, lastName, email, password, confirmPassword, phone } = req.body;
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     try {
//       // 2) Check existing user
//       let user = await User.findOne({ email });
//       if (user) {
//         return res.status(400).json({ message: "User already exists" });
//       }

//       // 3) Create and hash
//       user = new User({ firstName, lastName, email, password, phone });
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//       // Optionally set a default avatar here, e.g.
//       // user.avatar = user.avatar || "https://yourcdn.com/default-avatar.png";

//       await user.save();

//       // 4) Sign a token
//       const payload = { id: user._id };
//       const token   = jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });

//       // 5) Return token + user
//       return res.status(201).json({
//         token,
//         user: {
//           _id:       user._id,
//           firstName: user.firstName,
//           lastName:  user.lastName,
//           email:     user.email,
//           phone:     user.phone,
//           avatar:    user.avatar,  // now included
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// // POST /api/auth/login
// const { loginUser } = require("../controllers/authController.js");
// router.post("/login", loginUser);

// router.get("/me", authenticateUser, getCurrentUser);

// module.exports = router;



// // routes/authRoutes.js
// const express = require("express");
// const { check, validationResult } = require("express-validator");
// const { authenticateUser }        = require("../middleware/authMiddleware");
// const {
//   registerUser,
//   loginUser,
//   getCurrentUser,
// } = require("../controllers/authController");


// const router = express.Router();

// /**
//  * Signup
//  * POST /api/auth/signup
//  */
// router.post(
//   "/signup",
//   [
//     check("firstName", "First name is required").not().isEmpty().trim(),
//     check("lastName",  "Last name is required").not().isEmpty().trim(),
//     check("email",     "Please enter a valid email").isEmail().normalizeEmail(),
//     check("password",  "Password must be at least 8 characters").isLength({ min: 8 }),
//     check("confirmPassword", "Confirm password is required").not().isEmpty(),
//     check("phone").optional({ checkFalsy: true }).isMobilePhone(),
//     // (optional) you could validate avatar URL here if you want
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .json({ message: "Validation errors", errors: errors.array() });
//     }
//     next();
//   },
//   registerUser
// );

// /**
//  * Login
//  * POST /api/auth/login
//  */
// router.post("/login", loginUser);

// router.get(
//   "/me",
//   authenticateUser,
//   getCurrentUser
// );

// module.exports = router;



// routes/authRoutes.js
const express = require("express");
const { check, validationResult } = require("express-validator");
const authenticateUser = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/authController");

const router = express.Router();

/**
 * Signup
 * POST /api/auth/signup
 */
router.post(
  "/signup",
  [
    check("firstName", "First name is required").notEmpty().trim(),
    check("lastName",  "Last name is required").notEmpty().trim(),
    check("email",     "Please enter a valid email").isEmail().normalizeEmail(),
    check("password",  "Password must be at least 8 characters").isLength({ min: 8 }),
    check("confirmPassword", "Confirm password is required").notEmpty(),
    check("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
    check("phone")
      .optional({ checkFalsy: true })
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),
    // If you decide to allow an avatar URL, you could add:
    // check("avatar", "Invalid URL").optional().isURL(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation errors", errors: errors.array() });
    }
    next();
  },
  registerUser
);

/**
 * Login
 * POST /api/auth/login
 */
router.post("/login", loginUser);

/**
 * Get current user
 * GET /api/auth/me
 */
router.get("/me", authenticateUser, getCurrentUser);

module.exports = router;
