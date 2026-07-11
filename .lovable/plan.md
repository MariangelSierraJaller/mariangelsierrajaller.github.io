
# Portafolio de Mariangel Sierra Jaller — Vite + React SPA

Cambio de arquitectura confirmado: SPA pura con CSR, `react-router-dom`, sin SSR ni file-based routing. Diseño, paleta, contenido y perfil dual se mantienen exactamente como se aprobó.

## Aviso importante sobre el template

Este proyecto viene **bootstrapped con TanStack Start** (`vite.config.ts` usa `@lovable.dev/vite-tanstack-config`, hay `src/routes/`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`). Migrar a Vite + React SPA puro implica:

- Reescribir `vite.config.ts` para usar `@vitejs/plugin-react` directamente (sin el preset TanStack).
- Eliminar `src/routes/`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`.
- Añadir `index.html` en la raíz (entry HTML de Vite estándar).
- Quitar dependencias TanStack Start/Router/Nitro/Cloudflare del `package.json`.
- Añadir `react-router-dom`, `framer-motion`.

Esto es un rework del andamiaje, no un ajuste menor. Lo hago en la implementación. Tailwind v4 se queda (funciona con Vite puro vía `@tailwindcss/vite`); si algún componente shadcn ya presente reclama, caigo a v3 con `tailwind.config.js` — decisión en el momento, sin cambiar la UX.

## Stack final

- Vite 7 + React 19 + TypeScript
- `react-router-dom` v6
- Tailwind CSS v4 con `@tailwindcss/vite` (fallback v3 si necesario)
- shadcn/ui (componentes ya instalados en `src/components/ui/`)
- framer-motion
- lucide-react (ya instalado)

## Enrutamiento (BrowserRouter)

`src/App.tsx`:

```
<BrowserRouter>
  <LanguageProvider>
    <ProfileProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/:lang" element={<LangLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProfileProvider>
  </LanguageProvider>
</BrowserRouter>
```

`LangLayout` valida `lang ∈ {es,en}`, sincroniza el contexto con el param y renderiza `<Navigation /> <Outlet /> <Footer />`.

## Estructura de carpetas

```
index.html
src/
  main.tsx                     entry: ReactDOM.createRoot + <App/>
  App.tsx                      BrowserRouter + Providers + Routes
  index.css                    (renombrado desde styles.css) tokens + fuentes
  pages/
    Home.tsx                   compone Hero + About + ProfileSwitch + Experience + Education + Skills + Contact
    NotFound.tsx
  components/
    Navigation.tsx
    HeroSection.tsx
    AboutSection.tsx
    ProfileSwitch.tsx
    ExperienceSection.tsx
    EducationSection.tsx
    SkillsSection.tsx
    ContactSection.tsx
    Footer.tsx
    LanguageSwitcher.tsx
    ui/                        (shadcn existentes)
  context/
    LanguageContext.tsx        lee/escribe param de ruta; expone { lang, t, setLang(navigate) }
    ProfileContext.tsx         localStorage-init directo, sin guards SSR
  i18n/
    es.json
    en.json
    useTranslation.ts          helper t(key) con dot-paths
  lib/utils.ts                 (se conserva `cn`)
  hooks/use-mobile.tsx         (se conserva)
```

Se eliminan: `src/routes/`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`, `src/lib/lovable-error-reporting.ts` (opcional, si depende de TanStack), `src/lib/error-*.ts` si no aplican.

## Diseño visual (sin cambios respecto al plan aprobado)

Tokens oklch en `src/index.css`:

- `--background` `#0A0A0C` · `--card` `#16161A`
- `--primary` `#8B1E28` (Rojo Santino) · hover `#A72834`
- `--foreground` `#F8F9FA` · `--muted-foreground` `#A1A1AA`
- Bordes hairline blanco/8%, radios suaves

Fuentes **Fraunces** (display serif) + **Inter** (body) vía `<link>` en `index.html`.

Animaciones framer-motion: fade/slide-up on scroll (viewport once), crossfade de perfil con `AnimatePresence mode="wait"`.

## Contextos

- **LanguageContext**: `lang` deriva del param de ruta; `setLang(next)` hace `navigate('/'+next + rest)`; expone `t(key)` que resuelve dot-paths sobre `es.json` / `en.json`.
- **ProfileContext**: `useState(() => (localStorage.getItem('profile') as 'admin'|'tech') ?? 'tech')`, `useEffect` persiste. Sin SSR, sin mismatches.

## Perfil dual

`ProfileSwitch` — toggle segmentado grande con indicador animado en Rojo Santino, sticky bajo el Hero. Experience/Skills/About filtran por `profile` con crossfade. Hero muestra ambos títulos siempre.

## Contenido (extraído de los PDFs)

Cargado en `es.json` / `en.json`:

- Contacto: Medellín · +57 324 292 4705 · marijohansierra@gmail.com · @mariangelsierrajaller
- Educación (6): Bachiller Informática IE Inem 2019-21, SENA Programación 2020-21, ITM Contable/Financiero 2022-23, San José Sistemas 2023-26 (En Proceso), San José Industrial 2023-26 (En Proceso), ITM Biomédica 2023-28 (En Proceso)
- Experiencia: ASPAEN Auxiliar de Compras 2023-Presente + ASPAEN Practicante 2022-23, cada rol con bullets `admin[]` y `tech[]`
- Idiomas: Español nativo · Inglés B2
- Skills hard/soft tagueadas por `admin | tech | both`

## SEO

`index.html` con `<title>` / meta base bilingüe genérico. `Home.tsx` actualiza `document.title` según `lang` con un `useEffect` simple.

## Pasos de implementación

1. `bun remove` de paquetes TanStack Start/Router/Nitro/Cloudflare relacionados.
2. `bun add react-router-dom framer-motion`.
3. Reescribir `vite.config.ts` (React plugin + Tailwind v4 plugin + alias `@`).
4. Crear `index.html` raíz.
5. Borrar scaffolding TanStack (`src/routes/`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`).
6. Renombrar `src/styles.css` → `src/index.css` con la nueva paleta y fuentes.
7. Crear `main.tsx`, `App.tsx`, contextos, i18n, páginas y componentes.
8. Verificar build.

Procedo.
