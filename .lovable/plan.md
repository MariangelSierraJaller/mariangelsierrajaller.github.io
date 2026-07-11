# Validación final del portafolio y acciones a seguir

## 1. Hallazgos

### Estética y consistencia visual
- **Encabezados de sección**: existe `SectionHeader` (kicker + título + línea Santino), pero no todas las secciones lo usan de forma uniforme (Hero, ProfessionalProfile, Testimonials y Footer llevan su propio patrón). Falta un ritmo visual consistente entre bloques.
- **Espaciado vertical**: cada sección define su propio `py-*`. Conviene un token único (`section` con `scroll-mt` + padding estándar) para respetar el offset del nav sticky y evitar títulos tapados al navegar por anclas.
- **Ancho máximo**: mezcla de `max-w-6xl` y `max-w-7xl` entre secciones. Unificar a un solo contenedor.
- **Glow / hover-glow**: `santino-glow` y `hover-glow` están definidos pero no aplicados de forma pareja (tarjetas de Services vs About vs Testimonials difieren en intensidad de sombra).

### Tipografía
- Stack cargado correctamente: `DM Serif Text` (display), `IBM Plex Sans` (body), `Source Code Pro` (mono).
- Riesgo: la fuente `DM Serif Text` no tiene bold real; algunos títulos usan `font-semibold`/`font-bold` sobre display, lo que el navegador sintetiza (se ve borroso). Revisar y usar `font-normal` en display.
- Los kickers/labels en mono a veces usan tamaños <10px con `tracking-widest`, difícil de leer en móviles.

### Navegación y flujo
- `Navigation.tsx` lista `about, education, professional, experience, skills, resume, contact` — falta **testimonials** que sí se renderiza en Home.
- No hay indicador de sección activa mientras se scrollea.
- El botón CTA "contactame" no aparece en el menú móvil de forma primaria (solo al final).

### SEO (crítico)
- `index.html`:
  - `<title>santino porfolio</title>` → minúsculas + typo ("porfolio").
  - `description` genérica sin nombre ni keywords.
  - `<html lang="es">` fijo aunque la app es bilingüe.
  - Falta `<link rel="canonical">`.
  - `og:image` apunta a una URL R2 de **preview** (`id-preview--…lovable.app`), no al dominio publicado; se romperá si cambia.
  - Falta JSON-LD (`Person` + `WebSite`).
- `public/robots.txt` **no existe**.
- `public/sitemap.xml` **no existe**.
- No hay `alt` semántico consistente en imágenes decorativas vs informativas (revisar Hero y About).
- No hay `<h1>` verificable como único (Hero debería ser el único H1; el resto `h2`).

### Contenido y estandarización entre secciones
- Cada sección debería seguir el patrón: `kicker` (mayúsculas mono) → `title` (display) → `intro` (1 párrafo) → contenido. Hoy About, Skills, Experience y Testimonials difieren en la intro.
- Los textos i18n mezclan tono "tú" y "usted" en algunas descripciones (revisar `es.json`).
- Metricas y badges de About ya se estandarizaron; falta hacerlo en Services y Skills (algunos textos superan 3 líneas en tarjetas fijas).
- CTAs finales heterogéneos: "Contáctame", "Hablemos", "Escríbeme" — unificar a un único CTA por idioma.

## 2. Acciones propuestas (priorizadas)

### P0 — SEO base (impacto alto, esfuerzo bajo)
1. Reescribir `<title>` y `<meta description>` en `index.html`:
   - Título: `Mariangel Sierra Jaller — Ingeniera Industrial & Analista de Datos`
   - Description: bilingüe corta (<160 chars), con roles clave y ubicación.
2. Agregar `<link rel="canonical" href="https://santino-essence.lovable.app/">`.
3. Reemplazar `og:image` R2 preview por una imagen generada 1200×630 servida desde `/og-cover.jpg` (dominio publicado) o quitar el tag y dejar que Lovable inyecte el auto-preview.
4. Añadir JSON-LD `Person` (nombre, jobTitle bilingüe, url, sameAs LinkedIn, image) y `WebSite`.
5. Crear `public/robots.txt` (allow all + Sitemap) y `public/sitemap.xml` con `/es`, `/en`, `/es/admin`, `/es/tech`, `/en/admin`, `/en/tech`.
6. Auditar `alt` en `<img>` (Hero portrait, About portrait, Resume previews) y marcar decorativas con `alt=""`.

### P1 — Consistencia estructural
7. Actualizar `Navigation.tsx`: agregar `testimonials` en el orden real de Home; añadir scroll-spy simple para resaltar la sección activa.
8. Definir en `styles.css` una clase utilitaria `.section` (padding vertical + `scroll-mt-24`) y aplicarla a todas las `<section>`.
9. Unificar contenedor a `max-w-6xl mx-auto px-6` en todas las secciones.
10. Forzar uso de `SectionHeader` en About, Skills, Experience, Resume, Testimonials, Contact (Hero se mantiene aparte).

### P2 — Tipografía y micro-estética
11. Auditar todos los usos de `font-display` y quitar `font-bold`/`font-semibold` (DM Serif Text solo tiene regular/italic).
12. Subir kickers mono a `text-[11px]` mínimo y revisar contraste en móvil.
13. Estandarizar sombras: definir `--shadow-elegant` y `--shadow-glow` en tokens y usar `hover-glow` uniforme en todas las tarjetas (About, Services, Skills, Testimonials).

### P3 — Contenido y CTA
14. Revisar `es.json`/`en.json` para unificar tono ("tú" en toda la app en ES; "you" casual en EN).
15. Unificar CTA a `Contáctame` / `Get in touch` en todos los botones (Hero, Nav, ProfessionalProfile, Contact, Footer).
16. Añadir una intro corta (1 frase) a cada sección que hoy va directo a contenido (Skills, Experience, Testimonials).

### P4 — Extra recomendado
17. Ejecutar un scan SEO oficial (`seo_chat--trigger_scan`) al terminar P0/P1 para validar.
18. Añadir `prefers-reduced-motion` guard en Framer Motion global.
19. Añadir `<meta name="theme-color" content="#0A0A0C">` para navegadores móviles.

## 3. Detalles técnicos

- **Head bilingüe**: como el sitio es SPA estática, el `<title>` que ven los crawlers es el de `index.html`. Podemos añadir `react-helmet-async` para actualizar `<title>`/`description`/`lang` al vuelo por ruta `/es` vs `/en` (para el usuario y para Googlebot que sí ejecuta JS). Los previews sociales (LinkedIn/WhatsApp) seguirán viendo el `og:*` estático — dejamos el ES como fallback.
- **JSON-LD**: inyectar en `index.html` como bloque estático (`Person` + `WebSite`), no depende de i18n.
- **Sitemap**: 6 URLs (2 idiomas × {home, admin, tech}) con `hreflang` cruzado si añadimos `react-helmet-async`.
- **Scroll-spy**: `IntersectionObserver` en `Navigation.tsx`, marcar `aria-current="true"` sobre el link activo.

## 4. Orden sugerido de implementación

```text
P0 (SEO base) → P1 (estructura) → P2 (tipografía) → P3 (contenido) → P4 (scan + polish)
```

Cada bloque es independiente; podemos hacer commits separados. ¿Aplicamos todo el bloque P0+P1 en una primera iteración y dejamos P2–P4 para una segunda?
