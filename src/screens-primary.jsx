// screens-primary.jsx — Home, Tracker, Log, Insights

const { useState, useMemo, useEffect, useRef } = React;

// ─────── Daily Tip Card ───────
function DailyTipCard({ day, onOpen }) {
  const phase = phaseFor(day);
  const meta = PHASE_META[phase];
  const tip = DAILY_TIPS[phase][day % DAILY_TIPS[phase].length];
  return (
    <div className="card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start',
                                    background: meta.soft, border: '1px solid ' + meta.color + '20' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999, background: 'white',
        display: 'grid', placeItems: 'center', flexShrink: 0,
        border: '1px solid ' + meta.color + '30',
      }}>
        <IconLeaf size={18} stroke={meta.color} sw={1.8}/>
      </div>
      <div style={{ flex: 1 }}>
        <div className="eyebrow" style={{ color: meta.color, marginBottom: 6 }}>TODAY'S TIP</div>
        <div style={{ fontSize: 14, lineHeight: 1.4, color: 'var(--ink-900)', fontWeight: 500 }}>{tip}</div>
      </div>
    </div>
  );
}

// ─────── Home Screen ───────
function HomeScreen({ day, setDay, navigate, name = 'Ayesha' }) {
  const phase = phaseFor(day);
  const meta = PHASE_META[phase];
  const greet = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        {/* greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, marginBottom: 22 }}>
          <div>
            <div className="muted" style={{ fontSize: 13 }}>{greet},</div>
            <div className="serif" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 2 }}>
              <em style={{ color: 'var(--terra-600)', fontStyle: 'italic' }}>{name}</em>
            </div>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: 999, background: 'var(--terra-200)',
            display: 'grid', placeItems: 'center', fontFamily: 'Newsreader, serif',
            fontSize: 18, color: 'var(--terra-700)', fontWeight: 500,
          }}>{name[0]}</div>
        </div>

        {/* dial */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <CycleDial day={day} onTap={() => navigate('tracker')} />
        </div>

        {/* phase summary */}
        <div className="card-tinted" style={{ marginBottom: 14, background: meta.soft, border: '1px solid ' + meta.color + '25' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div className="eyebrow" style={{ color: meta.color }}>{meta.label.toUpperCase()} PHASE</div>
            <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 12, color: meta.color }}
                    onClick={() => navigate('tracker')}>
              See cycle <IconChevronR size={14} sw={2}/>
            </button>
          </div>
          <div className="serif" style={{ fontSize: 19, lineHeight: 1.3, color: 'var(--ink-900)' }}>{meta.desc}</div>
        </div>

        {/* daily tip */}
        <div style={{ marginBottom: 14 }}>
          <DailyTipCard day={day} />
        </div>

        {/* quick actions */}
        <div className="eyebrow" style={{ marginTop: 18, marginBottom: 10 }}>QUICK ACTIONS</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <QuickTile icon={<IconDrop size={20} stroke="var(--terra-600)" sw={1.8}/>} label="Log period" sub="Start or end" onClick={() => navigate('log')} />
          <QuickTile icon={<IconHeart size={20} stroke="var(--plum)" sw={1.8}/>} label="How I feel" sub="Mood & symptoms" onClick={() => navigate('log')} />
          <QuickTile icon={<IconJournal size={20} stroke="var(--terra-600)" sw={1.8}/>} label="Journal" sub="Lock + private" onClick={() => navigate('journal')} />
          <QuickTile icon={<IconBag size={20} stroke="var(--terra-600)" sw={1.8}/>} label="Pads delivered" sub="Discreet" onClick={() => navigate('delivery')} />
        </div>

        {/* crisis card */}
        <div className="card" style={{ background: 'oklch(0.97 0.025 25)', border: '1px solid oklch(0.86 0.05 25)',
                                        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, cursor: 'pointer' }}
             onClick={() => navigate('crisis')}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: 'oklch(0.94 0.06 25)',
                        display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <IconAlert size={22} stroke="oklch(0.55 0.16 25)" sw={1.8}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>In pain right now?</div>
            <div className="muted" style={{ fontSize: 12 }}>Crisis Mode — 1-tap relief steps</div>
          </div>
          <IconChevronR size={18} stroke="var(--ink-500)" sw={2}/>
        </div>

        {/* learn preview */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, marginBottom: 10 }}>
          <div className="eyebrow">FOR YOU</div>
          <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12, color: 'var(--terra-600)' }}
                  onClick={() => navigate('learn')}>See all</button>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginInline: -22, padding: '2px 22px 6px',
                      scrollbarWidth: 'none' }}>
          {ARTICLES.slice(0, 4).map(a => <ArticleCard key={a.id} article={a} compact />)}
        </div>
      </div>
    </div>
  );
}

