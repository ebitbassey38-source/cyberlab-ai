const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Red Team",
      status: "Coming Soon"
    },
    {
      id: 2,
      name: "Blue Team",
      status: "Coming Soon"
    },
    {
      id: 3,
      name: "Purple Team",
      status: "Coming Soon"
    },
    {
      id: 4,
      name: "White Box",
      status: "Coming Soon"
    },
    {
      id: 5,
      name: "Black Box",
      status: "Coming Soon"
    }
  ]);
});

module.exports = router;
