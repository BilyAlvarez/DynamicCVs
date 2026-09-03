import type { ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';

export default function Repeatable({
  children,
  onAdd,
  onRemove,
  addLabel,
}: {
  children: ReactNode;
  onAdd: () => void;
  onRemove: () => void;
  addLabel: string;
}) {
  const { t } = useLang();
  return (
    <div className="repeatable">
      {children}
      <div className="repeatable-actions">
        <button type="button" className="btn btn-add" onClick={onAdd}>
          + {addLabel}
        </button>
        <button type="button" className="btn btn-remove" onClick={onRemove}>
          {t.form.remove}
        </button>
      </div>
    </div>
  );
}