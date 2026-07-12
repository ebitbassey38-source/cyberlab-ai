const mongoose = require("mongoose");

const complianceSchema = new mongoose.Schema(
  {
    framework: {
      type: String,
      enum: ["ISO27001", "NIST", "PCIDSS", "GDPR", "SOC2", "other"],
      required: true,
    },
    requirement: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["compliant", "non-compliant", "in progress", "not applicable"],
      default: "in progress",
    },
    notes: {
      type: String,
      trim: true,
    },
    relatedAsset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    trackedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Compliance", complianceSchema);
