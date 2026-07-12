const mongoose = require("mongoose");

const whiteBoxTestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    codeSnippet: {
      type: String,
      required: true,
    },
    language: {
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

module.exports = mongoose.model("WhiteBoxTest", whiteBoxTestSchema);
