import { For, type Component } from "solid-js";
import { SUPPORTED_LANGS, type Lang } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRouter } from "@/routes/router-context";
import { switchLangPath } from "@/lib/paths";

export const LanguageSwitcher: Component = () => {
  const { lang, copy } = useLanguage();
  const { pathname, search } = useRouter();

  const hrefFor = (target: Lang) => switchLangPath(pathname(), target, search());

  return (
    <div
      role="group"
      aria-label={copy().ui.languageSwitcherLabel}
      class="inline-flex shrink-0 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-xs font-mono"
    >
      <For each={SUPPORTED_LANGS}>
        {(target) => {
          const active = () => lang() === target;
          return (
            <a
              href={hrefFor(target)}
              hreflang={target === "es" ? "es-CO" : "en-US"}
              aria-current={active() ? "page" : undefined}
              onClick={() => {
                if (typeof localStorage !== "undefined") {
                  localStorage.setItem("portfolio.lang", target);
                }
              }}
              class={`inline-flex min-h-[30px] items-center whitespace-nowrap rounded-full px-2.5 py-1 font-medium uppercase transition ${
                active()
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {target}
            </a>
          );
        }}
      </For>
    </div>
  );
};
