const TeamExercise = require("../models/TeamExercise");
const groq = require("../config/groq");

const createTeamExercise = async (req, res) => {
  try {
    const { title, exerciseType, objective, actionsTaken, outcome, lessonsLearned, asset } = req.body;

    if (!title || !exerciseType) {
      return res.status(400).json({ message: "Title and exercise type are required" });
    }

    let aiRecommendations = null;

    if (outcome || lessonsLearned) {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a security operations advisor. Based on this red/blue/purple team exercise summary, provide 2-3 concise, actionable recommendations for improving security posture going forward.",
          },
          {
            role: "user",
            content: `Exercise type: ${exerciseType}\nObjective: ${objective || "not specified"}\nActions taken: ${actionsTaken || "not specified"}\nOutcome: ${outcome || "not specified"}\nLessons learned: ${lessonsLearned || "not specified"}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

      aiRecommendations = completion.choices[0].message.content;
    }

    const exercise = await TeamExercise.create({
      title,
      exerciseType,
      objective,
      actionsTaken,
      outcome,
      lessonsLearned,
      asset,
      conductedBy: req.user.id,
    });

    res.status(201).json({
      message: "Team exercise recorded successfully",
      exercise,
      aiRecommendations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTeamExercises = async (req, res) => {
  try {
    const exercises = await TeamExercise.find({ conductedBy: req.user.id })
      .populate("asset", "name type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Team exercises fetched successfully",
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createTeamExercise, getTeamExercises };
