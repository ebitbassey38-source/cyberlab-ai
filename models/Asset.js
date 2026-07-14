const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "server",
        "workstation",
        "network device",
        "application",
        "database",
        "other",
      ],
      default: "other",
    },

    ipAddress: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "under maintenance",
      ],
      default: "active",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

assetSchema.index({
  project: 1,
  owner: 1,
});

module.exports = mongoose.model("Asset", assetSchema);
