const express = require("express");
const router = express.Router();
const { createTeamExercise, getTeamExercises } = require("../controllers/teamExerciseController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createTeamExercise);
router.get("/", protect, getTeamExercises);

module.exports = router;
