/* Static pages: Home, About, Contact, Terms, Privacy */
/* global React */
const { Icon, navigate, StarOctagon, SuzaniMedallion, GirihLattice,
        IwanArchFrame, Flourish, OrnateSectionHead, CentralAsiaMap } = window.DL;

// ---------- Home ----------
function HomePage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  const wod = window.TERMS.find(x => x.id === window.WORD_OF_DAY_ID);
  const recents = window.RECENT_IDS.map(id => window.TERMS.find(x => x.id === id)).filter(Boolean);
  const cats = window.CATEGORIES;
  const today = new Date('2026-05-06');
  const dateStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  const onSearch = (e) => {
    if (e.key === 'Enter') navigate('/dictionary?q=' + encodeURIComponent(e.target.value));
  };

  return (
    <main className="fade-in">
      {/* Top tile band — Registan-style ornamental border */}
      <div className="tile-band"></div>
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
            <span>{t('1000+ TERMIN', '1000+ ТЕРМИН')}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{t('TEST REJIMI / V.0.9', 'ТЕСТ РЕЖИМИ / V.0.9')}</span>
          </div>
          <h1 style={{ maxWidth: '14ch' }}>
            {t('Diplomatiya tilining ', 'Дипломатия тилининг ')}
            <em>{t('izohli', 'изоҳли')}</em>
            {t(' lug‘ati.', ' луғати.')}
          </h1>
          <p className="hero-sub">
            {t(
              'Markaziy Osiyoda birinchi marta o‘zbek tilida ilmiy asoslangan diplomatik terminlar, iboralar va tushunchalar to‘plami. Tarjima, etimologiya va qo‘llanma misollari bilan.',
              'Марказий Осиёда биринчи марта ўзбек тилида илмий асосланган дипломатик терминлар, иборалар ва тушунчалар тўплами. Таржима, этимология ва қўлланма мисоллари билан.'
            )}
          </p>
          <div className="search" style={{ maxWidth: 720 }}>
            <span className="search-icon"><Icon name="search" size={18}/></span>
            <input
              placeholder={t('Termin, ibora yoki tushunchani qidiring…', 'Термин, ибора ёки тушунчани қидиринг…')}
              onKeyDown={onSearch}
            />
            <span className="search-kbd">
              <span className="kbd">⌘</span><span className="kbd">K</span>
            </span>
          </div>
        </section>

        {/* Stats strip */}
        <div className="stat-row" style={{ marginBottom: 80 }}>
          <div className="stat">
            <div className="stat-num">1 024</div>
            <div className="stat-label">{t('Terminlar', 'Терминлар')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">08</div>
            <div className="stat-label">{t('Yo‘nalishlar', 'Йўналишлар')}</div>
          </div>
          <div className="stat">
            <div className="stat-num">04</div>
            <div className="stat-label">{t('Tillar', 'Тиллар')} · UZ · RU · EN · LA</div>
          </div>
          <div className="stat">
            <div className="stat-num">2024</div>
            <div className="stat-label">{t('Birinchi nashr', 'Биринчи нашр')}</div>
          </div>
        </div>

        {/* Word of the Day */}
        <section style={{ marginBottom: 80 }}>
          <OrnateSectionHead>{t('KUN SO‘ZI · WORD OF THE DAY', 'КУН СЎЗИ · WORD OF THE DAY')}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t('Kun so‘zi', 'Кун сўзи')}</h2>
            <span className="meta">{dateStr} · 06.05.2026</span>
          </div>
          <article className="word-card">
            <div className="word-card-meta">
              <span>WOD · 06.05.2026</span>
              <span>{wod.origin.lang.toUpperCase()} · {wod.origin.word}</span>
            </div>
            <div className="word-card-body">
              <div>
                <h3 className="word-card-term">{wod.term[script]}</h3>
                <div className="word-card-pron">
                  <button className="audio-btn" title="Pronounce"><Icon name="play" size={11}/></button>
                  <span>{wod.pron[script]}</span>
                  <span style={{ borderLeft: '1px solid var(--border)', paddingLeft: 12, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {window.CATEGORIES.find(c => c.id === wod.cat).name[script]}
                  </span>
                </div>
                <p className="word-card-def">{wod.def[script]}</p>
                <div style={{ marginTop: 28 }}>
                  <button className="btn" onClick={() => navigate('/term/' + wod.id)}>
                    {t('To‘liq maqolani o‘qish', 'Тўлиқ мақолани ўқиш')} <Icon name="arrow" size={13}/>
                  </button>
                </div>
              </div>
              <aside className="word-card-side">
                <div className="row">
                  <div className="label">{t('Etimologiya', 'Этимология')}</div>
                  <div className="val">
                    <span style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginRight: 10 }}>{wod.origin.lang}</span>
                    <span style={{ fontStyle: 'italic' }}>{wod.origin.word}</span>
                    <div style={{ color: 'var(--fg-mute)', fontSize: 14, marginTop: 4 }}>{wod.origin.mean}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="label">RU</div>
                  <div className="val">{wod.trans.ru}</div>
                </div>
                <div className="row">
                  <div className="label">EN</div>
                  <div className="val">{wod.trans.en}</div>
                </div>
                <div className="row">
                  <div className="label">{t('Manba', 'Манба')}</div>
                  <div className="val" style={{ fontSize: 13, color: 'var(--fg-dim)' }}>{wod.examples[0].src}</div>
                </div>
              </aside>
            </div>
          </article>
        </section>

        {/* Decorative band */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 56px', color: 'var(--accent)' }}>
          <Flourish width={260}/>
        </div>

        {/* Central Asia map feature */}
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
                  'Lug‘at Markaziy Osiyoning besh davlati — O‘zbekiston, Qozog‘iston, Qirg‘iziston, Tojikiston, Turkmaniston — diplomatik amaliyotini va mintaqaviy tashkilotlar tilini birinchi marta o‘zbek tilida tizimlashtiradi.',
                  'Луғат Марказий Осиёнинг беш давлати — Ўзбекистон, Қозоғистон, Қирғизистон, Тожикистон, Туркманистон — дипломатик амалиётини ва минтақавий ташкилотлар тилини биринчи марта ўзбек тилида тизимлаштиради.'
                )}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
                {['SCO · ШOC', 'CICA · СВМДА', 'OTS · ТДТ', 'EAEU · ЕАЭС', 'C5+1', 'ECO'].map(o => (
                  <div key={o} style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 6,
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                                        letterSpacing: '0.14em', textTransform: 'uppercase',
                                        color: 'var(--fg-dim)' }}>{o}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ marginBottom: 80 }}>
          <OrnateSectionHead>{t('SOHALAR · DOMAINS', 'СОҲАЛАР · DOMAINS')}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t('Yo‘nalishlar', 'Йўналишлар')}</h2>
            <span className="meta">08 · {t('SOHALAR', 'СОҲАЛАР')}</span>
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

        {/* Recent / featured */}
        <section style={{ marginBottom: 96 }}>
          <OrnateSectionHead>{t('TARIX · HISTORY', 'ТАРИХ · HISTORY')}</OrnateSectionHead>
          <div className="section-head">
            <h2>{t('Yaqinda ko‘rilganlar', 'Яқинда кўрилганлар')}</h2>
            <span className="meta">{t('SO‘NGGI 5 TERMIN', 'СЎНГГИ 5 ТЕРМИН')}</span>
          </div>
          <div className="recent-list">
            {recents.map((r, i) => (
              <div key={r.id} className="recent-row" onClick={() => navigate('/term/' + r.id)}>
                <span className="recent-num">{String(i+1).padStart(2, '0')}</span>
                <span className="recent-term">{r.term[script]}</span>
                <span className="recent-def">{r.def[script]}</span>
                <span className="recent-cat">{window.CATEGORIES.find(c => c.id === r.cat).name[script]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Bottom tile band */}
      <div className="tile-band thin"></div>
    </main>
  );
}

// ---------- About ----------
function AboutPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('LUGʻAT HAQIDA · 2024', 'ЛУҒАТ ҲАҚИДА · 2024')}</div>
        <h1>{t('Diplomatik izohli lug‘at haqida.', 'Дипломатик изоҳли луғат ҳақида.')}</h1>
        <p className="lede">
          {t(
            'Hozirgi o‘zbek tilining xalqaro munosabatlarga oid sohasi — siyosat va diplomatiyada qo‘llanayotgan 1000ga yaqin termin, so‘z birikmasi va nomlarni o‘z ichiga olgan.',
            'Ҳозирги ўзбек тилининг халқаро муносабатларга оид соҳаси — сиёсат ва дипломатияда қўлланаётган 1000га яқин термин, сўз бирикмаси ва номларни ўз ичига олган.'
          )}
        </p>

        <h2>{t('Kim uchun', 'Ким учун')}</h2>
        <p>{t(
          'Qoʻllanma xalqaro munosabatlar, siyosatshunoslik fanlari oʻqitiladigan universitetlar va institutlar tadqiqotchi va talabalari, yosh diplomatlar, tarjimonlar, qolaversa, shu soha bilan qiziquvchi kitobxonlarga moʻljallangan.',
          'Қўлланма халқаро муносабатлар, сиёсатшунослик фанлари ўқитиладиган университетлар ва институтлар тадқиқотчи ва талабалари, ёш дипломатлар, таржимонлар, қолаверса, шу соҳа билан қизиқувчи китобхонларга мўлжалланган.'
        )}</p>

        <h2>{t('Manba', 'Манба')}</h2>
        <p>{t(
          'Lug‘at JIDU huzuridagi Diplomatik akademiya xodimlari tomonidan, soha mutaxassislari ishtirokida tayyorlandi. Atamalarni tanlashda o‘zbek tili mezonlari va lug‘atchilik anʼanalariga rioya qilindi; xalqaro hayotda va siyosatda qo‘llanayotgan terminlar imkon qadar to‘plandi.',
          'Луғат ЖИДУ ҳузуридаги Дипломатик академия ходимлари томонидан, соҳа мутахассислари иштирокида тайёрланди. Атамаларни танлашда ўзбек тили мезонлари ва луғатчилик анъаналарига риоя қилинди; халқаро ҳаётда ва сиёсатда қўлланаётган терминлар имкон қадар тўпланди.'
        )}</p>

        <h2>{t('Lug‘atning oʻziga xosligi', 'Луғатнинг ўзига хослиги')}</h2>
        <p>{t(
          'Diplomatik atamalar asosan lotin, ingliz va frantsuz tillarida yaratilgan yoki vositachi tillar orqali kirib kelgan. Lug‘atda har bir termin uchun: izoh, etimologiya, ruscha va inglizcha tarjima hamda qo‘llanma misollari keltirilgan.',
          'Дипломатик атамалар асосан лотин, инглиз ва француз тилларида яратилган ёки воситачи тиллар орқали кириб келган. Луғатда ҳар бир термин учун: изоҳ, этимология, русча ва инглизча таржима ҳамда қўлланма мисоллари келтирилган.'
        )}</p>

        <h2>{t('Versiyalar', 'Версиялар')}</h2>
        <p>{t(
          'Sayt hozirda test rejimida ishlamoqda (v.0.9). Doimiy ravishda yangi terminlar qo‘shilib boriladi va mavjud yozuvlar takomillashtiriladi. Yangiliklar Telegram kanali orqali e’lon qilinadi.',
          'Сайт ҳозирда тест режимида ишламоқда (v.0.9). Доимий равишда янги терминлар қўшилиб борилади ва мавжуд ёзувлар такомиллаштирилади. Янгиликлар Телеграм канали орқали эълон қилинади.'
        )}</p>

        <div style={{ marginTop: 56, display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => navigate('/dictionary')}>
            {t('Lug‘atga o‘tish', 'Луғатга ўтиш')} <Icon name="arrow" size={13}/>
          </button>
          <a className="btn" href="https://t.me/diplugat" target="_blank" rel="noopener">
            {t('Telegram kanal', 'Телеграм канал')}
          </a>
        </div>
      </div>
    </main>
  );
}

