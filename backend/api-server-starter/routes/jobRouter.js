const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");

const router = express.Router();

// /api/jobs
router.get("/", getAllJobs);      
router.get("/:id", getJobById);   
router.post("/", createJob);      
router.put("/:id", updateJob);    
router.delete("/:id", deleteJob); 

module.exports = router;
