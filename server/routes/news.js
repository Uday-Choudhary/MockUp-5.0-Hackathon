import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const getNews = () => JSON.parse(readFileSync(join(__dirname, '../data/news.json'), 'utf-8'));

// GET /api/news — all news
router.get('/', (req, res) => {
  const data = getNews();
  res.json(data);
});

// GET /api/news/breaking — breaking news only
router.get('/breaking', (req, res) => {
  const data = getNews();
  res.json(data.breaking);
});

// GET /api/news/latest — latest news list
router.get('/latest', (req, res) => {
  const data = getNews();
  res.json(data.latest);
});

// GET /api/news/feed — social-style feed
router.get('/feed', (req, res) => {
  const data = getNews();
  res.json(data.feed);
});

// GET /api/news/videos — video content
router.get('/videos', (req, res) => {
  const data = getNews();
  res.json(data.videos);
});

export default router;
