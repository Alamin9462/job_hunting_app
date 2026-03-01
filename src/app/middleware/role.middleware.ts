import { RequestHandler } from 'express';
import { AuthRequest } from './auth.middleware';

export const requireAdmin: RequestHandler = (req: any, res, next) => {
  const r = req as AuthRequest;
  if (!r.user) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  if (r.user.role !== 'admin') {
    res.status(403).json({ error: 'Admin role required' });
    return;
  }
  next();
};
