const express = require("express");
const router = express.Router();

const {
  createReport,
  getReports,
} = require("../controllers/reportController");

const { protect, authorize } = require("../middleware/auth");


router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createReport
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getReports
);


module.exports = router;
