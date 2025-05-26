// import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     body: { type: String, required: true },
//     // Additional fields can be added as needed.
//   },
//   { timestamps: true }
// );

// const Question = mongoose.model("Question", questionSchema);
// export default Question;

///////////////////////////////

//////

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    // Additional fields can be added as needed.
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
