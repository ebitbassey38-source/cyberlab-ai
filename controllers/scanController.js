const Scan = require("../models/Scan");
const Asset = require("../models/Asset");
const Project = require("../models/Project");
const OrganizationMember = require("../models/OrganizationMember");
const sendResponse = require("../utils/response");

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

const createScan = async (req, res, next) => {
  try {
    const { project, asset, name, scanType, tool, status, findingsCount, startedAt, completedAt } = req.body;

    if (!project || !name) {
      return sendResponse(res, 400, false, "Project and scan name are required");
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(res, 403, false, "You do not have access to this project");
    }

    if (asset) {
      const existingAsset = await Asset.findOne({ _id: asset, project });
      if (!existingAsset) {
        return sendResponse(res, 404, false, "Asset not found in this project");
      }
    }

    const scan = await Scan.create({
      project,
      asset,
      name,
      scanType,
      tool,
      status,
      findingsCount,
      startedAt,
      completedAt,
      executedBy: req.user.id,
    });

    sendResponse(res, 201, true, "Scan recorded successfully", scan);
  } catch (error) {
    next(error);
  }
};

const getScans = async (req, res, next) => {
  try {
    const { project } = req.query;

    if (!project) {
      return sendResponse(res, 400, false, "A project ID is required to fetch scans");
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(res, 403, false, "You do not have access to this project");
    }

    const scans = await Scan.find({ project })
      .populate("asset", "name type ipAddress")
      .sort({ createdAt: -1 });

    sendResponse(res, 200, true, "Scans fetched successfully", scans);
  } catch (error) {
    next(error);
  }
};

module.exports = { createScan, getScans };
