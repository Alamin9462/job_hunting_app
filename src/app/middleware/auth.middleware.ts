import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface AuthRequest extends Express.Request {
  user?: { id: string; role: string; email?: string };
}

export const requireAuth: RequestHandler = (req: any, res, next) => {
  const auth = req.headers.authorization as string | undefined;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwt_secret) as any;
    (req as AuthRequest).user = { id: payload.id, role: payload.role, email: payload.email };
    next();
    return;
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};
