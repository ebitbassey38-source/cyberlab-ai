const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  inviteMember,
  listMembers,
  updateMemberRole,
  removeMember,
} = require("../controllers/organizationMemberController");

const { protect } = require("../middleware/auth");

router.post("/", protect, inviteMember);
router.get("/", protect, listMembers);
router.put("/:memberId", protect, updateMemberRole);
router.delete("/:memberId", protect, removeMember);

module.exports = router;
