const mongoose = require("mongoose");

const findingSchema = new mongoose.Schema(
  {
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["informational", "low", "medium", "high", "critical"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "open",
        "in-progress",
        "resolved",
        "accepted-risk",
      ],
      default: "open",
    },

    cwe: {
      type: String,
      trim: true,
    },

    owasp: {
      type: String,
      trim: true,
    },

    recommendation: {
      type: String,
      trim: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganizationMember",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

findingSchema.index({
  assessment: 1,
  severity: 1,
  status: 1,
});

module.exports = mongoose.model("Finding", findingSchema);
