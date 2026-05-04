const router = require('express').Router();

const PROVIDERS = [
  { id: 'p1', name: 'Dr. Nusrat Jahan',       spec: 'Gynecologist',  area: 'Dhanmondi', rating: 4.8, women: true, fee: '৳ 1,500' },
  { id: 'p2', name: 'Dr. Farhana Akter',       spec: 'Gynecologist',  area: 'Gulshan',   rating: 4.7, women: true, fee: '৳ 2,000' },
  { id: 'p3', name: 'Dr. Sayma Rahman',        spec: 'Psychologist',  area: 'Banani',    rating: 4.9, women: true, fee: '৳ 1,800' },
  { id: 'p4', name: 'Dr. Tasnia Islam',        spec: 'Fertility',     area: 'Uttara',    rating: 4.6, women: true, fee: '৳ 2,500' },
  { id: 'p5', name: 'Aporajita Pharmacy',      spec: 'Pharmacy',      area: 'Mirpur',    rating: 4.5, women: true, fee: 'Walk-in' },
  { id: 'p6', name: 'Dr. Mehjabin Chowdhury', spec: 'Psychologist',  area: 'Dhanmondi', rating: 4.8, women: true, fee: '৳ 2,200' },
];

// GET /api/providers?spec=Gynecologist&area=Dhanmondi&q=nusrat
router.get('/', (req, res) => {
  const { spec, area, q } = req.query;
  let results = PROVIDERS;
  if (spec && spec !== 'All') results = results.filter(p => p.spec.toLowerCase().includes(spec.toLowerCase()));
  if (area) results = results.filter(p => p.area.toLowerCase().includes(area.toLowerCase()));
  if (q) results = results.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.area.toLowerCase().includes(q.toLowerCase())
  );
  res.json(results);
});

module.exports = router;
