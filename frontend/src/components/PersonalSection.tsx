import type { DatosPersonales, Perfil } from '../types';
import Field, { Section } from './Field';

interface Props {
  datos: DatosPersonales;
  perfil: Perfil;
  onChangeDatos: (d: DatosPersonales) => void;
  onChangePerfil: (p: Perfil) => void;
}

export default function PersonalSection({ datos, perfil, onChangeDatos, onChangePerfil }: Props) {
  const set = (k: keyof DatosPersonales) => (v: string) =>
    onChangeDatos({ ...datos, [k]: v });

  return (
    <>
      <Section title="Datos personales">
        <Field label="Nombre completo" value={datos.nombre} onChange={set('nombre')} />
        <Field label="Cédula" value={datos.cedula} onChange={set('cedula')} />
        <Field label="Ciudad" value={datos.ciudad} onChange={set('ciudad')} />
        <Field label="Teléfono" value={datos.telefono} onChange={set('telefono')} />
        <Field label="Correo" value={datos.correo} onChange={set('correo')} />
      </Section>
      <Section title="Perfil">
        <Field label="Título / cargo" value={perfil.titulo} onChange={(v) => onChangePerfil({ ...perfil, titulo: v })} />
        <Field
          label="Resumen"
          textarea
          rows={4}
          value={perfil.resumen}
          onChange={(v) => onChangePerfil({ ...perfil, resumen: v })}
        />
      </Section>
    </>
  );
}
