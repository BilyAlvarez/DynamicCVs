const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} = require('docx');

function dataToDocx(data, colors = {}) {
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
  const bounds = colors.textLight || '#FFFFFF';

  const sectionHeader = (text, color) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 80 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: color || '999999' } },
      children: [new TextRun({ text, bold: true, color: color || '1F3B4D' })],
    });

  const children = [];
  children.push(
    new Paragraph({
      children: [new TextRun({ text: d.datosPersonales.nombre || 'Nombre', bold: true, size: 40 })],
      spacing: { after: 40 },
    })
  );
  if (d.perfil.titulo) {
    children.push(new Paragraph({ children: [new TextRun({ text: d.perfil.titulo, size: 28 })], spacing: { after: 80 } }));
  }

  if (d.perfil.resumen) {
    children.push(sectionHeader('Perfil'));
    children.push(new Paragraph({ children: [new TextRun({ text: d.perfil.resumen })], spacing: { after: 80 } }));
  }

  if (d.experiencia.length) {
    children.push(sectionHeader('Experiencia laboral'));
    for (const e of d.experiencia) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: e.cargo, bold: true }), new TextRun({ text: ` — ${e.empresa}` })],
          spacing: { before: 100 },
        })
      );
      children.push(
        new Paragraph({
          children: [new TextRun({ text: [e.ciudad, e.fechas].filter(Boolean).join(' · '), italics: true, size: 22 })],
        })
      );
      for (const f of e.funciones) {
        if (f.texto)
          children.push(
            new Paragraph({
              text: `• ${f.texto}`,
              bullet: { level: 0 },
              spacing: { after: 40 },
            })
          );
      }
    }
  }

  if (d.formacion.length) {
    children.push(sectionHeader('Formación'));
    for (const f of d.formacion) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: f.titulo, bold: true }),
            f.institucion && new TextRun({ text: ` — ${f.institucion}` }),
          ],
          spacing: { before: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${f.anioInicio}${f.enCurso ? ' — En curso' : f.anioFin ? ` — ${f.anioFin}` : ''}`,
              italics: true,
              size: 22,
            }),
          ],
        })
      );
    }
  }

  const sidebar = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [3000, 5500],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: (colors.sidebar || '1F3B4D').replace('#', '') },
            children: [
              new Paragraph({ children: [new TextRun({ text: 'Contacto', bold: true, color: bounds })], spacing: { after: 60 } }),
              ...[d.datosPersonales.ciudad, d.datosPersonales.telefono, d.datosPersonales.correo]
                .filter(Boolean)
                .map((line) => new Paragraph({ children: [new TextRun({ text: line, color: bounds })] })),
              new Paragraph({ children: [new TextRun({ text: `C.I. ${d.datosPersonales.cedula}`, color: bounds })] }),
            ],
          }),
          new TableCell({
            children: d.competencias.length
              ? [
                  new Paragraph({
                    children: [new TextRun({ text: 'Competencias', bold: true, color: (colors.accent || '2ABFBF') })],
                  }),
                  ...d.competencias.map((c) => new Paragraph({ text: c })),
                ]
              : [new Paragraph({ text: '' })],
          }),
        ],
      }),
    ],
  });
  children.push(sidebar);

  return new Document({
    sections: [{ properties: {}, children }],
  });
}

async function generateDocx(data, colors) {
  const doc = dataToDocx(data, colors);
  return Packer.toBuffer(doc);
}

module.exports = { generateDocx, dataToDocx };