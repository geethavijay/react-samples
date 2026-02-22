import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type TokenPayload = {
  sub: string;
  role: string;
  email: string;
  name: string;
};

export const signToken = (payload: TokenPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: '8h' });

export const verifyToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as TokenPayload;
