const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// CREATE 
const createJob = async (req, res) => {
  const { title, type, location, description, salary, company } = req.body;

  if (!title || !type || !location || !description || !salary || !company) {
    return res.status(400).json({ error: "Please add all fields" });
  }

  try {
    const job = await Job.create({
      title,
      type,
      location,
      description,
      salary,
      company,
    });

    return res.status(201).json(job);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get All
const getAllJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);

    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve jobs", error: error.message });
  }
};

// Get One by Id 
const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve job.", error: error.message });
  }
};

// UPDATE 
const updateJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,         
      runValidators: true 
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update job.", error: error.message });
  }
};

// DELETE 
const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }

  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    return res.status(200).json({ message: "Deleted succeed." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete job.", error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
