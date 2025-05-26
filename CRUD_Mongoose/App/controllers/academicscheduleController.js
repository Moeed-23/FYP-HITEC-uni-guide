// // controllers/academicScheduleController.js

// const AcademicEvent = require('../models/AcademicEvent');

// // GET /api/users/:userId/academic-schedule
// exports.getSchedule = async (req, res) => {
//   try {
//     const events = await AcademicEvent
//       .find({ user: req.user.id })
//       .sort({ date: 1 });               // ascending by date
//     res.json(events);
//   } catch (err) {
//     console.error('Error fetching schedule:', err);
//     res.status(500).json({ msg: 'Failed to fetch academic schedule.' });
//   }
// };

// // POST /api/users/:userId/academic-schedule
// exports.addEvent = async (req, res) => {
//   const { courseName, date, time } = req.body;
//   if (!courseName || !date || !time) {
//     return res.status(400).json({ msg: 'Missing fields.' });
//   }

//   try {
//     const newEvt = await AcademicEvent.create({
//       user:       req.user.id,
//       courseName,
//       date,
//       time
//     });
//     res.status(201).json(newEvt);
//   } catch (err) {
//     console.error('Error adding schedule event:', err);
//     res.status(500).json({ msg: 'Failed to add event.' });
//   }
// };

// // DELETE /api/users/:userId/academic-schedule/:eventId
// exports.removeEvent = async (req, res) => {
//   const { eventId } = req.params;
//   try {
//     const evt = await AcademicEvent.findOneAndDelete({
//       _id:   eventId,
//       user:  req.user.id
//     });
//     if (!evt) {
//       return res.status(404).json({ msg: 'Event not found.' });
//     }
//     res.json({ msg: 'Event deleted.' });
//   } catch (err) {
//     console.error('Error deleting event:', err);
//     res.status(500).json({ msg: 'Failed to delete event.' });
//   }
// };






// // controllers/academicScheduleController.js

// const AcademicEvent = require('../models/AcademicEvent');

// // GET /api/users/:userId/academic-schedule
// exports.getSchedule = async (req, res) => {
//   try {
//     const events = await AcademicEvent
//       .find({ user: req.user.id })
//       .sort({ date: 1 });               // ascending by date
//     res.json(events);
//   } catch (err) {
//     console.error('Error fetching schedule:', err);
//     res.status(500).json({ msg: 'Failed to fetch academic schedule.' });
//   }
// };

// // POST /api/users/:userId/academic-schedule
// exports.addEvent = async (req, res) => {
//   const { reminder, date, time } = req.body;

//   // only reminder text and date are required now
//   if (!reminder || !date) {
//     return res.status(400).json({ msg: 'Missing reminder text or date.' });
//   }

//   try {
//     const newEvt = await AcademicEvent.create({
//       user:     req.user.id,
//       reminder,
//       date,
//       time    // will be undefined if not provided
//     });
//     res.status(201).json(newEvt);
//   } catch (err) {
//     console.error('Error adding reminder:', err);
//     res.status(500).json({ msg: 'Failed to add reminder.' });
//   }
// };

// // DELETE /api/users/:userId/academic-schedule/:eventId
// exports.removeEvent = async (req, res) => {
//   const { eventId } = req.params;
//   try {
//     const evt = await AcademicEvent.findOneAndDelete({
//       _id:  eventId,
//       user: req.user.id
//     });
//     if (!evt) {
//       return res.status(404).json({ msg: 'Reminder not found.' });
//     }
//     res.json({ msg: 'Reminder deleted.' });
//   } catch (err) {
//     console.error('Error deleting reminder:', err);
//     res.status(500).json({ msg: 'Failed to delete reminder.' });
//   }
// };



// controllers/academicScheduleController.js

const AcademicSchedule = require('../models/AcademicSchedule');

// GET /api/users/:userId/academic-schedule
exports.getSchedule = async (req, res) => {
  try {
    const events = await AcademicSchedule
      .find({ userId: req.user.id })
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error('Error fetching schedule:', err);
    res.status(500).json({ msg: 'Failed to fetch academic schedule.' });
  }
};

// POST /api/users/:userId/academic-schedule
exports.addSchedule = async (req, res) => {
  const { reminder, date, time } = req.body;
  if (!reminder || !date) {
    return res.status(400).json({ msg: 'Reminder text and date required.' });
  }

  try {
    const newEntry = await AcademicSchedule.create({
      userId:   req.user.id,
      reminder,
      date,
      time    // may be undefined
    });
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error adding schedule entry:', err);
    res.status(500).json({ msg: 'Failed to add schedule entry.' });
  }
};

// DELETE /api/users/:userId/academic-schedule/:eventId
exports.removeSchedule = async (req, res) => {
  const { eventId } = req.params;
  try {
    const deleted = await AcademicSchedule.findOneAndDelete({
      _id:    eventId,
      userId: req.user.id
    });
    if (!deleted) {
      return res.status(404).json({ msg: 'Schedule entry not found.' });
    }
    res.json({ msg: 'Entry deleted.' });
  } catch (err) {
    console.error('Error deleting schedule entry:', err);
    res.status(500).json({ msg: 'Failed to delete schedule entry.' });
  }
};
