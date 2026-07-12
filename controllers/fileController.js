const FileUpload = require("../models/FileUpload");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { relatedAsset } = req.body;

    const fileRecord = await FileUpload.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      relatedAsset,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: fileRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await FileUpload.find({ uploadedBy: req.user.id })
      .populate("relatedAsset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Files fetched successfully",
      count: files.length,
      files,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadFile, getFiles };
