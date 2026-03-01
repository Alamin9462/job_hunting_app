import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { Application } from './applications.model';

// GET /api/applications (admin only)
export const getAllApplications: RequestHandler = async (req, res) => {
  try {
    const applications = await Application.find().populate('job_id').exec();
    res.json(applications);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
    return;
  }
};

// GET /api/applications/job/:jobId (admin only)
export const getApplicationsByJob: RequestHandler = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400).json({ error: 'Invalid job ID' });
    return;
  }

  try {
    const applications = await Application.find({ job_id: jobId }).exec();
    res.json(applications);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications for job' });
    return;
  }
};

// POST /api/applications
export const submitApplication: RequestHandler = async (req, res) => {
  const { job_id, name, email, resume_link, cover_note } = req.body;
  if (!job_id || !name || !email || !resume_link) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(job_id)) {
    res.status(400).json({ error: 'Invalid job ID' });
    return;
  }

  try {
    const application = new Application({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });
    await application.save();
    res.status(201).json(application);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
    return;
  }
}
