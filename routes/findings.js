const express = require("express");
const router = express.Router();

const {
  createFinding,
  getFindings,
} = require("../controllers/findingController");

const { protect } = require("../middleware/auth");

router.post("/", protect, createFinding);
router.get("/", protect, getFindings);

module.exports = router;
