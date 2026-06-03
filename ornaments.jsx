/* Central Asian ornamental SVG components */
/* global React, d3, topojson */
const { useRef, useEffect } = React;

const CA_COUNTRY_IDS = new Set(['860', '398', '417', '762', '795']);

// 8-point star (Khorezm star) ΓÇö fundamental CA tile motif
function StarOctagon({ size = 24, color = 'currentColor', stroke = 1.2, filled = false }) {
  const c = size / 2;
  const r = size / 2 - stroke;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={filled ? color : 'none'} stroke={color} strokeWidth={stroke} strokeLinejoin="round">
      <rect x={c - r} y={c - r} width={r*2} height={r*2}/>
      <rect x={c - r} y={c - r} width={r*2} height={r*2} transform={`rotate(45 ${c} ${c})`}/>
    </svg>
  );
}

// Suzani-style radial medallion ΓÇö embroidered floral abstraction
function SuzaniMedallion({ size = 220, color = 'currentColor' }) {
  const c = size / 2;
  const petals = 8;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={c} cy={c} r={c - 4}/>
      <circle cx={c} cy={c} r={c - 24}/>
      <circle cx={c} cy={c} r={c - 60}/>
      <circle cx={c} cy={c} r={8}/>
      <circle cx={c} cy={c} r={3} fill={color}/>
      {/* outer petals */}
      {Array.from({length: petals}).map((_, i) => {
        const a = (i / petals) * Math.PI * 2;
        const x1 = c + Math.cos(a) * (c - 24);
        const y1 = c + Math.sin(a) * (c - 24);
        const x2 = c + Math.cos(a) * (c - 4);
        const y2 = c + Math.sin(a) * (c - 4);
        const px = c + Math.cos(a) * (c - 14);
        const py = c + Math.sin(a) * (c - 14);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}/>
            <ellipse cx={px} cy={py} rx="6" ry="3" transform={`rotate(${(a*180/Math.PI) + 90} ${px} ${py})`}/>
          </g>
        );
      })}
      {/* inner girih */}
      <rect x={c - 30} y={c - 30} width="60" height="60" transform={`rotate(45 ${c} ${c})`}/>
      <rect x={c - 30} y={c - 30} width="60" height="60"/>
      {/* tendrils */}
      {Array.from({length: 16}).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = c + Math.cos(a) * 30;
        const y1 = c + Math.sin(a) * 30;
        const x2 = c + Math.cos(a) * 56;
        const y2 = c + Math.sin(a) * 56;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
      })}
    </svg>
  );
}

// Girih lattice ΓÇö geometric tile pattern (looks like Bukhara mosque tilework)
function GirihLattice({ width = 320, height = 80, color = 'currentColor' }) {
  const tiles = Math.ceil(width / 40);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" stroke={color} strokeWidth="0.8">
      {Array.from({length: tiles}).map((_, i) => {
        const cx = i * 40 + 20;
        const cy = height / 2;
        return (
          <g key={i}>
            <rect x={cx - 14} y={cy - 14} width="28" height="28"/>
            <rect x={cx - 14} y={cy - 14} width="28" height="28" transform={`rotate(45 ${cx} ${cy})`}/>
            <circle cx={cx} cy={cy} r="2" fill={color}/>
          </g>
        );
      })}
    </svg>
  );
}

// Iwan arch ΓÇö Persian/Central Asian portal arch frame
function IwanArchFrame({ width = 460, height = 200, color = 'currentColor' }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" stroke={color} strokeWidth="1">
      <path d={`M 8 ${height} L 8 ${height * 0.55} Q ${width/2} 8 ${width - 8} ${height * 0.55} L ${width - 8} ${height}`}/>
      <path d={`M 22 ${height} L 22 ${height * 0.58} Q ${width/2} 24 ${width - 22} ${height * 0.58} L ${width - 22} ${height}`} opacity="0.5"/>
    </svg>
  );
}

// Calligraphic horizontal flourish ΓÇö between sections
function Flourish({ width = 220, color = 'currentColor' }) {
  return (
    <svg width={width} height="14" viewBox={`0 0 220 14`} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
      <path d="M 4 7 L 90 7 M 130 7 L 216 7"/>
      <circle cx="110" cy="7" r="3"/>
      <circle cx="110" cy="7" r="6"/>
      <line x1="100" y1="7" x2="120" y2="7"/>
      <line x1="110" y1="0" x2="110" y2="14"/>
      <line x1="103" y1="0" x2="117" y2="14"/>
      <line x1="117" y1="0" x2="103" y2="14"/>
    </svg>
  );
}

// Decorative section heading with side stars and lines
function OrnateSectionHead({ children }) {
  return (
    <div className="ornate-head">
      <span className="line"></span>
      <StarOctagon size={11}/>
      <span>{children}</span>
      <StarOctagon size={11}/>
      <span className="line"></span>
    </div>
  );
}

// Central Asia map — world-atlas + d3 (CA-5 highlighted)
function CentralAsiaMap({ size = 460 }) {
  const wrapRef = useRef(null);
  const height = Math.round(size * 0.65);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof d3 === 'undefined' || typeof topojson === 'undefined') return;

    el.innerHTML = '';
    const root = getComputedStyle(document.documentElement);
    const accent = root.getPropertyValue('--accent').trim() || '#c89855';
    const accent2 = root.getPropertyValue('--accent-2').trim() || '#e8b56a';
    const muted = root.getPropertyValue('--bg-3').trim() || '#1a1f28';
    const border = root.getPropertyValue('--border').trim() || '#2a3140';

    const svg = d3.select(el).append('svg')
      .attr('viewBox', `0 0 ${size} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('role', 'img')
      .attr('aria-label', 'Markaziy Osiyo xaritasi');

    const projection = d3.geoMercator()
      .center([67, 44])
      .scale(size * 1.45)
      .translate([size / 2, height / 2]);
    const pathGen = d3.geoPath().projection(projection);

    let cancelled = false;

    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(world => {
        if (cancelled) return;
        const countries = topojson.feature(world, world.objects.countries);
        svg.selectAll('path')
          .data(countries.features)
          .join('path')
          .attr('d', pathGen)
          .attr('fill', d => CA_COUNTRY_IDS.has(String(d.id)) ? accent : muted)
          .attr('fill-opacity', d => CA_COUNTRY_IDS.has(String(d.id)) ? 0.85 : 0.4)
          .attr('stroke', d => CA_COUNTRY_IDS.has(String(d.id)) ? accent2 : border)
          .attr('stroke-width', d => CA_COUNTRY_IDS.has(String(d.id)) ? 1.3 : 0.35);
      })
      .catch(() => {
        if (!cancelled) el.innerHTML = '<p style="padding:24px;color:var(--fg-mute);font-size:12px">Xarita yuklanmadi</p>';
      });

    return () => { cancelled = true; el.innerHTML = ''; };
  }, [size, height]);

  return (
    <div ref={wrapRef} className="ca-map-svg" style={{ width: size, maxWidth: '100%', height }} />
  );
}

window.DL = Object.assign(window.DL || {}, {
  StarOctagon, SuzaniMedallion, GirihLattice, IwanArchFrame, Flourish,
  OrnateSectionHead, CentralAsiaMap
});
