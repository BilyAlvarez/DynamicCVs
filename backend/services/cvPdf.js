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

const FONTS = {
  sans: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'Courier New', monospace",
};

function renderCVHTML(data, opts = {}) {
  const paleta = opts.paleta;
  const plantilla = opts.plantilla || 'karilyn';
  const tipografia = opts.tipografia || 'sans';
  const c = styleFromColors(paleta && paleta.colors);
  const isHar = plantilla === 'harvard';
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

  const contactList = [
    d.datosPersonales.ciudad,
    d.datosPersonales.telefono,
    d.datosPersonales.correo,
    d.datosPersonales.cedula && `C.I. ${esc(d.datosPersonales.cedula)}`,
  ]
    .filter(Boolean)
    .map((x) => `<li>${esc(x)}</li>`)
    .join('');

  const sidebarHead = isHar ? {
    family: FONTS[tipografia],
    color: '#111111',
    borderBottom: '3px solid #111111',
    accent: '#111111',
  } : {
    family: FONTS[tipografia],
    color: c.textLight,
    borderBottom: 'none',
    accent: c.accent,
  };

  const sidebarBg = isHar ? '#FFFFFF' : c.primary;
  const sidebarColor = isHar ? '#111111' : c.textLight;
  const contentCol = isHar ? '#111111' : c.primary;
  const bannerBg = isHar ? '#FFFFFF' : c.sidebar;
  const bannerColor = isHar ? '#111111' : c.textLight;

  const sidebarBlocks = [];
  if (contactList) sidebarBlocks.push({ title: 'Contacto', html: `<ul class="contact-list">${contactList}</ul>` });
  if (d.competencias.length) sidebarBlocks.push({ title: 'Competencias', html: `<ul>${d.competencias.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` });
  if (d.habilidadesTecnicas.length) sidebarBlocks.push({ title: 'Habilidades técnicas', html: `<ul>${d.habilidadesTecnicas.map((h) => `<li><strong>${esc(h.herramienta)}</strong>${h.descripcion ? ` — ${esc(h.descripcion)}` : ''}</li>`).join('')}</ul>` });
  if (d.idiomas.length) sidebarBlocks.push({ title: 'Idiomas', html: `<ul>${d.idiomas.map((i) => `<li>${esc(i.nombre)} <span class="muted">${esc(i.nivel)}</span></li>`).join('')}</ul>` });
  if (d.certificaciones.length) sidebarBlocks.push({ title: 'Certificaciones', html: `<ul>${d.certificaciones.map((rc) => `<li><strong>${esc(rc.curso)}</strong>${rc.institucion ? `<div class="muted">${esc(rc.institucion)}</div>` : ''}</li>`).join('')}</ul>` });

  const sidebarHtml = sidebarBlocks
    .map(
      (b) =>
        `<div class="block"><h3 style="color:${sidebarHead.accent};border-color:${sidebarHead.accent}">${b.title}</h3>${b.html}</div>`
    )
    .join('');

  const contentHtml = [
    d.perfil.resumen && `<div class="block"><h3 style="color:${contentCol};border-color:${contentCol}">Perfil</h3><p>${esc(d.perfil.resumen)}</p></div>`,
    d.experiencia.length && `<div class="block"><h3 style="color:${contentCol};border-color:${contentCol}">Experiencia laboral</h3>${d.experiencia.map((e) => `<div class="entry"><h4>${e.fechas ? `<span class="date">${esc(e.fechas)}</span>` : ''}${esc(e.cargo)}${e.empresa ? `<span class="muted"> — ${esc(e.empresa)}</span>` : ''}</h4><div class="muted">${esc(e.ciudad)}</div>${e.funciones.filter((f) => f.texto).length ? `<ul>${bullets(e.funciones)}</ul>` : ''}</div>`).join('')}</div>`,
    d.formacion.length && `<div class="block"><h3 style="color:${contentCol};border-color:${contentCol}">Formación</h3>${d.formacion.map((f) => `<div class="entry"><h4>${f.anioInicio ? `<span class="date">${esc(f.anioInicio)}${f.enCurso ? ' — En curso' : f.anioFin ? ` — ${esc(f.anioFin)}` : ''}</span>` : ''}${esc(f.titulo)}${f.institucion ? `<span class="muted"> — ${esc(f.institucion)}</span>` : ''}</h4></div>`).join('')}</div>`,
  ]
    .filter(Boolean)
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: ${FONTS[tipografia]}; color: ${c.text}; font-size: 13px; line-height: 1.45; }
    .cv { width: 100%; background: ${isHar ? '#FFFFFF' : c.background}; }
    .banner { background: ${bannerBg}; color: ${bannerColor}; padding: ${isHar ? '24px 28px 12px' : '26px 30px'}; ${isHar ? 'border-bottom: 3px solid #111111;' : ''} }
    .banner h1 { font-size: ${isHar ? '28px' : '26px'}; letter-spacing: 0.5px; }
    .banner p { margin-top: 4px; font-size: 15px; opacity: 0.9; }
    .body { display: table; width: 100%; }
    .side { display: table-cell; width: 34%; background: ${sidebarBg}; color: ${sidebarColor}; padding: 18px 16px; vertical-align: top; ${isHar ? 'border-right: 1px solid #ccc;' : ''} }
    .content { display: table-cell; width: 66%; padding: 18px 22px; vertical-align: top; }
    .block { margin-bottom: 14px; }
    h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid currentColor; padding-bottom: 4px; margin-bottom: 8px; }
    ul { padding-left: 18px; }
    li { margin-bottom: 4px; }
    ul.contact-list { list-style: none; padding-left: 0; }
    .contact-list li { margin-bottom: 5px; }
    .entry { margin-bottom: 10px; }
    .entry h4 { margin-bottom: 2px; }
    .date { color: #555; font-weight: 400; margin-right: 8px; font-size: 12px; }
    .muted { opacity: 0.75; font-size: 12px; }
  </style></head><body>
    <div class="cv">
      <div class="banner">
        <h1>${esc(d.datosPersonales.nombre || 'Nombre Completo')}</h1>
        ${d.perfil.titulo ? `<p>${esc(d.perfil.titulo)}</p>` : ''}
      </div>
      <div class="body">
        <div class="side">${sidebarHtml}</div>
        <div class="content">${contentHtml}</div>
      </div>
    </div>
  </body></html>`;
}

async function generatePdf(data, paleta, opts = {}) {
  const html = renderCVHTML(data, { paleta, ...opts });
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