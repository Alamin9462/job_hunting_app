import { Router } from 'express';
import { register, login, getAllUsers } from './users.controller';
import { requireAuth } from '../../middleware/auth.middleware';
import { requireAdmin } from '../../middleware/role.middleware';


export const authRoutes = Router();
export const userRoutes = Router();

// auth
authRoutes.post('/register', register);
authRoutes.post('/login', login);

// user management (admin only)
userRoutes.get('/', requireAuth, requireAdmin, getAllUsers);