// ---------- Contact ----------
function ContactPage({ script }) {
  const t = (lat, cyr) => script === 'lat' ? lat : cyr;
  return (
    <main className="fade-in">
      <div className="page">
        <div className="kicker">{t('KONTAKTLAR', 'КОНТАКТЛАР')}</div>
        <h1>{t('Aloqa.', 'Алоқа.')}</h1>
        <p className="lede">{t(
          'Tahririyatga termin taklif qilishingiz, xato haqida xabar berishingiz yoki hamkorlik takliflari bilan murojaat qilishingiz mumkin.',
          'Таҳририятга термин таклиф қилишингиз, хато ҳақида хабар беришингиз ёки ҳамкорлик таклифлари билан мурожаат қилишингиз мумкин.'
        )}</p>

        <div className="contact-grid">
          <div className="contact-block">
            <div className="label">{t('MANZIL', 'МАНЗИЛ')}</div>
            <div className="val">{t('Toshkent sh., Buyuk Ipak Yo‘li ko‘chasi 54', 'Тошкент ш., Буюк Ипак Йўли кўчаси 54')}</div>
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
            <div className="contact-meta">{t('Yangiliklar va e’lonlar kanali', 'Янгиликлар ва эълонлар канали')}</div>
          </div>
          <div className="contact-block">
            <div className="label">{t('MATBUOT', 'МАТБУОТ')}</div>
            <div className="val"><a href="mailto:press@uwed.uz">press@uwed.uz</a></div>
            <div className="contact-meta">{t('Hamkorlik va matbuot so‘rovlari', 'Ҳамкорлик ва матбуот сўровлари')}</div>
          </div>
        </div>

        <h2 style={{ marginTop: 80 }}>{t('Termin taklif qilish', 'Термин таклиф қилиш')}</h2>
        <p>{t(
          'Lug‘atda yo‘q, ammo zarur deb hisoblagan terminni tahririyatga yuborishingiz mumkin. Iltimos, terminning manbasi va qo‘llanish kontekstini ko‘rsating — bu ekspertiza jarayonini tezlashtiradi.',
          'Луғатда йўқ, аммо зарур деб ҳисоблаган терминни таҳририятга юборишингиз мумкин. Илтимос, терминнинг манбаси ва қўлланиш контекстини кўрсатинг — бу экспертиза жараёнини тезлаштиради.'
        )}</p>
        <div style={{ marginTop: 24 }}>
          <a className="btn btn-primary" href="mailto:dictionary@uwed.uz?subject=Termin%20taklifi">
            {t('Termin yuborish', 'Термин юбориш')} <Icon name="arrow" size={13}/>
          </a>
        </div>
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
        <p className="lede">{t(
          'Saytdan foydalanish shartlari. Oxirgi yangilanish: 12.03.2026',
          'Сайтдан фойдаланиш шартлари. Охирги янгиланиш: 12.03.2026'
        )}</p>

        <h2>1. {t('Foydalanish maqsadi', 'Фойдаланиш мақсади')}</h2>
        <p>{t(
          'Ushbu sayt JIDU huzuridagi Diplomatik akademiyaga tegishli boʻlib, akademik va maʼrifiy maqsadlarda diplomatik atamalar boʻyicha maʼlumot beradi. Sayt materiallaridan tijoriy maqsadlarda foydalanish faqat tahririyat ruxsati bilan ruxsat etiladi.',
          'Ушбу сайт ЖИДУ ҳузуридаги Дипломатик академияга тегишли бўлиб, академик ва маърифий мақсадларда дипломатик атамалар бўйича маълумот беради. Сайт материалларидан тижорий мақсадларда фойдаланиш фақат таҳририят рухсати билан рухсат этилади.'
        )}</p>

        <h2>2. {t('Mualliflik huquqi', 'Муаллифлик ҳуқуқи')}</h2>
        <p>{t(
          'Sayt mazmuni va lug‘at materiallari mualliflik huquqi bilan himoyalangan. Manba ko‘rsatilgan holda, ilmiy va o‘quv maqsadlarda iqtibos olishga ruxsat etiladi.',
          'Сайт мазмуни ва луғат материаллари муаллифлик ҳуқуқи билан ҳимояланган. Манба кўрсатилган ҳолда, илмий ва ўқув мақсадларда иқтибос олишга рухсат этилади.'
        )}</p>

        <h2>3. {t('Mas’uliyat chegaralari', 'Масъулият чегаралари')}</h2>
        <p>{t(
          'Tahririyat lug‘at maʼlumotlarining ilmiy aniqligi uchun mas’uldir, biroq ushbu maʼlumotlardan foydalanish natijasida vujudga keladigan har qanday yuridik yoki amaliy oqibatlar uchun javobgar emas.',
          'Таҳририят луғат маълумотларининг илмий аниқлиги учун масъулдир, бироқ ушбу маълумотлардан фойдаланиш натижасида вужудга келадиган ҳар қандай юридик ёки амалий оқибатлар учун жавобгар эмас.'
        )}</p>

        <h2>4. {t('O‘zgarishlar', 'Ўзгаришлар')}</h2>
        <p>{t(
          'Tahririyat ushbu shartlarga oldindan ogohlantirmasdan o‘zgartirishlar kiritish huquqini saqlab qoladi. Yangi shartlar ushbu sahifada eʼlon qilingandan soʻng kuchga kiradi.',
          'Таҳририят ушбу шартларга олдиндан огоҳлантирмасдан ўзгартиришлар киритиш ҳуқуқини сақлаб қолади. Янги шартлар ушбу саҳифада эълон қилингандан сўнг кучга киради.'
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
        <p className="lede">{t(
          'Foydalanuvchi maʼlumotlarini yig‘ish va qayta ishlash tartibi.',
          'Фойдаланувчи маълумотларини йиғиш ва қайта ишлаш тартиби.'
        )}</p>

        <h2>1. {t('Yig‘iladigan ma’lumotlar', 'Йиғиладиган маълумотлар')}</h2>
        <p>{t(
          'Sayt foydalanuvchining shaxsiy ma’lumotlarini yig‘maydi. Faqat anonim foydalanish statistikasi (sahifa ko‘rishlari, qidiruv so‘rovlari) yig‘iladi.',
          'Сайт фойдаланувчининг шахсий маълумотларини йиғмайди. Фақат аноним фойдаланиш статистикаси (саҳифа кўришлари, қидирув сўровлари) йиғилади.'
        )}</p>

        <h2>2. {t('Cookie fayllari', 'Cookie файллари')}</h2>
        <p>{t(
          'Sayt cookie va localStorage texnologiyalaridan foydalanadi. Bu sizning afzal til, mavzu (light/dark) va yaqinda ko‘rilgan terminlar kabi sozlamalarni saqlash uchun zarur.',
          'Сайт cookie ва localStorage технологияларидан фойдаланади. Бу сизнинг афзал тил, мавзу (light/dark) ва яқинда кўрилган терминлар каби созламаларни сақлаш учун зарур.'
        )}</p>

        <h2>3. {t('Uchinchi tomon xizmatlari', 'Учинчи томон хизматлари')}</h2>
        <p>{t(
          'Sayt anonim statistik tahlil uchun tashqi xizmatlardan foydalanishi mumkin. Bunday xizmatlar tegishli huquqiy talablarga rioya qiladi.',
          'Сайт аноним статистик таҳлил учун ташқи хизматлардан фойдаланиши мумкин. Бундай хизматлар тегишли ҳуқуқий талабларга риоя қилади.'
        )}</p>

        <h2>4. {t('Aloqa', 'Алоқа')}</h2>
        <p>{t(
          'Maxfiylik bilan bog‘liq savollar bo‘yicha tahririyatga murojaat qiling: privacy@uwed.uz',
          'Махфийлик билан боғлиқ саволлар бўйича таҳририятга мурожаат қилинг: privacy@uwed.uz'
        )}</p>
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
          'Siz qidirayotgan sahifa mavjud emas yoki ko‘chirilgan.',
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
