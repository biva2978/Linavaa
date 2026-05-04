// app.jsx — Main app shell, nav, tweaks, mounting

const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cycleDay": 8,
  "theme": "warm",
  "disguise": false,
  "showOnboarding": false
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useStateApp(tweaks.showOnboarding ? 'onboarding' : 'home');
  const [day, setDay] = useStateApp(tweaks.cycleDay || 8);
  const [logState, setLogState] = useStateApp({ mood: ['Calm'], pain: ['Cramps'], iron: false });
  const [journal, setJournal] = useStateApp(JOURNAL_SEED);
  const [journalUnlocked, setJournalUnlocked] = useStateApp(false);

  // sync day with tweak
  useEffectApp(() => { setDay(tweaks.cycleDay); }, [tweaks.cycleDay]);

  function navigate(s) { setScreen(s); }

  // Apply theme to root
  useEffectApp(() => {
    const root = document.documentElement;
    if (tweaks.theme === 'cool') {
      root.style.setProperty('--terra-700', 'oklch(0.42 0.09 250)');
      root.style.setProperty('--terra-600', 'oklch(0.55 0.11 250)');
      root.style.setProperty('--terra-500', 'oklch(0.62 0.11 250)');
      root.style.setProperty('--terra-400', 'oklch(0.74 0.08 250)');
      root.style.setProperty('--terra-300', 'oklch(0.85 0.05 250)');
      root.style.setProperty('--terra-200', 'oklch(0.93 0.03 250)');
      root.style.setProperty('--terra-100', 'oklch(0.97 0.014 250)');
      root.style.setProperty('--cream', 'oklch(0.975 0.008 240)');
      root.style.setProperty('--cream-2', 'oklch(0.955 0.012 240)');
    } else if (tweaks.theme === 'mono') {
      root.style.setProperty('--terra-700', 'oklch(0.30 0.01 60)');
      root.style.setProperty('--terra-600', 'oklch(0.42 0.01 60)');
      root.style.setProperty('--terra-500', 'oklch(0.52 0.01 60)');
      root.style.setProperty('--terra-400', 'oklch(0.68 0.008 60)');
      root.style.setProperty('--terra-300', 'oklch(0.84 0.006 60)');
      root.style.setProperty('--terra-200', 'oklch(0.92 0.005 60)');
      root.style.setProperty('--terra-100', 'oklch(0.97 0.003 60)');
    } else {
      // warm (default)
      root.style.setProperty('--terra-700', 'oklch(0.45 0.10 38)');
      root.style.setProperty('--terra-600', 'oklch(0.55 0.13 40)');
      root.style.setProperty('--terra-500', 'oklch(0.65 0.13 40)');
      root.style.setProperty('--terra-400', 'oklch(0.74 0.10 38)');
      root.style.setProperty('--terra-300', 'oklch(0.84 0.06 35)');
      root.style.setProperty('--terra-200', 'oklch(0.92 0.035 35)');
      root.style.setProperty('--terra-100', 'oklch(0.96 0.018 40)');
      root.style.setProperty('--cream', 'oklch(0.975 0.012 80)');
      root.style.setProperty('--cream-2', 'oklch(0.955 0.018 75)');
    }
  }, [tweaks.theme]);

  let content = null;
  if (screen === 'onboarding') {
    content = <OnboardingScreen onDone={() => setScreen('home')} />;
  } else if (screen === 'home')      content = <HomeScreen day={day} setDay={setDay} navigate={navigate} name={tweaks.disguise ? 'Reader' : 'Ayesha'} />;
  else if (screen === 'tracker')     content = <TrackerScreen day={day} setDay={(d) => { setDay(d); setTweak('cycleDay', d); }} navigate={navigate} />;
  else if (screen === 'log')         content = <LogScreen day={day} setDay={setDay} navigate={navigate} logState={logState} setLogState={setLogState} />;
  else if (screen === 'insights')    content = <InsightsScreen navigate={navigate} />;
  else if (screen === 'journal')     content = <JournalScreen navigate={navigate} journal={journal} setJournal={setJournal}
                                                              journalUnlocked={journalUnlocked} setJournalUnlocked={setJournalUnlocked} />;
  else if (screen === 'delivery')    content = <DeliveryScreen navigate={navigate} />;
  else if (screen === 'crisis')      content = <CrisisScreen navigate={navigate} />;
  else if (screen === 'directory')   content = <DirectoryScreen navigate={navigate} />;
  else if (screen === 'learn')       content = <LearnScreen navigate={navigate} />;
  else if (screen === 'more')        content = <MoreScreen navigate={navigate} />;

  // tab bar visible only on certain screens (hide on onboarding, modal flows)
  const tabsVisible = ['home','tracker','insights','journal','more','learn','directory'].includes(screen);

  // disguise mode — calculator skin if enabled
  if (tweaks.disguise) {
    return (
      <div className="shokhii-screen" style={{ background: '#0a0a0a', color: 'white',
                                                  display: 'flex', flexDirection: 'column' }}>
        <IOSStatusBar dark={true}/>
        <div data-screen-label="Disguise Calculator" style={{ flex: 1, padding: '20px 18px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                          paddingRight: 6, paddingBottom: 12 }}>
            <div style={{ fontSize: 16, color: '#999', textAlign: 'right', fontFamily: 'system-ui' }}>1234</div>
            <div style={{ fontSize: 64, color: 'white', textAlign: 'right', fontWeight: 200, lineHeight: 1.1, fontFamily: 'system-ui' }}>1234</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {['AC','+/−','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','='].map((k, i) => {
              const isOp = ['÷','×','−','+','='].includes(k);
              const isFn = ['AC','+/−','%'].includes(k);
              const isWide = k === '0';
              const onTap = (k === '=') ? () => setTweak('disguise', false) : undefined;
              return (
                <button key={i} onClick={onTap} style={{
                  height: 64, borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontSize: 26, fontFamily: 'system-ui', fontWeight: 400,
                  background: isOp ? '#FF9F0A' : isFn ? '#A5A5A5' : '#333',
                  color: isFn ? '#000' : 'white',
                  gridColumn: isWide ? 'span 2' : 'span 1',
                  textAlign: isWide ? 'left' : 'center',
                  paddingLeft: isWide ? 26 : 0,
                }}>{k}</button>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 10, color: '#444' }}>
            tap = to exit disguise
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shokhii-screen">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5 }}>
        <IOSStatusBar dark={false}/>
      </div>
      <div data-screen-label={screenLabel(screen)} style={{ position: 'absolute', inset: 0 }}>
        {content}
      </div>
      {tabsVisible && <TabBar screen={screen} navigate={navigate} />}
    </div>
  );
}

function screenLabel(s) {
  const map = { home: '01 Home', tracker: '02 Tracker', log: '03 Log', insights: '04 Insights',
                journal: '05 Journal', delivery: '06 Pad Delivery', crisis: '07 Crisis Mode',
                directory: '08 Directory', learn: '09 Learn', more: '10 More', onboarding: '00 Onboarding' };
  return map[s] || s;
}

function TabBar({ screen, navigate }) {
  const items = [
    { k: 'home',     l: 'Today',     I: IconHome },
    { k: 'tracker',  l: 'Cycle',     I: IconTrack },
    { k: 'log',      l: 'Log',       I: IconPlus, primary: true },
    { k: 'insights', l: 'Insights',  I: IconChart },
    { k: 'more',     l: 'More',      I: IconMore },
  ];
  return (
    <div className="tab-bar">
      {items.map(it => {
        const I = it.I;
        const active = screen === it.k || (it.k === 'more' && ['journal','delivery','crisis','directory','learn','more'].includes(screen));
        if (it.primary) {
          return (
            <div key={it.k} className="tab-item" onClick={() => navigate(it.k)} style={{ position: 'relative' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: 'var(--terra-500)', display: 'grid', placeItems: 'center',
                marginTop: -8, boxShadow: '0 4px 14px oklch(0.65 0.13 40 / 0.3)',
                transition: 'transform 0.12s',
              }}>
                <I size={22} stroke="white" sw={2}/>
              </div>
              <div className="tab-label" style={{ marginTop: 2, color: 'var(--ink-500)' }}>{it.l}</div>
            </div>
          );
        }
        return (
          <div key={it.k} className={'tab-item ' + (active ? 'active' : '')} onClick={() => navigate(it.k)}>
            <I size={22} stroke="currentColor" sw={1.7}/>
            <div className="tab-label">{it.l}</div>
          </div>
        );
      })}
    </div>
  );
}

// More menu — surfaces the secondary screens
function MoreScreen({ navigate }) {
  const items = [
    { k: 'journal',   l: 'Journal',           s: 'Private, locked',         I: IconJournal },
    { k: 'delivery',  l: 'Pad Delivery',      s: 'Discreet, to your door',  I: IconBag },
    { k: 'directory', l: 'Find Care',         s: 'Women-friendly providers', I: IconHeart },
    { k: 'learn',     l: 'Learn',             s: 'Articles & videos',       I: IconBook },
    { k: 'crisis',    l: 'Crisis Mode',       s: 'Pain relief, fast',        I: IconAlert, accent: true },
  ];
  return (
    <div className="scroll-area">
      <div style={{ padding: '4px 22px 0' }}>
        <div className="serif" style={{ fontSize: 26, marginTop: 6, marginBottom: 18 }}>More</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(it => {
            const I = it.I;
            return (
              <button key={it.k} className="card" onClick={() => navigate(it.k)}
                      style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: it.accent ? 'oklch(0.94 0.06 25)' : 'var(--terra-100)',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <I size={20} stroke={it.accent ? 'oklch(0.55 0.16 25)' : 'var(--terra-600)'} sw={1.8}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{it.l}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{it.s}</div>
                </div>
                <IconChevronR size={18} stroke="var(--ink-500)" sw={2}/>
              </button>
            );
          })}
        </div>

        <div className="eyebrow" style={{ marginTop: 24, marginBottom: 10 }}>PRIVACY</div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SettingRow icon={<IconShield size={18} stroke="var(--terra-600)" sw={1.8}/>}
                      label="Anonymous mode" sub="On — no data leaves your device" />
          <div className="divider" style={{ margin: 0 }}/>
          <SettingRow icon={<IconLock size={18} stroke="var(--terra-600)" sw={1.8}/>}
                      label="Journal PIN" sub="Active · 4 digits" />
          <div className="divider" style={{ margin: 0 }}/>
          <SettingRow icon={<IconEyeOff size={18} stroke="var(--terra-600)" sw={1.8}/>}
                      label="Disguise mode" sub="Looks like a calculator. Tap = to exit." />
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--terra-100)',
                     display: 'grid', placeItems: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{sub}</div>
      </div>
      <IconChevronR size={16} stroke="var(--ink-500)" sw={2}/>
    </div>
  );
}

// ─────── Tweaks UI ───────
function ShokhiiTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Cycle">
        <TweakSlider label="Cycle day" value={tweaks.cycleDay} onChange={v => setTweak('cycleDay', v)}
                     min={1} max={28} step={1} />
        <div className="muted" style={{ fontSize: 11.5, marginTop: -6 }}>
          Day {tweaks.cycleDay} · {PHASE_META[phaseFor(tweaks.cycleDay)].label}
        </div>
      </TweakSection>
      <TweakSection label="Theme">
        <TweakRadio value={tweaks.theme} onChange={v => setTweak('theme', v)}
                    options={[{ value: 'warm', label: 'Warm' }, { value: 'cool', label: 'Cool' }, { value: 'mono', label: 'Mono' }]}/>
      </TweakSection>
      <TweakSection label="Privacy">
        <TweakToggle label="Disguise mode (calculator)" value={tweaks.disguise} onChange={v => setTweak('disguise', v)}/>
      </TweakSection>
      <TweakSection label="Flow">
        <TweakToggle label="Show onboarding on next reload" value={tweaks.showOnboarding} onChange={v => setTweak('showOnboarding', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

// Mount
function Root() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <div style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}>
        <App />
      </div>
      <ShokhiiTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
