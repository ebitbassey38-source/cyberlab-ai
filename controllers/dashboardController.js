const Project = require("../models/Project");
const Asset = require("../models/Asset");
const Assessment = require("../models/Assessment");
const Scan = require("../models/Scan");
const Finding = require("../models/Finding");
const Vulnerability = require("../models/Vulnerability");
const Risk = require("../models/Risk");
const Report = require("../models/Report");
const sendResponse = require("../utils/response");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [
      projects,
      assets,
      assessments,
      scans,
      findings,
      vulnerabilities,
      risks,
      reports,
    ] = await Promise.all([
      Project.countDocuments({ createdBy: userId }),
      Asset.countDocuments({ owner: userId }),
      Assessment.countDocuments({ createdBy: userId }),
      Scan.countDocuments({ executedBy: userId }),
      Finding.countDocuments({ createdBy: userId }),
      Vulnerability.countDocuments({ reportedBy: userId }),
      Risk.countDocuments({ owner: userId }),
      Report.countDocuments({ createdBy: userId }),
    ]);

    sendResponse(
      res,
      200,
      true,
      "Dashboard data fetched successfully",
      {
        projects,
        assets,
        assessments,
        scans,
        findings,
        vulnerabilities,
        risks,
        reports,
      }
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};
