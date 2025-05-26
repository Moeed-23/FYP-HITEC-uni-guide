// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
////////////////////////////////////////////////////////////////2

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const protect = async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Not authorized, no token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Not authorized, token failed" });
//   }
// };

// module.exports = { protect };





///////////////////////////////3

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith('Bearer')) {
//     try {
//       token = token.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   } else {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };



/////////////


// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) return res.status(401).send("Access Denied");

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };



///////////

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const authenticateUser = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };


/////////////////



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const authenticateUser = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };



/////////////////////////////
////////////////


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Define the middleware function
// export const authenticateUser = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// // Optionally, if you wish to use an alias like "protect", you can export it as well:
// export const protect = authenticateUser;




/////////////////////////////
//////
////



// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authenticateUser = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { authenticateUser };



/////////////////////
/////////////////////////////
/////////////


// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// module.exports = async function (req, res, next) {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ msg: 'No token' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     if (!req.user) throw Error('User not found');
//     next();
//   } catch {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


// const authenticateUser = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// // Export the middleware function as both authenticateUser and protect
// module.exports = {
//   authenticateUser,
//   protect: authenticateUser
// };



// App/middleware/authMiddleware.js

const jwt  = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect
 *  - Verifies a Bearer JWT in the Authorization header
 *  - On success: attaches req.user and calls next()
 *  - On failure: returns 401 JSON error
 */
async function protect(req, res, next) {
  // Grab token from header
  const authHeader = req.headers.authorization || req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify & decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lookup user (omit password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Attach and proceed
    req.user = user;
    next();

  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
}

module.exports = protect;


//////////////////////////////////////////////////////////////////////////////////////////////



// const jwt  = require('jsonwebtoken');
// const User = require('../models/User');

// async function authenticateUser(req, res, next) {
//   const auth = req.headers.authorization;
//   if (!auth?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
//   const token = auth.split(' ')[1];
//   try {
//     const { id } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(id);
//     if (!user) throw new Error();
//     req.user = { id: user._id };
//     next();
//   } catch {
//     res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// }

// module.exports = { authenticateUser };