function QuickTile({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'white', border: '1px solid var(--line)', borderRadius: 18,
      padding: '14px 14px', textAlign: 'left', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'inherit',
      boxShadow: 'var(--shadow-1)', transition: 'transform 0.12s',
    }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
       onMouseUp={e => e.currentTarget.style.transform = ''}
       onMouseLeave={e => e.currentTarget.style.transform = ''}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--terra-100)',
                     display: 'grid', placeItems: 'center' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>{label}</div>
        <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{sub}</div>
      </div>
    </button>
  );
}

function ArticleCard({ article, compact }) {
  const w = compact ? 168 : '100%';
  return (
    <div style={{
      flexShrink: 0, width: w, background: 'white', borderRadius: 16,
      border: '1px solid var(--line)', boxShadow: 'var(--shadow-1)',
      overflow: 'hidden', cursor: 'pointer',
    }}>
      <div style={{
        height: 90, background: 'var(--terra-100)',
        backgroundImage: 'repeating-linear-gradient(-45deg, oklch(0.94 0.025 45) 0, oklch(0.94 0.025 45) 1px, transparent 1px, transparent 9px)',
        display: 'grid', placeItems: 'center', fontSize: 28,
      }}>{article.emoji}</div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div className="eyebrow" style={{ fontSize: 9.5 }}>{article.cat.toUpperCase()}</div>
        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, lineHeight: 1.3,
                       display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.title}
        </div>
        <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>{article.read} read</div>
      </div>
    </div>
  );
}

// ─────── Tracker (calendar + cycle detail) ───────
function TrackerScreen({ day, setDay, navigate }) {
  // Build current month grid — 5 weeks for compactness
  const today = new Date();
  const month = today.getMonth();
  const year  = today.getFullYear();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  // The user's current cycle started `day - 1` days ago
  const cycleStartDate = todayDate - (day - 1);

  function phaseForDate(d) {
    if (d < 1 || d > daysInMonth) return null;
    const offset = d - cycleStartDate;
    let cyc = ((offset % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH + 1;
    return phaseFor(cyc);
  }

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const phase = phaseFor(day);
  const meta = PHASE_META[phase];

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}>
            <IconArrowL size={20} sw={2}/>
          </button>
          <div className="serif" style={{ fontSize: 22 }}>Cycle</div>
          <button className="btn btn-ghost" style={{ padding: 6 }}><IconSettings size={20} sw={1.8}/></button>
        </div>

        {/* compact cycle ribbon */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>CURRENT CYCLE · {CYCLE_LENGTH} DAYS</div>
          <CycleRibbon day={day} setDay={setDay}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 12 }}>
            <PhaseChip color="oklch(0.65 0.15 25)"  label="Period"     active={phase === 'menstrual'} />
            <PhaseChip color="oklch(0.78 0.07 145)" label="Follicular" active={phase === 'follicular'} />
            <PhaseChip color="oklch(0.70 0.13 145)" label="Ovulation"  active={phase === 'ovulation'} />
            <PhaseChip color="oklch(0.74 0.08 60)"  label="Luteal"     active={phase === 'luteal'} />
          </div>
        </div>

        {/* predictions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <PredictCard label="Next period" value={daysToNextPeriod(day) + 'd'} sub={'in ~' + daysToNextPeriod(day) + ' days'} color="oklch(0.65 0.15 25)" />
          <PredictCard label="Fertile window" value={Math.max(1, 14 - day) + 'd'} sub="prediction" color="oklch(0.70 0.13 145)" />
        </div>

        {/* calendar */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button className="btn btn-ghost" style={{ padding: 4, color: 'var(--ink-500)' }}><IconChevronL size={18} sw={2}/></button>
            <div className="serif" style={{ fontSize: 17 }}>{today.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
            <button className="btn btn-ghost" style={{ padding: 4, color: 'var(--ink-500)' }}><IconChevronR size={18} sw={2}/></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="muted" style={{ fontSize: 11, textAlign: 'center', fontWeight: 500 }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i}/>;
              const ph = phaseForDate(d);
              const phMeta = ph ? PHASE_META[ph] : null;
              const isToday = d === todayDate;
              const inPeriod = ph === 'menstrual';
              return (
                <div key={i} style={{
                  height: 36, borderRadius: 12, display: 'grid', placeItems: 'center',
                  background: inPeriod ? phMeta.color : (ph === 'ovulation' ? phMeta.color + '40' : 'transparent'),
                  color: inPeriod ? 'white' : 'var(--ink-900)',
                  fontSize: 13, fontWeight: isToday ? 700 : 500,
                  border: isToday ? '1.5px solid var(--ink-900)' : '1px solid transparent',
                  position: 'relative',
                }}>
                  {d}
                  {ph === 'ovulation' && !inPeriod && (
                    <div style={{ position: 'absolute', bottom: 3, width: 4, height: 4, borderRadius: 999,
                                  background: phMeta.color }}/>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={() => navigate('log')}>
          <IconDrop size={18} sw={1.8}/> Log period today
        </button>
      </div>
    </div>
  );
}

function PhaseChip({ color, label, active }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5,
                   opacity: active ? 1 : 0.5, fontWeight: active ? 600 : 500 }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: color }}/>
      <span style={{ fontSize: 11.5, color: 'var(--ink-700)' }}>{label}</span>
    </div>
  );
}

