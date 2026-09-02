import type { HabilidadTecnica, Idioma, Certificacion } from '../types';
import Field, { Section } from './Field';
import Repeatable from './Repeatable';

interface Props {
  habilidades: HabilidadTecnica[];
  idiomas: Idioma[];
  certificaciones: Certificacion[];
  onChangeHabilidades: (h: HabilidadTecnica[]) => void;
  onChangeIdiomas: (i: Idioma[]) => void;
  onChangeCertificaciones: (c: Certificacion[]) => void;
}

export default function MiscSections({
  habilidades,
  idiomas,
  certificaciones,
  onChangeHabilidades,
  onChangeIdiomas,
  onChangeCertificaciones,
}: Props) {
  const updateH = (i: number, v: HabilidadTecnica) => {
    const next = [...habilidades];
    next[i] = v;
    onChangeHabilidades(next);
  };
  const addH = () => onChangeHabilidades([...habilidades, { herramienta: '', descripcion: '' }]);
  const removeH = (i: number) => onChangeHabilidades(habilidades.filter((_, idx) => idx !== i));

  const updateI = (i: number, v: Idioma) => {
    const next = [...idiomas];
    next[i] = v;
    onChangeIdiomas(next);
  };
  const addI = () => onChangeIdiomas([...idiomas, { nombre: '', nivel: '' }]);
  const removeI = (i: number) => onChangeIdiomas(idiomas.filter((_, idx) => idx !== i));

  const updateC = (i: number, v: Certificacion) => {
    const next = [...certificaciones];
    next[i] = v;
    onChangeCertificaciones(next);
  };
  const addC = () => onChangeCertificaciones([...certificaciones, { curso: '', institucion: '' }]);
  const removeC = (i: number) => onChangeCertificaciones(certificaciones.filter((_, idx) => idx !== i));

  return (
    <>
      <Section title="Habilidades técnicas">
        {habilidades.map((h, i) => (
          <Repeatable
            key={i}
            addLabel="Agregar habilidad"
            onAdd={addH}
            onRemove={() => removeH(i)}
          >
            <div className="repeatable-group">
              <Field label="Herramienta" value={h.herramienta} onChange={(v) => updateH(i, { ...h, herramienta: v })} />
              <Field label="Descripción" value={h.descripcion} onChange={(v) => updateH(i, { ...h, descripcion: v })} />
            </div>
          </Repeatable>
        ))}
        {habilidades.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addH}>
            + Agregar habilidad
          </button>
        )}
      </Section>

      <Section title="Idiomas">
        {idiomas.map((m, i) => (
          <Repeatable key={i} addLabel="Agregar idioma" onAdd={addI} onRemove={() => removeI(i)}>
            <div className="fields-row">
              <Field label="Idioma" value={m.nombre} onChange={(v) => updateI(i, { ...m, nombre: v })} />
              <Field label="Nivel" value={m.nivel} onChange={(v) => updateI(i, { ...m, nivel: v })} />
            </div>
          </Repeatable>
        ))}
        {idiomas.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addI}>
            + Agregar idioma
          </button>
        )}
      </Section>

      <Section title="Certificaciones">
        {certificaciones.map((c, i) => (
          <Repeatable
            key={i}
            addLabel="Agregar certificación"
            onAdd={addC}
            onRemove={() => removeC(i)}
          >
            <div className="repeatable-group">
              <Field label="Curso" value={c.curso} onChange={(v) => updateC(i, { ...c, curso: v })} />
              <Field label="Institución" value={c.institucion} onChange={(v) => updateC(i, { ...c, institucion: v })} />
            </div>
          </Repeatable>
        ))}
        {certificaciones.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addC}>
            + Agregar certificación
          </button>
        )}
      </Section>
    </>
  );
}