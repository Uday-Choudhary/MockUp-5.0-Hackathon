import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRiders } from '../../api';
import './Onboarding.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [selected, setSelected] = useState([1, 2]);
  const [viewPref, setViewPref] = useState('Watch Live');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRiders().then(data => {
      if (data) setRiders(data);
      setLoading(false);
    });
  }, []);

  const toggleRider = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  return (
    <div className="onboarding-page">
      {/* Particles */}
      <div className="particles">
        {[10,25,40,55,70,85,92].map((left, i) => (
          <div key={i} className="particle" style={{ left: `${left}%`, animationDuration: `${10+i*2}s`, animationDelay: `${i}s` }} />
        ))}
      </div>

      {/* Topbar */}
      <div className="ob-topbar">
        <div className="tb-left">
          <div className="tb-logo">MH</div>
          <div className="tb-brand">MOTOGP HUB</div>
        </div>
        <div className="tb-right">
          <div className="tb-step">STEP 1 OF 3 · PERSONALIZE</div>
          <div className="tb-skip" onClick={() => navigate('/cockpit')}>Skip for now →</div>
        </div>
      </div>

      {/* Panel */}
      <div className="ob-panel">
        <div className="logo-hero">
          <div className="logo-shield">
            <div className="logo-shield-inner">MH</div>
          </div>
          <h1>MotoGP Ultimate Hub</h1>
          <p>Your one home for everything MotoGP. Let's set things up.</p>
        </div>

        <div className="main-heading">
          <h2>Who are you <span>rooting for</span><br/>this season?</h2>
          <p>Select your favorite riders — we'll personalize your feed, alerts, and merch.</p>
        </div>

        {/* Rider Grid */}
        <div className="rider-grid">
          {loading ? (
            <div style={{ color: 'var(--text-secondary)', padding: '40px', textAlign: 'center', width: '100%' }}>Loading riders...</div>
          ) : riders.map(rider => (
            <div key={rider.id} className={`rider-card ${selected.includes(rider.id) ? 'selected' : ''}`} onClick={() => toggleRider(rider.id)}>
              <div className="rider-photo">
                <img src={rider.img} alt={rider.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', opacity: 0.8, mixBlendMode: 'luminosity' }} />
                <div className="team-accent" style={{ background: `linear-gradient(180deg, ${rider.teamColor}, ${rider.teamColor}40)` }} />
                <div className="rider-num-badge">#{rider.num}</div>
                <div className="ghost-num">{rider.num}</div>
              </div>
              <div className="rider-info">
                <div className="rider-name">
                  {rider.name}
                  <div className="rider-flag">
                    {rider.flag.map((c, i) => <span key={i} style={{ background: c }} />)}
                  </div>
                </div>
                <div className="rider-team">{rider.team}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Viewing Preference */}
        <div className="section-card">
          <div className="sc-title"><span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg></span> Viewing Preference</div>
          <div className="toggle-group">
            {['Watch Live', 'Highlights Only', 'Both'].map(opt => (
              <div key={opt} className={`tg-opt ${viewPref === opt ? 'active' : ''}`} onClick={() => setViewPref(opt)}>{opt}</div>
            ))}
          </div>
        </div>

        {/* Spoiler Shield */}
        <div className="section-card">
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Spoiler Shield</div>
              <div className="setting-desc">Hide race results until you watch — no spoilers in your feed</div>
            </div>
            <div className="toggle-switch" />
          </div>
        </div>

        {/* Timezone */}
        <div className="section-card">
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Your Timezone</div>
              <div className="setting-desc">We'll set your race alarms and schedules automatically</div>
            </div>
            <div className="dropdown">
              <span className="val">Asia/Kolkata (IST · UTC+5:30)</span>
              <span className="arrow">▼</span>
            </div>
          </div>
        </div>

        {/* Race Start Alerts */}
        <div className="section-card">
          <div className="setting-row">
            <div className="setting-info">
              <div className="setting-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> Race Start Alerts</div>
              <div className="setting-desc">Push notifications 30 min before each session goes live</div>
            </div>
            <div className="toggle-switch" />
          </div>
        </div>

        {/* CTA */}
        <div className="cta-area">
          <button className="cta-btn" onClick={() => navigate('/cockpit')}>Let's Go →</button>
          <div className="cta-secondary" onClick={() => navigate('/cockpit')}>I'll set this up later</div>
        </div>

        {/* Progress */}
        <div className="progress-dots">
          <div className="pdot active" />
          <div className="pdot" />
          <div className="pdot" />
        </div>
        <div className="step-labels">
          <div className="step-lbl active">Personalize</div>
          <div className="step-lbl">Preferences</div>
          <div className="step-lbl">Confirm</div>
        </div>
      </div>

      {/* Footer */}
      <div className="ob-footer">
        <div className="brand-text">MOTOGP ULTIMATE HUB</div>
        <span>·</span>
        <span>© 2026 · YOUR DATA IS NEVER SOLD</span>
      </div>
    </div>
  );
}
