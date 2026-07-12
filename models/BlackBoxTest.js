const mongoose = require("mongoose");

const blackBoxTestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },
    testDescription: {
      type: String,
      trim: true,
    },
    observedBehavior: {
      type: String,
      trim: true,
    },
    findings: {
      type: String,
      trim: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical", "none"],
      default: "none",
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    testedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlackBoxTest", blackBoxTestSchema);
