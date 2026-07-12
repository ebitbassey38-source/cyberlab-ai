const ScanHistory = require("../models/ScanHistory");
const Asset = require("../models/Asset");

const createScan = async (req, res) => {
  try {
    const { scanType, asset, findings, status } = req.body;

    if (!scanType || !asset) {
      return res.status(400).json({ message: "Scan type and asset are required" });
    }

    const existingAsset = await Asset.findOne({ _id: asset, owner: req.user.id });
    if (!existingAsset) {
      return res.status(404).json({ message: "Asset not found or does not belong to you" });
    }

    const scan = await ScanHistory.create({
      scanType,
      asset,
      findings,
      status,
      initiatedBy: req.user.id,
    });

    res.status(201).json({
      message: "Scan recorded successfully",
      scan,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getScans = async (req, res) => {
  try {
    const scans = await ScanHistory.find({ initiatedBy: req.user.id })
      .populate("asset", "name type ipAddress")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Scan history fetched successfully",
      count: scans.length,
      scans,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createScan, getScans };
