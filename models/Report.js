const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    executiveSummary: {
      type: String,
      trim: true,
    },

    technicalSummary: {
      type: String,
      trim: true,
    },

    assessments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
      },
    ],

    findings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Finding",
      },
    ],

    overallRisk: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
      ],
      default: "low",
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

reportSchema.index({
  project: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Report", reportSchema);
