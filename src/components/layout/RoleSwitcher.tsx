import { For, Show, type Component } from "solid-js";
import { ROLE_IDS, type RoleId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { buildHomePath } from "@/lib/paths";

export const RoleSwitcher: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();

  const labelFor = (id: RoleId) => copy().ui.roleLabels[id].short;

  return (
    <Show when={!locked()}>
      <nav
        data-role-switcher
        aria-label={copy().ui.roleSwitcherLabel}
        class="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-xs"
      >
        <For each={ROLE_IDS}>
          {(target) => {
            const active = () => role() === target;
            return (
              <a
                href={buildHomePath(lang(), target)}
                aria-current={active() ? "page" : undefined}
                title={copy().ui.roleLabels[target].description}
                class={`rounded-full px-3 py-1 font-medium transition whitespace-nowrap ${
                  active()
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-sm"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {labelFor(target)}
              </a>
            );
          }}
        </For>
      </nav>
    </Show>
  );
};
