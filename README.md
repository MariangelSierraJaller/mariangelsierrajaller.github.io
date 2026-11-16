# Portafolio Profesional — Mariangel Johanna Sierra Jaller

Portafolio bilingüe (`es` / `en`) y multi-rol (`general`, `admin`, `tech`) construido con **Astro 5**, **SolidJS Islands (`client:settled`)**, **Tailwind CSS v4** y **LightningCSS**, compilado y gestionado con **Bun**.

## Arquitectura y Características

- **Islas SolidJS perezosas (`client:settled`)**: Las secciones sobre el pliegue hidratan en `requestIdleCallback`; el resto de secciones hidrata mediante `IntersectionObserver` (`rootMargin: "600px"`), manteniendo carga perezosa por sección (`section-loaders.ts`) y separación en chunks (`solid-vendor`, `content-es`, `content-en`).
- **Vistas adaptadas por rol (`/es`, `/es/admin`, `/es/tech`, `/en`, `/en/admin`, `/en/tech`)**:
  - `general`: Visión integral (administración financiera, ERP, analítica e ingeniería).
  - `admin`: Enfoque en compras, tesorería, auditoría interna, inventarios y facturación electrónica.
  - `tech`: Enfoque en pipelines ETL (`Python` / `Pandas`), `SQL`, integración ERP `Oracle NetSuite (XML/JSON)` y `Power BI (DAX)`.
  - Soporte de enlaces bloqueados para reclutadores (`?locked=true`).
- **54 rutas estáticas prerenderizadas + `404.html`**:
  - Páginas iniciales por idioma/rol (`6`).
  - Índice de proyectos, 4 casos de estudio con bloques interactivos (código copiable, tablas, diagramas de arquitectura) y 2 páginas de proyecto (`14`).
  - Colecciones detalladas de **Experiencia** (`2`), **Formación Académica** (`6`) y **Certificaciones** (`6`) con sus respectivos índices (`34`).
- **Navegación & Rendimiento**:
  - Speculation Rules API + prefetch al pasar el cursor (`pointerover` / `focusin`) en rutas internas.
  - Scroll-spy en cabecera con resaltado de sección activa.
  - Asistente local interactivo de preguntas y respuestas (`Ctrl+K` / botón flotante).
  - Mapas e indicadores interactivos en Trayectoria (filtros por línea metro, radar de enfoque con capas conmutables, mapa de calor), Terminal de Arquitectura 3-modos en Sobre Mí, filtros por área en Habilidades y Métricas.
- **Generación local de activos y SEO postbuild**:
  - `scripts/render-resumes.mjs`: 5 variantes de retrato (`AVIF` / `WebP` / `JPG`) y 6 PDFs locales de hoja de vida (`es`/`en` × `admin`/`tech`/`ats`) con **PDFKit** y **Sharp**.
  - `scripts/generate-og.mjs`: 12 tarjetas OpenGraph (`1200x630` JPG) para compartir en redes.
  - `scripts/postbuild.ts`: `sitemap.xml`, `robots.txt`, `llms.txt`, `page-dates.json`, redirección raíz `/index.html` y precompresión `.gz` / `.br`.

## Comandos Principales

```bash
bun install
bun run dev
bun run check:contrast
bun run typecheck
bun run lint
bun run build
bun run test
bun run test:dist
bun run check:links
bun run verify
```

## Notas del Repositorio

Este repositorio sincroniza con Lovable en la rama principal; evitar reescrituras de historial ya publicado (`git push --force`, `rebase` o `amend` sobre commits publicados).
