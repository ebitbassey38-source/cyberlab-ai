const Asset = require("../models/Asset");
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

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(
        res,
        403,
        false,
        "You do not have access to this project"
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
    const { project } = req.query;

    if (!project) {
      return sendResponse(
        res,
        400,
        false,
        "A project ID is required to fetch assets"
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

    const assets = await Asset.find({ project });

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
