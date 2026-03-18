import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ raceMode = true }) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-mark">
        <div className="logo-badge">MH</div>
        <div className="logo-text">
          <div className="brand">MOTOGP HUB</div>
          <div className="sub">Ultimate Access</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <NavLink to={raceMode ? '/cockpit' : '/cockpit/news'} className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
          </span>
          Cockpit
        </NavLink>
        <NavLink to="/paddock" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>
          </span>
          Paddock
        </NavLink>
        <NavLink to="/store" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">
            <svg viewBox="0 0 24 24"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h12v12z" /></svg>
          </span>
          Store
        </NavLink>
        <NavLink to="/rider/bagnaia" className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">
            <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          </span>
          Profile
        </NavLink>
      </nav>

      {/* Race Mode */}
      <div className="race-mode-section">
        <div className="race-mode-label">Session Mode</div>
        <div className="race-mode-row" onClick={() => navigate(raceMode ? '/cockpit/news' : '/cockpit')}>
          <div>
            <div className="race-mode-text">{raceMode ? 'RACE MODE' : 'NEWS MODE'}</div>
            <div className="race-mode-status">{raceMode ? 'ACTIVE' : 'RACE MODE OFF'}</div>
          </div>
          <div className={`toggle ${raceMode ? '' : 'toggle--off'}`}></div>
        </div>
      </div>

      {/* User */}
      <div className="user-area">
        <div className="user-avatar">R</div>
        <div className="user-info">
          <div className="uname">Rahul</div>
          <div className="ufav">↗ Bagnaia #1</div>
        </div>
      </div>
    </aside>
  );
}
