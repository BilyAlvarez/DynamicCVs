import type { DatosPersonales, Perfil } from '../types';
import Field, { Section } from './Field';
import { useLang } from '../i18n/LanguageContext';

interface Props {
  datos: DatosPersonales;
  perfil: Perfil;
  onChangeDatos: (d: DatosPersonales) => void;
  onChangePerfil: (p: Perfil) => void;
}

export default function PersonalSection({ datos, perfil, onChangeDatos, onChangePerfil }: Props) {
  const { t } = useLang();
  const set = (k: keyof DatosPersonales) => (v: string) =>
    onChangeDatos({ ...datos, [k]: v });

  return (
    <>
      <Section title={t.form.personalData}>
        <Field label={t.form.name} value={datos.nombre} onChange={set('nombre')} />
        <Field label={t.form.id} value={datos.cedula} onChange={set('cedula')} />
        <Field label={t.form.city} value={datos.ciudad} onChange={set('ciudad')} />
        <Field label={t.form.phone} type="tel" value={datos.telefono} onChange={set('telefono')} />
        <Field label={t.form.email} type="email" value={datos.correo} onChange={set('correo')} />
        <Field label={t.form.address} value={datos.direccion || ''} onChange={set('direccion')} />
        <Field label={t.form.website} type="url" value={datos.sitioWeb || ''} onChange={set('sitioWeb')} />
      </Section>
      <Section title={t.form.profile}>
        <Field label={t.form.jobTitle} value={perfil.titulo} onChange={(v) => onChangePerfil({ ...perfil, titulo: v })} />
        <Field
          label={t.form.summary}
          textarea
          rows={4}
          value={perfil.resumen}
          onChange={(v) => onChangePerfil({ ...perfil, resumen: v })}
        />
      </Section>
    </>
  );
}