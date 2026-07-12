const express = require("express");
const router = express.Router();
const { createBlackBoxTest, getBlackBoxTests } = require("../controllers/blackBoxTestController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createBlackBoxTest);
router.get("/", protect, getBlackBoxTests);

module.exports = router;
