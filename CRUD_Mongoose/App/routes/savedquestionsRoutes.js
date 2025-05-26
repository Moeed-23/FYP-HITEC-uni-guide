// const express = require('express');
// const router = express.Router();
// const SavedQuestion = require('../models/SavedQuestion');
// const auth = require('../middleware/auth'); // middleware that sets req.user

// // Save a question/answer
// router.post('/:userId/saved-questions', auth, async (req, res) => {
//   const { question, answer } = req.body;
//   const { userId } = req.params;
//   if (req.user.id !== userId) return res.status(401).json({ msg: "Unauthorized" });
//   try {
//     const saved = await SavedQuestion.create({
//       user: userId,
//       question,
//       answer,
//     });
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ msg: 'Failed to save question.' });
//   }
// });

// // Fetch all questions for the logged-in user
// router.get('/my', auth, async (req, res) => {
//   try {
//     const history = await SavedQuestion.find({ user: req.user.id })
//       .sort({ createdAt: -1 });
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ msg: 'Failed to get saved questions.' });
//   }
// });

// module.exports = router;


// routes/savedquestionsRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/savedquestionController');
const authenticateUser  = require('../middleware/authMiddleware');

router.post('/:userId/saved-questions', authenticateUser, controller.saveQuestion);
router.get('/me', authenticateUser, controller.getMyQuestions);
// routes/savedquestionsRoutes.js
router.get('/:userId/saved-questions', authenticateUser, controller.getMyQuestions);

// routes/savedquestionsRoutes.js
router.delete(
  '/:userId/saved-questions/:qid',
  authenticateUser,
  controller.deleteQuestion
);
router.delete(
  '/:userId/saved-questions',
  authenticateUser,
  controller.clearQuestions
);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth'); // your JWT middleware
// const controller = require('../controllers/savedquestionController');

// // Save a question/answer for a specific user
// router.post('/:userId/saved-questions', auth, controller.saveQuestion);

// // Get all saved questions for the logged-in user
// router.get('/my', auth, controller.getMyQuestions);

// module.exports = router;
