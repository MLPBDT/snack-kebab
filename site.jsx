// site.jsx — Snack kebab site
// One responsive component. Reads a `tweaks` prop for colors/typo/copy/etc.
// Rendered inside both a desktop artboard and a mobile (iOS) artboard.

// ─── DEFAULT DATA (fallback when tweaks.menu / tweaks.compose are absent) ─
const DEFAULT_MENU = {
  kebabs: [
    { id: 'k1', name: 'Kebab Classique',     desc: 'Pain pita, viande de veau, salade, tomate, oignon, sauce blanche', price: 7.5,  tag: 'Best-seller' },
    { id: 'k2', name: 'Kebab Galette',       desc: 'Galette grillée, viande de poulet, crudités, sauce algérienne',     price: 8,    tag: 'Épicé' },
    { id: 'k3', name: 'Kebab Assiette',      desc: 'Frites maison, viande, salade, sauces au choix',                    price: 11,   tag: 'XL' },
    { id: 'k4', name: 'Kebab Falafel',       desc: 'Pita, falafels maison, houmous, crudités, sauce yaourt',            price: 7,    tag: 'Végé' },
  ],
  burgers: [
    { id: 'b1', name: 'Cheese Snack',        desc: 'Steak haché, cheddar, oignons confits, sauce maison',                price: 8.5,  tag: '' },
    { id: 'b2', name: 'Double Bacon',        desc: 'Double steak, bacon grillé, cheddar fondu, salade',                  price: 10.5, tag: '' },
    { id: 'b3', name: 'Chicken Crispy',      desc: 'Poulet pané croustillant, coleslaw, sauce barbecue',                 price: 9,    tag: '' },
  ],
  tacos: [
    { id: 't1', name: 'Tacos M',             desc: '1 viande, frites, fromage fondu, sauce',                              price: 7,    tag: '' },
    { id: 't2', name: 'Tacos L',             desc: '2 viandes, frites, fromage fondu, sauce',                              price: 9,    tag: '' },
    { id: 't3', name: 'Tacos XL',            desc: '3 viandes, frites, double fromage, sauce',                            price: 11,   tag: '' },
  ],
  sides: [
    { id: 's1', name: 'Frites maison',       desc: 'Coupées sur place, double cuisson',                                   price: 3.5,  tag: '' },
    { id: 's2', name: 'Nuggets x6',          desc: 'Poulet pané, sauce au choix',                                          price: 4.5,  tag: '' },
    { id: 's3', name: 'Onion rings',         desc: '6 pièces, sauce barbecue',                                             price: 4,    tag: '' },
    { id: 's4', name: 'Mozza sticks x4',     desc: 'Bâtonnets de mozza panés, sauce tomate',                              price: 5,    tag: '' },
  ],
};

const DEFAULT_COMPOSE = [
  { key: 'pain',    label: 'Le pain',    options: ['Pita', 'Galette', 'Pain libanais', 'Sans pain (assiette)'] },
  { key: 'viande',  label: 'La viande',  options: ['Veau', 'Poulet', 'Mixte', 'Falafel (végé)'] },
  { key: 'crudites', label: 'Les crudités', options: ['Salade', 'Tomate', 'Oignon', 'Cornichons', 'Tout'] },
  { key: 'sauce',   label: 'Les sauces (max 2)', options: ['Blanche', 'Algérienne', 'Samouraï', 'Barbecue', 'Harissa', 'Curry', 'Andalouse'], multi: 2 },
  { key: 'extra',   label: 'Suppléments', options: ['Cheddar +1€', 'Bacon +1.5€', 'Œuf +1€', 'Frites dedans +1€'], multi: 4 },
];

window.DEFAULT_MENU = DEFAULT_MENU;
window.DEFAULT_COMPOSE = DEFAULT_COMPOSE;

// ─── SVG ICONS (line, currentColor) ───────────────────────────────────
const I = {
  pin:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  phone:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  star:   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2Z"/></svg>,
  arrow:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  bag:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>,
  flame:  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .5-2 1-3-3 1-5 4-5 8a8 8 0 0 0 16 0c0-6-4-10-8-13Z"/></svg>,
  leaf:   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-11-1 9-3 18-9 18Z"/></svg>,
  check:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>,
  plus:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  minus:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  x:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  menu:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
};

// ─── HELPERS ──────────────────────────────────────────────────────────
const eur = (n) => `${n.toFixed(2).replace('.', ',')} €`;

