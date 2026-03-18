import { useNavigate } from 'react-router-dom';
import './PurpleSector.css';

const lines = [...Array(20)].map((_, i) => ({
  id: i,
  top: `${5 + i * 5}%`,
  delay: `${i * 0.05}s`,
  duration: `${0.4 + Math.random() * 0.3}s`
}));

const particles = [...Array(30)].map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: `${1.5 + Math.random() * 2}s`,
  size: `${2 + Math.random() * 4}px`
}));

export default function PurpleSector() {
  const navigate = useNavigate();

  return (
    <div className="ps-overlay" onClick={() => navigate('/cockpit')}>
      {/* Speed lines */}
      <div className="speed-lines">
        {lines.map(line => (
          <div key={line.id} className="speed-line" style={{ top: line.top, animationDelay: line.delay, animationDuration: line.duration }} />
        ))}
      </div>

      {/* Glow rings */}
      <div className="ring ring-1" />
      <div className="ring ring-2" />
      <div className="ring ring-3" />

      {/* Center content */}
      <div className="ps-center">
        <div className="ps-sector-badge">
          <span className="ps-star">★</span> PURPLE SECTOR <span className="ps-star">★</span>
        </div>
        <div className="ps-rider-name">BAGNAIA</div>
        <div className="ps-time">19.143</div>
        <div className="ps-sector-id">SECTOR 3 · LUSAIL CIRCUIT</div>
        <div className="ps-meta">
          <div className="ps-meta-cell">
            <div className="ps-meta-val">1.6G</div>
            <div className="ps-meta-lbl">Peak G-Force</div>
          </div>
          <div className="ps-divider" />
          <div className="ps-meta-cell">
            <div className="ps-meta-val">62°</div>
            <div className="ps-meta-lbl">Max Lean</div>
          </div>
          <div className="ps-divider" />
          <div className="ps-meta-cell">
            <div className="ps-meta-val">312 KM/H</div>
            <div className="ps-meta-lbl">Entry Speed</div>
          </div>
        </div>
        <div className="ps-dismiss">Click anywhere to dismiss</div>
      </div>

      {/* Particles */}
      <div className="ps-particles">
        {particles.map(p => (
          <div key={p.id} className="ps-particle" style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }} />
        ))}
      </div>
    </div>
  );
}
