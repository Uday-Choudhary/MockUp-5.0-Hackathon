import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { getRider, getMerch } from '../../api';
import './RiderProfile.css';

// Default fallback data (used when API is unavailable)
const defaultRider = {
  name: 'Francesco Bagnaia',
  num: 1,
  country: 'Italy',
  championshipLabel: '2× World Champion',
  team: 'Ducati Lenovo Team',
  seasonRank: '2nd',
  points: 267,
  seasonWins: 9,
  podiums: 18,
  polePositions: 3,
  bike: {
    name: '2026 Desmosedici GP26',
    specs: [
      { text: '999cc V4 Engine', sub: '90° V-CONFIG' },
      { text: '330+ km/h Top Speed', sub: 'LUSAIL 2026' },
      { text: 'Seamless Shift Gearbox', sub: '6-SPEED' },
      { text: 'Full Carbon Aero Package', sub: 'GP26 SPEC' },
    ],
  },
  career: [
    { year: '2013', label: 'Moto3 Debut' },
    { year: '2017', label: 'Moto2 Move' },
    { year: '2018', label: '★ Moto2 Champion', major: true },
    { year: '2019', label: 'MotoGP Debut' },
    { year: '2022', label: '★ World Champion', major: true },
    { year: '2023', label: '★ World Champion', major: true },
    { year: '2025', label: 'Runner-Up' },
    { year: '2026', label: 'Current', current: true },
  ],
  recentResults: [
    { pos: 'P2', circuit: 'Qatar GP · Lusail', pts: '+20 pts', cls: 'pos-silver' },
    { pos: 'P1', circuit: 'Thailand GP · Buriram', pts: '+25 pts', cls: 'pos-gold' },
    { pos: 'P1', circuit: 'Japan GP · Motegi', pts: '+25 pts', cls: 'pos-gold' },
    { pos: 'P3', circuit: 'Australia GP · Phillip Island', pts: '+16 pts', cls: 'pos-bronze' },
    { pos: 'P1', circuit: 'Malaysia GP · Sepang', pts: '+25 pts', cls: 'pos-gold' },
  ],
};

