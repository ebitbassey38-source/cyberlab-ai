const Scan = require("../models/Scan");
const sendResponse = require("../utils/response");

const createSecurityScan = async (req, res, next) => {
  try {
    const {
      project,
      asset,
      name,
      scanType,
      tool,
      status,
    } = req.body;

    if (!project || !name) {
      return sendResponse(
        res,
        400,
        false,
        "Project and scan name are required"
      );
    }

    const scan = await Scan.create({
      project,
      asset,
      name,
      scanType,
      tool,
      status,
      executedBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Security scan created successfully",
      scan
    );

  } catch (error) {
    next(error);
  }
};


const getSecurityScans = async (req, res, next) => {
  try {
    const scans = await Scan.find({
      executedBy: req.user.id,
    })
      .populate("asset", "name type ipAddress")
      .sort({ createdAt: -1 });

    sendResponse(
      res,
      200,
      true,
      "Security scans fetched successfully",
      scans
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createSecurityScan,
  getSecurityScans,
};
