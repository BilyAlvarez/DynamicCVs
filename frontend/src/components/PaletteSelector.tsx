import type { Paleta } from '../types';
import { PALETAS } from '../data';
import { ensureTextColor, isReadable } from '../utils/contrast';

interface Props {
  paleta: Paleta;
  onChange: (p: Paleta) => void;
}

function MiniPreview({ paleta }: { paleta: Paleta }) {
  const c = paleta.colors;
  return (
    <div className="mini-preview" style={{ backgroundColor: c.background }}>
      <div className="mini-banner" style={{ backgroundColor: c.sidebar }}>
        <div className="mini-line mini-line-primary" style={{ backgroundColor: c.primary }} />
        <div className="mini-line" style={{ backgroundColor: c.textLight }} />
      </div>
      <div className="mini-body">
        <div className="mini-side" style={{ backgroundColor: c.primary }}>
          <div className="mini-line" style={{ backgroundColor: c.textLight }} />
          <div className="mini-line mini-short" style={{ backgroundColor: c.textLight }} />
        </div>
        <div className="mini-content" style={{ backgroundColor: c.accent }} />
      </div>
    </div>
  );
}

export default function PaletteSelector({ paleta, onChange }: Props) {
  const handleCustomPrimary = (v: string) =>
    onChange({
      ...paleta,
      colors: {
        ...paleta.colors,
        primary: v,
        sidebar: v,
        textLight: ensureTextColor(v),
      },
    });
  const handleCustomAccent = (v: string) =>
    onChange({
      ...paleta,
      colors: { ...paleta.colors, accent: v },
    });

  const ratio = isReadable(paleta.colors.primary, paleta.colors.textLight);

  const isCustom = !PALETAS.some((p) => p.id === paleta.id);

  return (
    <section className="section">
      <h2 className="section-title">Elige paleta de color</h2>
      <div className="palette-grid">
        {PALETAS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`palette-card ${paleta.id === p.id ? 'palette-card-active' : ''}`}
            onClick={() => onChange(p)}
          >
            <MiniPreview paleta={p} />
            <span className="palette-name">{p.name}</span>
          </button>
        ))}
      </div>
      <div className="custom-colors">
        <button
          type="button"
          className={`btn ${isCustom ? 'btn-active' : ''}`}
          onClick={() => onChange({ ...PALETAS[0], id: 'custom' })}
        >
          Personalizado
        </button>
        <label className="color-field">
          Principal
          <input
            type="color"
            value={paleta.colors.primary}
            onChange={(e) => handleCustomPrimary(e.target.value)}
          />
        </label>
        <label className="color-field">
          Acento
          <input
            type="color"
            value={paleta.colors.accent}
            onChange={(e) => handleCustomAccent(e.target.value)}
          />
        </label>
        {isCustom && (
          <span
            className={`contrast-badge ${ratio.pass ? 'contrast-ok' : 'contrast-bad'}`}
            title="Contraste entre color principal y texto"
          >
            Contraste {ratio.ratio.toFixed(1)}:1 {ratio.pass ? '✓' : '(usa claro/oscuro)'}
          </span>
        )}
      </div>
    </section>
  );
}