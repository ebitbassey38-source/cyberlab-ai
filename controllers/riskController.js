const RiskAssessment = require("../models/RiskAssessment");

const createRisk = async (req, res) => {
  try {
    const { title, description, likelihood, impact, riskLevel, mitigationPlan, relatedAsset } = req.body;

    if (!title || !likelihood || !impact || !riskLevel) {
      return res.status(400).json({ message: "Title, likelihood, impact, and risk level are required" });
    }

    const risk = await RiskAssessment.create({
      title,
      description,
      likelihood,
      impact,
      riskLevel,
      mitigationPlan,
      relatedAsset,
      assessedBy: req.user.id,
    });

    res.status(201).json({
      message: "Risk assessment created successfully",
      risk,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getRisks = async (req, res) => {
  try {
    const risks = await RiskAssessment.find({ assessedBy: req.user.id })
      .populate("relatedAsset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Risk assessments fetched successfully",
      count: risks.length,
      risks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createRisk, getRisks };
