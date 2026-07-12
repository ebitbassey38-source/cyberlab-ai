const express = require("express");
const router = express.Router();
const { uploadFile, getFiles } = require("../controllers/fileController");
const { protect } = require("../middleware/auth");
const upload = require("../config/multer");

router.post("/", protect, upload.single("file"), uploadFile);
router.get("/", protect, getFiles);

module.exports = router;
