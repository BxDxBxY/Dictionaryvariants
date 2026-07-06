/* Term entry actions: save, share, print, pronounce */
const TermActions = {
  STORAGE_KEY: 'dl-saved-terms',

  getSavedIds() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  },

  isSaved(id) {
    return this.getSavedIds().includes(String(id));
  },

  toggleSave(id) {
    const sid = String(id);
    let ids = this.getSavedIds();
    if (ids.includes(sid)) {
      ids = ids.filter(x => x !== sid);
    } else {
      ids = [...ids, sid];
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    return ids.includes(sid);
  },

  termUrl(id) {
    const base = window.location.href.split('#')[0];
    return `${base}#/term/${id}`;
  },

  async shareTerm(term, script) {
    const title = term.term[script] || term.term.lat;
    const text = (term.def[script] || term.def.lat || '').slice(0, 280);
    const url = this.termUrl(term.id);
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch (e) {
        if (e.name === 'AbortError') return false;
      }
    }
    const payload = `${title}\n\n${text}\n\n${url}`;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(payload);
      return 'copied';
    }
    return false;
  },

  speakText(text, script) {
    if (!window.speechSynthesis || !text?.trim()) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.trim());
    u.rate = 0.92;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const prefer = script === 'cyr' ? /ru|russian/i : /uz|turk|latin|en/i;
    const voice = voices.find(v => prefer.test(v.lang + v.name))
      || voices.find(v => /ru/i.test(v.lang))
      || voices[0];
    if (voice) u.voice = voice;
    if (script === 'cyr') u.lang = 'ru-RU';
    else u.lang = 'uz-UZ';
    window.speechSynthesis.speak(u);
    return true;
  },

  escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  printTerm(term, script, catName) {
    const t = (lat, cyr) => (script === 'lat' ? lat : cyr);
    const esc = this.escapeHtml.bind(this);
    const title = term.term[script] || term.term.lat;
    const def = term.def[script] || term.def.lat || '';
    const pron = term.pron[script] || '';
    const cat = catName || term.cat || '';
    const origin = term.origin || {};
    const transRu = term.trans?.ru || '';
    const transEn = term.trans?.en || '';
    const examples = (term.examples || []).map(ex => {
      const line = ex[script] || ex.lat || '';
      const src = ex.src ? `<div class="ex-src">— ${esc(ex.src)}</div>` : '';
      return `<blockquote>${esc(line)}</blockquote>${src}`;
    }).join('');
    const relatedNames = (term.related || [])
      .map(rid => (window.TERMS || []).find(x => x.id === String(rid)))
      .filter(Boolean)
      .map(x => x.term[script] || x.term.lat);
    const related = relatedNames.length
      ? `<p class="meta-line"><strong>${t('Bog\'liq', 'Боғлиқ')}:</strong> ${esc(relatedNames.join(', '))}</p>`
      : '';

    const html = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="utf-8"/>
  <title>${title} — Diplomatik Lug'at</title>
  <style>
    @page { margin: 18mm 16mm; size: A4; }
    * { box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 11.5pt;
      line-height: 1.55;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
    }
    .sheet { max-width: 170mm; margin: 0 auto; }
    .mast {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-bottom: 14px;
      margin-bottom: 20px;
      border-bottom: 2px solid #0099b5;
    }
    .mast img { width: 52px; height: 52px; border-radius: 50%; }
    .mast h2 {
      margin: 0;
      font-size: 10pt;
      font-weight: normal;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #0099b5;
    }
    .mast p { margin: 4px 0 0; font-size: 9pt; color: #555; }
    h1 {
      font-size: 26pt;
      font-weight: 600;
      margin: 0 0 8px;
      color: #0a2540;
      letter-spacing: -0.02em;
    }
    .tags { font-size: 9pt; color: #555; margin-bottom: 20px; }
    .tags span {
      display: inline-block;
      margin-right: 10px;
      padding: 2px 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    .section { margin-bottom: 18px; }
    .section h3 {
      font-size: 8.5pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #0099b5;
      margin: 0 0 8px;
      font-family: 'Courier New', monospace;
    }
    .section p { margin: 0; text-align: justify; }
    blockquote {
      margin: 8px 0;
      padding-left: 14px;
      border-left: 3px solid #c89855;
      font-style: italic;
      color: #333;
    }
    .ex-src { font-size: 9pt; color: #666; margin-top: 4px; }
    .footer {
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
      font-size: 8pt;
      color: #888;
      display: flex;
      justify-content: space-between;
    }
    .stripe {
      height: 4px;
      margin-bottom: 16px;
      background: linear-gradient(90deg, #0099b5 0%, #fff 33%, #1eb53a 66%, #ce1126 100%);
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="stripe"></div>
    <header class="mast">
      <img src="logo2.png" alt="" onerror="this.style.display='none'"/>
      <div>
        <h2>Diplomatik Lug'at · UWED</h2>
        <p>Diplomatik Akademiya · ${new Date().getFullYear()}</p>
      </div>
    </header>
    <h1>${esc(title)}</h1>
    <div class="tags">
      ${cat ? `<span>${esc(cat)}</span>` : ''}
      ${pron ? `<span>${esc(pron)}</span>` : ''}
      <span>№ ${esc(term.id)}</span>
    </div>
    <div class="section">
      <h3>${t("Ta'rif", 'Таъриф')}</h3>
      <p>${esc(def)}</p>
    </div>
    ${origin.lang ? `<div class="section"><h3>${t('Etimologiya', 'Этимология')}</h3><p><em>${esc(origin.word || '')}</em> (${esc(origin.lang)})${origin.mean ? ' — ' + esc(origin.mean) : ''}</p></div>` : ''}
    ${transRu || transEn ? `<div class="section"><h3>${t('Tarjima', 'Таржима')}</h3>${transRu ? `<p><strong>RU:</strong> ${esc(transRu)}</p>` : ''}${transEn ? `<p><strong>EN:</strong> ${esc(transEn)}</p>` : ''}</div>` : ''}
    ${examples ? `<div class="section"><h3>${t('Misol', 'Мисол')}</h3>${examples}</div>` : ''}
    ${related}
    <footer class="footer">
      <span>${window.location.origin ? TermActions.termUrl(term.id) : ''}</span>
      <span>${new Date().toLocaleDateString('uz-UZ')}</span>
    </footer>
  </div>
  <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 400); };</script>
</body>
</html>`;

    const w = window.open('', '_blank', 'width=800,height=900');
    if (!w) {
      alert('Chop etish uchun pop-up ruxsatini yoqing.');
      return false;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    return true;
  },

  showToast(message, ms = 2800) {
    const prev = document.querySelector('.toast-msg');
    if (prev) prev.remove();
    const el = document.createElement('div');
    el.className = 'toast-msg';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
  },
};

window.TermActions = TermActions;

// Voices load async in some browsers
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {};
}
