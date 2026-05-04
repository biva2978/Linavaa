// screens-secondary.jsx — Journal, Delivery, Crisis, Directory, Learn, Onboarding

const { useState: useState2, useEffect: useEffect2 } = React;

// ─────── Journal Screen with PIN ───────
function JournalScreen({ navigate, journal, setJournal, journalUnlocked, setJournalUnlocked }) {
  const [pin, setPin] = useState2('');
  const correctPin = '1234';
  const [composing, setComposing] = useState2(false);
  const [draft, setDraft] = useState2('');
  const [shake, setShake] = useState2(false);

  if (!journalUnlocked) {
    function press(n) {
      if (pin.length >= 4) return;
      const next = pin + n;
      setPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          if (next === correctPin) {
            setJournalUnlocked(true);
            setPin('');
          } else {
            setShake(true);
            setTimeout(() => { setShake(false); setPin(''); }, 500);
          }
        }, 150);
      }
    }
    return (
      <div className="scroll-area" style={{ paddingTop: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '60px 22px 30px' }}>
          <button className="btn btn-ghost" style={{ padding: 6, alignSelf: 'flex-start' }} onClick={() => navigate('home')}>
            <IconArrowL size={20} sw={2}/>
          </button>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                         transform: shake ? 'translateX(-4px)' : '', transition: 'transform 0.06s' }}>
            <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--terra-200)',
                           display: 'grid', placeItems: 'center', marginBottom: 18 }}>
              <IconLock size={26} stroke="var(--terra-700)" sw={1.8}/>
            </div>
            <div className="serif" style={{ fontSize: 26, marginBottom: 4 }}>Journal</div>
            <div className="muted" style={{ fontSize: 14, marginBottom: 28, textAlign: 'center', maxWidth: 240 }}>
              Enter your PIN to unlock. Hint: <span className="kbd">1234</span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
              {[0,1,2,3].map(i => (
                <div key={i} className={'pin-dot ' + (i < pin.length ? 'filled' : '')}/>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: 14 }}>
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} className="pin-key" onClick={() => press(String(n))}>{n}</button>
              ))}
              <div/>
              <button className="pin-key" onClick={() => press('0')}>0</button>
              <button className="pin-key" onClick={() => setPin(p => p.slice(0, -1))}
                      style={{ background: 'transparent', border: 'none', boxShadow: 'none', fontSize: 14, color: 'var(--ink-500)' }}>
                <IconArrowL size={18} sw={2}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (composing) {
    return (
      <div className="scroll-area">
        <div style={{ padding: '4px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 16 }}>
            <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => { setComposing(false); setDraft(''); }}>
              <IconX size={20} sw={2}/>
            </button>
            <div className="eyebrow">NEW ENTRY</div>
            <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 13, color: 'var(--terra-600)', fontWeight: 600 }}
                    onClick={() => {
                      if (draft.trim()) {
                        setJournal([{ id: 'j' + Date.now(), date: 'Today', preview: draft.slice(0, 70) + (draft.length > 70 ? '…' : ''), mood: '🙂' }, ...journal]);
                      }
                      setDraft(''); setComposing(false);
                    }}>Save</button>
          </div>
          <div className="serif" style={{ fontSize: 22, marginBottom: 12, color: 'var(--ink-500)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <textarea autoFocus
            placeholder="What's going through your head today?"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            style={{
              width: '100%', minHeight: 360, border: 'none', outline: 'none',
              background: 'transparent', fontFamily: 'Newsreader, serif', fontSize: 18,
              color: 'var(--ink-900)', resize: 'none', lineHeight: 1.5,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}>
            <IconArrowL size={20} sw={2}/>
          </button>
          <div className="serif" style={{ fontSize: 22 }}>Journal</div>
          <button className="btn btn-ghost" style={{ padding: 6, color: 'var(--terra-600)' }} onClick={() => setJournalUnlocked(false)}>
            <IconLock size={18} sw={1.8}/>
          </button>
        </div>

        <div className="card-tinted" style={{ marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: 'white',
                         display: 'grid', placeItems: 'center' }}>
            <IconShield size={18} stroke="var(--terra-600)" sw={1.8}/>
          </div>
          <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.4, color: 'var(--ink-700)' }}>
            <strong style={{ color: 'var(--ink-900)' }}>Encrypted on this device.</strong> Nobody — not even us — can read this.
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={() => setComposing(true)} style={{ marginBottom: 18 }}>
          <IconPlus size={18} sw={2}/> Write today's entry
        </button>

        <div className="eyebrow" style={{ marginBottom: 10 }}>RECENT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {journal.map(j => (
            <div key={j.id} className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <div className="eyebrow" style={{ fontSize: 10 }}>{j.date.toUpperCase()}</div>
                <span style={{ fontSize: 16 }}>{j.mood}</span>
              </div>
              <div className="serif" style={{ fontSize: 15, lineHeight: 1.4, color: 'var(--ink-900)' }}>{j.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────── Discreet Pad Delivery ───────
function DeliveryScreen({ navigate }) {
  const [step, setStep] = useState2(0);
  const [selected, setSelected] = useState2({ 'pad-r': 2 });
  const [area, setArea] = useState2('Dhanmondi');
  const [discreet, setDiscreet] = useState2(true);
  const [contactMethod, setContactMethod] = useState2('whatsapp');

  const total = Object.entries(selected).reduce((sum, [k, qty]) => {
    const p = PRODUCT_TYPES.find(p => p.key === k);
    if (!p) return sum;
    return sum + parseInt(p.price.replace(/[^0-9]/g, '')) * qty;
  }, 0);
  const itemCount = Object.values(selected).reduce((a, b) => a + b, 0);

  if (step === 1) {
    return (
      <div className="scroll-area">
        <div style={{ padding: '4px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 16 }}>
            <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setStep(0)}><IconArrowL size={20} sw={2}/></button>
            <div className="eyebrow">STEP 2 OF 2</div>
            <div style={{ width: 32 }}/>
          </div>
          <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 22 }}>
            Confirm <em style={{ color: 'var(--terra-600)' }}>discreetly</em>.
          </div>

          <div className="label" style={{ marginBottom: 8, fontSize: 13, fontWeight: 600 }}>Delivery area</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {['Dhanmondi','Gulshan','Banani','Uttara','Mirpur','Mohammadpur'].map(a => (
              <button key={a} className={'chip ' + (area === a ? 'active' : '')} onClick={() => setArea(a)}>{a}</button>
            ))}
          </div>

          <div className="label" style={{ marginBottom: 8, fontSize: 13, fontWeight: 600 }}>How should we confirm?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            {[
              { k: 'whatsapp', l: 'WhatsApp', s: 'Quietest option' },
              { k: 'sms',      l: 'SMS',       s: 'Just a text' },
            ].map(o => (
              <button key={o.k} className="card" onClick={() => setContactMethod(o.k)}
                      style={{ textAlign: 'left', cursor: 'pointer',
                                border: '1.5px solid ' + (contactMethod === o.k ? 'var(--terra-500)' : 'var(--line)'),
                                background: contactMethod === o.k ? 'var(--terra-100)' : 'white' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.l}</div>
                <div className="muted" style={{ fontSize: 11.5 }}>{o.s}</div>
              </button>
            ))}
          </div>

          <div className="card-tinted" style={{ marginBottom: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'white',
                           display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <IconShield size={18} stroke="var(--terra-600)" sw={1.8}/>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--ink-700)' }}>
              Plain brown packaging. No labels. Delivered by a verified woman partner where possible. The package looks like books.
            </div>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>YOUR ORDER</div>
            {Object.entries(selected).map(([k, qty]) => {
              const p = PRODUCT_TYPES.find(p => p.key === k);
              if (!p) return null;
              return (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
                  <div>{p.label} × {qty}</div>
                  <div className="mono" style={{ fontSize: 13 }}>৳ {parseInt(p.price.replace(/[^0-9]/g, '')) * qty}</div>
                </div>
              );
            })}
            <div className="divider"/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}>
              <div>Total</div>
              <div className="mono">৳ {total}</div>
            </div>
          </div>

          <button className="btn btn-primary btn-block" onClick={() => setStep(2)}>
            <IconCheck size={18} sw={2}/> Confirm order
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="scroll-area">
        <div style={{ padding: '60px 22px 30px', display: 'flex', flexDirection: 'column',
                       alignItems: 'center', textAlign: 'center', height: '100%' }}>
          <div style={{ width: 88, height: 88, borderRadius: 999, background: 'var(--terra-200)',
                         display: 'grid', placeItems: 'center', marginBottom: 22 }}>
            <IconCheck size={42} stroke="var(--terra-700)" sw={1.8}/>
          </div>
          <div className="serif" style={{ fontSize: 28, marginBottom: 8 }}>Order placed.</div>
          <div className="muted" style={{ fontSize: 15, marginBottom: 28, maxWidth: 280 }}>
            We'll {contactMethod === 'whatsapp' ? 'WhatsApp' : 'text'} you within 30 minutes to confirm. Expected delivery: today, 4–6 PM.
          </div>
          <div className="card" style={{ width: '100%', textAlign: 'left', marginBottom: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 6 }}>ORDER #SHK-2841</div>
            <div style={{ fontSize: 14 }}>{itemCount} item{itemCount > 1 ? 's' : ''} · ৳ {total}</div>
            <div className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>Discreet packaging · {area}</div>
          </div>
          <button className="btn btn-soft btn-block" onClick={() => navigate('home')}>Back home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 16 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}><IconArrowL size={20} sw={2}/></button>
          <div className="eyebrow">STEP 1 OF 2</div>
          <div style={{ width: 32 }}/>
        </div>
        <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, marginBottom: 6 }}>
          Pads, delivered <em style={{ color: 'var(--terra-600)' }}>quietly</em>.
        </div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 22 }}>
          Plain packaging. No name on the bag. Delivered to your door.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
          {PRODUCT_TYPES.map(p => {
            const qty = selected[p.key] || 0;
            return (
              <div key={p.key} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12,
                               background: 'var(--terra-100)',
                               backgroundImage: 'repeating-linear-gradient(45deg, oklch(0.93 0.03 45) 0, oklch(0.93 0.03 45) 1px, transparent 1px, transparent 6px)',
                               flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div>
                  <div className="muted" style={{ fontSize: 11.5 }}>{p.brand} · {p.price}</div>
                </div>
                {qty === 0 ? (
                  <button className="chip active-soft" onClick={() => setSelected(s => ({ ...s, [p.key]: 1 }))}>
                    <IconPlus size={14} sw={2.2}/> Add
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                                 background: 'var(--terra-100)', borderRadius: 999, padding: '4px 6px' }}>
                    <button className="pin-key" style={{ width: 28, height: 28, fontSize: 16, boxShadow: 'none' }}
                            onClick={() => setSelected(s => { const n = { ...s }; if (qty <= 1) delete n[p.key]; else n[p.key] = qty - 1; return n; })}>−</button>
                    <div style={{ minWidth: 14, textAlign: 'center', fontWeight: 600, fontSize: 14 }}>{qty}</div>
                    <button className="pin-key" style={{ width: 28, height: 28, fontSize: 16, boxShadow: 'none' }}
                            onClick={() => setSelected(s => ({ ...s, [p.key]: qty + 1 }))}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn btn-primary btn-block"
                disabled={itemCount === 0}
                onClick={() => setStep(1)}
                style={{ opacity: itemCount === 0 ? 0.5 : 1 }}>
          Continue · {itemCount} item{itemCount !== 1 ? 's' : ''} · ৳ {total}
        </button>
      </div>
    </div>
  );
}

// ─────── Crisis Mode ───────
function CrisisScreen({ navigate }) {
  const steps = [
    { icon: <IconFlame size={22} stroke="oklch(0.55 0.16 25)" sw={1.8}/>, title: 'Apply heat', desc: 'A heating pad or warm water bottle on your lower belly. 15–20 minutes.' },
    { icon: <IconWater size={22} stroke="oklch(0.55 0.12 240)" sw={1.8}/>, title: 'Drink warm water', desc: 'A full glass, slowly. Add ginger or lemon if you have it.' },
    { icon: <IconLeaf size={22} stroke="oklch(0.50 0.10 145)" sw={1.8}/>, title: "Curl into child's pose", desc: 'On the floor, knees apart, forehead down. Breathe slowly for 2 minutes.' },
    { icon: <IconPill size={22} stroke="var(--terra-600)" sw={1.8}/>, title: 'Take pain relief if needed', desc: "Ibuprofen 400mg with food. Don't skip the food part." },
  ];

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}><IconX size={20} sw={2}/></button>
          <div className="eyebrow" style={{ color: 'oklch(0.55 0.16 25)' }}>CRISIS MODE</div>
          <div style={{ width: 32 }}/>
        </div>
        <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 6 }}>
          You're <em style={{ color: 'oklch(0.55 0.16 25)' }}>okay</em>. Let's ease this.
        </div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 22 }}>
          Try these in order. One at a time.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ padding: 16, display: 'flex', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999,
                             background: 'oklch(0.97 0.025 25)',
                             display: 'grid', placeItems: 'center', flexShrink: 0,
                             border: '1px solid oklch(0.86 0.05 25)' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div className="serif" style={{ fontSize: 13, color: 'oklch(0.55 0.16 25)' }}>{i+1}</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{s.title}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ background: 'oklch(0.97 0.025 25)', border: '1px solid oklch(0.80 0.10 25)',
                                        marginBottom: 14 }}>
          <div className="eyebrow" style={{ color: 'oklch(0.55 0.16 25)', marginBottom: 8 }}>WHEN TO SEE A DOCTOR</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 13, lineHeight: 1.5, color: 'var(--ink-700)' }}>
            <li style={{ marginBottom: 6 }}>• Pain that doesn't improve after 2 hours</li>
            <li style={{ marginBottom: 6 }}>• Bleeding through a pad every hour</li>
            <li style={{ marginBottom: 6 }}>• Fever above 38°C alongside cramps</li>
            <li>• Pain so severe you can't stand</li>
          </ul>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button className="btn btn-soft" onClick={() => navigate('directory')}>
            <IconPhone size={16} sw={1.8}/> Find a doctor
          </button>
          <button className="btn btn-soft" onClick={() => navigate('delivery')}>
            <IconBag size={16} sw={1.8}/> Order pads
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────── Provider Directory ───────
function DirectoryScreen({ navigate }) {
  const [filter, setFilter] = useState2('All');
  const [q, setQ] = useState2('');
  const filtered = PROVIDERS.filter(p =>
    (filter === 'All' || p.spec.toLowerCase().includes(filter.toLowerCase())) &&
    (q === '' || p.name.toLowerCase().includes(q.toLowerCase()) || p.area.toLowerCase().includes(q.toLowerCase()))
  );
  const filters = ['All', 'Gynecologist', 'Psychologist', 'Fertility', 'Pharmacy'];

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}><IconArrowL size={20} sw={2}/></button>
          <div className="serif" style={{ fontSize: 22 }}>Care</div>
          <div style={{ width: 32 }}/>
        </div>
        <div className="serif" style={{ fontSize: 22, marginBottom: 4 }}>
          Women-friendly <em style={{ color: 'var(--terra-600)' }}>care</em>, near you.
        </div>
        <div className="muted" style={{ fontSize: 13, marginBottom: 18 }}>
          Vetted by other women in our community.
        </div>

        <div style={{ position: 'relative', marginBottom: 14 }}>
          <IconSearch size={16} stroke="var(--ink-500)" sw={1.8}
                      style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name or area"
                 style={{ width: '100%', padding: '12px 14px 12px 38px', borderRadius: 12,
                          border: '1px solid var(--line)', background: 'white', fontSize: 14,
                          outline: 'none', fontFamily: 'inherit' }}/>
        </div>

        <div style={{ display: 'flex', gap: 6, marginInline: -22, padding: '0 22px 12px',
                       overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button key={f} className={'chip ' + (filter === f ? 'active' : '')}
                    style={{ flexShrink: 0 }} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(p => (
            <div key={p.id} className="card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 999,
                             background: 'var(--terra-200)',
                             display: 'grid', placeItems: 'center', flexShrink: 0,
                             fontFamily: 'Newsreader', fontSize: 18, color: 'var(--terra-700)' }}>
                {p.name.replace('Dr. ', '')[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                  {p.spec} · {p.area} · {p.fee}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <IconStar size={12} fill="var(--terra-500)" stroke="var(--terra-500)" sw={1.5}/>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>{p.rating}</span>
                  {p.women && <span className="chip" style={{ padding: '2px 8px', fontSize: 10, background: 'var(--terra-100)',
                                                                color: 'var(--terra-700)', borderColor: 'var(--terra-300)', marginLeft: 6 }}>
                    Women-friendly
                  </span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────── Learn / Educational Content ───────
function LearnScreen({ navigate }) {
  const [cat, setCat] = useState2('All');
  const filtered = cat === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === cat);

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}><IconArrowL size={20} sw={2}/></button>
          <div className="serif" style={{ fontSize: 22 }}>Learn</div>
          <div style={{ width: 32 }}/>
        </div>

        <div style={{ display: 'flex', gap: 6, marginInline: -22, padding: '0 22px 14px',
                       overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button key={c} className={'chip ' + (cat === c ? 'active' : '')}
                    style={{ flexShrink: 0 }} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {/* featured video */}
        <div className="eyebrow" style={{ marginBottom: 10 }}>WATCH</div>
        <div style={{ display: 'flex', gap: 10, marginInline: -22, padding: '0 22px 4px',
                       overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 18 }}>
          {VIDEOS.map(v => (
            <div key={v.id} style={{
              flexShrink: 0, width: 220, borderRadius: 16, overflow: 'hidden',
              background: 'var(--terra-300)', position: 'relative', cursor: 'pointer',
              boxShadow: 'var(--shadow-1)',
            }}>
              <div style={{
                height: 124,
                backgroundImage: 'repeating-linear-gradient(135deg, oklch(0.82 0.05 35) 0, oklch(0.82 0.05 35) 2px, oklch(0.85 0.04 35) 2px, oklch(0.85 0.04 35) 16px)',
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: 'rgba(255,255,255,0.95)',
                                 display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-2)' }}>
                    <IconPlay size={20} stroke="var(--terra-600)"/>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '2px 8px',
                              borderRadius: 6, background: 'rgba(0,0,0,0.6)', color: 'white',
                              fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>{v.dur}</div>
              </div>
              <div style={{ padding: '10px 12px 12px', background: 'white' }}>
                <div className="eyebrow" style={{ fontSize: 9.5 }}>{v.cat.toUpperCase()}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, lineHeight: 1.3 }}>{v.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="eyebrow" style={{ marginBottom: 10 }}>READ</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {filtered.map(a => <ArticleCard key={a.id} article={a} compact />)}
        </div>
      </div>
    </div>
  );
}

// ─────── Onboarding ───────
function OnboardingScreen({ onDone }) {
  const [step, setStep] = useState2(0);

  const steps = [
    {
      title: <>Hi, I'm <em style={{ color: 'var(--terra-600)' }}>Shokhii</em>.</>,
      desc: 'Bangla for "girlfriend". A best-friend for your cycle, your body, your moods — and your privacy.',
      cta: 'Get started',
      art: <OnboardArt1/>,
    },
    {
      title: <>Track everything. Share <em style={{ color: 'var(--terra-600)' }}>nothing</em>.</>,
      desc: 'Encrypted on your device. No login required. Hidden mode if your phone gets shared.',
      cta: 'Continue',
      art: <OnboardArt2/>,
    },
    {
      title: <>When did your <em style={{ color: 'var(--terra-600)' }}>last period</em> start?</>,
      desc: 'A rough idea is enough. We learn from there.',
      cta: 'Save & continue',
      art: <OnboardArt3/>,
    },
  ];
  const s = steps[step];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
                   background: step === 0 ? 'var(--terra-100)' : 'var(--cream)',
                   transition: 'background 0.3s' }}>
      <div style={{ padding: '60px 22px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 24 : 8, height: 4, borderRadius: 999,
                background: i <= step ? 'var(--terra-500)' : 'var(--terra-300)',
                transition: 'all 0.3s',
              }}/>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 13, color: 'var(--ink-500)' }}
                  onClick={onDone}>Skip</button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}>{s.art}</div>
          <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginBottom: 14 }}>{s.title}</div>
          <div style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-700)' }}>{s.desc}</div>
        </div>
      </div>
      <div style={{ padding: '14px 22px 30px' }}>
        <button className="btn btn-primary btn-block" onClick={() => step === steps.length - 1 ? onDone() : setStep(step + 1)}>
          {s.cta} <IconArrowR size={18} sw={2}/>
        </button>
      </div>
    </div>
  );
}

