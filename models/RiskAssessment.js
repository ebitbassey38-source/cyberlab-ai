const mongoose = require("mongoose");

const riskAssessmentSchema = new mongoose.Schema(
  {
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
      enum: ["low", "medium", "high"],
      required: true,
    },
    impact: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    mitigationPlan: {
      type: String,
      trim: true,
    },
    relatedAsset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    assessedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiskAssessment", riskAssessmentSchema);
