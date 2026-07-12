const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    module: "White Box",
    status: "Active",
    description: "AI-assisted source code review",
    features: [
      "Project Upload",
      "Code Review",
      "Security Findings",
      "Recommendations",
      "Reports"
    ]
  });
});

module.exports = router;
