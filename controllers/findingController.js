const Finding = require("../models/Finding");
const sendResponse = require("../utils/response");

const createFinding = async (req, res, next) => {
  try {
    const {
      assessment,
      title,
      description,
      severity,
      status,
      cwe,
      owasp,
      recommendation,
      assignedTo,
    } = req.body;

    if (!assessment || !title || !description || !severity) {
      return sendResponse(
        res,
        400,
        false,
        "Assessment, title, description, and severity are required"
      );
    }

    const finding = await Finding.create({
      assessment,
      title,
      description,
      severity,
      status,
      cwe,
      owasp,
      recommendation,
      assignedTo,
      createdBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Finding created successfully",
      finding
    );

  } catch (error) {
    next(error);
  }
};


const getFindings = async (req, res, next) => {
  try {
    const findings = await Finding.find({
      createdBy: req.user.id,
    })
      .populate("assessment")
      .populate("assignedTo");

    sendResponse(
      res,
      200,
      true,
      "Findings fetched successfully",
      findings
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createFinding,
  getFindings,
};
