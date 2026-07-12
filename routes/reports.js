const express = require("express");
const router = express.Router();
const { createReport, getReports } = require("../controllers/reportController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createReport);
router.get("/", protect, getReports);

module.exports = router;
