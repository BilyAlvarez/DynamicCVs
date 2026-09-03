import { useState } from 'react';
import { Section } from './Field';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  competencias: string[];
  onChange: (c: string[]) => void;
}

export default function CompetenciasSection({ competencias, onChange }: Props) {
  const { t } = useLang();
  const [input, setInput] = useState('');

  const add = () => {
    const value = input.trim();
    if (value && !competencias.includes(value)) {
      onChange([...competencias, value]);
    }
    setInput('');
  };

  const remove = (c: string) => onChange(competencias.filter((x) => x !== c));

  return (
    <Section title={t.form.skills}>
      <div className="chips-input">
        <input
          className="field-input"
          placeholder={t.form.competencyPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn btn-add" onClick={add}>
          {t.form.add}
        </button>
      </div>
      <div className="chips">
        {competencias.map((c) => (
          <span key={c} className="chip">
            {c}
            <button type="button" className="chip-remove" onClick={() => remove(c)}>
              ×
            </button>
          </span>
        ))}
      </div>
    </Section>
  );
}