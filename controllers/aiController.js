const groq = require("../config/groq");
const sendResponse = require("../utils/response");

const askSecurityAssistant = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question) {
      return sendResponse(
        res,
        400,
        false,
        "A question is required"
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity assistant helping a developer understand security concepts, review potential vulnerabilities, and give practical advice. Answer clearly and concisely.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const responseText = completion.choices[0].message.content;

    sendResponse(
      res,
      200,
      true,
      "AI response generated successfully",
      {
        question,
        answer: responseText,
      }
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  askSecurityAssistant,
};
