const Asset = require("../models/Asset");

const createAsset = async (req, res) => {
  try {
    const { name, type, ipAddress, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Asset name is required" });
    }

    const asset = await Asset.create({
      name,
      type,
      ipAddress,
      description,
      status,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Asset created successfully",
      asset,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ owner: req.user.id });

    res.status(200).json({
      message: "Assets fetched successfully",
      count: assets.length,
      assets,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createAsset, getAssets };
