import type { CVData, Paleta, PlantillaId, Tipografia } from '../types';
import { TIPOGRAFIAS } from '../data';
import { useLang } from '../i18n/LanguageContext';
import Icon from './Icon';
import { formatCedula } from '../utils/format';

interface Props {
  data: CVData;
  paleta: Paleta;
  plantilla: PlantillaId;
  tipografia: Tipografia;
}

export default function CVPreview({ data, paleta, plantilla, tipografia }: Props) {
  const { t } = useLang();
  const c = paleta.colors;
  const d = data;
  const fontFamily = TIPOGRAFIAS.find((f) => f.id === tipografia)?.family;

  const isHarvard = plantilla === 'harvard';

  interface SidebarItem {
    text: string;
    strong?: string;
    icon?: string;
  }

const contactItems: SidebarItem[] = [
    ...(d.datosPersonales.ciudad ? [{ icon: 'ciudad', text: d.datosPersonales.ciudad }] : []),
    ...(d.datosPersonales.telefono ? [{ icon: 'telefono', text: d.datosPersonales.telefono }] : []),
    ...(d.datosPersonales.correo ? [{ icon: 'correo', text: d.datosPersonales.correo }] : []),
    ...(d.datosPersonales.sitioWeb ? [{ icon: 'web', text: d.datosPersonales.sitioWeb }] : []),
    ...(d.datosPersonales.cedula
      ? [{ icon: 'cedula', text: formatCedula(d.datosPersonales.cedula) }]
      : []),
  ];

  const skills = d.competencias;
  const techSkills = d.habilidadesTecnicas;
  const languages = d.idiomas;
  const certs = d.certificaciones;

  const sidebarBlocks: { title: string; items: SidebarItem[] }[] = [
    { title: t.cv.contact, items: contactItems },
    { title: t.cv.competencies, items: skills.map((s) => ({ text: s })) },
    {
      title: t.cv.technicalSkills,
      items: techSkills.map((h) => ({
        text: h.herramienta + (h.descripcion ? ` — ${h.descripcion}` : ''),
        strong: h.herramienta,
      })),
    },
    {
      title: t.cv.languages,
      items: languages.map((l) => ({ text: `${l.nombre} ${l.nivel}` })),
    },
    { title: t.cv.certifications, items: certs.map((crt) => ({ text: crt.curso })) },
  ].filter((b) => b.items.length);

  const contentTitle = (txt: string) =>
    isHarvard ? (
      <h3 className="cv-block-title" style={{ color: '#111111', borderColor: '#111111' }}>
        {txt}
      </h3>
    ) : (
      <h3 className="cv-block-title" style={{ color: c.primary, borderColor: c.primary }}>
        {txt}
      </h3>
    );

  const sidebarHeader = isHarvard ? (
    <div className="cv-banner-simple" style={{ borderBottom: `3px solid #111111` }}>
      <h1 className="cv-name" style={{ color: '#111' }}>
        {d.datosPersonales.nombre || t.cv.namePlaceholder}
      </h1>
      {d.perfil.titulo && <p className="cv-title" style={{ color: '#333' }}>{d.perfil.titulo}</p>}
    </div>
  ) : (
    <div className="cv-banner" style={{ backgroundColor: c.sidebar, color: c.textLight }}>
      <h1 className="cv-name">{d.datosPersonales.nombre || t.cv.namePlaceholder}</h1>
      {d.perfil.titulo && <p className="cv-title">{d.perfil.titulo}</p>}
    </div>
  );

  return (
    <div
      className={'cv' + (isHarvard ? ' cv-harvard' : '')}
      style={{ backgroundColor: isHarvard ? '#FFFFFF' : c.background, color: '#111', fontFamily }}
    >
      {sidebarHeader}

      <div className="cv-body">
        <div
          className="cv-sidebar"
          style={
            isHarvard
              ? { backgroundColor: '#FFFFFF', color: '#111', borderRight: '1px solid #ccc' }
              : { backgroundColor: c.primary, color: c.textLight }
          }
        >
          {sidebarBlocks.map((block, i) => (
            <div className="cv-block" key={i}>
              {isHarvard ? (
                <h3 className="cv-block-title" style={{ color: '#111', borderColor: '#111' }}>
                  {block.title}
                </h3>
              ) : (
                <h3 className="cv-block-title" style={{ color: c.accent, borderColor: c.accent }}>
                  {block.title}
                </h3>
              )}
              {block.title === t.cv.contact ? (
                <ul className="cv-contact-list">
                  {block.items.map((it, idx) => (
                    <li key={idx}>
                      {it.icon && <Icon name={it.icon} size={13} />}
                      <span>{it.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="cv-list">
                  {block.items.map((it, idx) => (
                    <li key={idx}>
                      {it.strong ? (
                        <>
                          <strong>{it.strong}</strong>
                          <div className="cv-muted">{it.text.replace(it.strong + ' — ', '')}</div>
                        </>
                      ) : (
                        it.text
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="cv-content">
          {d.perfil.resumen && (
            <div className="cv-block">
              {contentTitle(t.cv.profile)}
              <p>{d.perfil.resumen}</p>
            </div>
          )}

          {d.experiencia.length > 0 && (
            <div className="cv-block">
              {contentTitle(t.cv.experience)}
              {d.experiencia.map((e, i) => (
                <div key={i} className="cv-entry">
                  <h4>
                    {isHarvard && <span className="cv-date">{e.fechas}</span>}
                    {e.cargo}
                    {e.empresa && <span className="cv-muted"> — {e.empresa}</span>}
                    {!isHarvard && e.fechas && <span className="cv-muted cv-inline-date"> · {e.fechas}</span>}
                  </h4>
                  <div className="cv-muted">
                    {e.ciudad}
                  </div>
                  {e.funciones.length > 0 && (
                    <ul className="cv-bullets">
                      {e.funciones.map((f, fi) => f.texto && <li key={fi}>{f.texto}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {d.formacion.length > 0 && (
            <div className="cv-block">
              {contentTitle(t.cv.education)}
              {d.formacion.map((f, i) => (
                <div key={i} className="cv-entry">
                  <h4>
                    {isHarvard && <span className="cv-date">{f.anioInicio} — {f.enCurso ? t.cv.inProgress : f.anioFin}</span>}
                    {f.titulo}
                    {f.institucion && <span className="cv-muted"> — {f.institucion}</span>}
                    {!isHarvard && (
                      <span className="cv-muted cv-inline-date">
                        {' · '}
                        {f.anioInicio}
                        {f.enCurso ? ' — ' + t.cv.inProgress : f.anioFin && ` — ${f.anioFin}`}
                      </span>
                    )}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}