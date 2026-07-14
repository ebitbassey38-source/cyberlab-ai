const groq = require("../config/groq");
const Asset = require("../models/Asset");
const Vulnerability = require("../models/Vulnerability");
const RiskAssessment = require("../models/RiskAssessment");
const sendResponse = require("../utils/response");

const runAgent = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return sendResponse(
        res,
        400,
        false,
        "A query is required"
      );
    }

    const assets = await Asset.find({
      owner: req.user.id,
    }).select("name type status");

    const vulnerabilities = await Vulnerability.find({
      reportedBy: req.user.id,
    })
      .populate("asset", "name")
      .select("title severity status asset");

    const risks = await RiskAssessment.find({
      assessedBy: req.user.id,
    })
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
          content:
            "You are an autonomous security agent with access to this user's real security data (assets, vulnerabilities, risk assessments). Use the provided data to answer the user's question specifically and accurately. Reference actual asset names and findings from the data. If the data doesn't contain enough information to answer, say so clearly.",
        },
        {
          role: "user",
          content: `Here is my current security data:\n${contextSummary}\n\nMy question: ${query}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });


    const answer = completion.choices[0].message.content;


    sendResponse(
      res,
      200,
      true,
      "Agent response generated successfully",
      {
        query,
        dataConsulted: {
          assetsCount: assets.length,
          vulnerabilitiesCount: vulnerabilities.length,
          risksCount: risks.length,
        },
        answer,
      }
    );


  } catch (error) {
    next(error);
  }
};


module.exports = {
  runAgent,
};
