const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome, admin! You have special access.",
  });
});

module.exports = router;
