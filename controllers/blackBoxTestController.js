const BlackBoxTest = require("../models/BlackBoxTest");
const groq = require("../config/groq");

const createBlackBoxTest = async (req, res) => {
  try {
    const { title, targetUrl, testDescription, observedBehavior, asset } = req.body;

    if (!title || !targetUrl || !observedBehavior) {
      return res.status(400).json({ message: "Title, target URL, and observed behavior are required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a security analyst performing black-box testing analysis. Based on the test performed and the observed behavior, determine whether this indicates a security vulnerability. Respond in two clear sections: 'FINDINGS:' followed by a detailed explanation, and 'SEVERITY:' followed by exactly one word (none, low, medium, high, or critical).",
        },
        {
          role: "user",
          content: `Target: ${targetUrl}\n\nTest performed: ${testDescription || "not specified"}\n\nObserved behavior: ${observedBehavior}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const aiResponse = completion.choices[0].message.content;

    const severityMatch = aiResponse.match(/SEVERITY:[\s*]*(none|low|medium|high|critical)/i);
    const severity = severityMatch ? severityMatch[1].toLowerCase() : "none";

    const test = await BlackBoxTest.create({
      title,
      targetUrl,
      testDescription,
      observedBehavior,
      findings: aiResponse,
      severity,
      asset,
      testedBy: req.user.id,
    });

    res.status(201).json({
      message: "Black-box test completed and recorded successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getBlackBoxTests = async (req, res) => {
  try {
    const tests = await BlackBoxTest.find({ testedBy: req.user.id })
      .populate("asset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Black-box tests fetched successfully",
      count: tests.length,
      tests,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBlackBoxTest, getBlackBoxTests };
