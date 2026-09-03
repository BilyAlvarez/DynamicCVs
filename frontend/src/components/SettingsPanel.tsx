import type { CVSettings, Paleta, PlantillaId, Tipografia } from '../types';
import { PALETAS, PALETAS_MONO, TIPOGRAFIAS, PLANTILLAS } from '../data';
import { ensureTextColor, isReadable } from '../utils/contrast';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  settings: CVSettings;
  onChange: (s: CVSettings) => void;
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

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <select className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SettingsPanel({ settings, onChange }: Props) {
  const { t } = useLang();
  const set = (patch: Partial<CVSettings>) => onChange({ ...settings, ...patch });

  const allPalettes =
    settings.plantilla === 'harvard' ? [...PALETAS_MONO, ...PALETAS.slice(0, 1)] : [...PALETAS, ...PALETAS_MONO];

  const currentPalette =
    settings.paleta ?? (settings.plantilla === 'harvard' ? PALETAS_MONO[0] : PALETAS[0]);

  const handleCustomPrimary = (v: string) =>
    set({
      paleta: {
        ...currentPalette,
        colors: {
          ...currentPalette.colors,
          primary: v,
          sidebar: v,
          textLight: ensureTextColor(v),
        },
      },
    });
  const handleCustomAccent = (v: string) =>
    set({
      paleta: {
        ...currentPalette,
        colors: { ...currentPalette.colors, accent: v },
      },
    });

  const ratio = isReadable(currentPalette.colors.primary, currentPalette.colors.textLight);
  const isCustom = !allPalettes.some((p) => p.id === currentPalette.id);

  const handlePlantilla = (id: PlantillaId) => {
    set({
      plantilla: id,
      paleta: id === 'harvard' ? PALETAS_MONO[0] : PALETAS[0],
      tipografia: id === 'harvard' ? 'serif' : settings.tipografia,
    });
  };

  const selectTipografia = (id: Tipografia) =>
    set({ tipografia: id });

  return (
    <section className="section">
      <h2 className="section-title">{t.appTitle}</h2>

      <Select
        label={t.menu.inputMode}
        value={settings.modo}
        options={[
          { id: 'form', label: t.menu.form },
          { id: 'wizard', label: t.menu.wizard },
        ]}
        onChange={(v) => set({ modo: v as CVSettings['modo'] })}
      />

      <div className="settings-block">
        <span className="field-label">{t.menu.template}</span>
        <div className="template-row">
          {PLANTILLAS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`template-card ${settings.plantilla === p.id ? 'template-card-active' : ''}`}
              onClick={() => handlePlantilla(p.id)}
            >
              <span className="template-name">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-block">
        <span className="field-label">{t.menu.typography}</span>
        <div className="template-row">
          {TIPOGRAFIAS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`template-card ${settings.tipografia === f.id ? 'template-card-active' : ''}`}
              style={{ fontFamily: f.family }}
              onClick={() => selectTipografia(f.id)}
            >
              <span className="template-name">Aa {f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-block">
        <span className="field-label">{t.menu.palette}</span>
        <div className="palette-grid">
          {allPalettes.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`palette-card ${currentPalette.id === p.id ? 'palette-card-active' : ''}`}
              onClick={() => set({ paleta: p })}
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
            onClick={() => set({ paleta: { ...PALETAS[0], id: 'custom' } })}
          >
            {t.menu.custom}
          </button>
          <label className="color-field">
            {t.menu.primary}
            <input type="color" value={currentPalette.colors.primary} onChange={(e) => handleCustomPrimary(e.target.value)} />
          </label>
          <label className="color-field">
            {t.menu.accent}
            <input type="color" value={currentPalette.colors.accent} onChange={(e) => handleCustomAccent(e.target.value)} />
          </label>
          {isCustom && (
            <span
              className={`contrast-badge ${ratio.pass ? 'contrast-ok' : 'contrast-bad'}`}
              title={t.menu.contrast}
            >
              {t.menu.contrast} {ratio.ratio.toFixed(1)}:1 {ratio.pass ? '✓' : t.menu.contrastBad}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}