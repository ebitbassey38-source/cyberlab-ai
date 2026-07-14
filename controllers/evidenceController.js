const Evidence = require("../models/Evidence");
const sendResponse = require("../utils/response");

const createEvidence = async (req, res, next) => {
  try {
    const {
      finding,
      assessment,
      type,
      title,
      description,
      filePath,
    } = req.body;

    if (!finding || !type || !title) {
      return sendResponse(
        res,
        400,
        false,
        "Finding, type, and title are required"
      );
    }

    const evidence = await Evidence.create({
      finding,
      assessment,
      type,
      title,
      description,
      filePath,
      uploadedBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Evidence created successfully",
      evidence
    );

  } catch (error) {
    next(error);
  }
};

const getEvidence = async (req, res, next) => {
  try {
    const evidence = await Evidence.find({
      uploadedBy: req.user.id,
    })
      .populate("finding", "title severity status")
      .populate("assessment", "title type status");

    sendResponse(
      res,
      200,
      true,
      "Evidence fetched successfully",
      evidence
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvidence,
  getEvidence,
};
