const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;

    // Validation (optional but recommended)
    if (!name || !email || !rating) {
      return res.status(400).json({ message: "Name, email, and rate are required." });
    }

    const feedback = new Feedback({ name, email, rating, comments });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};


///////////////2


// const Feedback = require('../models/Feedback');

// exports.submitFeedback = async (req, res) => {
//   const { message } = req.body;
//   try {
//     const feedback = await Feedback.create({ user: req.user._id, message });
//     res.status(201).json(feedback);
//   } catch (err) {
//     res.status(500).json({ message: 'Error submitting feedback' });
//   }
// };
