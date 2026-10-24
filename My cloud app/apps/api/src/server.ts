import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.json({
    name: 'My Cloud API',
    status: 'running',
    health: '/health'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    name: 'My Cloud API',
    status: 'ok'
  });
});
app.use((_req, res) =>
  res.status(404).json({ error: 'NOT_FOUND' })
);
app.use('/api/v1/auth', authRouter);

app.use((_req, res) => res.status(404).json({ error: 'NOT_FOUND' }));
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Do not return stack traces or secret-bearing provider errors to clients.
  console.error('request_error', err instanceof Error ? err.message : 'unknown');
  res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API listening on port ${port}`));
