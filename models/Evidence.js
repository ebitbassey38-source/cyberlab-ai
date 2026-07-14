const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema(
  {
    finding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Finding",
      required: true,
    },

assessment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Assessment",
},    
type: {
      type: String,
      enum: [
        "screenshot",
        "source-code",
        "http-request",
        "http-response",
        "log",
        "file",
        "ai-analysis",
        "other",
      ],
      required: true,
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

    filePath: {
      type: String,
      trim: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

evidenceSchema.index({
  finding: 1,
  type: 1,
});

module.exports = mongoose.model("Evidence", evidenceSchema);
