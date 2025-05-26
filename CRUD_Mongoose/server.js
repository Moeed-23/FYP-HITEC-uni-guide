// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB first, then start the server
// connectDB().then(() => {
//   const PORT = process.env.PORT || 2500;
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// });

// // Routes
// app.use("/api/auth", require("./App/routes/authRoutes"));
// app.use("/api/feedback", require("./App/routes/feedbackRoutes"));


////////2


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // or '*' to allow all
    credentials: true // important if you're using cookies
  }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./App/routes/authRoutes'));
app.use('/api/feedback', require('./App/routes/feedbackRoutes'));
app.use('/api/users', require('./App/routes/userRoutes'));
app.use("/api/dashboard", require("./App/routes/dashboardRoutes"));
app.use('/api/chat', require('./App/routes/chatRoutes'));
app.use('/api/users', require('./App/routes/savedquestionsRoutes'));


app.use('/api/saved-questions', require('./App/routes/savedquestionsRoutes'));
app.use('/api/users', require('./App/routes/academicscheduleRoutes'));
app.use('/api/users', require('./App/routes/notificationRoutes'));


const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


require('events').EventEmitter.defaultMaxListeners = 20; 



////////////////////

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./App/routes/authRoutes.js";
// import feedbackRoutes from "./App/routes/feedbackRoutes.js";
// import userRoutes from "./App/routes/userRoutes.js";
// import dashboardRoutes from "./App/routes/dashboardRoutes.js";

// dotenv.config();
// await connectDB();

// const app = express();

// app.use(cors({
//   origin: "http://localhost:5173", // adjust as needed
//   credentials: true
// }));
// app.use(express.json());

// // Mount routes – each of these imports is a router (middleware function)
// app.use("/api/auth", authRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/dashboard", dashboardRoutes);

// const PORT = process.env.PORT || 2500;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// // Increase event listener limit if needed
// import events from "events";
// events.EventEmitter.defaultMaxListeners = 20;
