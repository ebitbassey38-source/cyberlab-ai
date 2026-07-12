const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema(
  {
    scanType: {
      type: String,
      enum: ["whitebox", "blackbox", "vulnerability", "network", "other"],
      required: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
    },
    findings: {
      type: String,
      trim: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScanHistory", scanHistorySchema);
