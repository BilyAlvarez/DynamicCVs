import type { HabilidadTecnica, IdiomaNivel, Certificacion } from '../types';
import Field, { Section } from './Field';
import Repeatable from './Repeatable';
import { useLang } from '../i18n/LanguageContext';
import { NIVELES_IDIOMA } from '../data';

interface Props {
  habilidades: HabilidadTecnica[];
  idiomas: IdiomaNivel[];
  certificaciones: Certificacion[];
  onChangeHabilidades: (h: HabilidadTecnica[]) => void;
  onChangeIdiomas: (i: IdiomaNivel[]) => void;
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
  const { t } = useLang();
  const updateH = (i: number, v: HabilidadTecnica) => {
    const next = [...habilidades];
    next[i] = v;
    onChangeHabilidades(next);
  };
  const addH = () => onChangeHabilidades([...habilidades, { herramienta: '', descripcion: '' }]);
  const removeH = (i: number) => onChangeHabilidades(habilidades.filter((_, idx) => idx !== i));

  const updateI = (i: number, v: IdiomaNivel) => {
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

  const levelOptions = NIVELES_IDIOMA.map((n) => ({ value: n, label: n }));

  return (
    <>
      <Section title={t.form.technicalSkills}>
        {habilidades.map((h, i) => (
          <Repeatable key={i} addLabel={t.form.addSkill} onAdd={addH} onRemove={() => removeH(i)}>
            <div className="repeatable-group">
              <Field label={t.form.tool} value={h.herramienta} onChange={(v) => updateH(i, { ...h, herramienta: v })} />
              <Field label={t.form.description} value={h.descripcion} onChange={(v) => updateH(i, { ...h, descripcion: v })} />
            </div>
          </Repeatable>
        ))}
        {habilidades.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addH}>
            + {t.form.addSkill}
          </button>
        )}
      </Section>

      <Section title={t.form.languages}>
        {idiomas.map((m, i) => (
          <Repeatable key={i} addLabel={t.form.addLanguage} onAdd={addI} onRemove={() => removeI(i)}>
            <div className="fields-row">
              <Field label={t.form.language} value={m.nombre} onChange={(v) => updateI(i, { ...m, nombre: v })} />
              <Field
                label={t.form.level}
                value={m.nivel}
                options={levelOptions}
                onChange={(v) => updateI(i, { ...m, nivel: v })}
              />
            </div>
          </Repeatable>
        ))}
        {idiomas.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addI}>
            + {t.form.addLanguage}
          </button>
        )}
      </Section>

      <Section title={t.form.certifications}>
        {certificaciones.map((c, i) => (
          <Repeatable
            key={i}
            addLabel={t.form.addCertification}
            onAdd={addC}
            onRemove={() => removeC(i)}
          >
            <div className="repeatable-group">
              <Field label={t.form.course} value={c.curso} onChange={(v) => updateC(i, { ...c, curso: v })} />
              <Field label={t.form.institution} value={c.institucion} onChange={(v) => updateC(i, { ...c, institucion: v })} />
            </div>
          </Repeatable>
        ))}
        {certificaciones.length === 0 && (
          <button type="button" className="btn btn-add" onClick={addC}>
            + {t.form.addCertification}
          </button>
        )}
      </Section>
    </>
  );
}