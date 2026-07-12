const express = require("express");
const router = express.Router();
const { createAsset, getAssets } = require("../controllers/assetController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createAsset);
router.get("/", protect, getAssets);

module.exports = router;