function PredictCard({ label, value, sub, color }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="eyebrow" style={{ fontSize: 10, color }}>{label.toUpperCase()}</div>
      <div className="serif" style={{ fontSize: 26, lineHeight: 1, marginTop: 4 }}>{value}</div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

function CycleRibbon({ day, setDay }) {
  const ref = useRef(null);
  function handleClick(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setDay && setDay(Math.max(1, Math.round(pct * CYCLE_LENGTH)));
  }
  return (
    <div ref={ref} style={{ position: 'relative', height: 40, cursor: 'pointer' }} onClick={handleClick}>
      <div style={{ position: 'absolute', inset: '14px 0', borderRadius: 999, overflow: 'hidden',
                     display: 'grid', gridTemplateColumns: `${PERIOD_LENGTH}fr ${13-PERIOD_LENGTH}fr 3fr ${CYCLE_LENGTH-16}fr` }}>
        <div style={{ background: 'oklch(0.65 0.15 25)' }}/>
        <div style={{ background: 'oklch(0.93 0.04 140)' }}/>
        <div style={{ background: 'oklch(0.78 0.10 145)' }}/>
        <div style={{ background: 'oklch(0.93 0.04 65)' }}/>
      </div>
      {/* current day marker */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `calc(${(day / CYCLE_LENGTH) * 100}% - 12px)`,
        width: 24, display: 'grid', placeItems: 'center', pointerEvents: 'none',
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 999, background: 'white',
                       border: '2px solid var(--ink-900)', display: 'grid', placeItems: 'center',
                       fontSize: 10, fontWeight: 700, boxShadow: 'var(--shadow-2)' }}>{day}</div>
      </div>
    </div>
  );
}

