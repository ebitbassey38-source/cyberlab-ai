const Report = require("../models/Report");

const createReport = async (req, res) => {
  try {
    const { title, summary, relatedAssets, relatedVulnerabilities } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Report title is required" });
    }

    const report = await Report.create({
      title,
      summary,
      relatedAssets,
      relatedVulnerabilities,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ createdBy: req.user.id })
      .populate("relatedAssets", "name type")
      .populate("relatedVulnerabilities", "title severity")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Reports fetched successfully",
      count: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createReport, getReports };
