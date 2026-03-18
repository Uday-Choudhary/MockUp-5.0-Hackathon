import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const riders = [
  { id: 1, name: 'Marc Márquez', num: 93, team: 'Ducati Lenovo Team', flag: ['#AD1519', '#FABD00', '#AD1519'], teamColor: '#E8002D', img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Marc_M%C3%A1rquez_at_Estrella_Galicia_stand_during_2025_Dutch_TT.jpg' },
  { id: 2, name: 'Francesco Bagnaia', num: 1, team: 'Ducati Lenovo Team', flag: ['#009246', '#FFF', '#CE2B37'], teamColor: '#E8002D', img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRLoPo0axzDvpUncjxytNuVCLIDMbLQ7CVwwCLuyiOil3sYmw0_OHUDgn6cZ5mIXFXDehbjAqlqPnKTO-tFbFTCKLiTLSzKtZAdMqW5uDFgQhwQL0i7KwGBCG9V4axyxwvaiT0hsrOfNTCI&s=19' },
  { id: 3, name: 'Jorge Martín', num: 89, team: 'Pramac Racing', flag: ['#AD1519', '#FABD00', '#AD1519'], teamColor: '#E8002D', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcXm9vvKHOikYJB3PtugH_PHcBPI9ZN7rQnlXZ3Pqo-bYiZX0joWedkSTkPvqAXLKZPQcYQowgj6FZjHUdcypz3_BWI61CnOkBFGPWvvenA&s=10' },
  { id: 4, name: 'Franco Morbidelli', num: 21, team: 'Ducati Lenovo Team', flag: ['#009246', '#FFF', '#CE2B37'], teamColor: '#E8002D', img: 'data:image/jpeg;base64,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' },
  { id: 5, name: 'Marco Bezzecchi', num: 72, team: 'Aprilia Racing', flag: ['#009246', '#FFF', '#CE2B37'], teamColor: '#009900', img: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRv3ct5rBfwrpPaeKmorrq8UTm4wSCsXU6wS3lwvgEmUfCnpkg49Ve1exwvoV6aiDO7-WcAsfaFy_z9Ef8FnBkzn7SAv0ikOBT-i13qgozyaezJlkdH0TvUE6YYdwvUPpPNGcxR588Iqa7W&s=19' },
  { id: 6, name: 'Aleix Espargaró', num: 41, team: 'Aprilia Racing', flag: ['#AD1519', '#FABD00', '#AD1519'], teamColor: '#009900', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHEpbKEyQYFKAbjZBDTq3LWBcOs2QC0FiFT5r8Y4a_slWiEccwfHpkl_fktYJ2rFSbw-c_vTI7ccM59fqSnodYCiXqrRbJ0nX4ysP1y1Zgw&s=10' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([1, 2]);
  const [viewPref, setViewPref] = useState('Watch Live');

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
          {riders.map(rider => (
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