// ─────── Symptom Log Screen ───────
function LogScreen({ day, setDay, navigate, logState, setLogState }) {
  const phase = phaseFor(day);
  const meta = PHASE_META[phase];

  function toggle(group, value) {
    setLogState(prev => {
      const cur = prev[group] || [];
      const isMulti = group === 'pain' || group === 'mood';
      if (isMulti) {
        return { ...prev, [group]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
      }
      return { ...prev, [group]: cur[0] === value ? [] : [value] };
    });
  }

  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 16 }}>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => navigate('home')}>
            <IconX size={20} sw={2}/>
          </button>
          <div className="eyebrow">TODAY · DAY {day}</div>
          <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: 13, color: 'var(--terra-600)', fontWeight: 600 }}
                  onClick={() => navigate('home')}>Save</button>
        </div>

        <div className="serif" style={{ fontSize: 28, lineHeight: 1.15, marginBottom: 6 }}>
          How are you <em style={{ color: 'var(--terra-600)' }}>feeling</em>?
        </div>
        <div className="muted" style={{ fontSize: 14, marginBottom: 22 }}>
          Tap anything that fits. You can come back later.
        </div>

        {/* groups */}
        {SYMPTOM_GROUPS.map(group => (
          <div key={group.key} style={{ marginBottom: 22 }}>
            <div className="label" style={{ marginBottom: 10, fontSize: 14, color: 'var(--ink-900)', fontWeight: 600 }}>
              {group.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.options.map(opt => {
                const active = (logState[group.key] || []).includes(opt);
                return (
                  <button key={opt} className={'chip ' + (active ? 'active' : '')}
                          onClick={() => toggle(group.key, opt)}
                          style={{ fontFamily: 'inherit' }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* notes */}
        <div style={{ marginBottom: 22 }}>
          <div className="label" style={{ marginBottom: 10, fontSize: 14, color: 'var(--ink-900)', fontWeight: 600 }}>
            Quick note
          </div>
          <textarea
            placeholder="A word about today…"
            value={logState.note || ''}
            onChange={e => setLogState(p => ({ ...p, note: e.target.value }))}
            style={{
              width: '100%', minHeight: 70, padding: 14, borderRadius: 14,
              border: '1px solid var(--line)', background: 'white',
              fontFamily: 'inherit', fontSize: 14, color: 'var(--ink-900)', resize: 'none',
              outline: 'none',
            }}
          />
        </div>

        {/* meds reminder */}
        <div className="card-tinted" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: 'white',
                         display: 'grid', placeItems: 'center' }}>
            <IconPill size={18} stroke="var(--terra-600)" sw={1.8}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Iron supplement</div>
            <div className="muted" style={{ fontSize: 11.5 }}>Daily · 8:00 AM</div>
          </div>
          <button className={'chip ' + (logState.iron ? 'active-soft' : '')}
                  onClick={() => setLogState(p => ({ ...p, iron: !p.iron }))}>
            {logState.iron ? <><IconCheck size={14} sw={2.2}/> Taken</> : 'Mark done'}
          </button>
        </div>

        <button className="btn btn-primary btn-block" onClick={() => navigate('home')}>
          Save today's log
        </button>
      </div>
    </div>
  );
}

// ─────── Insights Screen ───────
function InsightsScreen({ navigate }) {
  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 18 }}>
          <div className="serif" style={{ fontSize: 22 }}>Insights</div>
          <div className="chip" style={{ background: 'white' }}>Last 14 days</div>
        </div>

        {/* warning card */}
        <div className="card" style={{ background: 'oklch(0.97 0.025 25)', border: '1px solid oklch(0.86 0.05 25)',
                                        marginBottom: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: 'oklch(0.94 0.06 25)',
                         display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <IconAlert size={16} stroke="oklch(0.55 0.16 25)" sw={1.8}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'oklch(0.45 0.12 25)' }}>High pain this cycle</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-700)', marginTop: 4, lineHeight: 1.4 }}>
              Day-3 cramps were 40% above your usual. If this continues for 3 cycles, consider a check-in.
            </div>
          </div>
        </div>

        {/* pain chart */}
        <ChartCard title="Pain level" sub="Cramps & headaches · 0–4" color="oklch(0.62 0.16 25)"
                   data={HISTORY_14.map(h => h.pain)} max={5} />

        {/* mood chart */}
        <ChartCard title="Mood" sub="Daily mood · 1–5" color="oklch(0.55 0.08 350)"
                   data={HISTORY_14.map(h => h.mood)} max={5} />

        {/* sleep chart */}
        <ChartCard title="Sleep" sub="Hours slept" color="oklch(0.55 0.08 240)"
                   data={HISTORY_14.map(h => h.sleep)} max={10} />

        {/* pattern summary */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>CYCLE PATTERN</div>
          <div className="serif" style={{ fontSize: 18, lineHeight: 1.3, marginBottom: 10 }}>
            Your last 3 cycles averaged <em style={{ color: 'var(--terra-600)' }}>28 days</em>, very regular.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <Stat label="Avg cycle" v="28d" />
            <Stat label="Avg period" v="5d" />
            <Stat label="Variation" v="±1d" />
          </div>
        </div>

        {/* tip */}
        <div className="card-tinted" style={{ marginBottom: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: 'white',
                         display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <IconLeaf size={16} stroke="var(--terra-600)" sw={1.8}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Recommendation</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-700)', marginTop: 3, lineHeight: 1.4 }}>
              You sleep less the 2 days before your period. A 20-minute earlier bedtime may help PMS mood swings.
            </div>
            <div className="muted" style={{ fontSize: 11, marginTop: 6, fontStyle: 'italic' }}>Non-medical · for guidance only</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, v }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 22 }}>{v}</div>
      <div className="muted" style={{ fontSize: 11 }}>{label}</div>
    </div>
  );
}

function ChartCard({ title, sub, color, data, max }) {
  const w = 320;
  const h = 80;
  const pad = 4;
  const step = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)]);
  const path = 'M ' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');
  const fill = path + ` L ${points[points.length-1][0]} ${h-pad} L ${points[0][0]} ${h-pad} Z`;

  return (
    <div className="card" style={{ marginBottom: 14, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
          <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{sub}</div>
        </div>
        <div className="serif" style={{ fontSize: 22, color }}>{data[data.length-1]}</div>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block', height: 80 }}>
        <path d={fill} fill={color} fillOpacity="0.10" />
        <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 3.5 : 0} fill={color}/>
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {HISTORY_14.map((h, i) => (
          <div key={i} className="muted" style={{ fontSize: 9.5, width: 14, textAlign: 'center',
                                                   fontWeight: i === HISTORY_14.length - 1 ? 700 : 400,
                                                   color: i === HISTORY_14.length - 1 ? 'var(--ink-900)' : 'var(--ink-500)' }}>{h.d}</div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, TrackerScreen, LogScreen, InsightsScreen, ArticleCard });
