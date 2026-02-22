import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = header.slice(7);
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
      name: payload.name
    };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}
