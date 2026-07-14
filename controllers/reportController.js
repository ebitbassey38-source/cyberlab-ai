const Report = require("../models/Report");
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

const createReport = async (req, res, next) => {
  try {
    const { project, title, executiveSummary, technicalSummary, assessments, findings, overallRisk } = req.body;

    if (!project || !title) {
      return sendResponse(res, 400, false, "Project and report title are required");
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(res, 403, false, "You do not have access to this project");
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

    sendResponse(res, 201, true, "Report created successfully", report);
  } catch (error) {
    next(error);
  }
};

const getReports = async (req, res, next) => {
  try {
    const { project } = req.query;

    if (!project) {
      return sendResponse(res, 400, false, "A project ID is required to fetch reports");
    }

    const verifiedProject = await verifyProjectAccess(project, req.user.id);
    if (!verifiedProject) {
      return sendResponse(res, 403, false, "You do not have access to this project");
    }

    const reports = await Report.find({ project })
      .populate("project", "name")
      .populate("assessments")
      .populate("findings")
      .sort({ createdAt: -1 });

    sendResponse(res, 200, true, "Reports fetched successfully", reports);
  } catch (error) {
    next(error);
  }
};

module.exports = { createReport, getReports };
