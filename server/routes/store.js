import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const getStore = () => JSON.parse(readFileSync(join(__dirname, '../data/store.json'), 'utf-8'));

// GET /api/store/products — all products, optional ?category= filter
router.get('/products', (req, res) => {
  const data = getStore();
  const { category } = req.query;
  let products = data.products;
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category.toLowerCase());
  }
  res.json(products);
});

// GET /api/store/drops — limited drops
router.get('/drops', (req, res) => {
  const data = getStore();
  res.json(data.limitedDrop);
});

// GET /api/store/merch — rider-specific merchandise
router.get('/merch', (req, res) => {
  const data = getStore();
  res.json(data.merch);
});

export default router;
