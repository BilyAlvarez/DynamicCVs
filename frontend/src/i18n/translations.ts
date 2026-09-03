import type { Idioma } from '../types';

interface Dict {
  appTitle: string;
  languageLabel: string;
  downloads: {
    print: string;
    pdf: string;
    word: string;
    error: string;
    printPreview: string;
    downloadBlob: string;
  };
  menu: {
    inputMode: string;
    form: string;
    wizard: string;
    template: string;
    templateKarilyn: string;
    templateHarvard: string;
    typography: string;
    palette: string;
    custom: string;
    primary: string;
    accent: string;
    contrast: string;
    contrastOk: string;
    contrastBad: string;
  };
  form: {
    personalData: string;
    name: string;
    id: string;
    city: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    profile: string;
    jobTitle: string;
    summary: string;
    education: string;
    institution: string;
    degree: string;
    startYear: string;
    endYear: string;
    inProgress: string;
    addEducation: string;
    experience: string;
    company: string;
    position: string;
    dates: string;
    duties: string;
    addExperience: string;
    addFunction: string;
    skills: string;
    addCompetency: string;
    competencyPlaceholder: string;
    add: string;
    remove: string;
    technicalSkills: string;
    tool: string;
    description: string;
    addSkill: string;
    languages: string;
    language: string;
    level: string;
    addLanguage: string;
    certifications: string;
    course: string;
    addCertification: string;
  };
  cv: {
    namePlaceholder: string;
    profile: string;
    contact: string;
    experience: string;
    education: string;
    competencies: string;
    technicalSkills: string;
    languages: string;
    certifications: string;
    inProgress: string;
    id: string;
  };
  wizard: {
    step: string;
    next: string;
    back: string;
    finish: string;
    selectStep: string;
  };
  footer: {
    rights: string;
  };
}

export const translations: Record<Idioma, Dict> = {
  es: {
    appTitle: 'DynamicCVs — Generador de CV',
    languageLabel: 'Idioma',
    downloads: {
      print: 'Imprimir',
      pdf: 'Descargar PDF',
      word: 'Descargar Word',
      error: 'No se pudo generar el archivo',
      printPreview: 'Vista previa de impresión',
      downloadBlob: 'Descargar',
    },
    menu: {
      inputMode: 'Modo de entrada',
      form: 'Formulario',
      wizard: 'Asistente',
      template: 'Plantilla',
      templateKarilyn: 'Karilyn style',
      templateHarvard: 'Harvard clásica',
      typography: 'Tipografía',
      palette: 'Paleta de color',
      custom: 'Personalizado',
      primary: 'Principal',
      accent: 'Acento',
      contrast: 'Contraste',
      contrastOk: 'Aprobado',
      contrastBad: 'Bajo contraste',
    },
    form: {
      personalData: 'Datos personales',
      name: 'Nombre completo',
      id: 'Cédula',
      city: 'Ciudad',
      phone: 'Teléfono',
      email: 'Correo',
      address: 'Dirección',
      website: 'Sitio web',
      profile: 'Perfil',
      jobTitle: 'Título / Cargo',
      summary: 'Resumen',
      education: 'Formación',
      institution: 'Institución',
      degree: 'Título',
      startYear: 'Año inicio',
      endYear: 'Año fin',
      inProgress: 'En curso',
      addEducation: 'Agregar formación',
      experience: 'Experiencia laboral',
      company: 'Empresa',
      position: 'Cargo',
      dates: 'Fechas',
      duties: 'Funciones',
      addExperience: 'Agregar experiencia',
      addFunction: 'Agregar función',
      skills: 'Competencias',
      addCompetency: 'Agregar competencia',
      competencyPlaceholder: 'Escribe y presiona Enter',
      add: 'Agregar',
      remove: 'Eliminar',
      technicalSkills: 'Habilidades técnicas',
      tool: 'Herramienta',
      description: 'Descripción',
      addSkill: 'Agregar habilidad',
      languages: 'Idiomas',
      language: 'Idioma',
      level: 'Nivel',
      addLanguage: 'Agregar idioma',
      certifications: 'Certificaciones',
      course: 'Curso',
      addCertification: 'Agregar certificación',
    },
    cv: {
      namePlaceholder: 'Nombre completo',
      profile: 'Perfil',
      contact: 'Contacto',
      experience: 'Experiencia laboral',
      education: 'Formación',
      competencies: 'Competencias',
      technicalSkills: 'Habilidades técnicas',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      inProgress: 'En curso',
      id: 'C.I.',
    },
    wizard: {
      step: 'Paso',
      next: 'Siguiente',
      back: 'Atrás',
      finish: 'Terminar',
      selectStep: 'Selecciona un paso',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    appTitle: 'DynamicCVs — CV Generator',
    languageLabel: 'Language',
    downloads: {
      print: 'Print',
      pdf: 'Download PDF',
      word: 'Download Word',
      error: 'Could not generate the file',
      printPreview: 'Print preview',
      downloadBlob: 'Download',
    },
    menu: {
      inputMode: 'Input mode',
      form: 'Form',
      wizard: 'Wizard',
      template: 'Template',
      templateKarilyn: 'Karilyn style',
      templateHarvard: 'Harvard classic',
      typography: 'Typography',
      palette: 'Color palette',
      custom: 'Custom',
      primary: 'Primary',
      accent: 'Accent',
      contrast: 'Contrast',
      contrastOk: 'Passed',
      contrastBad: 'Low contrast',
    },
    form: {
      personalData: 'Personal details',
      name: 'Full name',
      id: 'ID',
      city: 'City',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      website: 'Website',
      profile: 'Profile',
      jobTitle: 'Job title',
      summary: 'Summary',
      education: 'Education',
      institution: 'Institution',
      degree: 'Degree',
      startYear: 'Start year',
      endYear: 'End year',
      inProgress: 'In progress',
      addEducation: 'Add education',
      experience: 'Work experience',
      company: 'Company',
      position: 'Position',
      dates: 'Dates',
      duties: 'Duties',
      addExperience: 'Add experience',
      addFunction: 'Add role',
      skills: 'Competencies',
      addCompetency: 'Add competency',
      competencyPlaceholder: 'Type and press Enter',
      add: 'Add',
      remove: 'Remove',
      technicalSkills: 'Technical skills',
      tool: 'Tool',
      description: 'Description',
      addSkill: 'Add skill',
      languages: 'Languages',
      language: 'Language',
      level: 'Level',
      addLanguage: 'Add language',
      certifications: 'Certifications',
      course: 'Course',
      addCertification: 'Add certification',
    },
    cv: {
      namePlaceholder: 'Full name',
      profile: 'Profile',
      contact: 'Contact',
      experience: 'Work experience',
      education: 'Education',
      competencies: 'Competencies',
      technicalSkills: 'Technical skills',
      languages: 'Languages',
      certifications: 'Certifications',
      inProgress: 'In progress',
      id: 'ID',
    },
    wizard: {
      step: 'Step',
      next: 'Next',
      back: 'Back',
      finish: 'Finish',
      selectStep: 'Select a step',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
};