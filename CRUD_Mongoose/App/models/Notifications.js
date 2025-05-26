// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,
//     },
//     // Additional fields (e.g., read status) can be added here.
//   },
//   { timestamps: true }
// );

// const Notification = mongoose.model("Notification", notificationSchema);
// export default Notification;


///////////////////////////////

// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema(
//   {
//     message: {
//       type: String,
//       required: true,
//     },
//     // Additional fields (e.g., read status) can be added here.
//   },
//   { timestamps: true }
// );

// const Notification = mongoose.model("Notification", notificationSchema);
// module.exports = Notification;



// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const notificationSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'userr',      // adjust if your User model is called something else
//     required: true
//   },
//   message: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['announcement','assignment','event','reminder'],
//     default: 'announcement'
//   },
//   isRead: {
//     type: Boolean,
//     default: false
//   }
// }, {
//   timestamps: true     // adds createdAt, updatedAt
// });

// module.exports = mongoose.model('Notification', notificationSchema);



// App/models/notifications.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",       // <— adjust to match your User model name
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["announcement", "assignment", "event", "reminder"],
    default: "announcement"
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true      // adds createdAt & updatedAt
});

module.exports = mongoose.model("Notification", notificationSchema);
