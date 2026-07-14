const Asset = require("../models/Asset");
const sendResponse = require("../utils/response");

const createAsset = async (req, res, next) => {
  try {
    const {
      project,
      name,
      type,
      ipAddress,
      description,
      status,
    } = req.body;

    if (!project || !name) {
      return sendResponse(
        res,
        400,
        false,
        "Project and asset name are required"
      );
    }

    const asset = await Asset.create({
      project,
      name,
      type,
      ipAddress,
      description,
      status,
      owner: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Asset created successfully",
      asset
    );

  } catch (error) {
    next(error);
  }
};


const getAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find({
      owner: req.user.id,
    });

    sendResponse(
      res,
      200,
      true,
      "Assets fetched successfully",
      assets
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createAsset,
  getAssets,
};
