// const express = require("express");
// const router = express.Router();
// const Feedback = require("../models/Feedback");

// // POST /api/feedback
// router.post("/", async (req, res) => {
//   const { name, email, rating, comments } = req.body;

//   if (!name || !email || !rating || !comments) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const newFeedback = new Feedback({ name, email, rating, comments });
//     await newFeedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully." });
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// });

// module.exports = router;
//


////////////////////2

const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");


router.post("/", async (req, res) => {
  const { name, email, rating, comments } = req.body;

  if (!name || !email || !rating || !comments) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const feedback = new Feedback({ name, email, rating, comments });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting feedback:", error.message);
    res.status(500).json({ message: "Server error while saving feedback." });
  }
});

module.exports = router;






//////////////////3


// import express from "express";
// import Feedback from "../models/Feedback";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { name, email, rating, comments } = req.body;

//   if (!name || !email || !rating || !comments) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const feedback = new Feedback({ name, email, rating, comments });
//     await feedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully." });
//   } catch (error) {
//     console.error("Error submitting feedback:", error.message);
//     res.status(500).json({ message: "Server error while saving feedback." });
//   }
// });

// export default router;

