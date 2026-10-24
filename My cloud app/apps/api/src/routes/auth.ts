import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

export const authRouter = Router();
authRouter.get('/__debug', (_req, res) => {
  res.json({
    service: 'my-cloud-api',
    authRouterLoaded: true,
    build: 'auth-router-check-2'
  });
});
const prisma = new PrismaClient();
const signupSchema = z.object({
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  password: z.string().min(12).max(128)
});
const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform(v => v.toLowerCase()),
  password: z.string().min(1).max(128)
});
function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be configured with at least 32 characters');
  return secret;
}

authRouter.post('/signup', async (req, res, next) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'INVALID_INPUT' });
    const { email, password } = parsed.data;
    const exists = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (exists) return res.status(409).json({ error: 'ACCOUNT_EXISTS' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, passwordHash }, select: { id: true, email: true, createdAt: true } });
    return res.status(201).json({ user });
  } catch (e) { return next(e); }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'INVALID_INPUT' });
    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
    // Generic response avoids revealing whether an email exists.
    if (!user || !ok) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    const token = jwt.sign({ sub: user.id }, jwtSecret(), { expiresIn: '2h', issuer: 'my-cloud-api', audience: 'my-cloud-web' });
    // Development starter returns a short-lived bearer token. For production, prefer
    // secure HttpOnly cookie sessions plus CSRF protection and refresh/revocation controls.
    return res.json({ token, user: { id: user.id, email: user.email } });
  } catch (e) { return next(e); }
});
