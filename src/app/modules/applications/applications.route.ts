import { Router } from 'express';
import { submitApplication } from './applications.controller';

export const applicationRoutes = Router();

applicationRoutes.post('/', submitApplication);
