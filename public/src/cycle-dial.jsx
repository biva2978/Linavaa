// cycle-dial.jsx — circular cycle visualization

function CycleDial({ day = 8, size = 264, onTap }) {
  const r = size / 2;
  const stroke = 14;
  const innerR = r - stroke / 2 - 4;
  const phase = phaseFor(day);
  const meta = PHASE_META[phase];

  // Build arcs for each phase
  const arcs = [
    { phase: 'menstrual',  start: 0,             end: PERIOD_LENGTH,        color: 'oklch(0.65 0.15 25)',  trackColor: 'oklch(0.92 0.05 25)' },
    { phase: 'follicular', start: PERIOD_LENGTH, end: 13,                   color: 'oklch(0.78 0.07 145)', trackColor: 'oklch(0.94 0.03 140)' },
    { phase: 'ovulation',  start: 13,            end: 16,                   color: 'oklch(0.70 0.13 145)', trackColor: 'oklch(0.92 0.05 140)' },
    { phase: 'luteal',     start: 16,            end: CYCLE_LENGTH,         color: 'oklch(0.74 0.08 60)',  trackColor: 'oklch(0.94 0.04 65)' },
  ];

  function polar(angle, radius) {
    const a = (angle - 90) * Math.PI / 180;
    return [r + radius * Math.cos(a), r + radius * Math.sin(a)];
  }
  function arcPath(startDay, endDay, radius) {
    const startA = (startDay / CYCLE_LENGTH) * 360;
    const endA   = (endDay / CYCLE_LENGTH) * 360;
    const [sx, sy] = polar(startA, radius);
    const [ex, ey] = polar(endA - 0.001, radius);
    const large = endA - startA > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${radius} ${radius} 0 ${large} 1 ${ex} ${ey}`;
  }

  // current day marker position
  const angle = (day / CYCLE_LENGTH) * 360;
  const [mx, my] = polar(angle, innerR);

  return (
    <div className="dial-wrap" style={{ width: size, height: size, cursor: onTap ? 'pointer' : 'default' }} onClick={onTap}>
      <svg width={size} height={size} style={{ display: 'block' }}>
        {/* background circle */}
        <circle cx={r} cy={r} r={innerR} fill="white" stroke="oklch(0.94 0.012 60)" strokeWidth="1" />
        {/* phase arcs (track + tick marks) */}
        {arcs.map(a => (
          <g key={a.phase}>
            <path d={arcPath(a.start, a.end, innerR)} stroke={a.trackColor} strokeWidth={stroke} fill="none" strokeLinecap="butt" />
          </g>
        ))}
        {/* progress overlay — filled days so far */}
        {arcs.map(a => {
          const start = a.start;
          const end = Math.min(a.end, day);
          if (end <= start) return null;
          return (
            <path key={'p-' + a.phase} d={arcPath(start, end, innerR)} stroke={a.color}
                  strokeWidth={stroke} fill="none" strokeLinecap="butt" />
          );
        })}
        {/* day ticks */}
        {Array.from({ length: CYCLE_LENGTH }).map((_, i) => {
          const a = ((i + 0.5) / CYCLE_LENGTH) * 360;
          const [tx1, ty1] = polar(a, innerR + stroke / 2 + 2);
          const [tx2, ty2] = polar(a, innerR + stroke / 2 + 6);
          return <line key={i} x1={tx1} y1={ty1} x2={tx2} y2={ty2}
                       stroke={(i + 1) % 7 === 0 ? 'oklch(0.55 0.04 50)' : 'oklch(0.82 0.012 60)'}
                       strokeWidth={(i + 1) % 7 === 0 ? 1.4 : 1} strokeLinecap="round" />;
        })}
        {/* current day marker */}
        <g>
          <circle cx={mx} cy={my} r={11} fill="white" stroke={meta.color} strokeWidth="2.5" />
          <circle cx={mx} cy={my} r={4} fill={meta.color} />
        </g>
      </svg>
      {/* center content */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Day {day} · {meta.label}</div>
        <div className="serif" style={{ fontSize: 44, lineHeight: 1, fontWeight: 400, color: 'var(--ink-900)' }}>
          {phase === 'menstrual' ? 'Day ' + day : daysToNextPeriod(day)}
        </div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          {phase === 'menstrual' ? 'of your period' : 'days to next period'}
        </div>
      </div>
    </div>
  );
}

function daysToNextPeriod(day) {
  return Math.max(1, CYCLE_LENGTH - day + 1);
}

window.CycleDial = CycleDial;
window.daysToNextPeriod = daysToNextPeriod;
