const express = require("express");
const multer = require("multer");
const resumeController = require("../controllers/resumeController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload a resume
router.post("/upload", upload.single("resume"), resumeController.uploadResume);

// Get all resumes
router.get("/", resumeController.getAllResumes);

// Get a specific resume by ID
router.get("/:id", resumeController.getResumeById);

module.exports = router;
