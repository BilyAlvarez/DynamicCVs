import type { ReactNode } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
}

export default function Field({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  textarea = false,
  rows = 3,
}: Props) {
  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      {textarea ? (
        <textarea
          className="field-input"
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="field-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}
