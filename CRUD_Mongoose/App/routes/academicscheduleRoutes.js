// // routes/academicScheduleRoutes.js
// const express = require('express');
// const { authenticateUser } = require('../middleware/authMiddleware');
// const {
//   getSchedule,
//   addEvent,
//   deleteEvent
// } = require('../controllers/academicScheduleController');
// const router = express.Router();

// router.get(
//   '/users/:userId/academic-schedule',
//   authenticateUser,
//   getSchedule
// );
// router.post(
//   '/users/:userId/academic-schedule',
//   authenticateUser,
//   addEvent
// );
// router.delete(
//   '/users/:userId/academic-schedule/:eventId',
//   authenticateUser,
//   deleteEvent
// );

// module.exports = router;



// // App/routes/academicScheduleRoutes.js

// const express = require('express');
// const { authenticateUser } = require('../middleware/authMiddleware');
// const {
//   getSchedule,
//   addEvent,
//   removeEvent     // ← import the correct name
// } = require('../controllers/academicscheduleController');

// const router = express.Router();

// // GET all reminders
// router.get(
//   '/:userId/academic-schedule',
//   authenticateUser,
//   getSchedule
// );

// // POST a new reminder
// router.post(
//   '/:userId/academic-schedule',
//   authenticateUser,
//   addEvent
// );

// // DELETE a reminder
// router.delete(
//   '/:userId/academic-schedule/:eventId',
//   authenticateUser,
//   removeEvent      // ← use removeEvent, not deleteEvent
// );

// module.exports = router;



// routes/academicScheduleRoutes.js

const express = require('express');
const  authenticateUser  = require('../middleware/authMiddleware');
const {
  getSchedule,
  addSchedule,
  removeSchedule
} = require('../controllers/academicscheduleController');

const router = express.Router();

// prefix in server.js: app.use('/api/users', router);

// 1) Get all reminders
router.get(
  '/:userId/academic-schedule',
  authenticateUser,
  getSchedule
);

// 2) Add a new reminder
router.post(
  '/:userId/academic-schedule',
  authenticateUser,
  addSchedule
);

// 3) Delete a reminder
router.delete(
  '/:userId/academic-schedule/:eventId',
  authenticateUser,
  removeSchedule
);

module.exports = router;
