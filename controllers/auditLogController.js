const AuditLog = require("../models/AuditLog");
const sendResponse = require("../utils/response");

const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    sendResponse(
      res,
      200,
      true,
      "Audit logs fetched successfully",
      logs
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAuditLogs,
};
