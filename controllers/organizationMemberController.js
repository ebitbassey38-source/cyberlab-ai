const OrganizationMember = require("../models/OrganizationMember");
const Organization = require("../models/Organization");
const User = require("../models/User");
const sendResponse = require("../utils/response");
const logAudit = require("../utils/auditLogger");

// Helper: check if current user is owner or admin of this organization
const requireOwnerOrAdmin = async (organizationId, userId) => {
  const membership = await OrganizationMember.findOne({
    organization: organizationId,
    user: userId,
    status: "active",
  });

  if (!membership) return null;
  if (membership.role !== "owner" && membership.role !== "admin") return null;

  return membership;
};

// Invite a member by email
const inviteMember = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const { email, role } = req.body;

    const requesterMembership = await requireOwnerOrAdmin(organizationId, req.user.id);
    if (!requesterMembership) {
      return sendResponse(res, 403, false, "Only owners or admins can invite members");
    }

    if (role === "owner") {
      return sendResponse(res, 400, false, "Cannot invite a new member directly as owner");
    }

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return sendResponse(res, 404, false, "No user found with that email");
    }

    const existingMembership = await OrganizationMember.findOne({
      organization: organizationId,
      user: userToInvite._id,
    });

    if (existingMembership) {
      return sendResponse(res, 400, false, "This user is already a member of the organization");
    }

    const newMember = await OrganizationMember.create({
      organization: organizationId,
      user: userToInvite._id,
      role: role || "security-analyst",
      status: "active",
    });
await logAudit({
  user: req.user.id,
  action: "MEMBER_INVITED",
  resource: "OrganizationMember",
  resourceId: newMember._id,
  details: `Invited ${email} as ${newMember.role}`,
});
    sendResponse(res, 201, true, "Member added successfully", newMember);
  } catch (error) {
    next(error);
  }
};

// List all members of an organization
const listMembers = async (req, res, next) => {
  try {
    const { organizationId } = req.params;

    const requesterMembership = await OrganizationMember.findOne({
      organization: organizationId,
      user: req.user.id,
      status: "active",
    });

    if (!requesterMembership) {
      return sendResponse(res, 403, false, "You do not have access to this organization");
    }

    const members = await OrganizationMember.find({ organization: organizationId })
      .populate("user", "name email");

    sendResponse(res, 200, true, "Members fetched successfully", members);
  } catch (error) {
    next(error);
  }
};

// Update a member's role
const updateMemberRole = async (req, res, next) => {
  try {
    const { organizationId, memberId } = req.params;
    const { role } = req.body;

    const requesterMembership = await requireOwnerOrAdmin(organizationId, req.user.id);
    if (!requesterMembership) {
      return sendResponse(res, 403, false, "Only owners or admins can update roles");
    }

    const targetMember = await OrganizationMember.findOne({
      _id: memberId,
      organization: organizationId,
    });

    if (!targetMember) {
      return sendResponse(res, 404, false, "Member not found");
    }

    if (targetMember.role === "owner") {
      return sendResponse(res, 403, false, "Cannot change the role of the organization owner");
    }

    if (role === "owner") {
      return sendResponse(res, 403, false, "Cannot promote a member to owner");
    }

    if (String(targetMember.user) === String(req.user.id)) {
      return sendResponse(res, 403, false, "You cannot change your own role");
    }

    targetMember.role = role;
    await targetMember.save();
await logAudit({
  user: req.user.id,
  action: "MEMBER_ROLE_UPDATED",
  resource: "OrganizationMember",
  resourceId: targetMember._id,
  details: `Changed member role to ${role}`,
});
    sendResponse(res, 200, true, "Member role updated successfully", targetMember);
  } catch (error) {
    next(error);
  }
};

// Remove a member
const removeMember = async (req, res, next) => {
  try {
    const { organizationId, memberId } = req.params;

    const requesterMembership = await requireOwnerOrAdmin(organizationId, req.user.id);
    if (!requesterMembership) {
      return sendResponse(res, 403, false, "Only owners or admins can remove members");
    }

    const targetMember = await OrganizationMember.findOne({
      _id: memberId,
      organization: organizationId,
    });

    if (!targetMember) {
      return sendResponse(res, 404, false, "Member not found");
    }

    if (targetMember.role === "owner") {
      return sendResponse(res, 403, false, "Cannot remove the organization owner");
    }

    await OrganizationMember.deleteOne({ _id: memberId });

await logAudit({
  user: req.user.id,
  action: "MEMBER_REMOVED",
  resource: "OrganizationMember",
  resourceId: targetMember._id,
  details: `Removed member from organization`,
});
    sendResponse(res, 200, true, "Member removed successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  inviteMember,
  listMembers,
  updateMemberRole,
  removeMember,
};
