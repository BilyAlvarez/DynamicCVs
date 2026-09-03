import type { CVData, Paleta, PlantillaId, Tipografia, CVSettings, Idioma, ModoEntrada } from './types';

export const emptyCV: CVData = {
  datosPersonales: {
    nombre: '',
    cedula: '',
    ciudad: '',
    telefono: '',
    correo: '',
    direccion: '',
    sitioWeb: '',
  },
  perfil: {
    titulo: '',
    resumen: '',
  },
  formacion: [],
  experiencia: [],
  competencias: [],
  habilidadesTecnicas: [],
  idiomas: [],
  certificaciones: [],
};

export const PALETAS: Paleta[] = [
  {
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
  },
  {
    id: 'bosque-mostaza',
    name: 'Bosque & Mostaza',
    colors: {
      primary: '#2E7D32',
      accent: '#FFB300',
      background: '#F4F6F4',
      text: '#1B1B1B',
      sidebar: '#1B5E20',
      textLight: '#FFFFFF',
    },
  },
  {
    id: 'grafito-turquesa',
    name: 'Grafito & Turquesa',
    colors: {
      primary: '#37474F',
      accent: '#26C6DA',
      background: '#F5F5F5',
      text: '#212121',
      sidebar: '#212121',
      textLight: '#FFFFFF',
    },
  },
  {
    id: 'vino-oro',
    name: 'Vino & Oro',
    colors: {
      primary: '#6D1A36',
      accent: '#D4AF37',
      background: '#F9F6F2',
      text: '#1A1A1A',
      sidebar: '#5A1428',
      textLight: '#FFFFFF',
    },
  },
  {
    id: 'indigo-ambar',
    name: 'Índigo & Ámbar',
    colors: {
      primary: '#283593',
      accent: '#FFB300',
      background: '#F3F4F8',
      text: '#1A1A1A',
      sidebar: '#1A237E',
      textLight: '#FFFFFF',
    },
  },
];

export const PALETAS_MONO: Paleta[] = [
  {
    id: 'mono-blanco',
    name: 'Blanco & Negro',
    colors: {
      primary: '#000000',
      accent: '#555555',
      background: '#FFFFFF',
      text: '#111111',
      sidebar: '#000000',
      textLight: '#FFFFFF',
    },
  },
  {
    id: 'mono-gris',
    name: 'Gris & Grafito',
    colors: {
      primary: '#333333',
      accent: '#777777',
      background: '#F5F5F5',
      text: '#111111',
      sidebar: '#1F2937',
      textLight: '#F9F9F9',
    },
  },
];

export const TIPOGRAFIAS: { id: Tipografia; label: string; family: string }[] = [
  { id: 'sans', label: 'Sans serif', family: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { id: 'serif', label: 'Serif', family: "Georgia, 'Times New Roman', serif" },
  { id: 'mono', label: 'Monoespaciada', family: "'Courier New', monospace" },
];

export const PLANTILLAS: { id: PlantillaId; label: string }[] = [
  { id: 'karilyn', label: 'Karilyn style (actual)' },
  { id: 'harvard', label: 'Harvard clásica' },
];

export const IDIOMAS: { id: Idioma; label: string }[] = [
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
];

export const MODOS_ENTRADA: { id: ModoEntrada; label: string }[] = [
  { id: 'form', label: 'Formulario' },
  { id: 'wizard', label: 'Asistente (Wizard)' },
];

export const NIVELES_IDIOMA = ['Básico', 'Intermedio', 'Avanzado', 'Nativo'] as const;

export const DEFAULT_SETTINGS: CVSettings = {
  paleta: PALETAS[0],
  plantilla: 'karilyn',
  tipografia: 'sans',
  idioma: 'es',
  modo: 'form',
};