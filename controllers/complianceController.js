const Compliance = require("../models/Compliance");

const createCompliance = async (req, res) => {
  try {
    const { framework, requirement, status, notes, relatedAsset } = req.body;

    if (!framework || !requirement) {
      return res.status(400).json({ message: "Framework and requirement are required" });
    }

    const compliance = await Compliance.create({
      framework,
      requirement,
      status,
      notes,
      relatedAsset,
      trackedBy: req.user.id,
    });

    res.status(201).json({
      message: "Compliance record created successfully",
      compliance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCompliance = async (req, res) => {
  try {
    const records = await Compliance.find({ trackedBy: req.user.id })
      .populate("relatedAsset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Compliance records fetched successfully",
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createCompliance, getCompliance };
