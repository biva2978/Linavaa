// data.jsx — Shokhii sample data + cycle math

const CYCLE_LENGTH = 28;
const PERIOD_LENGTH = 5;

// Returns the phase for a given day-in-cycle (1..28)
function phaseFor(day) {
  if (day <= PERIOD_LENGTH) return 'menstrual';
  if (day <= 13) return 'follicular';
  if (day <= 16) return 'ovulation';
  return 'luteal';
}

const PHASE_META = {
  menstrual:  { label: 'Menstrual', color: 'oklch(0.62 0.16 25)',  soft: 'oklch(0.94 0.04 25)',  emoji: '🌑', desc: 'Rest. Be gentle with yourself.' },
  follicular: { label: 'Follicular', color: 'oklch(0.72 0.10 145)', soft: 'oklch(0.95 0.03 140)', emoji: '🌒', desc: 'Energy rising. Try something new.' },
  ovulation:  { label: 'Ovulation',  color: 'oklch(0.68 0.13 145)', soft: 'oklch(0.93 0.05 140)', emoji: '🌕', desc: 'Peak energy. Glow window.' },
  luteal:     { label: 'Luteal',     color: 'oklch(0.66 0.10 60)',  soft: 'oklch(0.95 0.04 65)',  emoji: '🌘', desc: 'Slow down. PMS may arrive.' },
};

// Daily tips by phase
const DAILY_TIPS = {
  menstrual:  [
    'Iron-rich foods help replenish what you lose. Try dal, spinach, jaggery.',
    'A warm compress on your lower belly can ease cramps within 15 minutes.',
    'Skip the caffeine today — it can make cramps worse.',
  ],
  follicular: [
    'Energy is climbing. Today is a great day for a long walk or new project.',
    'Try a new recipe — your sense of taste is at its sharpest now.',
    'Strength training works especially well in this phase.',
  ],
  ovulation:  [
    'Ovulation window — drink more water and eat fruits for skin glow.',
    'You may feel more social today. Lean into it.',
    'A mild ache on one side of the lower belly is normal — it\'s ovulation.',
  ],
  luteal:     [
    'Magnesium-rich snacks (almonds, pumpkin seeds) help PMS mood swings.',
    'Sleep matters more than usual this week. Aim for 8 hours.',
    'Cravings are normal. Pair carbs with protein to feel steady.',
  ],
};

// Symptoms taxonomy
const SYMPTOM_GROUPS = [
  { key: 'flow',   label: 'Flow',   options: ['Spotting', 'Light', 'Medium', 'Heavy'] },
  { key: 'mood',   label: 'Mood',   options: ['Calm', 'Happy', 'Anxious', 'Sad', 'Irritable', 'Hopeful'] },
  { key: 'pain',   label: 'Pain',   options: ['None', 'Cramps', 'Headache', 'Backache', 'Breast tenderness'] },
  { key: 'energy', label: 'Energy', options: ['Drained', 'Low', 'Okay', 'Good', 'Buzzing'] },
  { key: 'sleep',  label: 'Sleep',  options: ['<5h', '5–6h', '7h', '8h', '9h+'] },
];

// Articles & videos
const ARTICLES = [
  { id: 'a1', cat: 'Periods',    title: 'What\'s normal? A first-period guide',  read: '4 min', emoji: '🌸' },
  { id: 'a2', cat: 'PCOS',       title: 'PCOS in your 20s — early signs',         read: '6 min', emoji: '🪷' },
  { id: 'a3', cat: 'Mental',     title: 'When PMS feels like more than PMS',       read: '5 min', emoji: '🌿' },
  { id: 'a4', cat: 'Nutrition',  title: 'Iron-rich Bangladeshi foods for periods', read: '3 min', emoji: '🍲' },
  { id: 'a5', cat: 'Periods',    title: 'Why your cycle changes after 30',         read: '5 min', emoji: '🌼' },
  { id: 'a6', cat: 'Mental',     title: 'Talking to your mother about your cycle', read: '4 min', emoji: '☕' },
];

const VIDEOS = [
  { id: 'v1', title: 'Cramps relief: 3 stretches you can do in bed', dur: '2:14', cat: 'Periods' },
  { id: 'v2', title: 'Reading your cycle chart in 60 seconds',        dur: '1:08', cat: 'Periods' },
  { id: 'v3', title: 'A gentle yoga flow for PMS week',               dur: '8:42', cat: 'Mental' },
];

