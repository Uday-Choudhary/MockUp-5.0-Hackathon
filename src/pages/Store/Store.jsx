import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { getProducts, getLimitedDrops } from '../../api';
import './Store.css';

export default function Store() {
  const [products, setProducts] = useState([]);
  const [drop, setDrop] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Gear');

  useEffect(() => {
    Promise.all([getProducts(), getLimitedDrops()]).then(([prods, dropData]) => {
      if (prods) setProducts(prods);
      if (dropData) setDrop(dropData);
    });
  }, []);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const categoryMap = {
      'All Gear': null,
      'Helmets': 'helmets',
      'Apparel': 'apparel',
      'Tickets': 'tickets',
      'Collectibles': 'collectibles',
    };
    getProducts(categoryMap[cat]).then(data => {
      if (data) setProducts(data);
    });
  };

  return (
    <div className="layout">
      <Sidebar raceMode={false} />
      <main className="store-main">
        {/* Topbar */}
        <div className="store-topbar">
          <div className="store-title">Flagship Store</div>
          <div className="search-bar">
            <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="var(--text-secondary)" /></svg>
            <input type="text" placeholder="Search helmets, apparel, tickets..." />
          </div>
          <div className="topbar-icons">
            <div className="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
            <div className="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><div className="cart-badge">3</div></div>
          </div>
        </div>

        {/* Category pills */}
        <div className="cat-row">
          {['All Gear', 'Helmets', 'Apparel', 'Tickets', 'Collectibles'].map(c => (
            <div key={c} className={`cpill ${activeCategory === c ? 'active' : ''}`} onClick={() => handleCategoryClick(c)}>{c}</div>
          ))}
          <div className="cpill cpill--drop"><span style={{ marginRight: '6px' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginTop: '-2px' }}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg></span> Limited Drops</div>
        </div>

        {/* Limited Drop Banner */}
        {drop && (
          <div className="drop-banner">
            <div className="drop-inner">
              <div className="drop-left">
                <div className="drop-badge"><div className="dbdot" />LIMITED DROP</div>
                <div className="drop-product">{drop.product}</div>
                <div className="drop-scarcity">⚠ Only {drop.remaining} remaining</div>
              </div>
              <div className="drop-center">
                <div className="drop-cd-label">ENDS IN</div>
                <div className="drop-cd">
                  {[[drop.countdown.hours,'Hr'],[drop.countdown.minutes,'Min'],[drop.countdown.seconds,'Sec']].map(([n,l]) => (
                    <div key={l} className="drop-cd-unit"><div className="drop-cd-num">{n}</div><div className="drop-cd-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
              <div className="drop-right">
                <div className="drop-price">{drop.price}</div>
                <div className="drop-btns">
                  <button className="btn-notify">NOTIFY ME</button>
                  <button className="btn-buy">BUY NOW →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid-header">
          <div className="grid-title">{activeCategory === 'All Gear' ? 'All Products' : activeCategory}</div>
          <div className="grid-count">{products.length} ITEMS</div>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={p.id || i} className="product-card">
              <div className="product-img">
                {p.img.length < 10 ? (
                  <div className="product-emoji">{p.img}</div>
                ) : (
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '8px' }} />
                )}
                {p.badge && <div className={`product-badge ${p.badgeCls}`}>{p.badge}</div>}
              </div>
              <div className="product-body">
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price}</div>
              </div>
              <div className="quick-add"><button className="qa-btn">Quick Add</button></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
