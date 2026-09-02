import type { Formacion } from '../types';
import Field, { Section } from './Field';
import Repeatable from './Repeatable';

interface Props {
  formacion: Formacion[];
  onChange: (f: Formacion[]) => void;
}

export default function FormacionSection({ formacion, onChange }: Props) {
  const update = (i: number, v: Formacion) => {
    const next = [...formacion];
    next[i] = v;
    onChange(next);
  };
  const add = () =>
    onChange([...formacion, { institucion: '', titulo: '', anioInicio: '', anioFin: '', enCurso: false }]);
  const remove = (i: number) => onChange(formacion.filter((_, idx) => idx !== i));

  return (
    <Section title="Formación">
      {formacion.map((f, i) => (
        <Repeatable
          key={i}
          addLabel="Agregar formación"
          onAdd={add}
          onRemove={() => remove(i)}
        >
          <div className="repeatable-group">
            <Field label="Institución" value={f.institucion} onChange={(v) => update(i, { ...f, institucion: v })} />
            <Field label="Título" value={f.titulo} onChange={(v) => update(i, { ...f, titulo: v })} />
            <div className="fields-row">
              <Field label="Año inicio" value={f.anioInicio} onChange={(v) => update(i, { ...f, anioInicio: v })} />
              <Field
                label={f.enCurso ? 'En curso' : 'Año fin'}
                value={f.anioFin}
                onChange={(v) => update(i, { ...f, anioFin: v })}
              />
            </div>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={f.enCurso}
                onChange={(e) => update(i, { ...f, enCurso: e.target.checked })}
              />
              En curso
            </label>
          </div>
        </Repeatable>
      ))}
      {formacion.length === 0 && (
        <button type="button" className="btn btn-add" onClick={add}>
          + Agregar formación
        </button>
      )}
    </Section>
  );
}