const CATEGORIES = ['All', 'Periods', 'PCOS', 'Mental', 'Nutrition'];

// Providers — fictional, generic Dhaka neighborhoods
const PROVIDERS = [
  { id: 'p1', name: 'Dr. Nusrat Jahan',   spec: 'Gynecologist',   area: 'Dhanmondi',  rating: 4.8, women: true,  fee: '৳ 1,500' },
  { id: 'p2', name: 'Dr. Farhana Akter',  spec: 'Gynecologist',   area: 'Gulshan',    rating: 4.7, women: true,  fee: '৳ 2,000' },
  { id: 'p3', name: 'Dr. Sayma Rahman',   spec: 'Psychologist',   area: 'Banani',     rating: 4.9, women: true,  fee: '৳ 1,800' },
  { id: 'p4', name: 'Dr. Tasnia Islam',   spec: 'Fertility',      area: 'Uttara',     rating: 4.6, women: true,  fee: '৳ 2,500' },
  { id: 'p5', name: 'Aporajita Pharmacy', spec: 'Pharmacy',       area: 'Mirpur',     rating: 4.5, women: true,  fee: 'Walk-in' },
  { id: 'p6', name: 'Dr. Mehjabin Chowdhury', spec: 'Psychologist', area: 'Dhanmondi', rating: 4.8, women: true, fee: '৳ 2,200' },
];

const PRODUCT_TYPES = [
  { key: 'pad-r', label: 'Regular Pads',   price: '৳ 120',  brand: 'Senora' },
  { key: 'pad-n', label: 'Overnight Pads', price: '৳ 160',  brand: 'Senora' },
  { key: 'pad-h', label: 'Herbal Pads',    price: '৳ 220',  brand: 'Joyaa' },
  { key: 'pant', label: 'Period Underwear',price: '৳ 580',  brand: 'Reise' },
  { key: 'cup',   label: 'Menstrual Cup',  price: '৳ 1,400', brand: 'Eva' },
  { key: 'wipe',  label: 'Intimate Wipes', price: '৳ 95',   brand: 'Joyaa' },
];

// Sample mood/pain history for charts (last 14 days)
const HISTORY_14 = [
  { d: 'M',  pain: 1, mood: 4, sleep: 7,  flow: 0 },
  { d: 'T',  pain: 0, mood: 4, sleep: 8,  flow: 0 },
  { d: 'W',  pain: 0, mood: 5, sleep: 7,  flow: 0 },
  { d: 'T',  pain: 1, mood: 4, sleep: 6,  flow: 0 },
  { d: 'F',  pain: 2, mood: 3, sleep: 6,  flow: 0 },
  { d: 'S',  pain: 3, mood: 2, sleep: 5,  flow: 0 },
  { d: 'S',  pain: 4, mood: 2, sleep: 6,  flow: 3 },
  { d: 'M',  pain: 4, mood: 2, sleep: 7,  flow: 4 },
  { d: 'T',  pain: 3, mood: 3, sleep: 7,  flow: 3 },
  { d: 'W',  pain: 2, mood: 4, sleep: 8,  flow: 2 },
  { d: 'T',  pain: 1, mood: 4, sleep: 8,  flow: 1 },
  { d: 'F',  pain: 0, mood: 5, sleep: 8,  flow: 0 },
  { d: 'S',  pain: 0, mood: 5, sleep: 7,  flow: 0 },
  { d: 'S',  pain: 0, mood: 4, sleep: 8,  flow: 0 },
];

const JOURNAL_SEED = [
  { id: 'j1', date: 'Apr 28', preview: 'Today felt heavy in the morning but lighter after I called my sister…', mood: '😌' },
  { id: 'j2', date: 'Apr 25', preview: 'Cramps were bad. I did the heat thing. It actually worked.', mood: '😣' },
  { id: 'j3', date: 'Apr 22', preview: 'I keep forgetting to drink water. Trying to leave the bottle on my desk.', mood: '🙂' },
];

Object.assign(window, {
  CYCLE_LENGTH, PERIOD_LENGTH, phaseFor, PHASE_META, DAILY_TIPS,
  SYMPTOM_GROUPS, ARTICLES, VIDEOS, CATEGORIES, PROVIDERS, PRODUCT_TYPES,
  HISTORY_14, JOURNAL_SEED,
});
