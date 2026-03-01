import express, { Application, Request, Response } from 'express';
const app: Application = express();
const port = 3000;
import cors from 'cors';

import { jobRoutes } from './app/modules/jobs/jobs.route';
import { applicationRoutes } from './app/modules/applications/applications.route';
import { authRoutes, userRoutes } from './app/modules/users/users.route';

//parsers
app.use(express.json());
app.use(cors());


// application all routes
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

const getAcontroller = (req: Request, res: Response) =>{
  const a = 'Hello World';
  res.send(a);
}

export default app.get('/', getAcontroller);
