import type { ReactNode } from 'react';

const paths: Record<string, ReactNode> = {
  usuario: <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-8 1.6-8 4v2h16v-2c0-2.4-4.7-4-8-4Z" />,
  cedula: <path d="M4 6h16v12H4Zm3 3h3v2H7Zm5 0h5v2h-5Zm-5 4h3v2H7Zm5 0h5v2h-5Z" />,
  ciudad: <path d="M12 2 4 6v11l8-4 8 4V6l-8-4Zm0 3.2 4 2v6.6l-4 2-4-2V7.2l4-2Z" />,
  telefono: <path d="M6.6 3h3l1.4 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.4v3A2 2 0 0 1 19 20 15 15 0 0 1 4 5a2 2 0 0 1 2.6-2Z" />,
  correo: <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7L4 8v9h16V8l-8 4Z" />,
};

interface Props {
  name: keyof typeof paths | string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 16, color = 'currentColor' }: Props) {
  const path = paths[name] ?? paths.usuario;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export const iconNames = Object.keys(paths);