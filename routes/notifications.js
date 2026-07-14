const express = require("express");
const router = express.Router();

const {
  createNotification,
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const { protect, authorize } = require("../middleware/auth");

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createNotification
);

router.get(
  "/",
  protect,
  getNotifications
);

router.put(
  "/:id/read",
  protect,
  markAsRead
);

module.exports = router;
