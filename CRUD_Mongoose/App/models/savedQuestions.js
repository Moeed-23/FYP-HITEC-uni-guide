// const mongoose = require('mongoose');

// const SavedQuestionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   question: { type: String, required: true },
//   answer:   { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('SavedQuestion', SavedQuestionSchema);


const mongoose = require('mongoose');

const SavedQuestionSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer:   { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedQuestion', SavedQuestionSchema);
