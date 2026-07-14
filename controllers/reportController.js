const Report = require("../models/Report");
const sendResponse = require("../utils/response");

const createReport = async (req, res, next) => {
  try {
    const {
      project,
      title,
      executiveSummary,
      technicalSummary,
      assessments,
      findings,
      overallRisk,
    } = req.body;

    if (!project || !title) {
      return sendResponse(
        res,
        400,
        false,
        "Project and report title are required"
      );
    }

    const report = await Report.create({
      project,
      title,
      executiveSummary,
      technicalSummary,
      assessments,
      findings,
      overallRisk,
      createdBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Report created successfully",
      report
    );

  } catch (error) {
    next(error);
  }
};


const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find({
      createdBy: req.user.id,
    })
      .populate("project", "name")
      .populate("assessments")
      .populate("findings")
      .sort({ createdAt: -1 });

    sendResponse(
      res,
      200,
      true,
      "Reports fetched successfully",
      reports
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createReport,
  getReports,
};
