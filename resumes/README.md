# Hojas de Vida en Markdown (OhMyCV · ATS)

Este directorio contiene las 6 variantes oficiales de hoja de vida en Markdown compatible con **Oh My CV!** (`ohmycv.app` / `Renovamen/oh-my-cv`) y sirve como **fuente única de verdad** para `scripts/render-resumes.mjs`, que genera:

- Los 6 PDFs ATS descargables en `public/cv/cv-mariangel-sierra-{es,en}-{admin,tech,ats}.pdf`
- Las 6 vistas previas en `public/cv/previews/cv-mariangel-sierra-{es,en}-{admin,tech,ats}.webp`

## Uso directo en Oh My CV (`ohmycv.app`)

1. Abre cualquiera de los archivos `.md` de esta carpeta y copia su contenido completo en el editor de [ohmycv.app](https://ohmycv.app).
2. Configuración recomendada en el panel derecho de OhMyCV para cumplimiento estricto ATS:
   - **Tamaño de página:** US Letter (`8.5" x 11"` / `215.9 x 279.4 mm`)
   - **Márgenes:** `13–14 mm` arriba/abajo y `14 mm` izquierda/derecha (para mantener 1 página limpia)
   - **Tipografía:** Sans-serif estándar (Helvetica / Inter / Arial) en negro (`#0F172A`) sobre fondo blanco, sin barras de progreso, íconos ni columnas múltiples
   - **Color de tema:** `#1D4ED8` o `#0F172A` solo en subtítulos/líneas de encabezado
3. Los marcadores `\hfill` alinean fechas a la derecha en la vista OhMyCV manteniendo un flujo de texto lineal de una sola columna en el PDF final.

## Auditoría aplicada por skill

| Skill | Qué corrigió en estas versiones |
|---|---|
| `resume-diagnoser` | Eliminación de plantillas Canva de 2 columnas con foto, barras de habilidades, íconos y errores (`Univesitaria`, `(En Proceso)`); reemplazo de capturas desactualizadas por vista previa 1:1 del PDF real; encabezados ATS estándar (`Perfil Profesional`, `Experiencia Profesional`, `Formación Académica`, `Competencias`). |
| `resume-recruiter` | Incorporación de palabras clave de alta demanda 2026 por perfil (`Procure-to-Pay`, `3-Way Matching`, `DIAN XML/CUFE`, `Oracle NetSuite Saved Searches`, `Python Pandas ETL`, `Power BI DAX`, `Kimball Star Schema`, `RLS`, `CRISP-DM`, `SQL`), agrupamiento técnico y eliminación de muletillas (`orientada a resultados`, `proactiva`, `entornos dinámicos`). |
| `resume-rewriter` | Reescritura de todos los bullets bajo la fórmula Google **XYZ** (`Logré X, medido por Y, haciendo Z`), inicio obligatorio con verbo de acción fuerte en pasado, máximo 2 líneas por bullet y eliminación de frases pasivas (`Responsable de`, `Apoyé en`, `Creación de`). |
| `resume-hiring-manager` | Títulos laborales honestos alineados a ASPAEN y verificables en certificación laboral; métricas armonizadas entre español, inglés y casos de estudio; corrección de credenciales para no reclamar certificados no documentados (`Google Data Analytics`, `R` o `VBA`). |
| `humanizer` / `humanscope` (estilo) | Eliminación de aforismos (`lo que no se mide no se controla`), rayas (`—`) como conectores, tríadas forzadas, gerundios decorativos (`asegurando...`, `empoderando...`) y adjetivos inflados (`intachable`, `drásticamente`, `absoluta`). *(Nota: `humanscope` está diseñado para ficción literaria, por lo que se aplicaron sus reglas de superficie junto con `humanizer`.)* |
| `find-memory-leaks` (higiene de recursos) | *(Nota: la skill `find-memory-leaks` del catálogo audita heap en firmware ESP-IDF con Wokwi CI, no documentos ni JS.)* En el renderizador `scripts/render-resumes.mjs` se aplica cierre explícito de streams PDF, `.destroy()` de instancias `sharp` en bloques `try/finally`, concurrencia acotada y prueba de estabilidad de memoria ante ejecuciones repetidas. |

## Lista de verificación de métricas antes de postular

Todas las métricas provienen de los casos de estudio y métricas del portafolio (`src/content/`). Verifica internamente con tus registros de ASPAEN antes de enviar a procesos formales:

- **Conciliación bancaria:** `4 días -> 4 horas`, `99.8%` emparejamiento, `4` cuentas bancarias, `3.500+` movimientos/mes.
- **Pipeline ETL NetSuite:** `12 horas/semana -> 45 minutos` (`-92%`), `30+ horas hombre/mes` ahorradas, `8` Saved Searches.
- **Compras e inventarios:** `99.4%` exactitud física vs ERP, `-65%` tiempo de trámite de OC, `1.200+` OC, `80+` proveedores, `800+` referencias.
- **Tableros BI:** `12` sedes/centros de costo, reducción de revisión directiva de `3 horas` a `30 minutos`.
- **Práctica 2022–2023:** `1.000+` expedientes digitalizados, `-40%` tiempo de búsqueda documental, `0` rechazos DIAN.
- **Institución técnica contable:** Verificar si el nombre exacto en diploma es **Instituto Metropolitano de Educación (IME)** vs `(ITM)` en `src/content/shared/education.ts`.
