import { useEffect, useState } from 'react';
import type { CVData, CVSettings, Idioma } from './types';
import { makeInitialState, saveState } from './utils/storage';
import { LanguageProvider } from './i18n/LanguageContext';
import PersonalSection from './components/PersonalSection';
import FormacionSection from './components/FormacionSection';
import ExperienciaSection from './components/ExperienciaSection';
import CompetenciasSection from './components/CompetenciasSection';
import MiscSections from './components/MiscSections';
import SettingsPanel from './components/SettingsPanel';
import CVPreview from './components/CVPreview';
import PrintPreviewModal from './components/PrintPreviewModal';
import Wizard from './components/Wizard';
import TopBar from './components/TopBar';

function App() {
  const initial = () => {
    const state = makeInitialState();
    return state;
  };

  const [data, setData] = useState<CVData>(() => initial().data);
  const [settings, setSettings] = useState<CVSettings>(() => initial().settings);
  const [printOpen, setPrintOpen] = useState(false);

  useEffect(() => {
    saveState(data, settings);
  }, [data, settings]);

  const setDataPersist = (d: CVData) => setData(d);
  const setSettingsPersist = (s: CVSettings) => {
    setSettings(s);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = s.idioma;
    }
  };
  const setIdioma = (l: Idioma) => setSettingsPersist({ ...settings, idioma: l });

  const paleta = settings.paleta ?? {
    id: 'teal-coral',
    name: 'Teal & Coral',
    colors: {
      primary: '#00838F',
      accent: '#FF7043',
      background: '#F8F9FA',
      text: '#212121',
      sidebar: '#006064',
      textLight: '#FFFFFF',
    },
  };

  const onPrint = () => window.print();

  const backendUrl = 'http://localhost:3000';
  const downloadBlob = async (format: 'pdf' | 'word') => {
    const endpoint = format === 'pdf' ? '/generate/pdf' : '/generate/word';
    const ext = format === 'pdf' ? 'pdf' : 'docx';
    try {
      const res = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, paleta, settings }),
      });
      if (!res.ok) throw new Error('http');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('No se pudo generar el archivo');
    }
  };

  const formSections = [
    {
      key: 'personal',
      title: settings.idioma === 'es' ? 'Datos personales' : 'Personal details',
      content: (
        <PersonalSection
          datos={data.datosPersonales}
          perfil={data.perfil}
          onChangeDatos={(d) => setDataPersist({ ...data, datosPersonales: d })}
          onChangePerfil={(p) => setDataPersist({ ...data, perfil: p })}
        />
      ),
    },
    {
      key: 'educacion',
      title: settings.idioma === 'es' ? 'Formación' : 'Education',
      content: <FormacionSection formacion={data.formacion} onChange={(f) => setDataPersist({ ...data, formacion: f })} />,
    },
    {
      key: 'experiencia',
      title: settings.idioma === 'es' ? 'Experiencia' : 'Experience',
      content: (
        <ExperienciaSection experiencia={data.experiencia} onChange={(e) => setDataPersist({ ...data, experiencia: e })} />
      ),
    },
    {
      key: 'habilidades',
      title: settings.idioma === 'es' ? 'Habilidades' : 'Skills',
      content: (
        <>
          <CompetenciasSection competencias={data.competencias} onChange={(c) => setDataPersist({ ...data, competencias: c })} />
          <MiscSections
            habilidades={data.habilidadesTecnicas}
            idiomas={data.idiomas}
            certificaciones={data.certificaciones}
            onChangeHabilidades={(h) => setDataPersist({ ...data, habilidadesTecnicas: h })}
            onChangeIdiomas={(i) => setDataPersist({ ...data, idiomas: i })}
            onChangeCertificaciones={(c) => setDataPersist({ ...data, certificaciones: c })}
          />
        </>
      ),
    },
  ];

  const preview = (
    <CVPreview data={data} paleta={paleta} plantilla={settings.plantilla} tipografia={settings.tipografia} />
  );

  const editor =
    settings.modo === 'wizard' ? (
      <Wizard steps={formSections} onFinish={() => setPrintOpen(true)} />
    ) : (
      <form className="app-form" onSubmit={(e) => e.preventDefault()}>
        {formSections.map((s) => s.content)}
      </form>
    );

  return (
    <LanguageProvider idioma={settings.idioma} setIdioma={setIdioma}>
      <div className="app">
        <TopBar
          settings={settings}
          onSettingsChange={setSettingsPersist}
          onPrintPreview={() => setPrintOpen(true)}
          onPrint={onPrint}
          onDownloadPdf={() => downloadBlob('pdf')}
          onDownloadWord={() => downloadBlob('word')}
        />

        <div className="app-layout">
          <main className="app-editor">{editor}</main>
          <aside className="app-preview">
            <SettingsPanel settings={settings} onChange={setSettingsPersist} />
            {preview}
          </aside>
        </div>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} BilyALV-BMASDEV · DynamicCVs</span>
        </footer>

        <PrintPreviewModal open={printOpen} onClose={() => setPrintOpen(false)} onPrint={onPrint}>
          {preview}
        </PrintPreviewModal>
      </div>
    </LanguageProvider>
  );
}

export default App;