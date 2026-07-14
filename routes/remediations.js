const express = require("express");
const router = express.Router();

const {
  createRemediation,
  getRemediations,
  updateRemediation,
} = require("../controllers/remediationController");

const { protect, authorize } = require("../middleware/auth");

// Create remediation
router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createRemediation
);

// Get all remediations
router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getRemediations
);
// Update remediation
router.put(
  "/:id",
  protect,
  authorize("admin", "analyst"),
  updateRemediation
);
module.exports = router;
