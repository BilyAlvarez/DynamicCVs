const express = require('express');
const cors = require('cors');
const { generatePdf } = require('../services/cvPdf');
const { generateDocx } = require('../services/cvDocx');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const validData = (d) =>
  d &&
  typeof d === 'object' &&
  d.datosPersonales &&
  typeof d.datosPersonales === 'object';

app.post('/generate/pdf', async (req, res) => {
  const { data, paleta } = req.body || {};
  if (!validData(data)) {
    return res.status(400).json({ error: 'Datos de CV inválidos' });
  }
  try {
    const pdf = await generatePdf(data, paleta);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="cv.pdf"');
    return res.send(pdf);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'No se pudo generar el PDF' });
  }
});

app.post('/generate/word', async (req, res) => {
  const { data, paleta } = req.body || {};
  if (!validData(data)) {
    return res.status(400).json({ error: 'Datos de CV inválidos' });
  }
  try {
    const docx = await generateDocx(data, paleta && paleta.colors);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="cv.docx"');
    return res.send(docx);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'No se pudo generar el Word' });
  }
});

module.exports = app;