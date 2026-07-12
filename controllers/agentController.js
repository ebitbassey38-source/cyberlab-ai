const groq = require("../config/groq");
const Asset = require("../models/Asset");
const Vulnerability = require("../models/Vulnerability");
const RiskAssessment = require("../models/RiskAssessment");

const runAgent = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "A query is required" });
    }

    const assets = await Asset.find({ owner: req.user.id }).select("name type status");
    const vulnerabilities = await Vulnerability.find({ reportedBy: req.user.id })
      .populate("asset", "name")
      .select("title severity status asset");
    const risks = await RiskAssessment.find({ assessedBy: req.user.id })
      .populate("relatedAsset", "name")
      .select("title riskLevel relatedAsset");

    const contextSummary = `
Assets (${assets.length}): ${JSON.stringify(assets)}
Vulnerabilities (${vulnerabilities.length}): ${JSON.stringify(vulnerabilities)}
Risk Assessments (${risks.length}): ${JSON.stringify(risks)}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an autonomous security agent with access to this user's real security data (assets, vulnerabilities, risk assessments). Use the provided data to answer the user's question specifically and accurately. Reference actual asset names and findings from the data. If the data doesn't contain enough information to answer, say so clearly.",
        },
        {
          role: "user",
          content: `Here is my current security data:\n${contextSummary}\n\nMy question: ${query}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const answer = completion.choices[0].message.content;

    res.status(200).json({
      message: "Agent response generated successfully",
      query,
      dataConsulted: {
        assetsCount: assets.length,
        vulnerabilitiesCount: vulnerabilities.length,
        risksCount: risks.length,
      },
      answer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { runAgent };