function OnboardArt1() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 35)"/>
          <stop offset="100%" stopColor="oklch(0.85 0.08 35)"/>
        </radialGradient>
      </defs>
      <circle cx="90" cy="90" r="78" fill="url(#g1)"/>
      <circle cx="90" cy="90" r="56" fill="none" stroke="oklch(0.65 0.13 40)" strokeWidth="1.5" strokeDasharray="2 6"/>
      <circle cx="90" cy="34" r="10" fill="oklch(0.65 0.13 40)"/>
      <text x="90" y="98" textAnchor="middle" fontFamily="Newsreader, serif" fontSize="44" fill="oklch(0.45 0.10 38)">শ</text>
    </svg>
  );
}
function OnboardArt2() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160">
      <rect x="40" y="30" width="100" height="110" rx="14" fill="white" stroke="oklch(0.85 0.04 60)" strokeWidth="1.5"/>
      <rect x="55" y="65" width="70" height="50" rx="6" fill="oklch(0.95 0.03 35)"/>
      <path d="M75 65 v-12 a15 15 0 0 1 30 0 v12" fill="none" stroke="oklch(0.65 0.13 40)" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="90" cy="92" r="5" fill="oklch(0.65 0.13 40)"/>
      <line x1="90" y1="92" x2="90" y2="102" stroke="oklch(0.65 0.13 40)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
