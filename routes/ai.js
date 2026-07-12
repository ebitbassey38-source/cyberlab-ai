const express = require("express");
const router = express.Router();
const { askSecurityAssistant } = require("../controllers/aiController");
const { protect } = require("../middleware/auth");

router.post("/ask", protect, askSecurityAssistant);

module.exports = router;
