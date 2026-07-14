const Project = require("../models/Project");
const logAudit = require("../utils/auditLogger");
const sendResponse = require("../utils/response");

const createProject = async (req, res, next) => {
  try {
    const {
      organization,
      name,
      description,
      client,
      status,
      startDate,
      endDate,
    } = req.body;

    if (!organization || !name) {
      return sendResponse(
        res,
        400,
        false,
        "Organization and project name are required"
      );
    }

    const project = await Project.create({
      organization,
      name,
      description,
      client,
      status,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    await logAudit({
      user: req.user.id,
      action: "Create Project",
      resource: "Project",
      resourceId: project._id,
      details: `Created project "${project.name}"`,
    });

    sendResponse(
      res,
      201,
      true,
      "Project created successfully",
      project
    );

  } catch (error) {
    next(error);
  }
};


const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.id,
    });

    sendResponse(
      res,
      200,
      true,
      "Projects fetched successfully",
      projects
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createProject,
  getProjects,
};
