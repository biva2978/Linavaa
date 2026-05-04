const router = require('express').Router();

const ARTICLES = [
  { id: 'a1', cat: 'Periods',   title: "What's normal? A first-period guide",   read: '4 min', emoji: '🌸' },
  { id: 'a2', cat: 'PCOS',      title: 'PCOS in your 20s — early signs',         read: '6 min', emoji: '🪷' },
  { id: 'a3', cat: 'Mental',    title: 'When PMS feels like more than PMS',       read: '5 min', emoji: '🌿' },
  { id: 'a4', cat: 'Nutrition', title: 'Iron-rich Bangladeshi foods for periods', read: '3 min', emoji: '🍲' },
  { id: 'a5', cat: 'Periods',   title: 'Why your cycle changes after 30',         read: '5 min', emoji: '🌼' },
  { id: 'a6', cat: 'Mental',    title: 'Talking to your mother about your cycle', read: '4 min', emoji: '☕' },
];

const VIDEOS = [
  { id: 'v1', title: 'Cramps relief: 3 stretches you can do in bed', dur: '2:14', cat: 'Periods' },
  { id: 'v2', title: 'Reading your cycle chart in 60 seconds',       dur: '1:08', cat: 'Periods' },
  { id: 'v3', title: 'A gentle yoga flow for PMS week',              dur: '8:42', cat: 'Mental'  },
];

const PRODUCTS = [
  { key: 'pad-r', label: 'Regular Pads',    price: 120,  brand: 'Senora' },
  { key: 'pad-n', label: 'Overnight Pads',  price: 160,  brand: 'Senora' },
  { key: 'pad-h', label: 'Herbal Pads',     price: 220,  brand: 'Joyaa'  },
  { key: 'pant',  label: 'Period Underwear',price: 580,  brand: 'Reise'  },
  { key: 'cup',   label: 'Menstrual Cup',   price: 1400, brand: 'Eva'    },
  { key: 'wipe',  label: 'Intimate Wipes',  price: 95,   brand: 'Joyaa'  },
];

// GET /api/content/articles?cat=Periods
router.get('/articles', (req, res) => {
  const { cat } = req.query;
  res.json(!cat || cat === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === cat));
});

// GET /api/content/videos?cat=Periods
router.get('/videos', (req, res) => {
  const { cat } = req.query;
  res.json(!cat || cat === 'All' ? VIDEOS : VIDEOS.filter(v => v.cat === cat));
});

// GET /api/content/products
router.get('/products', (req, res) => res.json(PRODUCTS));

module.exports = router;
