const express = require("express");
const router = express.Router();

const rateLimit = require("express-rate-limit");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const {
  protect,
  authorize,
} = require("../middleware/auth");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
});

router.post("/register", registerUser);

router.post("/login", loginLimiter, loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome, admin! You have special access",
  });
});

module.exports = router;
