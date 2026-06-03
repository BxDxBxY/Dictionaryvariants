/* ============================================================
   api.js  —  Backend connection layer
   Base: http://localhost:8000/api/
   Docs: http://localhost:8000/api/swagger/
   ============================================================ */

const API_BASE = 'http://localhost:8000/api';
window.DL_API_STATE = window.DL_API_STATE || 'loading';

// ── Token management ────────────────────────────────────────
const Auth = {
  getAccess:  () => localStorage.getItem('dl-access'),
  getRefresh: () => localStorage.getItem('dl-refresh'),
  set(access, refresh) {
    localStorage.setItem('dl-access', access);
    if (refresh) localStorage.setItem('dl-refresh', refresh);
  },
  clear() {
    localStorage.removeItem('dl-access');
    localStorage.removeItem('dl-refresh');
  },
  headers() {
    const token = this.getAccess();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

// ── Generic fetch wrapper ────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...Auth.headers(), ...(options.headers || {}) },
    ...options,
  });

  // Try token refresh once on 401
  if (res.status === 401 && Auth.getRefresh()) {
    const refreshed = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: Auth.getRefresh() }),
    });
    if (refreshed.ok) {
      const data = await refreshed.json();
      Auth.set(data.access);
      // Retry original request with new token
      const retry = await fetch(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.access}`, ...(options.headers || {}) },
        ...options,
      });
      if (!retry.ok) throw new Error(`API ${retry.status}: ${retry.statusText}`);
      return retry.json();
    } else {
      Auth.clear();
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!res.ok) {
    let msg;
    try { msg = JSON.stringify(await res.json()); }
    catch { msg = res.statusText; }
    throw new Error(`API ${res.status}: ${msg}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ── Field normaliser: API term → frontend term shape ─────────
// The backend stores a single `title` (Uzbek Latin) and `definition`.
// We reflect it into both .lat and .cyr slots so existing UI works.
function normaliseTerm(raw) {
  const id = String(raw.id);

  // title may be "Word (Кириллча)" — split if parens found, otherwise reuse
  const titleLat = raw.title || '';
  const titleCyrMatch = titleLat.match(/\(([^)]+)\)\s*$/);
  const titleCyr = titleCyrMatch ? titleCyrMatch[1] : titleLat;
  const titleLatClean = titleCyrMatch ? titleLat.replace(titleCyrMatch[0], '').trim() : titleLat;

  const defLat = raw.definition || '';

  const firstCat = (raw.categories || [])[0];
  const catId = raw.category
    ? (typeof raw.category === 'object' ? String(raw.category.id) : String(raw.category))
    : firstCat
      ? (typeof firstCat === 'object' ? String(firstCat.id) : String(firstCat))
      : '01';

  const firstCountry = (raw.related_countries || [])[0];
  const countryName = raw.country
    ? (typeof raw.country === 'object' ? (raw.country.name || '') : '')
    : firstCountry
      ? (typeof firstCountry === 'object' ? (firstCountry.name || '') : '')
      : '';

  const firstSource = (raw.sources || [])[0];
  const sourceName = raw.source
    ? (typeof raw.source === 'object' ? (raw.source.name || '') : '')
    : firstSource
      ? (typeof firstSource === 'object' ? (firstSource.name || '') : '')
      : '';

  // photos
  const photos = (raw.photos || []).map(p => p.photo || p);

  return {
    id,
    _raw: raw,
    term:    { lat: titleLatClean, cyr: titleCyr },
    pron:    { lat: '', cyr: '' },
    cat:     catId,
    origin:  { lang: countryName || 'Xalqaro', word: titleLatClean, mean: defLat.slice(0, 60) + (defLat.length > 60 ? '…' : '') },
    def:     { lat: defLat, cyr: defLat },
    trans:   { ru: raw.title_ru || '', en: raw.title_en || '' },
    examples: (raw.examples || []).map(ex => ({
      lat: typeof ex === 'string' ? ex : (ex.text || ex.lat || ''),
      cyr: typeof ex === 'string' ? ex : (ex.text || ex.cyr || ''),
      src: ex.source || sourceName || '',
    })),
    related: (raw.related_terms || raw.related || []).map(r => String(typeof r === 'object' ? r.id : r)),
    photos,
  };
}

// Category normaliser
function normaliseCategory(raw) {
  const name = raw.name || '';
  return {
    id:    String(raw.id),
    name:  { lat: name, cyr: name, en: raw.description || name },
    count: raw.term_count || 0,
    _raw:  raw,
  };
}

