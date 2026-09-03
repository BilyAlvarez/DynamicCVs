# DynamicCVs

Generador de CVs dinámicos: formulario con vista previa en vivo, paletas de color, exportación a PDF y Word.

## Estructura

- docs/: plan, agenda y documentación
- design/: paletas de color y assets SVG
- frontend/: React (Vite) — formulario + vista previa
- backend/: Node.js (Express) — generación de PDF (Puppeteer) y Word (docx)
- tests/: pruebas unitarias e integración

## Requisitos

- Node.js >= 18

## Inicio rápido

Backend (puerto 3000):

```
cd backend
npm install
npm start
```

Frontend (puerto 5173):

```
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173. El backend debe estar corriendo para descargar PDF/Word; el botón "Imprimir PDF" funciona sin backend.

## Tests

```
cd frontend && npm test   # unitarias + integración (Vitest)
cd backend  && npm test   # integración de API (node:test + supertest)
```

## Endpoints backend

- GET /health
- POST /generate/pdf
- POST /generate/word

