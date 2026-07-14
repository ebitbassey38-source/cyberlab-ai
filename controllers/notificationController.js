const Notification = require("../models/Notification");

// Create notification
const createNotification = async (req, res) => {
  try {
    const {
      title,
      message,
      severity,
      recipient,
      relatedProject,
      relatedAsset,
    } = req.body;

    if (!title || !message || !recipient) {
      return res.status(400).json({
        message: "Title, message and recipient are required",
      });
    }

    const notification = await Notification.create({
      title,
      message,
      severity,
      recipient,
      relatedProject,
      relatedAsset,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get my notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("relatedProject", "name")
      .populate("relatedAsset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You cannot update this notification",
      });
    }

    notification.read = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
};
