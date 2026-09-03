import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { Idioma } from '../types';
import { translations } from './translations';

interface LanguageContextValue {
  idioma: Idioma;
  setIdioma: (l: Idioma) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  idioma = 'es',
  setIdioma,
  children,
}: {
  idioma?: Idioma;
  setIdioma?: (l: Idioma) => void;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ idioma: idioma ?? 'es', setIdioma: setIdioma ?? (() => {}), t: translations[idioma ?? 'es'] }),
    [idioma, setIdioma]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang debe usarse dentro de LanguageProvider');
  return ctx;
}