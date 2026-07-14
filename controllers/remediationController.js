const Remediation = require("../models/Remediation");
const sendResponse = require("../utils/response");

const createRemediation = async (req, res, next) => {
  try {
    const {
      finding,
      assessment,
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
      notes,
    } = req.body;

    if (!finding || !title) {
      return sendResponse(
        res,
        400,
        false,
        "Finding and title are required"
      );
    }

    const remediation = await Remediation.create({
      finding,
      assessment,
      title,
      description,
      assignedTo,
      status,
      priority,
      dueDate,
      notes,
      createdBy: req.user.id,
    });

    return sendResponse(
      res,
      201,
      true,
      "Remediation created successfully",
      remediation
    );
  } catch (error) {
    next(error);
  }
};

const getRemediations = async (req, res, next) => {
  try {
    const remediations = await Remediation.find({
      createdBy: req.user.id,
    })
      .populate("finding", "title severity status")
      .populate("assessment", "title type status")
      .populate("assignedTo", "name email")
      .populate("verifiedBy", "name email")
      .sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      true,
      "Remediations fetched successfully",
      remediations
    );
  } catch (error) {
    next(error);
  }
};

const updateRemediation = async (req, res, next) => {
  try {
    const {
      status,
      priority,
      notes,
      assignedTo,
      verificationNotes,
    } = req.body;

    const updateData = {
      status,
      priority,
      notes,
      assignedTo,
    };

    if (status === "verified") {
      updateData.verifiedBy = req.user.id;
      updateData.verifiedAt = new Date();
      updateData.verificationNotes = verificationNotes;
    }

    const remediation = await Remediation.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      updateData,
      {
        new: true,
      }
    );
    if (!remediation) {
      return sendResponse(
        res,
        404,
        false,
        "Remediation not found"
      );
    }

    return sendResponse(
      res,
      200,
      true,
      "Remediation updated successfully",
      remediation
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRemediation,
  getRemediations,
  updateRemediation,
};
