const Assessment = require("../models/Assessment");
const sendResponse = require("../utils/response");

const createAssessment = async (req, res, next) => {
  try {
    const {
      project,
      type,
      title,
      scope,
      description,
      status,
      assignedTo,
      startedAt,
      completedAt,
    } = req.body;

    if (!project || !type || !title) {
      return sendResponse(
        res,
        400,
        false,
        "Project, type, and title are required"
      );
    }

    const assessment = await Assessment.create({
      project,
      type,
      title,
      scope,
      description,
      status,
      assignedTo,
      startedAt,
      completedAt,
      createdBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Assessment created successfully",
      assessment
    );

  } catch (error) {
    next(error);
  }
};


const getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find({
      createdBy: req.user.id,
    })
      .populate("project", "name")
      .populate("assignedTo");

    sendResponse(
      res,
      200,
      true,
      "Assessments fetched successfully",
      assessments
    );

  } catch (error) {
    next(error);
  }
};

const getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    })
      .populate("project", "name")
      .populate("assignedTo");

    if (!assessment) {
      return sendResponse(
        res,
        404,
        false,
        "Assessment not found"
      );
    }

    sendResponse(
      res,
      200,
      true,
      "Assessment fetched successfully",
      assessment
    );

  } catch (error) {
    next(error);
  }
};
module.exports = {
  createAssessment,
  getAssessments,
  getAssessmentById,
};
