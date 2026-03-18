import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const getStandings = () => JSON.parse(readFileSync(join(__dirname, '../data/standings.json'), 'utf-8'));

// GET /api/standings/championship
router.get('/championship', (req, res) => {
  const data = getStandings();
  res.json(data.championship);
});

// GET /api/standings/live
router.get('/live', (req, res) => {
  const data = getStandings();
  res.json(data.live);
});

export default router;
