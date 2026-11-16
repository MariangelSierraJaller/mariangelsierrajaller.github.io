import type { Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { buildHomePath } from "@/lib/paths";
import { ArrowLeftIcon } from "@/components/ui/icons";

export const NotFoundPage: Component = () => {
  const { lang } = useLanguage();

  const copy = () =>
    lang() === "es"
      ? {
          code: "404",
          title: "Ruta no encontrada",
          description:
            "La página o sección que buscas no existe o cambió de ubicación. Puedes regresar a la vista principal del portafolio.",
          esCta: "Ir al portafolio (ES)",
          enCta: "Go to portfolio (EN)",
        }
      : {
          code: "404",
          title: "Page not found",
          description:
            "The page or section you are looking for does not exist or has moved. Return to the main portfolio views below.",
          esCta: "Ir al portafolio (ES)",
          enCta: "Go to portfolio (EN)",
        };

  return (
    <section class="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
        HTTP {copy().code}
      </p>
      <h1 class="mt-3 font-display text-4xl text-[var(--color-fg)] sm:text-5xl">
        {copy().title}
      </h1>
      <p class="mt-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
        {copy().description}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={buildHomePath("es", "general")}
          class="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
        >
          <ArrowLeftIcon size={15} />
          <span>{copy().esCta}</span>
        </a>
        <a
          href={buildHomePath("en", "general")}
          class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        >
          <span>{copy().enCta}</span>
        </a>
      </div>
    </section>
  );
};
