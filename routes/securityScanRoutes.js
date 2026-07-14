const express = require("express");
const router = express.Router();

const {
  createSecurityScan,
  getSecurityScans,
} = require("../controllers/securityScanController");

const { protect, authorize } = require("../middleware/auth");


router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createSecurityScan
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getSecurityScans
);


module.exports = router;
