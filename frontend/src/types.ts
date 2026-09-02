export interface DatosPersonales {
  nombre: string;
  cedula: string;
  ciudad: string;
  telefono: string;
  correo: string;
}

export interface Perfil {
  titulo: string;
  resumen: string;
}

export interface Formacion {
  institucion: string;
  titulo: string;
  anioInicio: string;
  anioFin: string;
  enCurso: boolean;
}

export interface Funcion {
  texto: string;
}

export interface Experiencia {
  empresa: string;
  cargo: string;
  ciudad: string;
  fechas: string;
  funciones: Funcion[];
}

export interface HabilidadTecnica {
  herramienta: string;
  descripcion: string;
}

export interface Idioma {
  nombre: string;
  nivel: string;
}

export interface Certificacion {
  curso: string;
  institucion: string;
}

export interface CVData {
  datosPersonales: DatosPersonales;
  perfil: Perfil;
  formacion: Formacion[];
  experiencia: Experiencia[];
  competencias: string[];
  habilidadesTecnicas: HabilidadTecnica[];
  idiomas: Idioma[];
  certificaciones: Certificacion[];
}

export interface Paleta {
  id: string;
  name: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
    sidebar: string;
    textLight: string;
  };
}
