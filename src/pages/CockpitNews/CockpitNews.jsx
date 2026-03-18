import Sidebar from '../../components/Sidebar';
import './CockpitNews.css';

export default function CockpitNews() {
  return (
    <div className="news-layout">
      <Sidebar raceMode={false} />
      <main className="news-center">
        {/* Top bar */}
        <div className="news-topbar">
          <div className="news-topbar-left">
            <div className="news-cockpit-title">The Cockpit</div>
            <div className="news-cockpit-sub">AUSTIN GP — 3 DAYS AWAY</div>
          </div>
          <div className="race-mode-pill">
            <span className="pill-bolt"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></span>
            <span>Race Mode</span>
          </div>
        </div>

        {/* Highlights Video */}
        <div className="news-video-section">
          <div className="news-video-box">
            <div className="nvid-grid" />
            <div className="nvid-label">Last Race · Qatar GP 2026</div>
            <div className="nvid-center">
              <div className="nplay-btn">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div className="nplay-label">Watch Highlights</div>
            </div>
            <div className="nvid-bottom">
              <div className="nvid-race-label">Qatar Grand Prix</div>
              <div className="nvid-race-sub">Race Highlights · 8:43</div>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <div className="news-content-tabs">
          {['Race Recap', 'Qualifying', 'Press Conference'].map((tab, i) => (
            <div key={tab} className={`nctab ${i === 0 ? 'active' : ''}`}>{tab}</div>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="news-content">
          {/* Race Result Card */}
          <div className="result-card">
            <div className="rc-header">
              <div className="rc-title">Qatar GP — Final Result</div>
              <div className="rc-badge">COMPLETED</div>
            </div>
            <div className="podium-row">
              {[
                { pos: 1, name: 'M. Márquez', team: 'Ducati Lenovo', time: '1:29.473 FL' },
                { pos: 2, name: 'F. Bagnaia', team: 'Ducati Lenovo', time: '+0.342s' },
                { pos: 3, name: 'J. Martín', team: 'Pramac Racing', time: '+1.108s' },
              ].map(p => (
                <div key={p.pos} className="podium-item">
                  <div className="podium-pos">{p.pos}</div>
                  <div className="podium-name">{p.name}</div>
                  <div className="podium-team">{p.team}</div>
                  <div className="podium-time">{p.time}</div>
                </div>
              ))}
            </div>
            <div className="result-meta">
              <div className="rmeta-cell"><div className="rmeta-val">1:29.473</div><div className="rmeta-lbl">Fastest Lap</div></div>
              <div className="rmeta-cell"><div className="rmeta-val">22 / 310km</div><div className="rmeta-lbl">Laps · Distance</div></div>
              <div className="rmeta-cell"><div className="rmeta-val">DRY · 52°C</div><div className="rmeta-lbl">Conditions</div></div>
            </div>
          </div>

          {/* Coming Up */}
          <div className="coming-card">
            <div className="coming-left">
              <div className="coming-eyebrow">Coming Up · Round 2</div>
              <div className="coming-title">Austin GP</div>
              <div className="coming-date">Circuit of The Americas · March 21, 2026</div>
              <div className="coming-link">View Track Guide <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg></div>
            </div>
            <div className="circuit-box">
              <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 75 L20 50 Q20 20 50 15 L80 12 Q100 12 110 25 L130 50 Q140 65 128 75 L100 82 Q80 86 60 80 L35 75 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
                <path d="M80 12 Q100 12 110 25" stroke="#E8002D" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Right sidebar */}
      <aside className="news-right-sidebar">
        {/* Championship Standings */}
        <div className="nrs-block">
          <div className="nrs-title">Championship</div>
          <table className="standings-table">
            <thead><tr><th></th><th></th><th>Rider</th><th style={{ textAlign: 'right' }}>Pts</th></tr></thead>
            <tbody>
              {[
                { pos: 1, name: 'M. Márquez', pts: 142, bar: '#E8002D', leader: true },
                { pos: 2, name: 'F. Bagnaia', pts: 138, bar: '#00A8FF', fav: true },
                { pos: 3, name: 'J. Martín', pts: 121, bar: '#E8002D' },
                { pos: 4, name: 'A. Espargaro', pts: 109, bar: '#009900' },
                { pos: 5, name: 'E. Bastianini', pts: 98, bar: '#FFD700' },
              ].map(r => (
                <tr key={r.pos} className={r.leader ? 'leader-row' : ''}>
                  <td className="s-pos">{r.pos}</td>
                  <td><span className="s-bar" style={{ background: r.bar }} /></td>
                  <td className="s-name" style={r.fav ? { color: '#00A8FF' } : {}}>{r.name}</td>
                  <td className="s-pts">{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Latest News */}
        <div className="nrs-block">
          <div className="nrs-title">Latest News</div>
          {[
            { hl: 'Márquez sets new Lusail lap record in dominant display', src: 'MotoGP.com', ago: '12m ago' },
            { hl: 'Bagnaia: "We had the pace to win — strategy cost us today"', src: 'GPOne', ago: '34m ago' },
            { hl: 'Ducati confirm both riders on upgraded aero for COTA', src: 'Autosport', ago: '1h ago' },
            { hl: 'Michelin announce new tyre allocation for Austin weekend', src: 'Motorsport.com', ago: '2h ago' },
          ].map((n, i) => (
            <div key={i} className="news-item-n">
              <div className="news-hl-n">{n.hl}</div>
              <div className="news-meta-n"><span>{n.src}</span><span>·</span><span>{n.ago}</span></div>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="nrs-block">
          <div className="nrs-title">Race Calendar</div>
          {[
            { day: '21', mon: 'Mar', race: 'Austin GP', circuit: 'Circuit of The Americas · USA', next: true },
            { day: '06', mon: 'Apr', race: 'Argentina GP', circuit: 'Termas de Río Hondo · ARG' },
            { day: '20', mon: 'Apr', race: 'Spain GP', circuit: 'Circuit de Jerez · ESP' },
          ].map((c, i) => (
            <div key={i} className="cal-item">
              <div className="cal-date-box"><div className="cal-day">{c.day}</div><div className="cal-mon">{c.mon}</div></div>
              <div className="cal-info">
                <div className="cal-race">{c.race}</div>
                <div className="cal-circuit">{c.circuit}</div>
                {c.next && <span className="cal-next">NEXT RACE</span>}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
