const express = require("express");
const router = express.Router();
const { runAgent } = require("../controllers/agentController");
const { protect } = require("../middleware/auth");

router.post("/query", protect, runAgent);

module.exports = router;
