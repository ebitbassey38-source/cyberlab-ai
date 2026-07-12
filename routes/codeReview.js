const express = require("express");
const router = express.Router();
const { reviewCode } = require("../controllers/codeReviewController");
const { protect } = require("../middleware/auth");

router.post("/", protect, reviewCode);

module.exports = router;
