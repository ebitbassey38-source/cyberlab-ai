const mongoose = require("mongoose");

const teamExerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    exerciseType: {
      type: String,
      enum: ["red", "blue", "purple"],
      required: true,
    },
    objective: {
      type: String,
      trim: true,
    },
    actionsTaken: {
      type: String,
      trim: true,
    },
    outcome: {
      type: String,
      trim: true,
    },
    lessonsLearned: {
      type: String,
      trim: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    conductedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamExercise", teamExerciseSchema);
