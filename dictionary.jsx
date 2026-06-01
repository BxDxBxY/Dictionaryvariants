/* Dictionary list + Term entry pages */
/* global React */
const { useState, useEffect, useMemo, useRef } = React;
const { Icon, navigate, StarOctagon, SuzaniMedallion, Flourish, GirihLattice } = window.DL;

// Uzbek alphabet (Latin) — extended
const ALPHA_LAT = "ABDEFGHIJKLMNOPQRSTUVXYZ".split('');
const ALPHA_CYR = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЪЫЬЭЮЯ".split('');

function getFirstLetter(t, script) {
  return (t[script] || '').charAt(0).toUpperCase();
}

function DictionaryPage({ script, params }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const initialQ = params.q || '';
  const initialCat = params.cat || '';
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  const filtered = useMemo(() => {
    let list = window.TERMS;
    if (category) list = list.filter(x => x.cat === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(x =>
        x.term.lat.toLowerCase().includes(q) ||
        x.term.cyr.toLowerCase().includes(q) ||
        x.def.lat.toLowerCase().includes(q) ||
        (x.trans.ru || '').toLowerCase().includes(q) ||
        (x.trans.en || '').toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => a.term[script].localeCompare(b.term[script], script === 'cyr' ? 'ru' : 'uz-Latn'));
  }, [query, category, script]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach(it => {
      const L = getFirstLetter(it.term, script);
      if (!map.has(L)) map.set(L, []);
      map.get(L).push(it);
    });
    return Array.from(map.entries());
  }, [filtered, script]);

  const lettersInList = useMemo(() => new Set(grouped.map(([L]) => L)), [grouped]);

  // Auto-pick the first item when nothing selected
  useEffect(() => {
    if (!activeId && filtered.length) setActiveId(filtered[0].id);
    if (activeId && !filtered.find(x => x.id === activeId) && filtered.length) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  const active = filtered.find(x => x.id === activeId) || filtered[0];
  const alphabet = script === 'lat' ? ALPHA_LAT : ALPHA_CYR;

  const jumpToLetter = (L) => {
    const el = scrollRef.current?.querySelector(`[data-letter="${L}"]`);
    if (el) el.scrollIntoView({ block: 'start' });
  };

  return (
    <main className="fade-in">
      <div className="dict-shell">
        {/* LEFT: list rail */}
        <aside className="dict-list">
          <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent)' }}>
            <StarOctagon size={11}/>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>
              {t("INDEKS · A — Z", 'ИНДЕКС · А — Я')}
            </span>
            <span style={{ flex: 1, height: 1, background: 'var(--border)' }}></span>
          </div>
          <div className="dict-list-search">
            <input
              autoFocus
              placeholder={t('Termin qidirish…', 'Термин қидириш…')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <button
                className={`related-chip ${!category ? 'active' : ''}`}
                onClick={() => setCategory('')}
                style={{ fontSize: 11, margin: 0, padding: '4px 10px',
                         color: !category ? 'var(--accent)' : 'var(--fg-mute)',
                         borderColor: !category ? 'var(--accent)' : 'var(--border)' }}
              >
                {t('Hammasi', 'Барчаси')}
              </button>
              {window.CATEGORIES.slice(0, 4).map(c => (
                <button key={c.id}
                  className="related-chip"
                  onClick={() => setCategory(category === c.id ? '' : c.id)}
                  style={{ fontSize: 11, margin: 0, padding: '4px 10px',
                           color: category === c.id ? 'var(--accent)' : 'var(--fg-mute)',
                           borderColor: category === c.id ? 'var(--accent)' : 'var(--border)' }}
                >
                  {c.name[script].split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="alpha-bar">
            {alphabet.map(L => (
              <button key={L}
                className={`${lettersInList.has(L) ? '' : 'empty'}`}
                onClick={() => lettersInList.has(L) && jumpToLetter(L)}
                disabled={!lettersInList.has(L)}>
                {L}
              </button>
            ))}
          </div>

          <div className="dict-list-scroll" ref={scrollRef}>
            {grouped.length === 0 && (
              <div style={{ padding: 32, color: 'var(--fg-mute)', fontSize: 14, textAlign: 'center' }}>
                {t('Hech narsa topilmadi', 'Ҳеч нарса топилмади')}
              </div>
            )}
            {grouped.map(([L, items]) => (
              <div key={L} data-letter={L}>
                <div className="dict-letter-head">{L} · {items.length}</div>
                {items.map(it => (
                  <div key={it.id}
                       className={`dict-list-item ${activeId === it.id ? 'active' : ''}`}
                       onClick={() => setActiveId(it.id)}>
                    <span className="term">{it.term[script]}</span>
                    <span className="meta">{it.cat}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: full entry */}
        <section>
          {active && <TermEntry term={active} script={script} compact={false}/>}
        </section>
      </div>
    </main>
  );
}

// Standalone term page (full URL)
function TermPage({ script, id }) {
  const term = window.TERMS.find(x => x.id === id);
  if (!term) return window.DL.NotFoundPage({ script });
  return (
    <main className="fade-in">
      <div className="container">
        <TermEntry term={term} script={script} compact={true}/>
      </div>
    </main>
  );
}

// ---------- Term entry render ----------
function TermEntry({ term, script, compact }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const cat = window.CATEGORIES.find(c => c.id === term.cat);
  const related = (term.related || []).map(rid => window.TERMS.find(x => x.id === rid)).filter(Boolean);

  return (
    <article className="dict-entry" style={Object.assign({ position: 'relative' }, compact ? { padding: '56px 0 96px', maxWidth: 880, margin: '0 auto' } : {})}>
      {/* Suzani medallion backdrop behind the term */}
      <div style={{ position: 'absolute', top: 24, right: -40, color: 'var(--accent)', opacity: 0.10, pointerEvents: 'none' }}>
        <SuzaniMedallion size={320}/>
      </div>

      <div className="entry-crumbs">
        <span style={{ color: 'var(--accent)', display: 'inline-flex' }}><StarOctagon size={9}/></span>
        <a href="#/dictionary" onClick={(e)=>{e.preventDefault(); navigate('/dictionary');}}>
          {t('LUG‘AT', 'ЛУҒАТ')}
        </a>
        <span>›</span>
        <span>{cat.name[script].toUpperCase()}</span>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>{term.term[script].toUpperCase()}</span>
      </div>

      <h1 className="entry-term" style={{ position: 'relative', zIndex: 1 }}>{term.term[script]}</h1>
      <div className="entry-pron">
        <button className="audio-btn" title="Pronounce"><Icon name="play" size={11}/></button>
        <span>{term.pron[script]}</span>
        <span className="tag">{cat.name[script]}</span>
        <span className="tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>№ {term.cat}</span>
      </div>

      {/* Definition */}
      <div className="entry-section">
        <div className="label">{t('TA‘RIF', 'ТАЪРИФ')}</div>
        <div>
          <p>{term.def[script]}</p>
        </div>
      </div>

      {/* Etymology */}
      <div className="entry-section">
        <div className="label">{t('ETIMOLOGIYA', 'ЭТИМОЛОГИЯ')}</div>
        <div>
          <p>
            <span className="lang-tag">{term.origin.lang}</span>
            <em style={{ fontSize: 19 }}>{term.origin.word}</em>
            <span style={{ color: 'var(--fg-mute)', marginLeft: 12 }}>— {term.origin.mean}</span>
          </p>
        </div>
      </div>

      {/* Translations */}
      <div className="entry-section">
        <div className="label">{t('TARJIMA', 'ТАРЖИМА')}</div>
        <div>
          <p style={{ marginBottom: 6 }}>
            <span className="lang-tag">RU</span>{term.trans.ru}
          </p>
          <p>
            <span className="lang-tag">EN</span>{term.trans.en}
          </p>
        </div>
      </div>

      {/* Examples */}
      <div className="entry-section">
        <div className="label">{t('MISOL', 'МИСОЛ')}</div>
        <div>
          {term.examples.map((ex, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <p className="entry-quote">{ex[script]}</p>
              <div className="entry-quote-source">— {ex.src}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="entry-section">
          <div className="label">{t('BOG‘LIQ', 'БОҒЛИҚ')}</div>
          <div>
            {related.map(r => (
              <span key={r.id} className="related-chip" onClick={() => navigate('/term/' + r.id)}>
                {r.term[script]} <span className="arrow">↗</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Decorative flourish */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0', color: 'var(--accent)', opacity: 0.6 }}>
        <Flourish width={220}/>
      </div>

      {/* Actions */}
      <div className="entry-section" style={{ paddingBottom: 0 }}>
        <div className="label">{t('AMALLAR', 'АМАЛЛАР')}</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn"><Icon name="bookmark" size={13}/> {t('Saqlash', 'Сақлаш')}</button>
          <button className="btn"><Icon name="share" size={13}/> {t('Ulashish', 'Улашиш')}</button>
          <button className="btn"><Icon name="print" size={13}/> {t('Chop etish', 'Чоп этиш')}</button>
        </div>
      </div>
    </article>
  );
}

window.DL = Object.assign(window.DL || {}, {
  DictionaryPage, TermPage, TermEntry
});
