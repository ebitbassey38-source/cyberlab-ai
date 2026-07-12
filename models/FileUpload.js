const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    storedName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
    },
    size: {
      type: Number,
    },
    relatedAsset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FileUpload", fileUploadSchema);
