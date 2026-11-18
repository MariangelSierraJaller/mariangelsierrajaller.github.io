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
  let menuButtonRef: HTMLButtonElement | undefined;

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

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen()) {
        setMenuOpen(false);
        menuButtonRef?.focus();
      }
    };

    window.addEventListener("portfolio:active-section", onActiveSection);
    window.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      window.removeEventListener("portfolio:active-section", onActiveSection);
      window.removeEventListener("keydown", onKeyDown);
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
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <a
          href={homeHref()}
          aria-label={copy().ui.brandTitle}
          class="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[var(--color-fg)] transition hover:text-[var(--color-primary)]"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center hex-frame bg-[var(--color-primary)] font-mono text-xs font-bold text-[var(--color-on-primary)]">
            MS
          </span>
          <span class="hidden whitespace-nowrap font-display text-base sm:inline xl:text-lg">
            Mariangel Sierra
          </span>
        </a>

        <nav
          aria-label={copy().ui.navAriaLabel}
          class="hidden min-w-0 items-center gap-1 lg:flex xl:gap-1.5"
        >
          <For each={primarySections()}>
            {(secId) => {
              const isActive = () => isHome() && activeSection() === secId;
              return (
                <a
                  href={sectionHref(secId)}
                  aria-current={isActive() ? "location" : undefined}
                  class={`relative inline-flex min-h-[36px] shrink-0 items-center whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-medium uppercase tracking-[0.04em] transition xl:px-2.5 xl:text-xs xl:tracking-wider ${
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

        <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
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
            class="requires-js hidden min-h-[36px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] sm:inline-flex"
          >
            <BotIcon size={14} class="shrink-0 text-[var(--color-primary)]" />
            <kbd class="hidden font-mono text-[10px] text-[var(--color-accent)] xl:inline">
              Ctrl K
            </kbd>
          </button>
          <a
            href={sectionHref("contact")}
            class="hidden min-h-[36px] shrink-0 items-center whitespace-nowrap rounded-full bg-[var(--color-primary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)] sm:inline-flex xl:px-4"
          >
            {copy().ui.navItems.contact}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen()}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen() ? copy().ui.mobileMenuClose : copy().ui.mobileMenuOpen}
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] lg:hidden"
          >
            <Show when={menuOpen()} fallback={<MenuIcon size={18} />}>
              <CloseIcon size={18} />
            </Show>
          </button>
        </div>
      </div>

      <Show when={menuOpen()}>
        <div
          id="mobile-nav-drawer"
          class="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 sm:px-5 lg:hidden"
        >
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
              {copy().ui.navAriaLabel}
            </span>
            <button
              type="button"
              onClick={openAssistant}
              class="requires-js inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs text-[var(--color-fg)]"
            >
              <BotIcon size={14} class="shrink-0 text-[var(--color-primary)]" />
              <span>{lang() === "es" ? "Asistente Q&A" : "Q&A Assistant"}</span>
            </button>
          </div>
          <nav
            aria-label={copy().ui.navAriaLabel}
            class="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2"
          >
            <For each={orderedSectionsForRole(role())}>
              {(secId) => {
                const isActive = () => isHome() && activeSection() === secId;
                return (
                  <a
                    href={sectionHref(secId)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive() ? "location" : undefined}
                    class={`flex min-h-[44px] items-center rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
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
