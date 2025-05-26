// const express = require('express');
// const { getDashboardData } = require('../controllers/dashboardController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.get('/', protect, getDashboardData);

// module.exports = router;


////////////////////////
////////////////
/////////


const express = require("express");
const router = express.Router();
const User = require("../models/User");
const  protect  = require("../middleware/authMiddleware"); 


router.get("/dashboard", protect, async (req, res) => {    
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;



// // App/routes/dashboardRoutes.js
// const express = require("express");
// const router  = express.Router();
// const { authenticateUser } = require("../middleware/authMiddleware");
// const { getDashboardData } = require("../controllers/dashboardController");

// // GET /api/dashboard
// router.get("/", authenticateUser, getDashboardData);

// module.exports = router;


///////////////////
/////////////////////////////////////////////
//////////////////////////////////////////


// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import User from "../models/User.js";

// const router = express.Router();

// router.get("/dashboard", protect, async (req, res) => {    
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// export default router;
