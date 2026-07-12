const express = require("express");
const router = express.Router();
const { createRisk, getRisks } = require("../controllers/riskController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createRisk);
router.get("/", protect, getRisks);

module.exports = router;
