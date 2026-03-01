import { RequestHandler } from 'express';
import { Job, IJob } from './jobs.model';
import mongoose from 'mongoose';

// GET /api/jobs
export const getAllJobs: RequestHandler = async (req, res) => {
  try {
    const jobs = await Job.find().exec();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

// GET /api/jobs/:id
export const getJobById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid job ID' });
    return;
  }

  try {
    const job = await Job.findById(id).exec();
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
}

// POST /api/jobs  it only access by admin
export const createJob: RequestHandler = async (req, res) => {
  const { title, company, location, category, description } = req.body;
  if (!title || !company || !location || !category || !description) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const job = new Job({ title, company, location, category, description });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create job' });
  }
}

// DELETE /api/jobs/:id  it only access by admin
export const deleteJob: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid job ID' });
    return;
  }

  try {
    const job = await Job.findByIdAndDelete(id).exec();
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
}
