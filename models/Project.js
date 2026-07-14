const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    client: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "planning",
        "active",
        "on-hold",
        "completed",
        "archived",
      ],
      default: "planning",
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrganizationMember",
      },
    ],
  },
  {
    timestamps: true,
  }
);

projectSchema.index({
  organization: 1,
  status: 1,
});

module.exports = mongoose.model("Project", projectSchema);
