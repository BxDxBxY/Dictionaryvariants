/* Dictionary list + Term entry pages */
/* global React */
const { useState, useEffect, useMemo, useRef, useCallback } = React;
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
  const [terms, setTerms] = useState(window.TERMS || []);
  const [activeTerm, setActiveTerm] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const scrollRef = useRef(null);
  const searchTimer = useRef(null);

  // Debounced live search against the backend
  const doSearch = useCallback(async (q, cat) => {
    if (!q && !cat) {
      // No query — show all local terms (already loaded at boot)
      setTerms(window.TERMS || []);
      return;
    }
    setSearching(true);
    try {
      const results = await window.DL_API.DictAPI.search(q, cat);
      setTerms(results);
    } catch (err) {
      // Fallback: filter local terms
      let list = window.TERMS || [];
      if (cat) list = list.filter(x => x.cat === cat);
      if (q) {
        const lq = q.toLowerCase();
        list = list.filter(x =>
          x.term.lat.toLowerCase().includes(lq) ||
          x.term.cyr.toLowerCase().includes(lq) ||
          x.def.lat.toLowerCase().includes(lq) ||
          (x.trans.ru || '').toLowerCase().includes(lq) ||
          (x.trans.en || '').toLowerCase().includes(lq)
        );
      }
      setTerms(list);
    } finally {
      setSearching(false);
    }
  }, []);

  // Re-run search whenever query or category changes (debounced 300 ms)
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => doSearch(query, category), 300);
    return () => clearTimeout(searchTimer.current);
  }, [query, category, doSearch]);

  // Keep in sync when global TERMS refreshes (after API bootstrap)
  useEffect(() => {
    const onReady = () => {
      if (!query && !category) setTerms(window.TERMS || []);
    };
    window.addEventListener('dl:ready', onReady);
    return () => window.removeEventListener('dl:ready', onReady);
  }, [query, category]);

  // Fetch full term detail when user selects a list item
  useEffect(() => {
    if (!activeId) {
      setActiveTerm(null);
      return;
    }
    const preview = (window.TERMS || []).find(x => x.id === activeId);
    setActiveTerm(preview || null);
    setDetailLoading(true);
    window.DL_API.DictAPI.getTerm(activeId)
      .then(t => setActiveTerm(t))
      .catch(() => { if (preview) setActiveTerm(preview); })
      .finally(() => setDetailLoading(false));
  }, [activeId]);

  const filtered = useMemo(() =>
    [...terms].sort((a, b) =>
      a.term[script].localeCompare(b.term[script], script === 'cyr' ? 'ru' : 'uz-Latn')
    ), [terms, script]);

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
            <div style={{ position: 'relative' }}>
              <input
                autoFocus
                placeholder={t('Termin qidirish…', 'Термин қидириш…')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {searching && (
                <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>
                  ···
                </span>
              )}
            </div>
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
              {(window.CATEGORIES || []).slice(0, 4).map(c => (
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
            {grouped.length === 0 && !searching && (
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
                       title={t('Ikki marta bosing — alohida sahifa', 'Икки марта босинг — алоҳида саҳифа')}
                       onClick={() => setActiveId(it.id)}
                       onDoubleClick={() => navigate('/term/' + it.id)}>
                    <span className="term">{it.term[script]}</span>
                    <span className="meta">{it.cat}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT: full entry (loaded from API on click) */}
        <section>
          {detailLoading && !activeTerm?.def?.lat && (
            <div style={{ padding: 48, color: 'var(--fg-mute)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em' }}>
              {t('Yuklanmoqda…', 'Юкланмоқда…')}
            </div>
          )}
          {activeTerm && (!detailLoading || activeTerm.def?.lat) && (
            <TermEntry term={activeTerm} script={script} compact={false}/>
          )}
        </section>
      </div>
    </main>
  );
}

// Standalone term page (full URL) — fetches from API by id
function TermPage({ script, id }) {
  const [term, setTerm] = useState(() => (window.TERMS || []).find(x => x.id === id) || null);
  const [loading, setLoading] = useState(!term);

  useEffect(() => {
    setLoading(true);
    window.DL_API.DictAPI.getTerm(id)
      .then(t => setTerm(t))
      .catch(() => setTerm(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <main className="fade-in">
      <div className="container" style={{ padding: '80px 32px', color: 'var(--fg-mute)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em' }}>
        YUKLANMOQDA…
      </div>
    </main>
  );
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
  const cat = (window.CATEGORIES || []).find(c => c.id === term.cat) || { name: { lat: term.cat, cyr: term.cat } };
  const related = (term.related || []).map(rid => (window.TERMS || []).find(x => x.id === rid)).filter(Boolean);
  const [saved, setSaved] = useState(() => window.TermActions?.isSaved(term.id) || false);
  const [speaking, setSpeaking] = useState(false);
  const articleRef = useRef(null);
  const TA = window.TermActions;

  const handleSave = () => {
    const now = TA.toggleSave(term.id);
    setSaved(now);
    TA.showToast(now ? t('Saqlanganlarga qo\'shildi', 'Сақланганларга қўшилди') : t('Saqlanganlardan olib tashlandi', 'Сақланганлардан олиб ташланди'));
  };

  const handleShare = async () => {
    const result = await TA.shareTerm(term, script);
    if (result === true) TA.showToast(t('Ulashildi', 'Улашилди'));
    else if (result === 'copied') TA.showToast(t('Havola nusxalandi', 'Ҳавола нусхаланди'));
    else TA.showToast(t('Ulashib bo\'lmadi', 'Улашиб бўлмади'));
  };

  const handlePrint = () => {
    const ok = TA.printTerm(term, script, cat.name[script]);
    if (!ok) TA.showToast(t('Chop etish bloklangan', 'Чоп этиш блокланган'));
  };

  const handleSpeak = () => {
    const text = [term.term[script], term.pron[script], term.def[script]].filter(Boolean).join('. ');
    if (!TA.speakText(text, script)) {
      TA.showToast(t('Ovoz qo\'llab-quvvatlanmaydi', 'Овоз қўллаб-қувватланмайди'));
      return;
    }
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), Math.min(text.length * 55, 12000));
  };

  return (
    <article ref={articleRef} className="dict-entry" style={Object.assign({ position: 'relative' }, compact ? { padding: '56px 0 96px', maxWidth: 880, margin: '0 auto' } : {})}>
      {/* Suzani medallion backdrop behind the term */}
      <div style={{ position: 'absolute', top: 24, right: -40, color: 'var(--accent)', opacity: 0.10, pointerEvents: 'none' }}>
        <SuzaniMedallion size={320}/>
      </div>

      <div className="entry-crumbs">
        <span style={{ color: 'var(--accent)', display: 'inline-flex' }}><StarOctagon size={9}/></span>
        <a href="#/dictionary" onClick={(e)=>{e.preventDefault(); navigate('/dictionary');}}>
          {t('LUG\u02BBat', 'ЛУҒАТ')}
        </a>
        <span>›</span>
        <span>{cat.name[script].toUpperCase()}</span>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>{term.term[script].toUpperCase()}</span>
      </div>

      <h1 className="entry-term" style={{ position: 'relative', zIndex: 1 }}>{term.term[script]}</h1>
      <div className="entry-pron">
        <button
          type="button"
          className={`audio-btn${speaking ? ' is-speaking' : ''}`}
          title={t('Talaffuz', 'Талаффуз')}
          aria-label={t('Talaffuz', 'Талаффуз')}
          onClick={handleSpeak}
        >
          <Icon name="play" size={11}/>
        </button>
        {term.pron[script] && <span>{term.pron[script]}</span>}
        <span className="tag">{cat.name[script]}</span>
        <span className="tag" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>№ {term.cat}</span>
      </div>

      {/* Definition */}
      <div className="entry-section">
        <div className="label">{t('TA\u02BBRIF', 'ТАЪРИФ')}</div>
        <div><p>{term.def[script]}</p></div>
      </div>

      {/* Etymology */}
      {term.origin && term.origin.lang && (
        <div className="entry-section">
          <div className="label">{t('ETIMOLOGIYA', 'ЭТИМОЛОГИЯ')}</div>
          <div>
            <p>
              <span className="lang-tag">{term.origin.lang}</span>
              <em style={{ fontSize: 19 }}>{term.origin.word}</em>
              {term.origin.mean && <span style={{ color: 'var(--fg-mute)', marginLeft: 12 }}>— {term.origin.mean}</span>}
            </p>
          </div>
        </div>
      )}

      {/* Translations */}
      {(term.trans.ru || term.trans.en) && (
        <div className="entry-section">
          <div className="label">{t('TARJIMA', 'ТАРЖИМА')}</div>
          <div>
            {term.trans.ru && <p style={{ marginBottom: 6 }}><span className="lang-tag">RU</span>{term.trans.ru}</p>}
            {term.trans.en && <p><span className="lang-tag">EN</span>{term.trans.en}</p>}
          </div>
        </div>
      )}

      {/* Examples */}
      {term.examples && term.examples.length > 0 && (
        <div className="entry-section">
          <div className="label">{t('MISOL', 'МИСОЛ')}</div>
          <div>
            {term.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <p className="entry-quote">{ex[script] || ex.lat}</p>
                {ex.src && <div className="entry-quote-source">— {ex.src}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos from backend */}
      {term.photos && term.photos.length > 0 && (
        <div className="entry-section">
          <div className="label">{t('RASMLAR', 'РАСМЛАР')}</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {term.photos.map((src, i) => (
              <img key={i} src={src} alt={term.term.lat}
                style={{ width: 160, height: 110, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }}/>
            ))}
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="entry-section">
          <div className="label">{t('BOG\u02BBLIQ', 'БОҒЛИҚ')}</div>
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
        <div className="entry-actions">
          <button type="button" className={`btn${saved ? ' is-saved' : ''}`} onClick={handleSave}>
            <Icon name="bookmark" size={13}/> {saved ? t('Saqlangan', 'Сақланган') : t('Saqlash', 'Сақлаш')}
          </button>
          <button type="button" className="btn" onClick={handleShare}>
            <Icon name="share" size={13}/> {t('Ulashish', 'Улашиш')}
          </button>
          <button type="button" className="btn" onClick={handlePrint}>
            <Icon name="print" size={13}/> {t('Chop etish', 'Чоп этиш')}
          </button>
          {compact && (
            <button type="button" className="btn" onClick={() => navigate('/dictionary')}>
              <Icon name="book" size={13}/> {t('Lug\'atga', 'Луғатга')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

window.DL = Object.assign(window.DL || {}, {
  DictionaryPage, TermPage, TermEntry
});
