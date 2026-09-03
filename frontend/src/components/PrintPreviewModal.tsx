import type { ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onPrint: () => void;
  children: ReactNode;
}

export default function PrintPreviewModal({ open, onClose, onPrint, children }: Props) {
  const { t } = useLang();
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t.downloads.printPreview}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onPrint}>
            {t.downloads.print}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            {t.downloads.printPreview}
          </button>
        </div>
      </div>
    </div>
  );
}