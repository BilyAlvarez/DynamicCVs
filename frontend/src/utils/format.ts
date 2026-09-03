export function capitalize(s = ''): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatFullName(nombre = '', apellidos = ''): string {
  return capitalize(`${nombre.trim()} ${apellidos.trim()}`.trim());
}

export function formatPhone(phone = ''): string {
  if (!phone) return phone;
  const digits = phone.replace(/\D+/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, digits.length - 4)}-${digits.slice(-4)}`;
}

export function formatCedula(value = '', prefix = 'C.I. '): string {
  const digits = value.replace(/\D+/g, '');
  if (!digits) return '';
  const parts = [];
  for (let i = digits.length; i > 0; i -= 8) {
    parts.unshift(digits.slice(Math.max(0, i - 8), i));
  }
  return `${prefix}${parts.join('.')}`;
}

export function isValidEmail(email = ''): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone = ''): boolean {
  return /^[+()\-\s\d]{7,20}$/.test(phone);
}

export function dayMonthYear(iso?: string, locale = 'es'): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function trimObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v === null || v === undefined || v === '' ? undefined : v;
  }
  return out;
}