/* Central Asian ornamental SVG components */
/* global React */

// 8-point star (Khorezm star) — fundamental CA tile motif
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

// Suzani-style radial medallion — embroidered floral abstraction
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

// Girih lattice — geometric tile pattern (looks like Bukhara mosque tilework)
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

// Iwan arch — Persian/Central Asian portal arch frame
function IwanArchFrame({ width = 460, height = 200, color = 'currentColor' }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" stroke={color} strokeWidth="1">
      <path d={`M 8 ${height} L 8 ${height * 0.55} Q ${width/2} 8 ${width - 8} ${height * 0.55} L ${width - 8} ${height}`}/>
      <path d={`M 22 ${height} L 22 ${height * 0.58} Q ${width/2} 24 ${width - 22} ${height * 0.58} L ${width - 22} ${height}`} opacity="0.5"/>
    </svg>
  );
}

// Calligraphic horizontal flourish — between sections
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

// Central Asia map (CA-5 stylized)
function CentralAsiaMap({ size = 360, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 360 220" width={size} fill="none" stroke={color} strokeWidth="1" strokeLinejoin="round">
      {/* Kazakhstan — large north */}
      <path d="M 30 30 Q 80 10 160 18 Q 240 22 310 36 Q 340 40 348 60 Q 340 90 300 100 Q 260 96 230 110 Q 200 118 170 110 Q 140 100 100 110 Q 60 116 32 96 Q 18 70 30 30 Z" opacity="0.85"/>
      {/* Uzbekistan — central */}
      <path d="M 90 110 Q 130 102 170 112 Q 200 118 220 130 Q 230 142 220 152 Q 200 158 180 150 Q 150 144 120 150 Q 96 146 86 130 Z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.2"/>
      {/* Turkmenistan — southwest */}
      <path d="M 32 110 Q 62 116 92 132 Q 96 146 88 168 Q 60 184 40 178 Q 24 162 22 140 Q 22 124 32 110 Z" opacity="0.75"/>
      {/* Tajikistan — southeast */}
      <path d="M 200 152 Q 224 152 240 158 Q 252 168 250 178 Q 232 184 218 178 Q 206 168 200 152 Z" opacity="0.75"/>
      {/* Kyrgyzstan — east */}
      <path d="M 230 112 Q 260 110 290 116 Q 304 124 304 134 Q 280 144 260 142 Q 238 138 222 130 Z" opacity="0.75"/>
      {/* Capital dots */}
      <g fill={color} stroke="none">
        <circle cx="150" cy="132" r="3"/>{/* Tashkent */}
        <circle cx="190" cy="46" r="2.5"/>{/* Astana */}
        <circle cx="270" cy="124" r="2.5"/>{/* Bishkek */}
        <circle cx="232" cy="170" r="2.5"/>{/* Dushanbe */}
        <circle cx="60" cy="148" r="2.5"/>{/* Ashgabat */}
      </g>
      <g fill={color} stroke="none" fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.7">
        <text x="156" y="128">TASHKENT</text>
        <text x="196" y="42">ASTANA</text>
        <text x="276" y="120">BISHKEK</text>
        <text x="238" y="174">DUSHANBE</text>
        <text x="14" y="160">ASHGABAT</text>
      </g>
    </svg>
  );
}

window.DL = Object.assign(window.DL || {}, {
  StarOctagon, SuzaniMedallion, GirihLattice, IwanArchFrame, Flourish,
  OrnateSectionHead, CentralAsiaMap
});
