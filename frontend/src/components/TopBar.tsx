import type { CVSettings, Idioma } from '../types';
import { IDIOMAS } from '../data';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  settings: CVSettings;
  onSettingsChange: (s: CVSettings) => void;
  onPrintPreview: () => void;
  onPrint: () => void;
  onDownloadPdf: () => void;
  onDownloadWord: () => void;
}

export default function TopBar({
  settings,
  onSettingsChange,
  onPrintPreview,
  onPrint,
  onDownloadPdf,
  onDownloadWord,
}: Props) {
  const { t } = useLang();
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="topbar-logo">DC</span>
        <h1 className="topbar-title">{t.appTitle}</h1>
      </div>
      <div className="topbar-actions">
        <select
          className="field-input topbar-lang"
          value={settings.idioma}
          onChange={(e) => onSettingsChange({ ...settings, idioma: e.target.value as Idioma })}
          aria-label={t.languageLabel}
        >
          {IDIOMAS.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={onPrint}>
          {t.downloads.print}
        </button>
        <button className="btn btn-secondary" onClick={onDownloadPdf}>
          {t.downloads.pdf}
        </button>
        <button className="btn btn-secondary" onClick={onDownloadWord}>
          {t.downloads.word}
        </button>
        <button className="btn btn-primary" onClick={onPrintPreview}>
          {t.downloads.printPreview}
        </button>
      </div>
    </header>
  );
}