const defaultMerch = [
  { img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80', name: 'Pecco #1 Cap', price: '$55' },
  { img: 'https://fueler.store/cdn/shop/files/Replica-Softshell-Jacket.jpg?v=1769109639&width=1080', name: 'Race Jacket 2026', price: '$189' },
  { img: 'https://superbikestore.in/cdn/shop/products/X803RSUC_MOTOGP_31.jpg?v=1652012079', name: 'Replica Helmet', price: '$349' },
];

export default function RiderProfile() {
  const { id } = useParams();
  const [rider, setRider] = useState(defaultRider);
  const [merch, setMerch] = useState(defaultMerch);

  useEffect(() => {
    // Try to resolve rider ID — could be a slug like "bagnaia" or a numeric ID
    const riderId = id === 'bagnaia' ? 2 : id === 'marquez' ? 1 : id === 'martin' ? 3 : parseInt(id) || 2;
    
    Promise.all([getRider(riderId), getMerch()]).then(([riderData, merchData]) => {
      if (riderData) setRider(riderData);
      if (merchData) setMerch(merchData);
    });
  }, [id]);

  const firstName = rider.name.split(' ')[0].toUpperCase();
  const lastName = rider.name.split(' ').slice(-1)[0].toUpperCase();

  return (
    <div className="layout">
      <Sidebar raceMode={true} />
      <main className="rp-main">
        {/* Hero */}
        <div className="rp-hero">
          <div className="hero-strip" />
          <div className="hero-photo"><div className="hero-photo-grid" /><img src="https://images.unsplash.com/photo-1591637333184-19aa84bcee9a?auto=format&fit=crop&w=800&q=80" alt={rider.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', mixBlendMode: 'luminosity', opacity: 0.6 }} /></div>
          <div className="hero-ghost">#{rider.num}</div>
          <div className="hero-content">
            <div className="hero-flag">
              <div className="flag-ita"><span style={{ background: '#009246' }} /><span style={{ background: '#FFF' }} /><span style={{ background: '#CE2B37' }} /></div>
              <span className="hero-flag-text">{rider.country?.toUpperCase() || 'ITALY'} · #{rider.num}</span>
              <div className="hero-champion-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg> {rider.championshipLabel}</div>
            </div>
            <div className="hero-first-name">{firstName === lastName ? rider.name.split(' ')[0].toUpperCase() : firstName}</div>
            <div className="hero-last-name">{lastName}</div>
            <div className="hero-team">{rider.team}</div>
            <div className="hero-stats-line">Season Rank: <strong>{rider.seasonRank}</strong> · Points: <strong>{rider.points}</strong></div>
          </div>
          <button className="hero-follow"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#fff" /></svg>Following ✓</button>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          {[{ val: rider.seasonRank, lbl: 'Championship' },{ val: String(rider.seasonWins), lbl: 'Season Wins', blue: true },{ val: String(rider.podiums), lbl: 'Podiums' },{ val: String(rider.polePositions), lbl: 'Pole Positions' }].map(s => (
            <div key={s.lbl} className="stat-card">
              <div className={`stat-num ${s.blue ? 'stat-num--blue' : ''}`}>{s.val}</div>
              <div className="stat-label">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="rp-tabs">
          {['Overview', 'Stats', 'Bike', 'Media'].map((t, i) => (
            <div key={t} className={`rp-tab ${i === 0 ? 'active' : ''}`}>{t}</div>
          ))}
        </div>

        {/* Two Column */}
        <div className="rp-two-col">
          <div className="rp-col-l">
            {/* Career Timeline */}
            <div className="gcard">
              <div className="gc-title">Career Timeline</div>
              <div className="timeline">
                <div className="tl-track">
                  <div className="tl-line" />
                  {rider.career.map(p => (
                    <div key={p.year} className="tl-point">
                      <div className="tl-label">{p.label}</div>
                      <div className={`tl-dot ${p.major ? 'tl-dot--major' : ''} ${p.current ? 'tl-dot--current' : ''}`} />
                      <div className="tl-year" style={p.major ? { color: 'var(--gold-leader)' } : p.current ? { color: 'var(--accent-blue)' } : {}}>{p.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Head to Head */}
            <div className="gcard">
              <div className="gc-title">Head to Head</div>
              <div className="h2h-header">
                <div className="h2h-name"><div className="h2h-name-main">{lastName}</div><div className="h2h-name-sub">{rider.team}</div></div>
                <div className="h2h-vs">VS</div>
                <div className="h2h-name"><div className="h2h-name-main">MÁRQUEZ</div><div className="h2h-name-sub">Ducati Lenovo</div></div>
              </div>
              <div className="h2h-bars">
                {[{ label: 'Season Wins', a: rider.seasonWins, b: 11 },{ label: 'Avg Qualifying', a: 'P2.1', b: 'P1.8', af: 58, bf: 62 },{ label: 'Podium %', a: '73%', b: '81%', af: 73, bf: 81 }].map(h => (
                  <div key={h.label} className="h2h-row">
                    <div className="h2h-stat-label">{h.label}</div>
                    <div className="h2h-bar-wrap">
                      <div className="h2h-val h2h-val--a">{h.a}</div>
                      <div className="h2h-bar-a" style={{ flex: h.af || h.a }} />
                      <div className="h2h-bar-b" style={{ flex: h.bf || h.b }} />
                      <div className="h2h-val h2h-val--b">{h.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rp-col-r">
            {/* Bike Spec */}
            <div className="gcard">
              <div className="gc-label-rp">Current Machinery</div>
              <div className="bike-title-label">{rider.bike.name}</div>
              <div className="bike-visual"><img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80" alt="Bike" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '10px', opacity: 0.7 }} /></div>
              <div className="spec-list">
                {rider.bike.specs.map(s => (
                  <div key={s.text} className="spec-row"><div className="spec-dot" /><div className="spec-line" /><div className="spec-text">{s.text}</div><div className="spec-sub">{s.sub}</div></div>
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div className="gcard">
              <div className="gc-title">Recent Results</div>
              {rider.recentResults.map((r, i) => (
                <div key={i} className="result-row"><div className={`result-pos ${r.cls}`}>{r.pos}</div><div className="result-circuit">{r.circuit}</div><div className="result-pts">{r.pts}</div></div>
              ))}
            </div>

            {/* Merch */}
            <div className="gcard">
              <div className="merch-title"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:'4px'}}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Shop {firstName}'s Gear</div>
              <div className="merch-row">
                {merch.map(m => (
                  <div key={m.name} className="merch-card">
                    <div className="merch-img"><img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '6px' }} /></div>
                    <div className="merch-info"><div className="merch-name">{m.name}</div><div className="merch-price">{m.price}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
