const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DBURL).then(()=>{
      console.log("✅ MongoDB Connected!");
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;


////////////////////////



// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DBURL);
//     console.log("✅ MongoDB Connected!");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
