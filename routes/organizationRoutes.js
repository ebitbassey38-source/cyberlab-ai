const express = require("express");
const router = express.Router();

const {
  createOrganization,
  getOrganizations,
  getOrganizationById,
} = require("../controllers/organizationController");

const { protect, authorize } = require("../middleware/auth");

router.post(
  "/",
  protect,
  authorize("admin"),
  createOrganization
);

router.get(
  "/",
  protect,
  getOrganizations
);

router.get(
  "/:id",
  protect,
  getOrganizationById
);

module.exports = router;
