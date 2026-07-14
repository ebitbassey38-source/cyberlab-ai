const express = require("express");
const router = express.Router();

const {
  createAsset,
  getAssets,
} = require("../controllers/assetController");

const { protect, authorize } = require("../middleware/auth");

router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createAsset
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getAssets
);


module.exports = router;
