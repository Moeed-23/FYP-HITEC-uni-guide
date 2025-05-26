// import mongoose from "mongoose";

// const AcademicScheduleSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     courseName: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const AcademicSchedule = mongoose.model("AcademicSchedule", AcademicScheduleSchema);
// export default AcademicSchedule;






////////////////////////////////////////


// const mongoose = require("mongoose");

// const AcademicScheduleSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     courseName: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const AcademicSchedule = mongoose.model("AcademicSchedule", AcademicScheduleSchema);
// module.exports = AcademicSchedule;




// App/models/AcademicSchedule.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const academicScheduleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reminder: {
    type: String,
    required: true    
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String     // now optional
  }
}, {
  timestamps: true   // adds createdAt, updatedAt
});

module.exports = mongoose.model('AcademicSchedule', academicScheduleSchema);
