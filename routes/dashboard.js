const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    name: "CyberLab AI",
    version: "1.0.0",
    status: "Running",
    modules: [
      "Dashboard",
      "AI Assistant",
      "Red Team",
      "Blue Team",
      "Purple Team",
      "White Box",
      "Black Box",
      "Reporting",
      "Asset Inventory"
    ]
  });
});

module.exports = router;
