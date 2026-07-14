const mongoose = require("mongoose");

const organizationMemberSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: [
        "owner",
        "admin",
        "security-analyst",
        "client",
        "auditor",
      ],
      default: "security-analyst",
    },

    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate memberships
organizationMemberSchema.index(
  { organization: 1, user: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "OrganizationMember",
  organizationMemberSchema
);
