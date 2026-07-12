const express = require("express");
const router = express.Router();
const { createCompliance, getCompliance } = require("../controllers/complianceController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createCompliance);
router.get("/", protect, getCompliance);

module.exports = router;
