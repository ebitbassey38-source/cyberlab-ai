const express = require("express");
const router = express.Router();

const {
  createVulnerability,
  getVulnerabilities,
} = require("../controllers/vulnerabilityController");

const { protect, authorize } = require("../middleware/auth");


router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createVulnerability
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getVulnerabilities
);


module.exports = router;
