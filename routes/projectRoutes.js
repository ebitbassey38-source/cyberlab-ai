const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const { protect, authorize } = require("../middleware/auth");

router.post(
  "/",
  protect,
  authorize("admin", "analyst"),
  createProject
);


router.get(
  "/",
  protect,
  authorize("admin", "analyst", "manager", "client"),
  getProjects
);


module.exports = router;
