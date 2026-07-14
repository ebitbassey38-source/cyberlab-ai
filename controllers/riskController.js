const Risk = require("../models/Risk");
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

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(
        res,
        403,
        false,
        "You do not have access to this project"
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
    const { project } = req.query;

    if (!project) {
      return sendResponse(
        res,
        400,
        false,
        "A project ID is required to fetch risks"
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

    const risks = await Risk.find({ project })
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
