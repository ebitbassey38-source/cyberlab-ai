const express = require("express");
const router = express.Router();
const { createWhiteBoxTest, getWhiteBoxTests } = require("../controllers/whiteBoxTestController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createWhiteBoxTest);
router.get("/", protect, getWhiteBoxTests);

module.exports = router;
