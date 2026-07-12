const WhiteBoxTest = require("../models/WhiteBoxTest");
const groq = require("../config/groq");

const createWhiteBoxTest = async (req, res) => {
  try {
    const { title, codeSnippet, language, asset } = req.body;

    if (!title || !codeSnippet) {
      return res.status(400).json({ message: "Title and code snippet are required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a security-focused code reviewer performing a white-box test. Analyze the code for vulnerabilities. Respond in two clear sections: 'FINDINGS:' followed by a detailed explanation, and 'SEVERITY:' followed by exactly one word (none, low, medium, high, or critical).",
        },
        {
          role: "user",
          content: `Language: ${language || "unspecified"}\n\nCode:\n${codeSnippet}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const aiResponse = completion.choices[0].message.content;

    const severityMatch = aiResponse.match(/SEVERITY:[\s*]*(none|low|medium|high|critical)/i);
    const severity = severityMatch ? severityMatch[1].toLowerCase() : "none";

    const test = await WhiteBoxTest.create({
      title,
      codeSnippet,
      language,
      findings: aiResponse,
      severity,
      asset,
      testedBy: req.user.id,
    });

    res.status(201).json({
      message: "White-box test completed and recorded successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getWhiteBoxTests = async (req, res) => {
  try {
    const tests = await WhiteBoxTest.find({ testedBy: req.user.id })
      .populate("asset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "White-box tests fetched successfully",
      count: tests.length,
      tests,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createWhiteBoxTest, getWhiteBoxTests };
