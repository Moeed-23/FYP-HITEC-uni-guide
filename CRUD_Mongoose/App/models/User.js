// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: false }, // Optional field
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const bcrypt = require("bcryptjs");
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = mongoose.model("User", userSchema);
///2

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);



/////////////////////////3



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: false } // Optional field
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);


/////latest

const mongoose = require('mongoose');
const { Schema } = mongoose;


const SavedQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  askedAt:  { type: Date,   default: Date.now }
});

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String }, // optional field
  avatar: { type: String, default: "" },
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  }]

});


module.exports = mongoose.model('User', UserSchema);


// const mongoose = require('mongoose');
// const bcrypt   = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName:  { type: String, required: true },
//   email:     { type: String, required: true, unique: true },
//   password:  { type: String, required: true },
//   phone:     { type: String },
//   avatarUrl: { type: String, default: "" }
// }, { timestamps: true });

// // Hash password on create/update
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Instance method
// UserSchema.methods.comparePassword = function(plain) {
//   return bcrypt.compare(plain, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);


// // Instance method to compare passwords
// UserSchema.methods.comparePassword = function(plain) {
//   return bcrypt.compare(plain, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);


// module.exports = mongoose.model('User', UserSchema);

////8th April 2025
// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password: { type: String, required: true },
//   phone: { type: String, default: null },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("User", UserSchema);

////


// //



// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true, trim: true },
//   lastName: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password: { type: String, required: true },
//   phone: { type: String, default: null },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("User", UserSchema);
