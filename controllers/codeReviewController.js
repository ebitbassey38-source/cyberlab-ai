const groq = require("../config/groq");

const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Code is required for review" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a security-focused code reviewer. Analyze the provided code for security vulnerabilities, bad practices, and potential bugs. Be specific about line-level issues where possible, and suggest concrete fixes. If the language isn't specified, infer it from the code.",
        },
        {
          role: "user",
          content: `Language: ${language || "unspecified"}\n\nCode:\n${code}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const review = completion.choices[0].message.content;

    res.status(200).json({
      message: "Code review completed successfully",
      language: language || "unspecified",
      review,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { reviewCode };