// ── Dictionary API ───────────────────────────────────────────
const DictAPI = {

  /** Fetch countries for stats / filters */
  async loadCountries() {
    try {
      const data = await apiFetch('/dictionary/country/');
      const list = Array.isArray(data) ? data : (data.results || []);
      window.COUNTRIES = list;
      window.COUNTRY_COUNT = list.length > 0 ? list.length : 5;
    } catch {
      window.COUNTRIES = window.COUNTRIES || [];
      window.COUNTRY_COUNT = 5;
    }
    return window.COUNTRIES;
  },

  /** Fetch all categories and populate window.CATEGORIES */
  async loadCategories() {
    const data = await apiFetch('/dictionary/category/');
    const list = Array.isArray(data) ? data : (data.results || []);
    if (list.length) {
      window.CATEGORIES = list.map(normaliseCategory);
    }
    return window.CATEGORIES;
  },

  /** Fetch all terms and populate window.TERMS (list view; use getTerm for full detail) */
  async loadTerms() {
    const data = await apiFetch('/dictionary/term/');
    const list = Array.isArray(data) ? data : (data.results || []);
    window.TERMS = list.map(normaliseTerm);
    window.TERMS.sort((a, b) => a.term.lat.localeCompare(b.term.lat, 'uz-Latn'));
    return window.TERMS;
  },

  /** Live search — hits backend, returns normalised terms */
  async search(query, categoryId) {
    let url = `/dictionary/search_term/?query=${encodeURIComponent(query)}`;
    if (categoryId) url += `&category=${encodeURIComponent(categoryId)}`;
    const data = await apiFetch(url);
    const list = Array.isArray(data) ? data : (data.results || []);
    return list.map(normaliseTerm);
  },

  /** Get single term by id (full definition + relations) */
  async getTerm(id) {
    try {
      const raw = await apiFetch(`/dictionary/term_detailed/${id}/`);
      return normaliseTerm(raw);
    } catch {
      const raw = await apiFetch(`/dictionary/term/${id}/`);
      return normaliseTerm(raw);
    }
  },

  /** Send contact form */
  async sendContact({ name, email, subject, message }) {
    return apiFetch('/dictionary/contact/', {
      method: 'POST',
      body: JSON.stringify({ name, email, subject, message }),
    });
  },
};

// ── Auth API ─────────────────────────────────────────────────
const AuthAPI = {
  async login(username, password) {
    const data = await apiFetch('/auth/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    Auth.set(data.access, data.refresh);
    return data;
  },

  async register({ username, password, phone_number, first_name, last_name }) {
    return apiFetch('/finduz/user_create_view/', {
      method: 'POST',
      body: JSON.stringify({
        username, password, phone_number,
        first_name, last_name,
        user_type: 'dict_user',
      }),
    });
  },

  logout() { Auth.clear(); },
  isLoggedIn() { return !!Auth.getAccess(); },
};

// ── Bootstrap: load all data on page ready ───────────────────
// Sets window.DL_READY = true and fires a custom event when done.
// Falls back gracefully to static data.js values if backend is down.
async function bootstrapAPI() {
  window.DL_API_STATE = 'loading';
  try {
    await Promise.all([
      DictAPI.loadCategories(),
      DictAPI.loadTerms(),
      DictAPI.loadCountries(),
    ]);

    // Ensure WORD_OF_DAY_ID points to a real loaded term
    if (window.TERMS && window.TERMS.length > 0) {
      const todayIndex = new Date().getDate() % window.TERMS.length;
      window.WORD_OF_DAY_ID = window.TERMS[todayIndex]?.id || window.TERMS[0].id;
      window.RECENT_IDS = window.TERMS.slice(0, 5).map(t => t.id);
    }

    window.DL_API_STATE = 'ready';
    console.info(`[API] Loaded ${window.TERMS.length} terms, ${window.CATEGORIES.length} categories`);
  } catch (err) {
    window.DL_API_STATE = 'fallback';
    console.warn('[API] Backend unreachable — using static data.', err.message);
    // Static data from data.js is already set; nothing to do.
  }

  window.dispatchEvent(new CustomEvent('dl:ready'));
}

// Expose everything
window.DL_API   = { DictAPI, AuthAPI, Auth, bootstrapAPI };

// Start loading before React mounts
bootstrapAPI();
