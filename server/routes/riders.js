import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const getRiders = () => JSON.parse(readFileSync(join(__dirname, '../data/riders.json'), 'utf-8'));

// GET /api/riders — all riders (summary)
router.get('/', (req, res) => {
  const riders = getRiders();
  const summary = riders.map(({ id, name, num, team, flag, teamColor, img }) => ({
    id, name, num, team, flag, teamColor, img,
  }));
  res.json(summary);
});

// GET /api/riders/:id — single rider full profile
router.get('/:id', (req, res) => {
  const riders = getRiders();
  const rider = riders.find(r => r.id === parseInt(req.params.id));
  if (!rider) {
    return res.status(404).json({ error: 'Rider not found' });
  }
  res.json(rider);
});

export default router;
