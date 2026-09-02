import { describe, it, expect } from 'vitest';
import { contrastRatio, isReadable, ensureTextColor } from '../../src/utils/contrast';

describe('contrastRatio', () => {
  it('blanco y negro tiene ratio maximo', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
  });

  it('iguales tienen ratio 1', () => {
    expect(contrastRatio('#333333', '#333333')).toBeCloseTo(1, 2);
  });
});

describe('isReadable', () => {
  it('texto claro sobre fondo oscuro es legible', () => {
    expect(isReadable('#1F3B4D', '#ffffff').pass).toBe(true);
  });

  it('texto claro sobre fondo claro no es legible', () => {
    expect(isReadable('#ffffff', '#ffffff').pass).toBe(false);
  });
});

describe('ensureTextColor', () => {
  it('elige blanco sobre fondo oscuro', () => {
    expect(ensureTextColor('#1F3B4D')).toBe('#ffffff');
  });

  it('elige oscuro sobre fondo claro', () => {
    expect(ensureTextColor('#f4f6f8')).not.toBe('#ffffff');
  });
});