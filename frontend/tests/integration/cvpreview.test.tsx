// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import CVPreview from '../../src/components/CVPreview';
import type { CVData } from '../../src/types';
import { PALETAS } from '../../src/data';

const data: CVData = {
  datosPersonales: {
    nombre: 'Ana Pérez',
    cedula: '12345678',
    ciudad: 'Caracas',
    telefono: '+58 412 000 0000',
    correo: 'ana@correo.com',
  },
  perfil: { titulo: 'Diseñadora UX', resumen: 'Experiencia en productos digitales.' },
  formacion: [{ institucion: 'UNAM', titulo: 'Lic. Diseño', anioInicio: '2010', anioFin: '2014', enCurso: false }],
  experiencia: [
    {
      empresa: 'Agencia X',
      cargo: 'Diseñadora',
      ciudad: 'Caracas',
      fechas: '2020-2022',
      funciones: [{ texto: 'Diseño de interfaces' }],
    },
  ],
  competencias: ['Creatividad'],
  habilidadesTecnicas: [{ herramienta: 'Figma', descripcion: 'Avanzado' }],
  idiomas: [{ nombre: 'Inglés', nivel: 'B2' }],
  certificaciones: [{ curso: 'UX Cert', institucion: 'Google' }],
};

describe('CVPreview', () => {
  afterEach(() => cleanup());

  it('renderiza datos personales y perfil', () => {
    render(<CVPreview data={data} paleta={PALETAS[0]} />);
    expect(screen.getByText('Ana Pérez')).toBeTruthy();
    expect(screen.getByText('Diseñadora UX')).toBeTruthy();
    expect(screen.getByText(/C.I. 12345678/)).toBeTruthy();
  });

  it('renderiza secciones de contenido y sidebar', () => {
    render(<CVPreview data={data} paleta={PALETAS[0]} />);
    expect(screen.getByText('Experiencia laboral')).toBeTruthy();
    expect(screen.getByText('Competencias')).toBeTruthy();
    expect(screen.getByText('Creatividad')).toBeTruthy();
    expect(screen.getByText('Inglés')).toBeTruthy();
  });

  it('muestra placeholder para datos vacios', () => {
    const empty: CVData = {
      ...data,
      datosPersonales: { nombre: '', cedula: '', ciudad: '', telefono: '', correo: '' },
    };
    render(<CVPreview data={empty} paleta={PALETAS[0]} />);
    expect(screen.getByText('Nombre Completo')).toBeTruthy();
  });
});