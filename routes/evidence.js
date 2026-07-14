const express = require("express");
const router = express.Router();

const {
  createEvidence,
  getEvidence,
} = require("../controllers/evidenceController");

const { protect, authorize } = require("../middleware/auth");

// Create evidence
router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createEvidence
);

// Get all evidence
router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getEvidence
);

module.exports = router;
