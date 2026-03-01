import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './users.model';
import config from '../../config';

// POST /api/auth/register
export const register: RequestHandler = async (req, res) => {
  const { name, email, password, role } = req.body as { name: string; email: string; password: string; role?: string };
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const exists = await User.findOne({ email }).exec();
    if (exists) {
      res.status(409).json({ error: 'Email already in use' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role === 'admin' ? 'admin' : 'user' });
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to register' });
    return;
  }
};

// POST /api/auth/login
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Missing email or password' });
    return;
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, config.jwt_secret, { expiresIn: '7d' });
    res.json({ token });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
    return;
  }
};

// GET /api/users (admin only)
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select('-password').exec();
    res.json(users);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
    return;
  }
};
