const mongoose = require("mongoose");

const complianceSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    framework: {
      type: String,
      enum: [
        "ISO27001",
        "NIST",
        "PCI-DSS",
        "GDPR",
        "SOC2",
        "other",
      ],
      required: true,
    },

    requirement: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "compliant",
        "non-compliant",
        "in-progress",
        "not-applicable",
      ],
      default: "in-progress",
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
  {
    timestamps: true,
  }
);

complianceSchema.index({
  project: 1,
  framework: 1,
  status: 1,
});

module.exports = mongoose.model("Compliance", complianceSchema);
