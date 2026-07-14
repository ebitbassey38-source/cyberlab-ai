const Organization = require("../models/Organization");
const OrganizationMember = require("../models/OrganizationMember");
const sendResponse = require("../utils/response");

// Create Organization
const createOrganization = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      description,
      industry,
      country,
    } = req.body;

    const existingOrganization = await Organization.findOne({
      slug,
    });

    if (existingOrganization) {
      return sendResponse(
        res,
        400,
        false,
        "Organization slug already exists"
      );
    }

    const organization = await Organization.create({
      name,
      slug,
      description,
      industry,
      country,
      owner: req.user.id,
    });

    await OrganizationMember.create({
      organization: organization._id,
      user: req.user.id,
      role: "owner",
      status: "active",
    });

    sendResponse(
      res,
      201,
      true,
      "Organization created successfully",
      organization
    );

  } catch (error) {
    next(error);
  }
};

// Get all organizations the current user is a member of
const getOrganizations = async (req, res, next) => {
  try {
    const memberships = await OrganizationMember.find({
      user: req.user.id,
      status: "active",
    });

    const organizationIds = memberships.map((m) => m.organization);

    const organizations = await Organization.find({
      _id: { $in: organizationIds },
    });

    sendResponse(
      res,
      200,
      true,
      "Organizations fetched successfully",
      organizations
    );
  } catch (error) {
    next(error);
  }
};

// Get a single organization, only if the user is a member
const getOrganizationById = async (req, res, next) => {
  try {
    const membership = await OrganizationMember.findOne({
      organization: req.params.id,
      user: req.user.id,
      status: "active",
    });

    if (!membership) {
      return sendResponse(
        res,
        403,
        false,
        "You do not have access to this organization"
      );
    }

    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return sendResponse(res, 404, false, "Organization not found");
    }

    sendResponse(
      res,
      200,
      true,
      "Organization fetched successfully",
      organization
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganizationById,
};
