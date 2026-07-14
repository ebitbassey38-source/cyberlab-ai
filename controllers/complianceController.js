const Compliance = require("../models/Compliance");
const Project = require("../models/Project");
const OrganizationMember = require("../models/OrganizationMember");
const sendResponse = require("../utils/response");

// Helper: verify user has access to the organization that owns this project
const verifyProjectAccess = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) return null;

  const membership = await OrganizationMember.findOne({
    organization: project.organization,
    user: userId,
    status: "active",
  });

  if (!membership) return null;

  return project;
};

const createCompliance = async (req, res, next) => {
  try {
    const { project, framework, requirement, status, notes, relatedAsset } = req.body;

    if (!project || !framework || !requirement) {
      return sendResponse(
        res,
        400,
        false,
        "Project, framework, and requirement are required"
      );
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(
        res,
        403,
        false,
        "You do not have access to this project"
      );
    }

    const compliance = await Compliance.create({
      project,
      framework,
      requirement,
      status,
      notes,
      relatedAsset,
      trackedBy: req.user.id,
    });

    sendResponse(
      res,
      201,
      true,
      "Compliance record created successfully",
      compliance
    );

  } catch (error) {
    next(error);
  }
};

const getCompliance = async (req, res, next) => {
  try {
    const { project } = req.query;

    if (!project) {
      return sendResponse(
        res,
        400,
        false,
        "A project ID is required to fetch compliance records"
      );
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(
        res,
        403,
        false,
        "You do not have access to this project"
      );
    }

    const records = await Compliance.find({ project })
      .populate("relatedAsset", "name type")
      .sort({ createdAt: -1 });

    sendResponse(
      res,
      200,
      true,
      "Compliance records fetched successfully",
      records
    );

  } catch (error) {
    next(error);
  }
};

module.exports = { createCompliance, getCompliance };
