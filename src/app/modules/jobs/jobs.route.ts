import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from './jobs.controller';

export const jobRoutes = Router();

jobRoutes.get('/', getAllJobs);
jobRoutes.get('/:id', getJobById);
jobRoutes.post('/', createJob);
jobRoutes.delete('/:id', deleteJob);