// SVG decorative kebab "photo" placeholder — varies by seed for visual rhythm.
function KebabArt({ seed = 0, palette, mode = 'auto' }) {
  // Pull palette colors so the placeholder matches the active theme.
  const c1 = palette.primary;
  const c2 = palette.accent;
  const c3 = palette.bgDeep;
  const variants = [
    // Pita with meat + greens
    <svg key="0" viewBox="0 0 200 140" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="200" height="140" fill={c3}/>
      <circle cx="100" cy="70" r="120" fill={c2} opacity="0.15"/>
      <ellipse cx="100" cy="80" rx="78" ry="26" fill="#e8c98a"/>
      <ellipse cx="100" cy="76" rx="78" ry="26" fill="#f3d9a5"/>
      <path d="M30 76 Q100 50 170 76 L170 80 Q100 54 30 80 Z" fill="#c9a868" opacity="0.7"/>
      <ellipse cx="80" cy="68" rx="20" ry="8" fill={c1}/>
      <ellipse cx="115" cy="66" rx="22" ry="9" fill={c1} opacity="0.85"/>
      <ellipse cx="95" cy="62" rx="14" ry="6" fill="#8a3a1a"/>
      <circle cx="70" cy="70" r="5" fill="#d44"/>
      <circle cx="130" cy="72" r="4" fill="#d44"/>
      <path d="M60 72 Q70 60 80 72" stroke="#3a8a3a" strokeWidth="3" fill="none"/>
      <path d="M120 72 Q130 60 140 72" stroke="#3a8a3a" strokeWidth="3" fill="none"/>
    </svg>,
    // Burger stack
    <svg key="1" viewBox="0 0 200 140" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="200" height="140" fill={c3}/>
      <circle cx="100" cy="120" r="80" fill={c1} opacity="0.2"/>
      <ellipse cx="100" cy="50" rx="60" ry="22" fill="#e8b878"/>
      <ellipse cx="100" cy="46" rx="60" ry="22" fill="#f0c890"/>
      <circle cx="80" cy="38" r="2" fill="#fff" opacity="0.7"/>
      <circle cx="110" cy="42" r="2" fill="#fff" opacity="0.7"/>
      <circle cx="125" cy="36" r="2" fill="#fff" opacity="0.7"/>
      <rect x="40" y="62" width="120" height="8" fill="#3a8a3a"/>
      <rect x="40" y="68" width="120" height="10" fill="#f4d03f"/>
      <rect x="40" y="76" width="120" height="14" fill="#7a3a1a"/>
      <rect x="40" y="78" width="120" height="14" fill="#9a4a2a" opacity="0.6"/>
      <ellipse cx="100" cy="98" rx="60" ry="14" fill="#d8a868"/>
    </svg>,
    // Frites cone
    <svg key="2" viewBox="0 0 200 140" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="200" height="140" fill={c3}/>
      <path d="M70 130 L130 130 L120 60 L80 60 Z" fill={c1}/>
      <path d="M82 60 L100 130" stroke="#fff" strokeWidth="0.5" opacity="0.3"/>
      <rect x="78" y="20" width="6" height="50" fill="#f4c430" rx="1"/>
      <rect x="88" y="14" width="6" height="56" fill="#f4d030" rx="1"/>
      <rect x="98" y="10" width="6" height="60" fill="#f4d850" rx="1"/>
      <rect x="108" y="16" width="6" height="54" fill="#f4c430" rx="1"/>
      <rect x="118" y="22" width="6" height="48" fill="#f4d030" rx="1"/>
      <text x="100" y="110" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="system-ui">FRITES</text>
    </svg>,
    // Tacos
    <svg key="3" viewBox="0 0 200 140" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width="200" height="140" fill={c3}/>
      <circle cx="100" cy="70" r="100" fill={c2} opacity="0.15"/>
      <rect x="40" y="55" width="120" height="40" rx="6" fill="#e8c890"/>
      <rect x="40" y="55" width="120" height="8" fill="#d4b070"/>
      <ellipse cx="100" cy="70" rx="50" ry="8" fill={c1} opacity="0.9"/>
      <rect x="55" y="68" width="90" height="6" fill="#f4d030"/>
      <path d="M50 80 Q100 90 150 80" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6"/>
    </svg>,
  ];
  return variants[seed % variants.length];
}

// ─── SITE ─────────────────────────────────────────────────────────────
// ─── REVIEW CARD ──────────────────────────────────────────────
function ReviewCard({ r, palette, fonts, radius, I }) {
  return (
    <div className="ks-card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 1, color: palette.accent }}>
          {Array(Math.min(r.s || 5, 5)).fill(0).map((_, j) => <span key={j}>{I.star}</span>)}
        </div>
        {r.source === 'google' && (
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ opacity: 0.6 }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.55, margin: '0 0 16px', color: palette.text, textWrap: 'pretty' }}>"{r.t}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: `1px solid ${palette.text}10` }}>
        {r.photo
          ? <img src={r.photo} alt={r.n} style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover' }}/>
          : <div style={{ width: 36, height: 36, borderRadius: 999, background: palette.primary, color: palette.onPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{(r.n||'?')[0]}</div>
        }
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.n}</div>
          <div style={{ fontSize: 12, color: palette.muted }}>{r.d}</div>
        </div>
      </div>
    </div>
  );
}

