import type { Formacion } from '../types';
import Field, { Section } from './Field';
import Repeatable from './Repeatable';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  formacion: Formacion[];
  onChange: (f: Formacion[]) => void;
}

export default function FormacionSection({ formacion, onChange }: Props) {
  const { t } = useLang();
  const update = (i: number, v: Formacion) => {
    const next = [...formacion];
    next[i] = v;
    onChange(next);
  };
  const add = () =>
    onChange([...formacion, { institucion: '', titulo: '', anioInicio: '', anioFin: '', enCurso: false }]);
  const remove = (i: number) => onChange(formacion.filter((_, idx) => idx !== i));

  return (
    <Section title={t.form.education}>
      {formacion.map((f, i) => (
        <Repeatable key={i} addLabel={t.form.addEducation} onAdd={add} onRemove={() => remove(i)}>
          <div className="repeatable-group">
            <Field label={t.form.institution} value={f.institucion} onChange={(v) => update(i, { ...f, institucion: v })} />
            <Field label={t.form.degree} value={f.titulo} onChange={(v) => update(i, { ...f, titulo: v })} />
            <div className="fields-row">
              <Field label={t.form.startYear} type="number" value={f.anioInicio} onChange={(v) => update(i, { ...f, anioInicio: v })} />
              <Field
                label={f.enCurso ? t.form.inProgress : t.form.endYear}
                type="number"
                value={f.anioFin}
                onChange={(v) => update(i, { ...f, anioFin: v })}
              />
            </div>
            <label className="checkbox">
              <input type="checkbox" checked={f.enCurso} onChange={(e) => update(i, { ...f, enCurso: e.target.checked })} />
              {t.form.inProgress}
            </label>
          </div>
        </Repeatable>
      ))}
      {formacion.length === 0 && (
        <button type="button" className="btn btn-add" onClick={add}>
          + {t.form.addEducation}
        </button>
      )}
    </Section>
  );
}