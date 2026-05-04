// icons.jsx — minimal stroke icon set, warm rounded
const Icon = ({ children, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.6, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

const IconHome     = (p) => <Icon {...p}><path d="M3.5 11 12 4l8.5 7"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/></Icon>;
const IconTrack    = (p) => <Icon {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></Icon>;
const IconLog      = (p) => <Icon {...p}><path d="M5 4h11l3 3v13H5z"/><path d="M16 4v3h3"/><path d="M8 12h7M8 16h5"/></Icon>;
const IconJournal  = (p) => <Icon {...p}><path d="M5 4h12v16H7a2 2 0 0 1-2-2V4z"/><path d="M5 18a2 2 0 0 1 2-2h10"/><path d="M9 8h5"/></Icon>;
const IconMore     = (p) => <Icon {...p}><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/></Icon>;

const IconHeart    = (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></Icon>;
const IconDrop     = (p) => <Icon {...p}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></Icon>;
const IconMoon     = (p) => <Icon {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></Icon>;
const IconBolt     = (p) => <Icon {...p}><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"/></Icon>;
const IconPill     = (p) => <Icon {...p}><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9.5 7 16.5 14" /></Icon>;
const IconChat     = (p) => <Icon {...p}><path d="M4 6h16v10H8l-4 4z"/></Icon>;

const IconLock     = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></Icon>;
const IconShield   = (p) => <Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></Icon>;
const IconEye      = (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Icon>;
const IconEyeOff   = (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3 3.5"/><path d="M6 7.5C3.5 9.3 2 12 2 12s3.5 6 10 6c1.6 0 3-.3 4.3-.8"/><path d="M9.6 9.6a3 3 0 0 0 4.2 4.2"/></Icon>;

const IconCalendar = (p) => <Icon {...p}><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 10h16M9 4v4M15 4v4"/></Icon>;
const IconChart    = (p) => <Icon {...p}><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/></Icon>;
const IconPlay     = (p) => <Icon {...p}><path d="M7 4l13 8-13 8z" fill="currentColor"/></Icon>;
const IconSearch   = (p) => <Icon {...p}><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></Icon>;
const IconArrowR   = (p) => <Icon {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Icon>;
const IconArrowL   = (p) => <Icon {...p}><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></Icon>;
const IconPlus     = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>;
const IconCheck    = (p) => <Icon {...p}><path d="m5 12 5 5L20 7"/></Icon>;
const IconX        = (p) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18"/></Icon>;
const IconBag      = (p) => <Icon {...p}><path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/></Icon>;
const IconBook     = (p) => <Icon {...p}><path d="M5 4h6a3 3 0 0 1 3 3v13"/><path d="M19 4h-6a3 3 0 0 0-3 3v13"/><path d="M5 4v13h6"/><path d="M19 4v13h-6"/></Icon>;
const IconPhone    = (p) => <Icon {...p}><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></Icon>;
const IconMap      = (p) => <Icon {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></Icon>;
const IconFlame    = (p) => <Icon {...p}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-1 6 3 6"/></Icon>;
const IconStar     = (p) => <Icon {...p}><path d="m12 4 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.4 6.8 20.1l1-5.8L3.5 10.2l5.9-.9z"/></Icon>;
const IconChevronR = (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>;
const IconChevronL = (p) => <Icon {...p}><path d="m15 6-6 6 6 6"/></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>;
const IconAlert    = (p) => <Icon {...p}><path d="M12 3 2 21h20z"/><path d="M12 10v5M12 18v.01"/></Icon>;
const IconLeaf     = (p) => <Icon {...p}><path d="M5 19c0-7 4-12 14-13-1 10-6 14-13 14"/><path d="M5 19c2-3 5-6 9-9"/></Icon>;
const IconWater    = (p) => <Icon {...p}><path d="M12 3s6 8 6 12a6 6 0 0 1-12 0c0-4 6-12 6-12z"/></Icon>;

Object.assign(window, {
  Icon, IconHome, IconTrack, IconLog, IconJournal, IconMore,
  IconHeart, IconDrop, IconMoon, IconBolt, IconPill, IconChat,
  IconLock, IconShield, IconEye, IconEyeOff,
  IconCalendar, IconChart, IconPlay, IconSearch,
  IconArrowR, IconArrowL, IconPlus, IconCheck, IconX,
  IconBag, IconBook, IconPhone, IconMap, IconFlame, IconStar,
  IconChevronR, IconChevronL, IconSettings, IconAlert, IconLeaf, IconWater,
});
