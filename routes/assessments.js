const express = require("express");
const router = express.Router();

const {
  createAssessment,
  getAssessments,
  getAssessmentById,
} = require("../controllers/assessmentController");

const { protect, authorize } = require("../middleware/auth");

// Create a new assessment
router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createAssessment
);

// Get all assessments
router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getAssessments
);

// Get a single assessment
router.get(
  "/:id",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getAssessmentById
);

module.exports = router;
