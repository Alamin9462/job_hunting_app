import { Router } from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} from './jobs.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { requireAdmin } from '../../middleware/role.middleware';

export const jobRoutes = Router();

jobRoutes.get('/', getAllJobs);
jobRoutes.get('/:id', getJobById);

// its only access by admin and admin should be authenticated
jobRoutes.post('/', requireAuth, requireAdmin, createJob);
jobRoutes.delete('/:id', requireAuth, requireAdmin, deleteJob);
