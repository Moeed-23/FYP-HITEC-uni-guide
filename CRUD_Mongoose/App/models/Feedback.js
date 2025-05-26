// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   rate: {
//     type: String,
//     enum: ['excellent', 'good', 'average', 'poor', 'very poor'],
//     required: true
//   },
//   comments: {
//     type: String,
//     required: false
//   },
//   submittedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Feedback', feedbackSchema);



/////2
///////////////////////


// const mongoose = require('mongoose');

// const FeedbackSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: String,
//     required: true,
//   },
//   comments: {
//     type: String,
//     required: true,
//   },
// }, { timestamps: true });

// const Feedback = mongoose.model("Feedback", FeedbackSchema);
// export default Feedback;




/////////////////3



// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);


////////////
////////////////////
////////////////


const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
