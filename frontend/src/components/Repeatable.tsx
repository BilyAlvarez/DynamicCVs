import type { ReactNode } from 'react';

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
  return (
    <div className="repeatable">
      {children}
      <div className="repeatable-actions">
        <button type="button" className="btn btn-add" onClick={onAdd}>
          + {addLabel}
        </button>
        <button type="button" className="btn btn-remove" onClick={onRemove}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
