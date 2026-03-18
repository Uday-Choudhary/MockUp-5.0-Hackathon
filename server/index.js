import express from 'express';
import cors from 'cors';
import ridersRouter from './routes/riders.js';
import standingsRouter from './routes/standings.js';
import newsRouter from './routes/news.js';
import racesRouter from './routes/races.js';
import storeRouter from './routes/store.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/riders', ridersRouter);
app.use('/api/standings', standingsRouter);
app.use('/api/news', newsRouter);
app.use('/api/races', racesRouter);
app.use('/api/store', storeRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏍️  MotoGP Hub API running on http://localhost:${PORT}`);
});
