import type { Experiencia } from '../types';
import Field, { Section } from './Field';
import Repeatable from './Repeatable';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  experiencia: Experiencia[];
  onChange: (e: Experiencia[]) => void;
}

export default function ExperienciaSection({ experiencia, onChange }: Props) {
  const { t } = useLang();
  const update = (i: number, v: Experiencia) => {
    const next = [...experiencia];
    next[i] = v;
    onChange(next);
  };
  const add = () =>
    onChange([...experiencia, { empresa: '', cargo: '', ciudad: '', fechas: '', funciones: [] }]);
  const remove = (i: number) => onChange(experiencia.filter((_, idx) => idx !== i));

  const updateFuncion = (i: number, fi: number, texto: string) => {
    const next = [...experiencia];
    const funciones = [...next[i].funciones];
    funciones[fi] = { texto };
    next[i] = { ...next[i], funciones };
    onChange(next);
  };
  const addFuncion = (i: number) => {
    const next = [...experiencia];
    next[i] = { ...next[i], funciones: [...next[i].funciones, { texto: '' }] };
    onChange(next);
  };
  const removeFuncion = (i: number, fi: number) => {
    const next = [...experiencia];
    next[i] = { ...next[i], funciones: next[i].funciones.filter((_, idx) => idx !== fi) };
    onChange(next);
  };

  return (
    <Section title={t.form.experience}>
      {experiencia.map((e, i) => (
        <Repeatable key={i} addLabel={t.form.addExperience} onAdd={add} onRemove={() => remove(i)}>
          <div className="repeatable-group">
            <Field label={t.form.company} value={e.empresa} onChange={(v) => update(i, { ...e, empresa: v })} />
            <Field label={t.form.position} value={e.cargo} onChange={(v) => update(i, { ...e, cargo: v })} />
            <div className="fields-row">
              <Field label={t.form.city} value={e.ciudad} onChange={(v) => update(i, { ...e, ciudad: v })} />
              <Field label={t.form.dates} value={e.fechas} onChange={(v) => update(i, { ...e, fechas: v })} />
            </div>
            <h4 className="subsection-title">{t.form.duties}</h4>
            {e.funciones.map((f, fi) => (
              <div key={fi} className="function-row">
                <input
                  className="field-input"
                  value={f.texto}
                  onChange={(ev) => updateFuncion(i, fi, ev.target.value)}
                />
                <button type="button" className="btn btn-remove" onClick={() => removeFuncion(i, fi)}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-add" onClick={() => addFuncion(i)}>
              + {t.form.addFunction}
            </button>
          </div>
        </Repeatable>
      ))}
      {experiencia.length === 0 && (
        <button type="button" className="btn btn-add" onClick={add}>
          + {t.form.addExperience}
        </button>
      )}
    </Section>
  );
}