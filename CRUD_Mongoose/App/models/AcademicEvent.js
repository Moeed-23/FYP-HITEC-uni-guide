// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const academicEventSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',      // or whatever your User model is called
//     required: true
//   },
//   courseName: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   time: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('AcademicEvent', academicEventSchema);





// // App/models/AcademicEvent.js

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const academicEventSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',      // adjust if your User model is named differently
//     required: true
//   },
//   reminder: {
//     type: String,
//     required: true    // the text of your reminder (formerly `courseName`)
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   time: {
//     type: String,
//     required: false   // still optional
//   }
// }, {
//   timestamps: true    // adds createdAt and updatedAt
// });

// module.exports = mongoose.model('AcademicEvent', academicEventSchema);
