const express = require("express");
const router = express.Router();

const {
  createRisk,
  getRisks,
} = require("../controllers/riskController");

const { protect, authorize } = require("../middleware/auth");


router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createRisk
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getRisks
);


module.exports = router;
