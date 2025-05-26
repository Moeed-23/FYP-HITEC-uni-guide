// const SavedQuestion = require('../models/SavedQuestion');

// exports.saveQuestion = async (req, res) => {
//   const { question, answer } = req.body;
//   const { userId } = req.params;
//   if (req.user.id !== userId) return res.status(401).json({ msg: "Unauthorized" });
//   try {
//     const saved = await SavedQuestion.create({ user: userId, question, answer });
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ msg: 'Failed to save question.' });
//   }
// };

// exports.getMyQuestions = async (req, res) => {
//   try {
//     const history = await SavedQuestion.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ msg: 'Failed to get saved questions.' });
//   }
// };

//savedquestionController.js

const SavedQuestion = require('../models/savedQuestions');

exports.saveQuestion = async (req, res) => {
  const { question, answer } = req.body;
  const { userId } = req.params;
  if (req.user.id !== userId) return res.status(401).json({ msg: "Unauthorized" });
  try {
    const saved = await SavedQuestion.create({ user: userId, question, answer });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to save question.' });
  }
};

exports.getMyQuestions = async (req, res) => {
  try {
    const history = await SavedQuestion.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to get saved questions.' });
  }
};

// DELETE one question by id
exports.deleteQuestion = async (req, res) => {
  const { userId, qid } = req.params;
  if (req.user.id !== userId)
    return res.status(401).json({ msg: "Unauthorized" });
  try {
    await SavedQuestion.deleteOne({ _id: qid, user: userId });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete question." });
  }
};

// DELETE all questions for this user
exports.clearQuestions = async (req, res) => {
  const { userId } = req.params;
  if (req.user.id !== userId)
    return res.status(401).json({ msg: "Unauthorized" });
  try {
    await SavedQuestion.deleteMany({ user: userId });
    res.json({ msg: "All cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to clear questions." });
  }
};