function OnboardArt3() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160">
      <rect x="20" y="20" width="160" height="120" rx="14" fill="white" stroke="oklch(0.85 0.04 60)" strokeWidth="1.5"/>
      {Array.from({length: 7}).map((_, i) => (
        <line key={i} x1={20 + (i+1)*20} y1="44" x2={20 + (i+1)*20} y2="140" stroke="oklch(0.93 0.012 60)"/>
      ))}
      {Array.from({length: 4}).map((_, i) => (
        <line key={i} x1="20" y1={44 + (i+1)*22} x2="180" y2={44 + (i+1)*22} stroke="oklch(0.93 0.012 60)"/>
      ))}
      <rect x="42" y="66" width="20" height="20" rx="4" fill="oklch(0.65 0.15 25)"/>
      <rect x="62" y="66" width="20" height="20" rx="4" fill="oklch(0.65 0.15 25)"/>
      <rect x="82" y="66" width="20" height="20" rx="4" fill="oklch(0.65 0.15 25)"/>
      <rect x="102" y="66" width="20" height="20" rx="4" fill="oklch(0.78 0.10 25)"/>
      <rect x="20" y="20" width="160" height="20" rx="14" fill="oklch(0.65 0.13 40)"/>
      <text x="100" y="34" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="white">April 2026</text>
    </svg>
  );
}

Object.assign(window, { JournalScreen, DeliveryScreen, CrisisScreen, DirectoryScreen, LearnScreen, OnboardingScreen });
