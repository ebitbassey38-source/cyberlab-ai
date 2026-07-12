const groq = require("../config/groq");

const askSecurityAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "A question is required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity assistant helping a developer understand security concepts, review potential vulnerabilities, and give practical advice. Answer clearly and concisely.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const responseText = completion.choices[0].message.content;

    res.status(200).json({
      message: "AI response generated successfully",
      question,
      answer: responseText,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { askSecurityAssistant };
