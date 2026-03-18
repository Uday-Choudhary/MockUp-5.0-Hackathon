import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const getRaces = () => JSON.parse(readFileSync(join(__dirname, '../data/races.json'), 'utf-8'));

// GET /api/races/current — current race info (conditions, sectors, tyres, result, highlights)
router.get('/current', (req, res) => {
  const data = getRaces();
  res.json(data.current);
});

// GET /api/races/telemetry — telemetry with randomized live values
router.get('/telemetry', (req, res) => {
  const data = getRaces();
  const base = data.telemetry;
  const r = base.ranges;
  res.json({
    speed: Math.max(r.speed.min, Math.min(r.speed.max, base.speed + Math.floor(Math.random() * 11) - 5)),
    lean: Math.max(r.lean.min, Math.min(r.lean.max, base.lean + Math.floor(Math.random() * 5) - 2)),
    gforce: Math.max(r.gforce.min, Math.min(r.gforce.max, +(base.gforce + Math.random() * 0.2 - 0.1).toFixed(2))),
    rpm: Math.max(r.rpm.min, Math.min(r.rpm.max, base.rpm + Math.floor(Math.random() * 9) - 4)),
    ranges: r,
  });
});

// GET /api/races/calendar — race calendar
router.get('/calendar', (req, res) => {
  const data = getRaces();
  res.json(data.calendar);
});

// GET /api/races/next — next race details
router.get('/next', (req, res) => {
  const data = getRaces();
  res.json(data.nextRace);
});

export default router;
