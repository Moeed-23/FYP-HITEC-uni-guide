// // controllers/notificationController.js

// const Notification = require('../models/Notifications');

// // GET /api/users/:userId/notifications
// exports.getNotifications = async (req, res) => {
//   try {
//     const notes = await Notification
//       .find({ user: req.user.id })
//       .sort({ createdAt: -1 });      // newest first
//     res.json(notes);
//   } catch (err) {
//     console.error('Error fetching notifications:', err);
//     res.status(500).json({ msg: 'Failed to fetch notifications.' });
//   }
// };

// // POST /api/users/:userId/notifications
// exports.createNotification = async (req, res) => {
//   const { message, type } = req.body;
//   if (!message) {
//     return res.status(400).json({ msg: 'Message is required.' });
//   }

//   try {
//     const note = await Notification.create({
//       user:    req.user.id,
//       message,
//       type:    type || 'announcement',
//       isRead:  false
//     });
//     res.status(201).json(note);
//   } catch (err) {
//     console.error('Error creating notification:', err);
//     res.status(500).json({ msg: 'Failed to create notification.' });
//   }
// };
// exports.deleteNotification = async (req, res) => {
//   try {
//     const { notificationId } = req.params;
//     const deleted = await Notification.findByIdAndDelete(notificationId);
//     if (!deleted) {
//       return res.status(404).json({ error: "Notification not found" });
//     }
//     return res.json({ message: "Deleted", _id: deleted._id });
//   } catch (err) {
//     console.error("Error in deleteNotification:", err);
//     return res.status(500).json({ error: "Could not delete notification" });
//   }
// };

// /**
//  * DELETE /api/users/:userId/notifications
//  * Clear all notifications for this user
//  */
// exports.clearAllNotifications = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     await Notification.deleteMany({ user: userId });
//     return res.json({ message: "All notifications cleared" });
//   } catch (err) {
//     console.error("Error in clearAllNotifications:", err);
//     return res.status(500).json({ error: "Could not clear notifications" });
//   }
// };







// App/controllers/notificationController.js

const Notification = require("../models/Notifications");

/**
 * GET /api/users/:userId/notifications
 * Returns all notifications for the given user, newest first.
 */
exports.getNotificationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification
      .find({ user: userId })
      .sort({ createdAt: -1 });
    return res.json(notifications);
  } catch (err) {
    console.error("Error in getNotificationsForUser:", err);
    return res
      .status(500)
      .json({ error: "Could not fetch notifications. Please try again later." });
  }
};

/**
 * POST /api/users/:userId/notifications
 * Creates a new notification for the user.
 */
exports.createNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, type } = req.body;
    if (!message || !type) {
      return res.status(400).json({ error: "message and type are required" });
    }

    const newNotif = new Notification({
      user: userId,
      message,
      type,
      isRead: false
    });

    const saved = await newNotif.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Error in createNotification:", err);
    return res
      .status(500)
      .json({ error: "Could not create notification. Please try again." });
  }
};

/**
 * DELETE /api/users/:userId/notifications/:notificationId
 * Remove a single notification
 */
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const deleted = await Notification.findByIdAndDelete(notificationId);
    if (!deleted) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res.json({ message: "Deleted", _id: deleted._id });
  } catch (err) {
    console.error("Error in deleteNotification:", err);
    return res.status(500).json({ error: "Could not delete notification" });
  }
};

/**
 * DELETE /api/users/:userId/notifications
 * Clear all notifications for this user
 */
exports.clearAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    await Notification.deleteMany({ user: userId });
    return res.json({ message: "All notifications cleared" });
  } catch (err) {
    console.error("Error in clearAllNotifications:", err);
    return res.status(500).json({ error: "Could not clear notifications" });
  }
};
