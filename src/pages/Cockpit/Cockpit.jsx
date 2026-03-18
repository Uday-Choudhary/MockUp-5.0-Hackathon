import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLiveStandings, getCurrentRace } from '../../api';
import './Cockpit.css';

export default function Cockpit() {
  const navigate = useNavigate();
  const [telemetry, setTelemetry] = useState({ speed: 312, lean: 62, gforce: 1.6, rpm: 85 });
  const [standings, setStandings] = useState([]);
  const [raceData, setRaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLiveStandings(), getCurrentRace()]).then(([standingsData, raceInfo]) => {
      if (standingsData) setStandings(standingsData);
      if (raceInfo) setRaceData(raceInfo);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        speed: Math.max(280, Math.min(358, prev.speed + Math.floor(Math.random() * 11) - 5)),
        lean: Math.max(0, Math.min(65, prev.lean + Math.floor(Math.random() * 5) - 2)),
        gforce: Math.max(0.5, Math.min(2.0, prev.gforce + (Math.random() * 0.2 - 0.1))),
        rpm: Math.max(60, Math.min(98, prev.rpm + Math.floor(Math.random() * 9) - 4))
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const sectors = raceData?.sectors || [
    { id: 'S1', time: '24.892' },
    { id: 'S2', time: '19.341' },
    { id: 'S3', time: '19.143', purple: true },
    { id: 'LAP', time: '1:23.376' },
  ];
  const conditions = raceData?.conditions || { trackTemp: '52°', airTemp: '31°', condition: 'DRY' };
  const tyres = raceData?.tyreStrategy || [
    { name: 'Front Tyre', compound: 'S', type: 'soft', wear: 72, color: 'rgba(232,0,45,0.7)', lap: 'L18' },
    { name: 'Rear Tyre', compound: 'M', type: 'med', wear: 58, color: 'rgba(255,215,0,0.7)', lap: 'L18' },
  ];
  const raceName = raceData?.name || 'QATAR GP';
  const lap = raceData?.lap || 18;
  const totalLaps = raceData?.totalLaps || 22;

  return (
    <div className="layout">
      <Sidebar raceMode={true} />
      <main className="center-main">
        {/* Top bar */}
        <div className="center-topbar">
          <div className="cockpit-title">The Cockpit</div>
          <div className="topbar-right">
            <div className="race-info">
              <strong>{raceName}</strong> · LAP <strong>{lap}</strong>/{totalLaps}
            </div>
            <div className="live-pill">
              <div className="live-dot" />
              LIVE
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="video-wrap">
          <div className="video-player">
            <div className="vid-grid" />
            <div className="vid-top-left">Main Broadcast</div>
            <div className="vid-4k">4K</div>
            <div className="hud-corner hud-corner--tl" />
            <div className="hud-corner hud-corner--tr" />
            <div className="hud-corner hud-corner--bl" />
            <div className="hud-corner hud-corner--br" />
            <div className="vid-center">
              <div className="vid-play">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
              <div className="vid-label-main">BROADCAST FEED — {raceName} · 2026</div>
            </div>
          </div>
        </div>

        {/* Camera Toggles */}
        <div className="cam-toggles">
          {['Main Broadcast', '360° Onboard', 'Pit Wall Feed'].map((cam, i) => (
            <div key={cam} className={`cam-btn ${i === 0 ? 'active' : ''}`}>
              <div className="cam-dot" />{cam}
            </div>
          ))}
        </div>

        {/* Telemetry HUD */}
        <div className="telemetry">
          {/* Lean Angle */}
          <div className="tele-panel">
            <div className="gauge-arc">
              <svg viewBox="0 0 90 50" xmlns="http://www.w3.org/2000/svg" overflow="visible">
                <path d="M 10 48 A 40 40 0 0 1 80 48" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 10 48 A 40 40 0 0 1 67 12" fill="none" stroke="url(#gaugeGrad)" strokeWidth="5" strokeLinecap="round" />
                <circle cx="67" cy="12" r="4" fill="#00A8FF" style={{ filter: 'drop-shadow(0 0 5px #00A8FF)' }} />
                <defs>
                  <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#004488" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00A8FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="lean-value">{telemetry.lean}°</div>
            <div className="tele-label">Lean Angle</div>
          </div>

          {/* Speed */}
          <div className="tele-panel" style={{ borderLeft: '1px solid var(--card-border)', borderRight: '1px solid var(--card-border)' }}>
            <div style={{ position: 'relative', marginBottom: '4px' }}>
              <div className="speed-value">{telemetry.speed}<span className="speed-unit">km/h</span></div>
            </div>
            <div className="speed-bar-wrap">
              <div className="speed-bar-fill" style={{ width: `${telemetry.rpm}%`, transition: 'width 0.15s ease-out' }} />
            </div>
            <div className="speed-bar-label">
              <span>0</span><span>TOP: 358</span>
            </div>
            <div className="tele-label" style={{ marginTop: '4px' }}>Speed</div>
          </div>

          {/* G-Force */}
          <div className="tele-panel">
            <div className="gforce-dial">
              <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" strokeDasharray="131 44" strokeDashoffset="33" strokeLinecap="round" transform="rotate(135 35 35)" />
                <circle cx="35" cy="35" r="28" fill="none" stroke="url(#gfGrad)" strokeWidth="7" strokeDasharray="70 105" strokeDashoffset="33" strokeLinecap="round" transform="rotate(135 35 35)" style={{ filter: 'drop-shadow(0 0 6px #00A8FF)' }} />
                <defs>
                  <linearGradient id="gfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#005599" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#00A8FF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="gforce-overlay">
                <div className="gforce-val">{telemetry.gforce.toFixed(1)}</div>
              </div>
            </div>
            <div className="tele-label">G-Force</div>
          </div>
        </div>

        {/* Sector Strip */}
        <div className="sector-strip">
          {sectors.map(s => (
            <div key={s.id} className={`sector-box ${s.purple ? 'sector-box--purple' : ''}`} onClick={s.purple ? () => navigate('/purple-sector') : undefined}>
              <div className="sector-header">
                <span className="sector-id">{s.id}</span>
              </div>
              <div className="sector-time">{s.time}</div>
              {s.purple && (
                <div className="sector-fastest-label">
                  <span className="sector-star">★</span> Fastest Sector
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        {/* Leaderboard */}
        <div className="rs-section">
          <div className="rs-header">
            <div className="rs-title">Live Standings</div>
          </div>
          <div className="lb-list">
            {standings.map(r => (
              <div key={r.pos} className={`lb-row ${r.leader ? 'lb-row--leader' : ''} ${r.user ? 'lb-row--user' : ''}`}>
                <div className="lb-team-bar" style={{ background: r.team }} />
                <div className="lb-pos">{r.pos}</div>
                <div className="lb-name">{r.name}</div>
                {r.user && <div className="user-badge">YOUR RIDER</div>}
                <div className="lb-gap">{r.gap}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tyre Strategy */}
        <div className="tyre-card">
          <div className="tyre-card-title">Tyre Strategy — Bagnaia #1</div>
          {tyres.map(t => (
            <div key={t.name} className="tyre-row">
              <div className="tyre-name">{t.name}</div>
              <div className={`tyre-compound tyre-compound--${t.type}`}>{t.compound}</div>
              <div className="tyre-wear-bar">
                <div className="tyre-wear-fill" style={{ width: `${t.wear}%`, background: `linear-gradient(90deg, ${t.color}80, ${t.color})` }} />
              </div>
              <div className="tyre-lap">{t.lap}</div>
            </div>
          ))}
        </div>

        {/* Conditions */}
        <div className="conditions-card">
          <div className="conditions-title">Race Conditions</div>
          <div className="conditions-grid">
            <div className="cond-cell">
              <div className="cond-val">{conditions.trackTemp}</div>
              <div className="cond-lbl">Track Temp</div>
            </div>
            <div className="cond-cell">
              <div className="cond-val">{conditions.airTemp}</div>
              <div className="cond-lbl">Air Temp</div>
            </div>
            <div className="cond-cell">
              <div className="cond-dry">{conditions.condition}</div>
              <div className="cond-lbl">Condition</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
