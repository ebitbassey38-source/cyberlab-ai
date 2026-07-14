const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "white-box",
        "black-box",
        "penetration-test",
        "red-team",
        "blue-team",
        "purple-team",
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

    scope: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "planning",
        "active",
        "completed",
        "cancelled",
      ],
      default: "planning",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
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

module.exports = mongoose.model(
  "Assessment",
  assessmentSchema
);
