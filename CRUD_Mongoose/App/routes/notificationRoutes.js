// App/routes/notificationRoutes.js
const express = require("express");
const router  = express.Router();
// Import the middleware function directly:
const protect = require("../middleware/authMiddleware");
const controller = require("../controllers/notificationController");

// GET   /api/users/:userId/notifications
router.get("/:userId/notifications", protect, controller.getNotificationsForUser);

// POST  /api/users/:userId/notifications
router.post("/:userId/notifications", protect, controller.createNotification);

// DELETE all for a user
router.delete("/:userId/notifications", protect, controller.clearAllNotifications);

// DELETE one by ID
router.delete(
  "/:userId/notifications/:notificationId",
  protect,
  controller.deleteNotification
);

module.exports = router;
