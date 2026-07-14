const Risk = require("../models/Risk");
const sendResponse = require("../utils/response");

const createRisk = async (req, res, next) => {
  try {
    const {
      project,
      vulnerability,
      title,
      description,
      likelihood,
      impact,
      overallRisk,
      mitigationPlan,
      status,
    } = req.body;

    if (!project || !title || !likelihood || !impact) {
      return sendResponse(
        res,
        400,
        false,
        "Project, title, likelihood, and impact are required"
      );
    }

    const risk = await Risk.create({
      project,
      vulnerability,
      title,
      description,
      likelihood,
      impact,
      overallRisk,
      mitigationPlan,
      status,
      owner: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Risk created successfully",
      risk
    );

  } catch (error) {
    next(error);
  }
};


const getRisks = async (req, res, next) => {
  try {
    const risks = await Risk.find({
      owner: req.user.id,
    })
      .populate("project", "name")
      .populate("vulnerability", "title severity");

    sendResponse(
      res,
      200,
      true,
      "Risks fetched successfully",
      risks
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createRisk,
  getRisks,
};
