import { useState } from 'react';
import type { CVData, Paleta } from './types';
import { emptyCV, PALETAS } from './data';
import PersonalSection from './components/PersonalSection';
import FormacionSection from './components/FormacionSection';
import ExperienciaSection from './components/ExperienciaSection';
import CompetenciasSection from './components/CompetenciasSection';
import MiscSections from './components/MiscSections';
import PaletteSelector from './components/PaletteSelector';
import CVPreview from './components/CVPreview';

function App() {
  const [data, setData] = useState<CVData>(emptyCV);
  const [paleta, setPaleta] = useState<Paleta>(PALETAS[0]);

  const onDownloadPDF = () => {
    window.print();
  };

  const backendUrl = 'http://localhost:3000';

  const downloadBlob = async (format: 'pdf' | 'word') => {
    const endpoint = format === 'pdf' ? '/generate/pdf' : '/generate/word';
    const ext = format === 'pdf' ? 'pdf' : 'docx';
    const res = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, paleta }),
    });
    if (!res.ok) {
      alert(`No se pudo generar el ${format.toUpperCase()}`);
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>DynamicCVs — Generador de CV</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onDownloadPDF}>
            Imprimir PDF
          </button>
          <button className="btn btn-secondary" onClick={() => downloadBlob('pdf')}>
            Descargar PDF
          </button>
          <button className="btn btn-secondary" onClick={() => downloadBlob('word')}>
            Descargar Word
          </button>
        </div>
      </header>

      <div className="app-layout">
        <form className="app-form" onSubmit={(e) => e.preventDefault()}>
          <PersonalSection
            datos={data.datosPersonales}
            perfil={data.perfil}
            onChangeDatos={(d) => setData({ ...data, datosPersonales: d })}
            onChangePerfil={(p) => setData({ ...data, perfil: p })}
          />
          <FormacionSection formacion={data.formacion} onChange={(f) => setData({ ...data, formacion: f })} />
          <ExperienciaSection experiencia={data.experiencia} onChange={(e) => setData({ ...data, experiencia: e })} />
          <CompetenciasSection competencias={data.competencias} onChange={(c) => setData({ ...data, competencias: c })} />
          <MiscSections
            habilidades={data.habilidadesTecnicas}
            idiomas={data.idiomas}
            certificaciones={data.certificaciones}
            onChangeHabilidades={(h) => setData({ ...data, habilidadesTecnicas: h })}
            onChangeIdiomas={(i) => setData({ ...data, idiomas: i })}
            onChangeCertificaciones={(c) => setData({ ...data, certificaciones: c })}
          />
        </form>

        <aside className="app-preview">
          <PaletteSelector paleta={paleta} onChange={setPaleta} />
          <CVPreview data={data} paleta={paleta} />
        </aside>
      </div>
    </div>
  );
}

export default App;