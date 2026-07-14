const mongoose = require("mongoose");

const riskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    vulnerability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vulnerability",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    likelihood: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
      ],
      required: true,
    },

    impact: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
      ],
      required: true,
    },

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

    mitigationPlan: {
      type: String,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "identified",
        "mitigating",
        "mitigated",
        "accepted",
      ],
      default: "identified",
    },
  },
  {
    timestamps: true,
  }
);

riskSchema.index({
  project: 1,
  overallRisk: 1,
  status: 1,
});

module.exports = mongoose.model("Risk", riskSchema);
