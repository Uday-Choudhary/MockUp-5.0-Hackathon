import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getBreakingNews, getNewsFeed, getVideos, getChampionship, getNextRace } from '../../api';
import './Paddock.css';

export default function Paddock() {
  const [breaking, setBreaking] = useState(null);
  const [feed, setFeed] = useState([]);
  const [videos, setVideos] = useState([]);
  const [championship, setChampionship] = useState([]);
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    Promise.all([getBreakingNews(), getNewsFeed(), getVideos(), getChampionship(), getNextRace()]).then(([br, fd, vids, champ, nr]) => {
      if (br) setBreaking(br);
      if (fd) setFeed(fd);
      if (vids) setVideos(vids);
      if (champ) setChampionship(champ);
      if (nr) setNextRace(nr);
    });
  }, []);

  return (
    <div className="layout">
      <Sidebar raceMode={true} />
      <main className="paddock-main">
        {/* Top bar */}
        <div className="pad-topbar">
          <div className="pad-title">The Paddock</div>
          <div className="pad-topbar-right">
            <div className="personalized-text">Personalized for <strong>Rahul</strong> · Following <strong>Bagnaia</strong>, <strong>Marquez</strong></div>
            <div className="settings-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="filter-row">
          {['All', 'Bagnaia #1', 'Marquez #93', 'Martin #89', 'Morbidelli #10'].map((f, i) => (
            <div key={f} className={`fpill ${i === 0 ? 'active' : ''}`}>{f}</div>
          ))}
        </div>

        {/* Content grid */}
        <div className="content-grid">
          {/* Left Column */}
          <div className="pad-col-l">
            {/* Breaking */}
            {breaking && (
              <div className="featured">
                <div className="feat-body">
                  <div className="feat-tag-row">
                    <div className="breaking-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{marginRight:3, verticalAlign:'middle'}}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>{breaking.tag}</div>
                    <div className="feat-source">{breaking.source}</div>
                  </div>
                  <div className="feat-headline">{breaking.headline}</div>
                  <div className="feat-excerpt">{breaking.excerpt}</div>
                  <div className="feat-meta">
                    <span>{breaking.meta.publisher}</span>
                    <div className="dot" />
                    <span>{breaking.meta.category}</span>
                    <div className="dot" />
                    <span>{breaking.meta.time}</span>
                    <div className="read-link">Read full story <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg></div>
                  </div>
                </div>
              </div>
            )}

            {/* Wired Different */}
            <div>
              <div className="section-header"><div className="pad-section-title">Wired Different</div></div>
              <div className="vid-row">
                {videos.map((v, i) => (
                  <div key={i} className="vid-card">
                    <div className="vid-thumb">
                      <div className="play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
                      <div className="vid-dur">{v.dur}</div>
                    </div>
                    <div className="vid-info"><div className="vid-title">{v.title}</div><div className="vid-meta">{v.meta}</div></div>
                  </div>
                ))}
              </div>
            </div>

            {/* News Feed */}
            <div className="news-list">
              {feed.map((n, i) => (
                <div key={i} className={`news-card ${n.rider ? 'news-card--rider' : ''}`}>
                  <div className="rider-avatar-pad">{n.initials}</div>
                  <div className="news-body">
                    <div className="news-hl">{n.hl}</div>
                    <div className="news-footer">
                      <div className="news-meta">{n.meta}</div>
                      {n.rider && <div className="your-rider-badge">YOUR RIDER</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="pad-col-r">
            {/* Race Week */}
            <div className="glass-card">
              <div className="gc-label">Next Race</div>
              <div className="race-week-title">{nextRace?.name || 'Austin GP'}</div>
              <div className="countdown">
                {[
                  [nextRace?.countdown?.days || '03', 'Days'],
                  [nextRace?.countdown?.hours || '14', 'Hrs'],
                  [nextRace?.countdown?.minutes || '22', 'Min'],
                ].map(([n, l]) => (
                  <div key={l} className="cd-unit"><div className="cd-num">{n}</div><div className="cd-lbl">{l}</div></div>
                ))}
              </div>
              <div className="session-list">
                {(nextRace?.sessions || [
                  { name: 'Free Practice 1', time: 'Fri · 10:00' },
                  { name: 'Free Practice 2', time: 'Fri · 15:00' },
                  { name: 'Qualifying', time: 'Sat · 11:30' },
                  { name: 'Sprint Race', time: 'Sat · 15:00' },
                  { name: 'Main Race', time: 'Sun · 14:00' },
                ]).map(s => (
                  <div key={s.name} className="sess-row"><span className="sess-name">{s.name}</span><span className="sess-time">{s.time}</span></div>
                ))}
              </div>
            </div>

            {/* Championship */}
            <div className="glass-card">
              <div className="gc-label" style={{ marginBottom: 12 }}>Championship</div>
              {championship.map(r => (
                <div key={r.pos} className="champ-row">
                  <div className="champ-pos">{r.pos}</div>
                  <div className="champ-bar" style={{ background: r.bar }} />
                  <div className="champ-name" style={r.highlight ? { color: 'var(--accent-blue)' } : {}}>{r.name}</div>
                  <div className="champ-pts" style={r.pos === 1 ? { color: 'var(--gold-leader)' } : {}}>{r.pts}</div>
                  <div className={`champ-delta ${r.deltaClass}`}>{r.delta}</div>
                </div>
              ))}
            </div>

            {/* Fan Pulse */}
            <div className="glass-card">
              <div className="gc-label">Fan Pulse</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 2, color: 'var(--text-primary)', marginBottom: 4 }}>Live Reactions</div>
              <div className="fan-desc">158K fans reacted during Qatar GP</div>
              <div className="reaction-list">
                {[
                  { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6820" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>, w: 88, bg: 'linear-gradient(90deg,rgba(232,80,0,0.5),#FF6820)', count: '88.2K' },
                  { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>, w: 62, bg: 'linear-gradient(90deg,rgba(155,48,255,0.4),var(--accent-blue))', count: '62.1K' },
                  { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-leader)" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>, w: 74, bg: 'linear-gradient(90deg,rgba(180,130,0,0.4),var(--gold-leader))', count: '74.4K' },
                  { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B30FF" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>, w: 45, bg: 'linear-gradient(90deg,rgba(100,20,160,0.5),#9B30FF)', count: '45.7K' },
                  { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>, w: 33, bg: 'linear-gradient(90deg,rgba(100,100,100,0.3),rgba(180,180,180,0.6))', count: '33.0K' },
                ].map((r, i) => (
                  <div key={i} className="reaction-row">
                    <div className="reaction-emoji">{r.svg}</div>
                    <div className="reaction-bar-wrap"><div className="reaction-fill" style={{ width: `${r.w}%`, background: r.bg }} /></div>
                    <div className="reaction-count">{r.count}</div>
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
