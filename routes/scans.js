const express = require("express");
const router = express.Router();
const { createScan, getScans } = require("../controllers/scanController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createScan);
router.get("/", protect, getScans);

module.exports = router;
