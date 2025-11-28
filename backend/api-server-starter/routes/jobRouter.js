const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Public
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected
router.post("/", requireAuth, createJob);
router.put("/:id", requireAuth, updateJob);
router.delete("/:id", requireAuth, deleteJob);

module.exports = router;
