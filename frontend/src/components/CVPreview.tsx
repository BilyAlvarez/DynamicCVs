import type { CVData, Paleta } from '../types';
import Icon from './Icon';

interface Props {
  data: CVData;
  paleta: Paleta;
}

export default function CVPreview({ data, paleta }: Props) {
  const c = paleta.colors;
  const d = data;

  return (
    <div className="cv" style={{ backgroundColor: c.background, color: c.text }}>
      <div className="cv-banner" style={{ backgroundColor: c.sidebar, color: c.textLight }}>
        <h1 className="cv-name">{d.datosPersonales.nombre || 'Nombre Completo'}</h1>
        {d.perfil.titulo && <p className="cv-title">{d.perfil.titulo}</p>}
        <div className="cv-contact">
          {d.datosPersonales.ciudad && (
            <span>
              <Icon name="ciudad" size={13} />
              {d.datosPersonales.ciudad}
            </span>
          )}
          {d.datosPersonales.telefono && (
            <span>
              <Icon name="telefono" size={13} />
              {d.datosPersonales.telefono}
            </span>
          )}
          {d.datosPersonales.correo && (
            <span>
              <Icon name="correo" size={13} />
              {d.datosPersonales.correo}
            </span>
          )}
          {d.datosPersonales.cedula && (
            <span>
              <Icon name="cedula" size={13} />
              C.I. {d.datosPersonales.cedula}
            </span>
          )}
        </div>
      </div>

      <div className="cv-body">
        <div className="cv-sidebar" style={{ backgroundColor: c.primary, color: c.textLight }}>
          {d.competencias.length > 0 && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.accent }}>
                Competencias
              </h3>
              <ul className="cv-list">
                {d.competencias.map((comp) => (
                  <li key={comp}>{comp}</li>
                ))}
              </ul>
            </div>
          )}

          {d.habilidadesTecnicas.length > 0 && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.accent }}>
                Habilidades técnicas
              </h3>
              <ul className="cv-list">
                {d.habilidadesTecnicas.map((h, i) => (
                  <li key={i}>
                    <strong>{h.herramienta}</strong>
                    {h.descripcion && ` — ${h.descripcion}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {d.idiomas.length > 0 && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.accent }}>
                Idiomas
              </h3>
              <ul className="cv-list">
                {d.idiomas.map((id, i) => (
                  <li key={i}>
                    {id.nombre} <span className="cv-muted">{id.nivel}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {d.certificaciones.length > 0 && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.accent }}>
                Certificaciones
              </h3>
              <ul className="cv-list">
                {d.certificaciones.map((cert, i) => (
                  <li key={i}>
                    <strong>{cert.curso}</strong>
                    {cert.institucion && <div className="cv-muted">{cert.institucion}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="cv-content">
          {d.perfil.resumen && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.primary }}>
                Perfil
              </h3>
              <p>{d.perfil.resumen}</p>
            </div>
          )}

          {d.experiencia.length > 0 && (
            <div className="cv-block">
              <h3 className="cv-block-title" style={{ color: c.primary }}>
                Experiencia laboral
              </h3>
              {d.experiencia.map((e, i) => (
                <div key={i} className="cv-entry">
                  <h4>
                    {e.cargo}
                    {e.empresa && <span className="cv-muted"> — {e.empresa}</span>}
                  </h4>
                  <div className="cv-muted">
                    {e.ciudad}
                    {e.fechas && ` · ${e.fechas}`}
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
              <h3 className="cv-block-title" style={{ color: c.primary }}>
                Formación
              </h3>
              {d.formacion.map((f, i) => (
                <div key={i} className="cv-entry">
                  <h4>
                    {f.titulo}
                    {f.institucion && <span className="cv-muted"> — {f.institucion}</span>}
                  </h4>
                  <div className="cv-muted">
                    {f.anioInicio}
                    {f.enCurso ? ' — En curso' : f.anioFin && ` — ${f.anioFin}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}