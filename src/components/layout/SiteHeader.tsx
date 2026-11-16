import { createSignal, For, onCleanup, onMount, Show, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { useRouter } from "@/routes/router-context";
import { orderedSectionsForRole } from "@/lib/role-view";
import { buildHomePath, withRoleQuery } from "@/lib/paths";
import { BotIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const SiteHeader: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const { route } = useRouter();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal<string>("");

  onMount(() => {
    if (typeof window === "undefined") return;

    const current = document.documentElement.dataset.activeSection;
    if (current) {
      setActiveSection(current);
    } else if (window.location.hash) {
      setActiveSection(window.location.hash.replace(/^#/, ""));
    }

    const onActiveSection = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (typeof custom.detail === "string") {
        setActiveSection(custom.detail);
      }
    };

    window.addEventListener("portfolio:active-section", onActiveSection);
    onCleanup(() => {
      window.removeEventListener("portfolio:active-section", onActiveSection);
    });
  });

  const primarySections = () => orderedSectionsForRole(role()).slice(0, 6);
  const isHome = () => route().kind === "home";

  const sectionHref = (sectionId: string) =>
    isHome()
      ? `#${sectionId}`
      : withRoleQuery(buildHomePath(lang(), role(), sectionId), undefined, locked());

  const homeHref = () =>
    withRoleQuery(buildHomePath(lang(), role()), undefined, locked());

  const openAssistant = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio:open-assistant"));
    }
    setMenuOpen(false);
  };

  return (
    <header class="sticky top-0 z-50 border-b border-[var(--color-border)] glass-header">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
        <a
          href={homeHref()}
          aria-label={copy().ui.brandTitle}
          class="flex items-center gap-2.5 text-[var(--color-fg)] transition hover:text-[var(--color-primary)]"
        >
          <span class="grid h-9 w-9 place-items-center hex-frame bg-[var(--color-primary)] font-mono text-xs font-bold text-[var(--color-on-primary)]">
            MS
          </span>
          <span class="hidden font-display text-lg sm:inline">Mariangel Sierra</span>
        </a>

        <nav aria-label={copy().ui.navAriaLabel} class="hidden items-center gap-4 lg:flex">
          <For each={primarySections()}>
            {(secId) => {
              const isActive = () => isHome() && activeSection() === secId;
              return (
                <a
                  href={sectionHref(secId)}
                  aria-current={isActive() ? "location" : undefined}
                  class={`relative rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition ${
                    isActive()
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {copy().ui.navItems[secId]}
                </a>
              );
            }}
          </For>
        </nav>

        <div class="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={openAssistant}
            title={
              lang() === "es"
                ? "Asistente del portafolio (Ctrl+K)"
                : "Portfolio assistant (Ctrl+K)"
            }
            aria-label={lang() === "es" ? "Abrir asistente (Ctrl+K)" : "Open assistant (Ctrl+K)"}
            class="requires-js hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:inline-flex"
          >
            <BotIcon size={14} class="text-[var(--color-primary)]" />
            <kbd class="hidden font-mono text-[10px] text-[var(--color-accent)] xl:inline">
              Ctrl K
            </kbd>
          </button>
          <a
            href={sectionHref("contact")}
            class="hidden rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-xs font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)] sm:inline-flex"
          >
            {copy().ui.navItems.contact}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen()}
            aria-label={menuOpen() ? copy().ui.mobileMenuClose : copy().ui.mobileMenuOpen}
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] lg:hidden"
          >
            <Show when={menuOpen()} fallback={<MenuIcon size={18} />}>
              <CloseIcon size={18} />
            </Show>
          </button>
        </div>
      </div>

      <Show when={menuOpen()}>
        <div class="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 lg:hidden">
          <div class="mb-4 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={openAssistant}
              class="requires-js inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-fg)]"
            >
              <BotIcon size={14} class="text-[var(--color-primary)]" />
              <span>{lang() === "es" ? "Asistente Q&A" : "Q&A Assistant"}</span>
            </button>
          </div>
          <nav aria-label={copy().ui.navAriaLabel} class="grid grid-cols-2 gap-2">
            <For each={orderedSectionsForRole(role())}>
              {(secId) => {
                const isActive = () => isHome() && activeSection() === secId;
                return (
                  <a
                    href={sectionHref(secId)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive() ? "location" : undefined}
                    class={`rounded-xl border px-3 py-2.5 text-sm transition ${
                      isActive()
                        ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    {copy().ui.navItems[secId]}
                  </a>
                );
              }}
            </For>
          </nav>
        </div>
      </Show>
    </header>
  );
};
