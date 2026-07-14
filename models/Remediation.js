const mongoose = require("mongoose");

const remediationSchema = new mongoose.Schema(
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

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: [
        "open",
        "in-progress",
        "fixed",
        "verified",
        "closed",
      ],
      default: "open",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
      ],
      default: "medium",
    },

    dueDate: {
      type: Date,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
verifiedAt: {
  type: Date,
},

verificationNotes: {
  type: String,
  trim: true,
},
    notes: {
      type: String,
      trim: true,
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

remediationSchema.index({
  finding: 1,
  status: 1,
});

module.exports = mongoose.model("Remediation", remediationSchema);