function SnackSite({ tweaks: t, mode = 'desktop' }) {
  // Menu + compose can be customized via tweaks; fall back to defaults.
  const MENU = (t.menu && Object.keys(t.menu).length) ? t.menu : DEFAULT_MENU;
  const COMPOSE_STEPS = (t.compose && t.compose.length) ? t.compose : DEFAULT_COMPOSE;
  const [activeCat, setActiveCat] = React.useState(() => Object.keys(MENU)[0] || 'kebabs');
  const [cart, setCart] = React.useState([]); // {id, name, price, qty}
  const [composeStep, setComposeStep] = React.useState(0);
  const [compose, setCompose] = React.useState({});
  const [cartOpen, setCartOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('all'); // all | spicy | veg
  const [modeOrder, setModeOrder] = React.useState('livraison'); // livraison | sur place

  // Resolve palette by name
  const PALETTES = {
    'street':    { primary: '#E63946', accent: '#FFB703', bg: '#0E0E0E', bgDeep: '#1A1A1A', surface: '#222', text: '#F1FAEE', muted: 'rgba(241,250,238,.6)', onPrimary: '#fff' },
    'authentique': { primary: '#7A2E1F', accent: '#C8541C', bg: '#FFF8E7', bgDeep: '#F4EAD0', surface: '#fff', text: '#2A1A10', muted: 'rgba(42,26,16,.6)', onPrimary: '#fff' },
    'fun':       { primary: '#FF3B00', accent: '#00E676', bg: '#FFFBEA', bgDeep: '#FFF2C0', surface: '#fff', text: '#0E0E0E', muted: 'rgba(14,14,14,.65)', onPrimary: '#fff' },
    'premium':   { primary: '#1A1A1A', accent: '#D4A24C', bg: '#F5F1EA', bgDeep: '#EBE4D6', surface: '#fff', text: '#1A1A1A', muted: 'rgba(26,26,26,.6)', onPrimary: '#fff' },
    'neon':      { primary: '#39FF14', accent: '#FF00C8', bg: '#070710', bgDeep: '#0D0D1F', surface: '#15152A', text: '#F0F0FF', muted: 'rgba(240,240,255,.6)', onPrimary: '#070710' },
    'sunset':    { primary: '#F26430', accent: '#7A4E9B', bg: '#FCF3E8', bgDeep: '#F6E1C4', surface: '#fff', text: '#2B1810', muted: 'rgba(43,24,16,.6)', onPrimary: '#fff' },
  };
  const palette = PALETTES[t.palette] || PALETTES.street;

  const FONTS = {
    'sans-bold':   { display: '"Anton", "Bebas Neue", system-ui, sans-serif', body: '"Inter", system-ui, sans-serif', displayWeight: 400, displayCase: 'uppercase', displayTracking: '0.01em' },
    'serif-warm':  { display: '"Fraunces", "Playfair Display", Georgia, serif', body: '"Inter", system-ui, sans-serif', displayWeight: 700, displayCase: 'none', displayTracking: '-0.02em' },
    'mono-tech':   { display: '"Space Grotesk", system-ui, sans-serif', body: '"JetBrains Mono", ui-monospace, monospace', displayWeight: 700, displayCase: 'uppercase', displayTracking: '-0.01em' },
    'humanist':    { display: '"DM Sans", system-ui, sans-serif', body: '"DM Sans", system-ui, sans-serif', displayWeight: 700, displayCase: 'none', displayTracking: '-0.03em' },
  };
  const fonts = FONTS[t.fontPair] || FONTS['sans-bold'];

  const radius = { sm: t.radius * 0.5, md: t.radius, lg: t.radius * 1.5, xl: t.radius * 2.25 };

  // Cart helpers
  const addToCart = (item) => {
    setCart(c => {
      const e = c.find(x => x.id === item.id);
      if (e) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
    setCartOpen(true);
  };
  const incQty = (id, d) => setCart(c => c.flatMap(x => x.id === id ? (x.qty + d <= 0 ? [] : [{...x, qty: x.qty+d}]) : [x]));
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  // Compose helpers
  const pickStep = (key, opt, multi) => {
    setCompose(c => {
      if (!multi) return { ...c, [key]: opt };
      const cur = c[key] || [];
      if (cur.includes(opt)) return { ...c, [key]: cur.filter(x => x !== opt) };
      if (cur.length >= multi) return c;
      return { ...c, [key]: [...cur, opt] };
    });
  };

  // Reusable styles (unique-named so we don't collide with anything else)
  const isMobile = mode === 'mobile';
  const isDark = ['street', 'neon'].includes(t.palette);

  const css = `
    .ks-root { font-family: ${fonts.body}; color: ${palette.text}; background: ${palette.bg}; line-height: 1.5; }
    .ks-display { font-family: ${fonts.display}; font-weight: ${fonts.displayWeight}; text-transform: ${fonts.displayCase}; letter-spacing: ${fonts.displayTracking}; line-height: 0.95; }
    .ks-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: ${radius.md}px; border: 0; cursor: pointer; font-family: ${fonts.body}; font-weight: 600; font-size: 15px; transition: transform .15s, box-shadow .15s, background .15s; }
    .ks-btn-primary { background: ${palette.primary}; color: ${palette.onPrimary}; }
    .ks-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px ${palette.primary}55; }
    .ks-btn-ghost { background: transparent; color: ${palette.text}; border: 1.5px solid ${palette.text}22; }
    .ks-btn-ghost:hover { background: ${palette.text}08; border-color: ${palette.text}55; }
    .ks-tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; }
    .ks-card { background: ${palette.surface}; border-radius: ${radius.lg}px; overflow: hidden; transition: transform .2s, box-shadow .2s; border: 1px solid ${palette.text}10; }
    .ks-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px ${palette.text}15; }
    .ks-chip { padding: 8px 14px; border-radius: 999px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .15s; border: 1px solid ${palette.text}15; background: transparent; color: ${palette.text}; font-family: inherit; }
    .ks-chip[data-active="true"] { background: ${palette.text}; color: ${palette.bg}; border-color: ${palette.text}; }
    .ks-chip:hover:not([data-active="true"]) { background: ${palette.text}08; }
    .ks-section-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${palette.primary}; margin-bottom: 12px; }
    .ks-link { color: inherit; text-decoration: none; }
    .ks-icon-btn { width: 40px; height: 40px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${palette.text}15; background: ${palette.surface}; cursor: pointer; color: ${palette.text}; position: relative; }
    .ks-grain { background-image: radial-gradient(${palette.text}08 1px, transparent 1px); background-size: 3px 3px; }
    .ks-marquee { display: flex; gap: 40px; animation: ks-scroll 30s linear infinite; }
    @keyframes ks-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .ks-pulse { animation: ks-pulse 2s ease-in-out infinite; }
    @keyframes ks-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  `;

  // Filter menu items
  const allItems = [...MENU.kebabs, ...MENU.burgers, ...MENU.tacos, ...MENU.sides];
  const visibleItems = MENU[activeCat].filter(it => {
    if (filter === 'spicy') return it.tag === 'Épicé' || /harissa|piment|épic/i.test(it.desc);
    if (filter === 'veg') return it.tag === 'Végé' || /falafel|végé/i.test(it.name + it.desc);
    return true;
  });

  // Layout dims
  const HERO_H = isMobile ? 540 : 680;
  const PX = isMobile ? 20 : 64;

  return (
    <div className="ks-root" style={{ minHeight: '100%', position: 'relative' }}>
      <style>{css}</style>

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(16px)',
        background: `${palette.bg}cc`, borderBottom: `1px solid ${palette.text}10`,
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 14 : 18}px ${PX}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              width: 36, height: 36, borderRadius: radius.sm, background: palette.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: palette.onPrimary, fontWeight: 900, fontSize: 18, fontFamily: fonts.display,
              transition: 'opacity .15s',
            }}>{(t.name || 'KS').slice(0,1).toUpperCase()}</div>
            <div>
              <div className="ks-display" style={{ fontSize: isMobile ? 18 : 22, lineHeight: 1 }}>{t.name || 'Kebab Snack'}</div>
              {!isMobile && <div style={{ fontSize: 11, color: palette.muted, marginTop: 2 }}>{t.tagline || 'Le vrai goût, depuis 2008'}</div>}
            </div>
          </a>
          {!isMobile && (
            <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }}>
              {['Menu', 'Composer', 'À propos', 'Contact'].map(l => (
                <a key={l} href={`#${l}`} className="ks-link" style={{ color: palette.text, opacity: 0.85 }}>{l}</a>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {!isMobile && <span style={{ fontSize: 13, color: palette.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{I.clock} Ouvert · jusqu'à 23h</span>}
            <button className="ks-icon-btn" onClick={() => setCartOpen(o => !o)} aria-label="Panier">
              {I.bag}
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 5px',
                  borderRadius: 9, background: palette.primary, color: palette.onPrimary,
                  fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </button>
            {!isMobile && <button className="ks-btn ks-btn-primary" style={{ padding: '10px 16px', fontSize: 14 }}>Commander {I.arrow}</button>}
            {isMobile && <button className="ks-icon-btn">{I.menu}</button>}
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', overflow: 'hidden', background: palette.bg }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: `${isMobile ? 32 : 56}px ${PX}px ${isMobile ? 40 : 80}px`,
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? 32 : 56, alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999,
              background: `${palette.accent}22`, color: palette.accent, fontSize: 12, fontWeight: 600, marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: palette.accent }} className="ks-pulse" />
              Ouvert maintenant · livraison 30 min
            </div>
            <h1 className="ks-display" style={{
              fontSize: isMobile ? 52 : 96, margin: 0,
              color: palette.text,
            }}>
              {t.heroTitle1 || 'Le kebab'}
              <br />
              <span style={{ color: palette.primary }}>{t.heroTitle2 || 'qui fait la diff.'}</span>
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.55, color: palette.muted, marginTop: 24, maxWidth: 480 }}>
              {t.heroSub || 'Viande grillée minute, pain maison cuit sur place, sauces fait-maison. Livraison en 30 min ou à emporter — tu choisis.'}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button className="ks-btn ks-btn-primary" style={{ fontSize: isMobile ? 15 : 16, padding: isMobile ? '14px 22px' : '18px 28px' }}>
                Commander · 30 min {I.arrow}
              </button>
              <button className="ks-btn ks-btn-ghost" style={{ fontSize: isMobile ? 15 : 16, padding: isMobile ? '14px 22px' : '18px 28px' }}
                onClick={() => document.getElementById('Menu') && document.getElementById('Menu').scrollIntoView({ behavior: 'smooth' })}>
                Voir le menu
              </button>
            </div>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 24, borderTop: `1px solid ${palette.text}15` }}>
                {[
                  { v: '4.8', l: 'Note moyenne', sub: <div style={{ display: 'flex', gap: 1, color: palette.accent }}>{[1,2,3,4,5].map(i => <span key={i}>{I.star}</span>)}</div> },
                  { v: '12k+', l: 'Kebabs servis', sub: 'Cette année' },
                  { v: '30min', l: 'Livraison', sub: 'Garanti ou offert' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 28, fontWeight: 800, fontFamily: fonts.display, lineHeight: 1, color: palette.text }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: palette.muted, marginTop: 4 }}>{s.l}</div>
                    <div style={{ fontSize: 11, marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ position: 'relative', height: isMobile ? 280 : HERO_H * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Big circle bg */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%', background: palette.primary, opacity: 0.12,
              transform: 'scale(1.1)',
            }} />
            <div style={{
              position: 'absolute', width: '85%', height: '85%', borderRadius: '50%',
              border: `2px dashed ${palette.primary}40`,
              animation: 'ks-spin 40s linear infinite',
            }} />
            <style>{`@keyframes ks-spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ width: '70%', aspectRatio: '1', borderRadius: radius.xl, overflow: 'hidden', boxShadow: `0 30px 80px ${palette.text}30`, transform: 'rotate(-3deg)' }}>
              {t.photos && t.photos.hero
                ? <img src={t.photos.hero} alt="hero" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                : <KebabArt seed={0} palette={palette} />}
            </div>
            {/* Floating tags */}
            <div style={{
              position: 'absolute', top: '8%', right: isMobile ? '5%' : '0%',
              background: palette.surface, padding: '10px 14px', borderRadius: radius.md,
              boxShadow: `0 12px 30px ${palette.text}20`, fontSize: 12, fontWeight: 600,
              transform: 'rotate(4deg)', display: 'flex', alignItems: 'center', gap: 6,
              color: palette.text,
            }}>
              <span style={{ color: palette.primary }}>{I.flame}</span> Tout chaud, tout frais
            </div>
            <div style={{
              position: 'absolute', bottom: '6%', left: isMobile ? '5%' : '-2%',
              background: palette.surface, padding: '10px 14px', borderRadius: radius.md,
              boxShadow: `0 12px 30px ${palette.text}20`, fontSize: 12, fontWeight: 600,
              transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', gap: 8,
              color: palette.text,
            }}>
              <div style={{ display: 'flex', gap: 1, color: palette.accent }}>{[1,2,3,4,5].map(i => <span key={i}>{I.star}</span>)}</div>
              4.8 · 320 avis
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────── */}
      <div style={{ background: palette.primary, color: palette.onPrimary, padding: '14px 0', overflow: 'hidden', borderTop: `1px solid ${palette.text}10`, borderBottom: `1px solid ${palette.text}10` }}>
        <div className="ks-marquee">
          {[...Array(2)].map((_, k) => (
            <React.Fragment key={k}>
              {(t.marqueeItems && t.marqueeItems.length > 0
                ? t.marqueeItems
                : ['🔥 Menu midi à 9,90€', '★ Livraison 30 min ou offerte', '🌶️ Nouveau · Tacos XXL', '🥙 Halal · 100% maison', '🚀 -10% sur ta 1re commande']
              ).map((s, i) => (
                <div key={`${k}-${i}`} className="ks-display" style={{ fontSize: 22, whiteSpace: 'nowrap' }}>{s}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── MENU ──────────────────────────────────────────────────── */}
      <section id="Menu" style={{ background: palette.bgDeep, padding: `${isMobile ? 56 : 96}px ${PX}px` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 32, flexDirection: isMobile ? 'column' : 'row' }}>
            <div>
              <div className="ks-section-eyebrow">— Notre carte</div>
              <h2 className="ks-display" style={{ fontSize: isMobile ? 40 : 64, margin: 0, color: palette.text }}>Choisis ton kiff.</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{k:'all',l:'Tout'},{k:'spicy',l:'🌶️ Épicé'},{k:'veg',l:'🌱 Végé'}].map(f => (
                <button key={f.k} className="ks-chip" data-active={filter === f.k} onClick={() => setFilter(f.k)}>{f.l}</button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', borderBottom: `1px solid ${palette.text}15`, paddingBottom: 16 }}>
            {Object.keys(MENU).map((k) => {
              const labels = { kebabs: 'Kebabs', burgers: 'Burgers', tacos: 'Tacos', sides: 'Sides' };
              const l = labels[k] || (k[0].toUpperCase() + k.slice(1));
              return (
              <button key={k} onClick={() => setActiveCat(k)} className="ks-chip"
                data-active={activeCat === k}
                style={{ fontSize: 14, fontWeight: 600, padding: '10px 18px' }}>
                {l} <span style={{ opacity: 0.5, marginLeft: 4 }}>· {MENU[k].length}</span>
              </button>
              );
            })}
          </div>

          {/* Items grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {visibleItems.map((it, idx) => (
              <article key={it.id} className="ks-card">
                <div style={{ height: 160, position: 'relative', background: palette.bgDeep }}>
                  {it.image
                    ? <img src={it.image} alt={it.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                    : t.photos && t.photos.menu && t.photos.menu[activeCat]
                      ? <img src={t.photos.menu[activeCat]} alt={it.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                      : <KebabArt seed={idx + (it.id.charCodeAt(1) || 0)} palette={palette} />}
                  {it.tag && (
                    <span className="ks-tag" style={{
                      position: 'absolute', top: 12, left: 12, background: palette.primary, color: palette.onPrimary,
                    }}>
                      {it.tag === 'Épicé' && I.flame}
                      {it.tag === 'Végé' && I.leaf}
                      {it.tag}
                    </span>
                  )}
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <h3 className="ks-display" style={{ margin: 0, fontSize: 22, color: palette.text, letterSpacing: '-0.01em' }}>{it.name}</h3>
                    <div style={{ fontSize: 18, fontWeight: 700, color: palette.primary, fontFamily: fonts.display, whiteSpace: 'nowrap' }}>{eur(it.price)}</div>
                  </div>
                  <p style={{ margin: '6px 0 14px', fontSize: 13, color: palette.muted, lineHeight: 1.5, textWrap: 'pretty' }}>{it.desc}</p>
                  <button className="ks-btn ks-btn-primary" style={{ width: '100%', padding: '11px 16px', fontSize: 14, justifyContent: 'center' }}
                    onClick={() => addToCart(it)}>
                    {I.plus} Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPOSE TON KEBAB ─────────────────────────────────────── */}
      <section id="Composer" style={{ padding: `${isMobile ? 56 : 96}px ${PX}px`, background: palette.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: 40 }}>
            <div className="ks-section-eyebrow">— Sur mesure</div>
            <h2 className="ks-display" style={{ fontSize: isMobile ? 40 : 64, margin: 0, color: palette.text }}>Compose ton kebab.</h2>
            <p style={{ fontSize: 16, color: palette.muted, marginTop: 12, maxWidth: 520, marginLeft: isMobile ? 0 : 'auto', marginRight: isMobile ? 0 : 'auto' }}>
              5 étapes, ton kebab parfait. À partir de <b style={{ color: palette.text }}>7,50 €</b>.
            </p>
          </div>

          <div style={{ background: palette.surface, borderRadius: radius.xl, padding: isMobile ? 24 : 40, border: `1px solid ${palette.text}10`, boxShadow: `0 24px 60px ${palette.text}10` }}>
            {/* Stepper */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
              {COMPOSE_STEPS.map((s, i) => {
                const done = compose[s.key] && (Array.isArray(compose[s.key]) ? compose[s.key].length : true);
                const active = i === composeStep;
                return (
                  <button key={s.key} onClick={() => setComposeStep(i)}
                    style={{
                      flex: 1, minWidth: isMobile ? 'calc(33% - 4px)' : 0, padding: '10px 12px', border: 0, cursor: 'pointer',
                      background: active ? palette.primary : (done ? `${palette.primary}20` : `${palette.text}08`),
                      color: active ? palette.onPrimary : palette.text, borderRadius: radius.sm,
                      fontFamily: 'inherit', fontSize: 12, fontWeight: 600, textAlign: 'left',
                      display: 'flex', flexDirection: 'column', gap: 2,
                    }}>
                    <span style={{ opacity: 0.7, fontSize: 10 }}>Étape {i + 1}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {done && <span style={{ color: active ? palette.onPrimary : palette.primary }}>{I.check}</span>}
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current step */}
            {(() => {
              const step = COMPOSE_STEPS[composeStep];
              const cur = compose[step.key];
              return (
                <div>
                  <h3 className="ks-display" style={{ fontSize: 32, margin: 0, color: palette.text }}>{step.label}</h3>
                  {step.multi && <p style={{ fontSize: 13, color: palette.muted, margin: '4px 0 0' }}>Choisis jusqu'à {step.multi}</p>}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginTop: 20 }}>
                    {step.options.map(opt => {
                      const selected = step.multi ? (cur || []).includes(opt) : cur === opt;
                      return (
                        <button key={opt} onClick={() => pickStep(step.key, opt, step.multi)}
                          style={{
                            padding: '16px 14px', border: `1.5px solid ${selected ? palette.primary : palette.text + '15'}`,
                            background: selected ? `${palette.primary}10` : 'transparent', color: palette.text,
                            borderRadius: radius.md, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                            textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                            transition: 'all .15s',
                          }}>
                          <span>{opt}</span>
                          {selected && <span style={{ color: palette.primary }}>{I.check}</span>}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 10 }}>
                    <button className="ks-btn ks-btn-ghost" onClick={() => setComposeStep(s => Math.max(0, s-1))} disabled={composeStep === 0}
                      style={{ opacity: composeStep === 0 ? 0.4 : 1 }}>
                      ← Précédent
                    </button>
                    {composeStep < COMPOSE_STEPS.length - 1 ? (
                      <button className="ks-btn ks-btn-primary" onClick={() => setComposeStep(s => s+1)}>
                        Étape suivante {I.arrow}
                      </button>
                    ) : (
                      <button className="ks-btn ks-btn-primary" onClick={() => addToCart({ id: 'compose-' + Date.now(), name: 'Kebab perso', price: 9.5 })}>
                        Ajouter au panier · 9,50 €
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── ABOUT / SIGNATURE ────────────────────────────────────── */}
      <section id="À propos" style={{ background: palette.bgDeep, padding: `${isMobile ? 56 : 96}px ${PX}px` }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'center',
        }}>
          <div>
            <div className="ks-section-eyebrow">— Notre histoire</div>
            <h2 className="ks-display" style={{ fontSize: isMobile ? 40 : 64, margin: 0, color: palette.text }}>{t.aboutTitle || 'Une recette, une famille, une obsession.'}</h2>
            <p style={{ fontSize: 16, color: palette.muted, marginTop: 20, lineHeight: 1.6, textWrap: 'pretty' }}>
              {t.aboutText || 'Depuis 2008, on broche notre viande chaque matin, on pétrit notre pain à la main et on fait nos sauces sur place. Pas de surgelé, pas de raccourci. Juste le vrai goût du kebab, comme à la maison.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }}>
              {(t.aboutBadges || [
                { k: 'Halal', v: 'Certifié AVS' },
                { k: 'Maison', v: 'Pain & sauces' },
                { k: 'Frais', v: 'Livré chaque matin' },
                { k: '0 surgelé', v: 'Tout cuisiné minute' },
              ]).map((b, i) => (
                <div key={i} style={{ padding: 16, background: palette.surface, borderRadius: radius.md, border: `1px solid ${palette.text}10` }}>
                  <div className="ks-display" style={{ fontSize: 22, color: palette.primary }}>{b.k}</div>
                  <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>{b.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            position: 'relative',
            display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12,
            height: isMobile ? 320 : 460,
          }}>
            <div style={{ gridRow: '1 / 3', borderRadius: radius.lg, overflow: 'hidden', background: palette.primary, position: 'relative' }}>
              {t.photos && t.photos.about && t.photos.about[0]
                ? <img src={t.photos.about[0]} alt="about" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                : <KebabArt seed={1} palette={palette} />}
            </div>
            <div style={{ borderRadius: radius.lg, overflow: 'hidden', background: palette.accent, position: 'relative' }}>
              {t.photos && t.photos.about && t.photos.about[1]
                ? <img src={t.photos.about[1]} alt="about" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                : <KebabArt seed={2} palette={palette} />}
            </div>
            <div style={{ borderRadius: radius.lg, overflow: 'hidden', background: palette.bgDeep, position: 'relative' }}>
              {t.photos && t.photos.about && t.photos.about[2]
                ? <img src={t.photos.about[2]} alt="about" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                : <KebabArt seed={3} palette={palette} />}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────── */}
      <section style={{ padding: `${isMobile ? 56 : 96}px ${PX}px`, background: palette.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="ks-section-eyebrow">— Ils en parlent</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <h2 className="ks-display" style={{ fontSize: isMobile ? 40 : 64, margin: 0, color: palette.text }}>
              {t.reviewsTitle || '4.8 sur 320 avis.'}
            </h2>
            {t.googlePlaceId && (
              <a href={`https://search.google.com/local/reviews?placeid=${t.googlePlaceId}`} target="_blank"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                  background: '#fff', border: '1px solid rgba(0,0,0,.1)', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Voir tous les avis Google
              </a>
            )}
          </div>

          {/* Widget Google si Place ID configuré */}
          {t.googlePlaceId ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {(t.reviews && t.reviews.length > 0 ? t.reviews : [
                { n: 'Chargement…', d: 'Google', t: 'Avis en cours de chargement.', s: 5 }
              ]).map((r, i) => (
                <ReviewCard key={i} r={r} palette={palette} fonts={fonts} radius={radius} I={I} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {(t.reviews && t.reviews.length > 0 ? t.reviews : [
                { n: 'Marwan', d: '@marwan_eats', t: 'Le kebab du quartier. Vraiment. Le pain est cuit minute, ça change tout.', s: 5 },
                { n: 'Léa', d: 'Cliente régulière', t: 'La sauce algérienne maison vaut le détour. Et la livraison en 25 min, top.', s: 5 },
                { n: 'Karim', d: 'Avis Google', t: "11€ l'assiette XL, copieux et bien servi. Mes potes en redemandent.", s: 4 },
              ]).map((r, i) => (
                <ReviewCard key={i} r={r} palette={palette} fonts={fonts} radius={radius} I={I} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTACT / FOOTER ─────────────────────────────────────── */}
      <section id="Contact" style={{ background: palette.text, color: palette.bg, padding: `${isMobile ? 56 : 96}px ${PX}px` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr 0.8fr', gap: isMobile ? 32 : 48 }}>
          <div>
            <div className="ks-display" style={{ fontSize: isMobile ? 36 : 56, margin: 0, color: palette.bg, lineHeight: 1 }}>
              {t.name || 'Kebab Snack'}
            </div>
            <p style={{ fontSize: 15, opacity: 0.7, marginTop: 14, maxWidth: 360, lineHeight: 1.55 }}>
              {t.tagline || 'Le vrai goût, depuis 2008'}. Une bouchée et tu comprends.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {(t.socialLinks && t.socialLinks.length > 0
                ? t.socialLinks
                : [{ label: 'IG', url: '' }, { label: 'TT', url: '' }, { label: 'FB', url: '' }]
              ).filter(s => s.label).map((s, i) => (
                s.url
                  ? <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${palette.bg}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, opacity: 0.8, color: palette.bg, textDecoration: 'none' }}>{s.label}</a>
                  : <div key={i} style={{ width: 36, height: 36, borderRadius: 999, border: `1px solid ${palette.bg}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, opacity: 0.8 }}>{s.label}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Adresse</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{ opacity: 0.7, marginTop: 2 }}>{I.pin}</span>
              <div style={{ fontSize: 14, lineHeight: 1.55 }}>{t.address || '12 rue des Halles\n75001 Paris'}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ opacity: 0.7 }}>{I.phone}</span>
              <div style={{ fontSize: 14 }}>{t.phone || '01 23 45 67 89'}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Horaires</div>
            {[
              ['Lun – Jeu', '11:30 – 22:30'],
              ['Ven – Sam', '11:30 – 00:00'],
              ['Dim',       '12:00 – 22:00'],
            ].map(([d, h]) => (
              <div key={d} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: `1px solid ${palette.bg}15` }}>
                <span style={{ opacity: 0.7 }}>{d}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: '48px auto 0', paddingTop: 24, borderTop: `1px solid ${palette.bg}15`, fontSize: 12, opacity: 0.5, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 {t.name || 'Kebab Snack'}</span>
          <span>Made with 🔥 in {(t.address || 'Paris').split('\n').pop()}</span>
        </div>
      </section>

      {/* ── CART DRAWER ─────────────────────────────────────────── */}
      {cartOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', pointerEvents: 'auto' }} onClick={() => setCartOpen(false)} />
          <aside style={{
            position: 'relative', pointerEvents: 'auto',
            width: isMobile ? '100%' : 380, background: palette.surface, color: palette.text,
            display: 'flex', flexDirection: 'column', boxShadow: `-20px 0 60px rgba(0,0,0,0.3)`,
            position: 'sticky', top: 0, height: '100vh', maxHeight: '100%',
          }}>
            <div style={{ padding: 20, borderBottom: `1px solid ${palette.text}10`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="ks-display" style={{ fontSize: 22 }}>Ton panier</div>
                <div style={{ fontSize: 12, color: palette.muted }}>{cartCount} article{cartCount > 1 ? 's' : ''}</div>
              </div>
              <button className="ks-icon-btn" onClick={() => setCartOpen(false)}>{I.x}</button>
            </div>
            <div style={{ padding: 20, display: 'flex', gap: 6, borderBottom: `1px solid ${palette.text}10` }}>
              {['livraison', 'sur place'].map(m => (
                <button key={m} className="ks-chip" data-active={modeOrder === m} onClick={() => setModeOrder(m)} style={{ flex: 1, textTransform: 'capitalize' }}>{m}</button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: palette.muted, fontSize: 14 }}>
                  Ton panier est vide.<br/>
                  <span style={{ fontSize: 32, display: 'block', marginTop: 16 }}>🥙</span>
                </div>
              ) : cart.map(it => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${palette.text}08` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{it.name}</div>
                    <div style={{ fontSize: 12, color: palette.muted, marginTop: 2 }}>{eur(it.price)} l'unité</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="ks-icon-btn" style={{ width: 28, height: 28 }} onClick={() => incQty(it.id, -1)}>{I.minus}</button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{it.qty}</span>
                    <button className="ks-icon-btn" style={{ width: 28, height: 28 }} onClick={() => incQty(it.id, 1)}>{I.plus}</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 20, borderTop: `1px solid ${palette.text}10`, background: palette.bgDeep }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: palette.muted }}>Sous-total</span>
                <span>{eur(cartTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 12 }}>
                <span style={{ color: palette.muted }}>{modeOrder === 'livraison' ? 'Livraison' : 'À emporter'}</span>
                <span>{modeOrder === 'livraison' ? '2,50 €' : 'Gratuit'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, paddingTop: 12, borderTop: `1px solid ${palette.text}15` }}>
                <span>Total</span>
                <span style={{ color: palette.primary, fontFamily: fonts.display }}>{eur(cartTotal + (modeOrder === 'livraison' && cart.length ? 2.5 : 0))}</span>
              </div>
              <button className="ks-btn ks-btn-primary" style={{ width: '100%', marginTop: 16, justifyContent: 'center', padding: '16px 22px' }} disabled={cart.length === 0}>
                Commander {I.arrow}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

window.SnackSite = SnackSite;
