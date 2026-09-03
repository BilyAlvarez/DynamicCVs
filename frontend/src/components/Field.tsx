import type { ReactNode } from 'react';

interface BaseProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
}

type Props = BaseProps;

export function Field({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  textarea = false,
  rows = 3,
  options,
}: Props) {
  const inner = () => {
    if (textarea) {
      return (
        <textarea
          className="field-input"
          placeholder={placeholder}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    if (options && options.length) {
      return (
        <select
          className="field-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {!value && <option value="">{placeholder || '—'}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    return (
      <input
        className="field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      {inner()}
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

export default Field;