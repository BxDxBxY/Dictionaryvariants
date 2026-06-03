/* Shared chrome: Topbar, Footer, Icons, Hooks */
/* global React */
const { useState, useEffect, useMemo, useCallback, useRef } = React;

// ---------- Hash router ----------
function useHashRoute() {
  const parse = () => {
    const h = window.location.hash.replace(/^#/, '') || '/';
    const [path, query = ''] = h.split('?');
    const params = Object.fromEntries(new URLSearchParams(query));
    return { path, params };
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Theme + script ----------
function useAppPrefs() {
  const [theme, setTheme] = useState(() => localStorage.getItem('dl-theme') || 'dark');
  const [script, setScript] = useState(() => localStorage.getItem('dl-script') || 'lat');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dl-theme', theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem('dl-script', script);
  }, [script]);

  return { theme, setTheme, script, setScript };
}

// ---------- Icons ----------
function Icon({ name, size = 16 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    search:    <React.Fragment><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></React.Fragment>,
    sun:       <React.Fragment><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></React.Fragment>,
    moon:      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    play:      <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>,
    arrow:     <path d="M5 12h14M13 5l7 7-7 7"/>,
    arrowSm:   <path d="M7 17 17 7M9 7h8v8"/>,
    book:      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5A2.5 2.5 0 0 0 6.5 22H20"/>,
    chevR:     <path d="m9 18 6-6-6-6"/>,
    star:      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
    close:     <path d="M18 6 6 18M6 6l18 12"/>,
    quote:     <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>,
    print:     <React.Fragment><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></React.Fragment>,
    share:     <React.Fragment><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></React.Fragment>,
    bookmark:  <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>,
    menu:      <React.Fragment><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></React.Fragment>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function BrandLogo({ size = 52 }) {
  return (
    <img
      src="logo2.png"
      alt="UWED Diplomatik Akademiya"
      className="brand-logo"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}

// ---------- Topbar ----------
function Topbar({ active, prefs, heroExpanded = false }) {
  const { theme, setTheme, script, setScript } = prefs;
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const items = [
    { id: 'home',       href: '#/',           label: t('Bosh sahifa', 'Бош саҳифа') },
    { id: 'about',      href: '#/about',      label: t('Lugʻat haqida', 'Луғат ҳақида') },
    { id: 'dictionary', href: '#/dictionary', label: t('Lugʻat', 'Луғат') },
    { id: 'contact',    href: '#/contact',    label: t('Kontaktlar', 'Контактлар') },
  ];

  return (
    <header className={`topbar${heroExpanded ? ' topbar--hero-expanded' : ''}`}>
      <div className="topbar-inner">
        <a href="#/" className="brand" onClick={(e)=>{e.preventDefault();navigate('/');}}>
          <BrandLogo size={52}/>
          <div>
            <div className="brand-name">Diplomatik Lug‘at</div>
            <div className="brand-tag">UWED · Diplomatik Akademiya</div>
          </div>
        </a>
        <nav className="nav">
          {items.map(it => (
            <a key={it.id} href={it.href}
               className={active === it.id ? 'active' : ''}
               onClick={(e)=>{e.preventDefault(); navigate(it.href.slice(1));}}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="topbar-tools">
          <div className="script-toggle" title="Latin / Cyrillic">
            <button className={script === 'lat' ? 'on' : ''} onClick={() => setScript('lat')}>Lat</button>
            <button className={script === 'cyr' ? 'on' : ''} onClick={() => setScript('cyr')}>Кир</button>
          </div>
          <button className="icon-btn" title="Theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ---------- Footer ----------
function Footer({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand" style={{ marginBottom: 16 }}>
            <BrandLogo size={44}/>
            <div>
              <div className="brand-name">Diplomatik Lug‘at</div>
              <div className="brand-tag">UWED · 2024</div>
            </div>
          </div>
          <p style={{ color: 'var(--fg-mute)', fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 28 + 'ch' }}>
            {t(
              'Markaziy Osiyodagi birinchi ilmiy asoslangan diplomatik izohli lugʻat.',
              'Марказий Осиёдаги биринчи илмий асосланган дипломатик изоҳли луғат.'
            )}
          </p>
        </div>
        <div>
          <h5>{t('Sayt', 'Сайт')}</h5>
          <ul>
            <li><a href="#/" onClick={(e)=>{e.preventDefault();navigate('/');}}>{t('Bosh sahifa', 'Бош саҳифа')}</a></li>
            <li><a href="#/about" onClick={(e)=>{e.preventDefault();navigate('/about');}}>{t('Lugʻat haqida', 'Луғат ҳақида')}</a></li>
            <li><a href="#/dictionary" onClick={(e)=>{e.preventDefault();navigate('/dictionary');}}>{t('Lugʻat', 'Луғат')}</a></li>
            <li><a href="#/contact" onClick={(e)=>{e.preventDefault();navigate('/contact');}}>{t('Kontaktlar', 'Контактлар')}</a></li>
          </ul>
        </div>
        <div>
          <h5>{t('Hujjatlar', 'Ҳужжатлар')}</h5>
          <ul>
            <li><a href="#/terms" onClick={(e)=>{e.preventDefault();navigate('/terms');}}>{t('Shartlar va Qoidalar', 'Шартлар ва Қоидалар')}</a></li>
            <li><a href="#/privacy" onClick={(e)=>{e.preventDefault();navigate('/privacy');}}>{t('Maxfiylik siyosati', 'Махфийлик сиёсати')}</a></li>
            <li><a href="#/contact" onClick={(e)=>{e.preventDefault();navigate('/contact');}}>{t('Kontakt', 'Контакт')}</a></li>
          </ul>
        </div>
        <div>
          <h5>{t('Ijtimoiy', 'Ижтимоий')}</h5>
          <ul>
            <li><a href="https://t.me/diplugat" target="_blank" rel="noopener">Telegram · @diplugat</a></li>
            <li><a href="https://x.com/uwedofficial" target="_blank" rel="noopener">X · @uwedofficial</a></li>
            <li><a href="#" target="_blank" rel="noopener">LinkedIn · UWED</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 «DIPLOMATIC ACADEMY»</span>
        <span>{t('BARCHA HUQUQLAR HIMOYALANGAN', 'БАРЧА ҲУҚУҚЛАР ҲИМОЯЛАНГАН')}</span>
      </div>
    </footer>
  );
}

window.DL = Object.assign(window.DL || {}, {
  useHashRoute, navigate, useAppPrefs, Icon, BrandLogo, Topbar, Footer
});
