/* Static pages: Home, About, Contact, Terms, Privacy */
/* global React */
const { Icon, navigate, StarOctagon, SuzaniMedallion, GirihLattice,
        IwanArchFrame, Flourish, OrnateSectionHead, CentralAsiaMap } = window.DL;

// ---------- Home ----------
function HomePage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const terms = window.TERMS || [];
  const wod = terms.find(x => x.id === window.WORD_OF_DAY_ID) || terms[0];
  const recents = (window.RECENT_IDS || []).map(id => terms.find(x => x.id === id)).filter(Boolean);
  const cats = window.CATEGORIES || [];
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  const onSearch = (e) => {
    if (e.key === 'Enter') navigate('/dictionary?q=' + encodeURIComponent(e.target.value));
  };

  if (!wod) return null;

  return (
    <main className="fade-in">
      <div className="container-wide">
        {/* Hero */}
        <section className="hero" style={{ position: 'relative' }}>
          <div className="ground-pattern"></div>
          <div className="hero-ornament tr" style={{ color: 'var(--accent)' }}>
            <SuzaniMedallion size={260}/>
          </div>
          <div className="hero-eyebrow">
            <span className="dot"></span>
            <span>{t('RASMIY · ONLAYN NASHR', 'РАСМИЙ · ОНЛАЙН НАШР')}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{terms.length > 0 ? terms.length + '+ TERMIN' : t('1000+ TERMIN', '1000+ ТЕРМИН')}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{t('TEST REJIMI / V.0.9', 'ТЕСТ РЕЖИМИ / V.0.9')}</span>
          </div>
          <h1 style={{ maxWidth: '14ch' }}>
            {t('Diplomatik terminlar ', 'Дипломатик терминлар ')}
            <em>{t('izohli', 'izohli')}</em>
            {t(" lug\u02BFati.", ' \u043B\u0443\u0493\u0430\u0442\u0438.')}
          </h1>
          <p className="hero-sub">
            {t(
              "Markaziy Osiyoda birinchi marta o\u02FBzbek tilida ilmiy asoslangan diplomatik terminlar, iboralar va tushunchalar to\u02FBplami. Tarjima, etimologiya va qo\u02FBllanma misollari bilan.",
              '\u041C\u0430\u0440\u043A\u0430\u0437\u0438\u0439 \u041E\u0441\u0438\u0451\u0434\u0430 \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u043C\u0430\u0440\u0442\u0430 \u045E\u0437\u0431\u0435\u043A \u0442\u0438\u043B\u0438\u0434\u0430 \u0438\u043B\u043C\u0438\u0439 \u0430\u0441\u043E\u0441\u043B\u0430\u043D\u0433\u0430\u043D \u0434\u0438\u043F\u043B\u043E\u043C\u0430\u0442\u0438\u043A \u0442\u0435\u0440\u043C\u0438\u043D\u043B\u0430\u0440.'
            )}
          </p>
          <div className="search" style={{ maxWidth: 720 }}>
            <span className="search-icon"><Icon name="search" size={18}/></span>
            <input
              placeholder={t('Termin, ibora yoki tushunchani qidiring\u2026', '\u0422\u0435\u0440\u043C\u0438\u043D, \u0438\u0431\u043E\u0440\u0430 \u0451\u043A\u0438 \u0442\u0443\u0448\u0443\u043D\u0447\u0430\u043D\u0438 \u049B\u0438\u0434\u0438\u0440\u0438\u043D\u0433\u2026')}
              onKeyDown={onSearch}
            />
            <span className="search-kbd">
              <span className="kbd">⌘</span><span className="kbd">K</span>
            </span>
          </div>
          <div className="tile-band hero-separator" role="presentation" aria-hidden="true"></div>
        </section>

        {/* Stats strip */}
        <div className="stat-row" style={{ marginBottom: 80 }}>
          <div className="stat">
            <div className="stat-num">{terms.length > 0 ? terms.length.toLocaleString('uz-UZ') : '—'}</div>
            <div className="stat-label">{t('Terminlar', 'Терминлар')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">{String(cats.length || 0).padStart(2, '0')}</div>
            <div className="stat-label">{t('Yo\u02BFnalishlar', 'Йўналишлар')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">{String(window.COUNTRY_COUNT || 5).padStart(2, '0')}</div>
            <div className="stat-label">{t('Mamlakatlar', 'Мамлакатлар')} · CA-5</div>
          </div>
          <div className="stat">
            <div className="stat-num">2026</div>
            <div className="stat-label">{t('Nashr yili', 'Нашр йили')}</div>
          </div>
        </div>
        <div className="tile-band section-separator" role="presentation" aria-hidden="true"></div>

        {/* Word of the Day */}
        <section style={{ marginBottom: 80 }}>
          <OrnateSectionHead>{t("KUN SO\u02BBZI \u00B7 WORD OF THE DAY", "\u041A\u0423\u041D \u0421\u045E\u0417\u0418 \u00B7 WORD OF THE DAY")}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t("Kun so\u02BBzi", 'Кун сўзи')}</h2>
            <span className="meta">{dateStr}</span>
          </div>
          <article className="word-card">
            <div className="word-card-meta">
              <span>WOD · {dateStr}</span>
              <span>{wod.origin.lang.toUpperCase()} · {wod.origin.word}</span>
            </div>
            <div className="word-card-body">
              <div>
                <h3 className="word-card-term">{wod.term[script]}</h3>
                <div className="word-card-pron">
                  <button className="audio-btn" title="Pronounce"><Icon name="play" size={11}/></button>
                  {wod.pron[script] && <span>{wod.pron[script]}</span>}
                  <span style={{ borderLeft: '1px solid var(--border)', paddingLeft: 12, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {(cats.find(c => c.id === wod.cat) || { name: { lat: wod.cat, cyr: wod.cat } }).name[script]}
                  </span>
                </div>
                <p className="word-card-def">{wod.def[script]}</p>
                <div style={{ marginTop: 28 }}>
                  <button className="btn" onClick={() => navigate('/term/' + wod.id)}>
                    {t("To\u02BFliq maqolani o\u02BFqish", 'Тўлиқ мақолани ўқиш')} <Icon name="arrow" size={13}/>
                  </button>
                </div>
              </div>
              <aside className="word-card-side">
                <div className="row">
                  <div className="label">{t('Etimologiya', 'Этимология')}</div>
                  <div className="val">
                    <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 10 }}>{wod.origin.lang}</span>
                    <span style={{ fontStyle: 'italic' }}>{wod.origin.word}</span>
                    {wod.origin.mean && <div style={{ color: 'var(--fg-mute)', fontSize: 14, marginTop: 4 }}>{wod.origin.mean}</div>}
                  </div>
                </div>
                {wod.trans.ru && <div className="row"><div className="label">RU</div><div className="val">{wod.trans.ru}</div></div>}
                {wod.trans.en && <div className="row"><div className="label">EN</div><div className="val">{wod.trans.en}</div></div>}
                {wod.examples && wod.examples[0] && (
                  <div className="row">
                    <div className="label">{t('Manba', 'Манба')}</div>
                    <div className="val" style={{ fontSize: 13, color: 'var(--fg-dim)' }}>{wod.examples[0].src}</div>
                  </div>
                )}
              </aside>
            </div>
          </article>
        </section>

        {/* Decorative band */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 56px', color: 'var(--accent)' }}>
          <Flourish width={260}/>
        </div>

        {/* Central Asia map */}
        <section style={{ marginBottom: 80 }}>
          <OrnateSectionHead>{t('MARKAZIY OSIYO · CENTRAL ASIA', 'МАРКАЗИЙ ОСИЁ · CENTRAL ASIA')}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t('Mintaqaviy diplomatiya', 'Минтақавий дипломатия')}</h2>
            <span className="meta">CA-5 · SCO · CICA · OTS</span>
          </div>
          <div className="ca-map" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
            <div style={{ color: 'var(--accent)' }}>
              <CentralAsiaMap size={460}/>
            </div>
            <div>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--fg-dim)', marginTop: 0 }}>
                {t(
                  "Lug\u02BFat Markaziy Osiyoning besh davlati \u2014 O\u02FBzbekiston, Qozog\u02FBiston, Qirg\u02FBiziston, Tojikiston, Turkmaniston \u2014 diplomatik amaliyotini va mintaqaviy tashkilotlar tilini birinchi marta o\u02FBzbek tilida tizimlashtiradi.",
                  '\u041B\u0443\u0493\u0430\u0442 \u041C\u0430\u0440\u043A\u0430\u0437\u0438\u0439 \u041E\u0441\u0438\u0451\u043D\u0438\u043D\u0433 \u0431\u0435\u0448 \u0434\u0430\u0432\u043B\u0430\u0442\u0438 \u2014 \u045E\u0437\u0431\u0435\u043A\u0438\u0441\u0442\u043E\u043D.'
                )}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
                {['SCO · ШOC', 'CICA · СВМДА', 'OTS · ТДТ', 'EAEU · ЕАЭС', 'C5+1', 'ECO'].map(o => (
                  <div key={o} style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 6, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>{o}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ marginBottom: 80 }}>
          <OrnateSectionHead>{t('SOHALAR · DOMAINS', 'СОҲАЛАР · DOMAINS')}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t("Yo\u02BFnalishlar", 'Йўналишлар')}</h2>
            <span className="meta">{String(cats.length || 8).padStart(2,'0')} · {t('SOHALAR', 'СОҲАЛАР')}</span>
          </div>
          <div className="cat-grid">
            {cats.map(c => (
              <div key={c.id} className="cat" onClick={() => navigate('/dictionary?cat=' + c.id)}>
                <div className="cat-id">№ {c.id}</div>
                <div className="cat-name">{c.name[script]}</div>
                <div className="cat-count">{c.count} {t('TERMIN', 'ТЕРМИН')}</div>
                <div className="cat-arrow"><Icon name="arrowSm" size={16}/></div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent */}
        {recents.length > 0 && (
          <section style={{ marginBottom: 96 }}>
            <OrnateSectionHead>{t('TARIX · HISTORY', 'ТАРИХ · HISTORY')}</OrnateSectionHead>
            <div className="section-head">
              <h2>{t("Yaqinda ko\u02BFrilganlar", 'Яқинда кўрилганлар')}</h2>
              <span className="meta">{t("SO\u02BBNGGI 5 TERMIN", 'СЎНГГИ 5 ТЕРМИН')}</span>
            </div>
            <div className="recent-list">
              {recents.map((r, i) => (
                <div key={r.id} className="recent-row" onClick={() => navigate('/term/' + r.id)}>
                  <span className="recent-num">{String(i+1).padStart(2, '0')}</span>
                  <span className="recent-term">{r.term[script]}</span>
                  <span className="recent-def">{r.def[script]}</span>
                  <span className="recent-cat">{(cats.find(c => c.id === r.cat) || { name: { lat: r.cat, cyr: r.cat } }).name[script]}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// ---------- About ----------
function AboutPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('LUG\u02BAAT HAQIDA · 2026', 'ЛУҒАТ ҲАҚИДА · 2026')}</div>
        <h1>{t('Diplomatik izohli lug\u02BFat haqida.', 'Дипломатик изоҳли луғат ҳақида.')}</h1>
        <p className="lede">{t(
          "Hozirgi o\u02FBzbek tilining xalqaro munosabatlarga oid sohasi \u2014 siyosat va diplomatiyada qo\u02FBllanayotgan 1000ga yaqin termin, so\u02FBz birikmasi va nomlarni o\u02FBz ichiga olgan.",
          'Ҳозирги ўзбек тилининг халқаро муносабатларга оид соҳаси — сиёсат ва дипломатияда қўлланаётган 1000га яқин термин.'
        )}</p>

        <h2>{t('Kim uchun', 'Ким учун')}</h2>
        <p>{t(
          "Qo\u02FBllanma xalqaro munosabatlar, siyosatshunoslik fanlari o\u02FBqitiladigan universitetlar va institutlar tadqiqotchi va talabalari, yosh diplomatlar, tarjimonlar va shu soha bilan qiziquvchi kitobxonlarga mo\u02FBljallangan.",
          'Қўлланма халқаро муносабатлар, сиёсатшунослик фанлари ўқитиладиган университетлар ва институтлар тадқиқотчи ва талабалари, ёш дипломатлар, таржимонлар учун.'
        )}</p>

        <h2>{t('Manba', 'Манба')}</h2>
        <p>{t(
          "Lug\u02BFat JIDU huzuridagi Diplomatik akademiya xodimlari tomonidan, soha mutaxassislari ishtirokida tayyorlandi.",
          'Луғат ЖИДУ ҳузуридаги Дипломатик академия ходимлари томонидан, соҳа мутахассислари иштирокида тайёрланди.'
        )}</p>

        <h2>{t('Versiyalar', 'Версиялар')}</h2>
        <p>{t(
          "Sayt hozirda test rejimida ishlamoqda (v.0.9). Doimiy ravishda yangi terminlar qo\u02FBshilib boriladi va mavjud yozuvlar takomillashtiriladi.",
          'Сайт ҳозирда тест режимида ишламоқда (v.0.9). Доимий равишда янги терминлар қўшилиб борилади.'
        )}</p>

        <div style={{ marginTop: 56, display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/dictionary')}>
            {t("Lug\u02BFatga o\u02FBtish", 'Луғатга ўтиш')} <Icon name="arrow" size={13}/>
          </button>
          <a className="btn" href="https://t.me/diplugat" target="_blank" rel="noopener">
            {t('Telegram kanal', 'Телеграм канал')}
          </a>
        </div>
      </div>
    </main>
  );
}

// ---------- Contact — wired to POST /api/dictionary/contact/ ----------
function ContactPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg(t('Ism, email va xabar majburiy.', 'Исм, email ва хабар мажбурий.'));
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    try {
      await window.DL_API.DictAPI.sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || t("Xatolik yuz berdi. Qayta urinib ko\u02FBring.", 'Хатолик юз берди. Қайта уриниб кўринг.'));
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    background: 'var(--bg-2)', border: '1px solid var(--border)',
    borderRadius: 6, color: 'var(--fg)',
    fontFamily: 'Source Serif 4, serif', fontSize: 15,
    outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: 'var(--fg-mute)', marginBottom: 6,
  };

  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('KONTAKTLAR', 'КОНТАКТЛАР')}</div>
        <h1>{t('Aloqa.', 'Алоқа.')}</h1>
        <p className="lede">{t(
          "Tahririyatga termin taklif qilishingiz, xato haqida xabar berishingiz yoki hamkorlik takliflari bilan murojaat qilishingiz mumkin.",
          'Таҳририятга термин таклиф қилишингиз, хато ҳақида хабар беришингиз ёки ҳамкорлик таклифлари билан мурожаат қилишингиз мумкин.'
        )}</p>

        <div className="contact-grid">
          <div className="contact-block">
            <div className="label">{t('MANZIL', 'МАНЗИЛ')}</div>
            <div className="val">{t("Toshkent sh., Buyuk Ipak Yo\u02BFli ko\u02BFchasi 54", 'Тошкент ш., Буюк Ипак Йўли кўчаси 54')}</div>
            <div className="contact-meta">{t('Diplomatik akademiya, JIDU', 'Дипломатик академия, ЖИДУ')}</div>
          </div>
          <div className="contact-block">
            <div className="label">{t('TAHRIRIYAT', 'ТАҲРИРИЯТ')}</div>
            <div className="val"><a href="mailto:dictionary@uwed.uz">dictionary@uwed.uz</a></div>
            <div className="contact-meta">{t('Termin takliflari, xatolar', 'Термин таклифлари, хатолар')}</div>
          </div>
          <div className="contact-block">
            <div className="label">{t('TELEGRAM', 'ТЕЛЕГРАМ')}</div>
            <div className="val"><a href="https://t.me/diplugat" target="_blank" rel="noopener">@diplugat</a></div>
            <div className="contact-meta">{t("Yangiliklar va e\u02BFlonlar kanali", 'Янгиликлар ва эълонлар канали')}</div>
          </div>
          <div className="contact-block">
            <div className="label">{t('MATBUOT', 'МАТБУОТ')}</div>
            <div className="val"><a href="mailto:press@uwed.uz">press@uwed.uz</a></div>
            <div className="contact-meta">{t("Hamkorlik va matbuot so\u02BFrovlari", 'Ҳамкорлик ва матбуот сўровлари')}</div>
          </div>
        </div>

        {/* Live form → POST /api/dictionary/contact/ */}
        <h2 style={{ marginTop: 80 }}>{t('Xabar yuborish', 'Хабар юбориш')}</h2>
        <p>{t(
          "Lug\u02BFatda yo\u02BFq, ammo zarur deb hisoblagan terminni tahririyatga yuborishingiz mumkin.",
          'Луғатда йўқ, аммо зарур деб ҳисоблаган терминни таҳририятга юборишингиз мумкин.'
        )}</p>

        {status === 'success' ? (
          <div style={{ marginTop: 32, padding: '24px 28px', border: '1px solid var(--accent)', borderRadius: 8, color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.08em' }}>
            {t('\u2713 Xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz.', '\u2713 Хабарингиз муваффақиятли юборилди. Тез орада жавоб берамиз.')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{t('Ism', 'Исм')} *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder={t('Ism Familiya', 'Исм Фамилия')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="email@example.com" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t('Mavzu', 'Мавзу')}</label>
              <input name="subject" value={form.subject} onChange={handleChange}
                placeholder={t('Termin taklifi, xato, hamkorlik\u2026', 'Термин таклифи, хато, ҳамкорлик\u2026')} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('Xabar', 'Хабар')} *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                placeholder={t('Xabaringizni shu yerga yozing\u2026', 'Хабарингизни шу ерга ёзинг\u2026')}
                style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            {status === 'error' && errorMsg && (
              <div style={{ color: 'var(--terracotta)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                {'\u2715'} {errorMsg}
              </div>
            )}
            <div>
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}
                style={{ opacity: status === 'sending' ? 0.6 : 1 }}>
                {status === 'sending'
                  ? t('Yuborilmoqda\u2026', 'Юборилмоқда\u2026')
                  : <>{t('Yuborish', 'Юбориш')} <Icon name="arrow" size={13}/></>
                }
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

// ---------- Terms ----------
function TermsPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('HUJJAT · 01', 'ҲУЖЖАТ · 01')}</div>
        <h1>{t('Shartlar va qoidalar.', 'Шартлар ва қоидалар.')}</h1>
        <p className="lede">{t('Saytdan foydalanish shartlari. Oxirgi yangilanish: 12.03.2026', 'Сайтдан фойдаланиш шартлари. Охирги янгиланиш: 12.03.2026')}</p>
        <h2>1. {t('Foydalanish maqsadi', 'Фойдаланиш мақсади')}</h2>
        <p>{t(
          "Ushbu sayt JIDU huzuridagi Diplomatik akademiyaga tegishli bo\u02FBlib, akademik va ma\u02BFrifiy maqsadlarda diplomatik atamalar bo\u02FByicha ma\u02BFlumot beradi.",
          'Ушбу сайт ЖИДУ ҳузуридаги Дипломатик академияга тегишли бўлиб, академик ва маърифий мақсадларда дипломатик атамалар бўйича маълумот беради.'
        )}</p>
        <h2>2. {t('Mualliflik huquqi', 'Муаллифлик ҳуқуқи')}</h2>
        <p>{t(
          "Sayt mazmuni va lug\u02BFat materiallari mualliflik huquqi bilan himoyalangan.",
          'Сайт мазмуни ва луғат материаллари муаллифлик ҳуқуқи билан ҳимояланган.'
        )}</p>
        <h2>3. {t("Mas\u02BFuliyat chegaralari", 'Масъулият чегаралари')}</h2>
        <p>{t(
          "Tahririyat lug\u02BFat ma\u02BFlumotlarining ilmiy aniqligi uchun mas\u02BFuldir.",
          'Таҳририят луғат маълумотларининг илмий аниқлиги учун масъулдир.'
        )}</p>
        <h2>4. {t("O\u02FBzgarishlar", 'Ўзгаришлар')}</h2>
        <p>{t(
          "Tahririyat ushbu shartlarga oldindan ogohlantirmasdan o\u02FBzgartirishlar kiritish huquqini saqlab qoladi.",
          'Таҳририят ушбу шартларга олдиндан огоҳлантирмасдан ўзгартиришлар киритиш ҳуқуқини сақлаб қолади.'
        )}</p>
      </div>
    </main>
  );
}

// ---------- Privacy ----------
function PrivacyPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('HUJJAT · 02', 'ҲУЖЖАТ · 02')}</div>
        <h1>{t('Maxfiylik siyosati.', 'Махфийлик сиёсати.')}</h1>
        <p className="lede">{t("Foydalanuvchi ma\u02BFlumotlarini yig\u02BFish va qayta ishlash tartibi.", 'Фойдаланувчи маълумотларини йиғиш ва қайта ишлаш тартиби.')}</p>
        <h2>1. {t("Yig\u02BFiladigan ma\u02BFlumotlar", 'Йиғиладиган маълумотлар')}</h2>
        <p>{t(
          "Sayt foydalanuvchining shaxsiy ma\u02BFlumotlarini yig\u02BFmaydi. Faqat anonim foydalanish statistikasi yig\u02BFiladi.",
          'Сайт фойдаланувчининг шахсий маълумотларини йиғмайди. Фақат аноним фойдаланиш статистикаси йиғилади.'
        )}</p>
        <h2>2. {t('Cookie fayllari', 'Cookie файллари')}</h2>
        <p>{t(
          "Sayt cookie va localStorage texnologiyalaridan foydalanadi. Bu sizning afzal til, mavzu va yaqinda ko\u02FBrilgan terminlar kabi sozlamalarni saqlash uchun zarur.",
          'Сайт cookie ва localStorage технологияларидан фойдаланади. Бу сизнинг афзал тил, мавзу ва яқинда кўрилган терминлар каби созламаларни сақлаш учун зарур.'
        )}</p>
        <h2>4. {t('Aloqa', 'Алоқа')}</h2>
        <p>{t('Maxfiylik bilan bog\u02BFliq savollar bo\u02FByicha: privacy@uwed.uz', 'Махфийлик билан боғлиқ саволлар бўйича: privacy@uwed.uz')}</p>
      </div>
    </main>
  );
}

// ---------- Not Found ----------
function NotFoundPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page" style={{ textAlign: 'center', paddingTop: 120 }}>
        <div className="kicker">404 · {t('TOPILMADI', 'ТОПИЛМАДИ')}</div>
        <h1>{t('Sahifa topilmadi.', 'Саҳифа топилмади.')}</h1>
        <p className="lede" style={{ margin: '0 auto 40px' }}>{t(
          "Siz qidirayotgan sahifa mavjud emas yoki ko\u02FBchirilgan.",
          'Сиз қидираётган саҳифа мавжуд эмас ёки кўчирилган.'
        )}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          {t('Bosh sahifaga qaytish', 'Бош саҳифага қайтиш')} <Icon name="arrow" size={13}/>
        </button>
      </div>
    </main>
  );
}

window.DL = Object.assign(window.DL || {}, {
  HomePage, AboutPage, ContactPage, TermsPage, PrivacyPage, NotFoundPage
});
