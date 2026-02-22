import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signToken } from '../utils/jwt.js';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name, role: 'customer' });

  const token = signToken({ sub: String(user._id), role: user.role, email: user.email, name: user.name });
  return res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ sub: String(user._id), role: user.role, email: user.email, name: user.name });
  return res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}
