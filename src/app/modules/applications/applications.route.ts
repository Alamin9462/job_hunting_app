import { Router } from 'express';
import { submitApplication, getAllApplications, getApplicationsByJob } from './applications.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { requireAdmin } from '../../middleware/role.middleware';

export const applicationRoutes = Router();

// public endpoint
applicationRoutes.post('/', submitApplication);

// admin only endpoints
applicationRoutes.get('/', requireAuth, requireAdmin, getAllApplications);
applicationRoutes.get('/job/:jobId', requireAuth, requireAdmin, getApplicationsByJob);
