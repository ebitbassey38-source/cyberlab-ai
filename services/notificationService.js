const Notification = require("../models/Notification");

const sendNotification = async ({
  title,
  message,
  severity,
  recipient,
  relatedProject,
  relatedAsset,
}) => {
  try {
    const notification = await Notification.create({
      title,
      message,
      severity,
      recipient,
      relatedProject,
      relatedAsset,
    });

    return notification;

  } catch (error) {
    console.error("Notification service error:", error.message);
    return null;
  }
};

module.exports = {
  sendNotification,
};
