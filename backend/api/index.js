// Express entrypoint for Vercel Functions. The HTTP listener is disabled
// when VERCEL=1; runtime environment provides DATABASE_URL and JWT_SECRET.
import { app } from '../server.js';
export default app;
