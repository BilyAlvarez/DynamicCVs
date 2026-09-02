const puppeteer = require('puppeteer');

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function styleFromColors(c) {
  const s = c || {};
  return {
    primary: s.primary || '#00838F',
    accent: s.accent || '#FF7043',
    sidebar: s.sidebar || s.primary || '#006064',
    background: s.background || '#F8F9FA',
    text: s.text || '#212121',
    textLight: s.textLight || '#FFFFFF',
  };
}

function renderCVHTML(data, paleta) {
  const c = styleFromColors(paleta && paleta.colors);
  const d = {
    datosPersonales: data.datosPersonales || {},
    perfil: data.perfil || {},
    formacion: data.formacion || [],
    experiencia: data.experiencia || [],
    competencias: data.competencias || [],
    habilidadesTecnicas: data.habilidadesTecnicas || [],
    idiomas: data.idiomas || [],
    certificaciones: data.certificaciones || [],
  };

  const bullets = (funciones) =>
    funciones
      .map((f) => f.texto && `<li>${esc(f.texto)}</li>`)
      .filter(Boolean)
      .join('');

  const contacto = [
    d.datosPersonales.ciudad,
    d.datosPersonales.telefono,
    d.datosPersonales.correo,
    d.datosPersonales.cedula && `C.I. ${esc(d.datosPersonales.cedula)}`,
  ]
    .filter(Boolean)
    .map((x) => `<span>${x}</span>`)
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Roboto, sans-serif; color: ${c.text}; font-size: 13px; line-height: 1.45; }
    .cv { width: 100%; background: ${c.background}; }
    .banner { background: ${c.sidebar}; color: ${c.textLight}; padding: 26px 30px; }
    .banner h1 { font-size: 26px; letter-spacing: 0.5px; }
    .banner p { margin-top: 4px; font-size: 15px; opacity: 0.9; }
    .contact { display: flex; flex-wrap: wrap; gap: 4px 16px; margin-top: 10px; font-size: 12px; opacity: 0.95; }
    .body { display: table; width: 100%; }
    .side { display: table-cell; width: 34%; background: ${c.primary}; color: ${c.textLight}; padding: 18px 16px; vertical-align: top; }
    .content { display: table-cell; width: 66%; padding: 18px 22px; vertical-align: top; }
    .block { margin-bottom: 14px; }
    h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid currentColor; padding-bottom: 4px; margin-bottom: 8px; }
    .side h3 { color: ${c.accent}; }
    .content h3 { color: ${c.primary}; }
    ul { padding-left: 18px; }
    li { margin-bottom: 4px; }
    .entry { margin-bottom: 10px; }
    .entry h4 { margin-bottom: 2px; }
    .muted { opacity: 0.75; font-size: 12px; }
  </style></head><body>
    <div class="cv">
      <div class="banner">
        <h1>${esc(d.datosPersonales.nombre || 'Nombre Completo')}</h1>
        ${d.perfil.titulo ? `<p>${esc(d.perfil.titulo)}</p>` : ''}
        ${contacto ? `<div class="contact">${contacto}</div>` : ''}
      </div>
      <div class="body">
        <div class="side">
          ${d.competencias.length ? `<div class="block"><h3>Competencias</h3><ul>${d.competencias.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
          ${d.habilidadesTecnicas.length ? `<div class="block"><h3>Habilidades técnicas</h3><ul>${d.habilidadesTecnicas.map((h) => `<li><strong>${esc(h.herramienta)}</strong>${h.descripcion ? ` — ${esc(h.descripcion)}` : ''}</li>`).join('')}</ul></div>` : ''}
          ${d.idiomas.length ? `<div class="block"><h3>Idiomas</h3><ul>${d.idiomas.map((i) => `<li>${esc(i.nombre)} <span class="muted">${esc(i.nivel)}</span></li>`).join('')}</ul></div>` : ''}
          ${d.certificaciones.length ? `<div class="block"><h3>Certificaciones</h3><ul>${d.certificaciones.map((rc) => `<li><strong>${esc(rc.curso)}</strong>${rc.institucion ? `<div class="muted">${esc(rc.institucion)}</div>` : ''}</li>`).join('')}</ul></div>` : ''}
        </div>
        <div class="content">
          ${d.perfil.resumen ? `<div class="block"><h3>Perfil</h3><p>${esc(d.perfil.resumen)}</p></div>` : ''}
          ${d.experiencia.length ? `<div class="block"><h3>Experiencia laboral</h3>${d.experiencia.map((e) => `<div class="entry"><h4>${esc(e.cargo)}${e.empresa ? `<span class="muted"> — ${esc(e.empresa)}</span>` : ''}</h4><div class="muted">${[e.ciudad, e.fechas].filter(Boolean).map(esc).join(' · ')}</div>${e.funciones.filter((f) => f.texto).length ? `<ul>${bullets(e.funciones)}</ul>` : ''}</div>`).join('')}</div>` : ''}
          ${d.formacion.length ? `<div class="block"><h3>Formación</h3>${d.formacion.map((f) => `<div class="entry"><h4>${esc(f.titulo)}${f.institucion ? `<span class="muted"> — ${esc(f.institucion)}</span>` : ''}</h4><div class="muted">${esc(f.anioInicio)}${f.enCurso ? ' — En curso' : f.anioFin ? ` — ${esc(f.anioFin)}` : ''}</div></div>`).join('')}</div>` : ''}
        </div>
      </div>
    </div>
  </body></html>`;
}

async function generatePdf(data, paleta) {
  const html = renderCVHTML(data, paleta);
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}

module.exports = { generatePdf, renderCVHTML };