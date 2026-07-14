const AuditLog = require("../models/AuditLog");

const logAudit = async ({
  user,
  action,
  resource,
  resourceId = null,
  details = "",
}) => {
  try {
    await AuditLog.create({
      user,
      action,
      resource,
      resourceId,
      details,
    });
  } catch (error) {
    console.error("Audit log error:", error.message);
  }
};

module.exports = logAudit;
