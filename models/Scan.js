const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    scanType: {
      type: String,
      enum: [
        "network",
        "vulnerability",
        "web",
        "port",
        "configuration",
        "ai-security",
        "other",
      ],
      default: "other",
    },

    tool: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "queued",
        "running",
        "completed",
        "failed",
      ],
      default: "queued",
    },

    findingsCount: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    executedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

scanSchema.index({
  project: 1,
  status: 1,
  scanType: 1,
});

module.exports = mongoose.model("Scan", scanSchema);
