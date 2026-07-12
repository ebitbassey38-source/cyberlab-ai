const express = require("express");
const router = express.Router();
const { createVulnerability, getVulnerabilities } = require("../controllers/vulnerabilityController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createVulnerability);
router.get("/", protect, getVulnerabilities);

module.exports = router;
