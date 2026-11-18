import { createSignal, onCleanup, onMount, Show, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { getAssistantKb } from "@/content/assistant";
import { BotIcon } from "@/components/ui/icons";
import { AssistantPanel } from "./AssistantPanel";

export const AssistantLauncher: Component = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = createSignal(false);
  const kb = () => getAssistantKb(lang());
  let launcherRef: HTMLButtonElement | undefined;

  const closeAssistant = () => {
    setOpen(false);
    launcherRef?.focus();
  };

  onMount(() => {
    if (typeof window === "undefined") return;

    const onOpenEvent = () => setOpen(true);
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open()) {
        closeAssistant();
      }
    };

    window.addEventListener("portfolio:open-assistant", onOpenEvent);
    window.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      window.removeEventListener("portfolio:open-assistant", onOpenEvent);
      window.removeEventListener("keydown", onKeyDown);
    });
  });

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open()}
        aria-label={kb().launcherAriaLabel}
        class="fixed right-20 bottom-5 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 text-xs font-semibold text-[var(--color-fg)] shadow-lg transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
      >
        <BotIcon size={18} class="text-[var(--color-primary)]" />
        <span class="hidden sm:inline">{kb().launcherLabel}</span>
      </button>

      <Show when={open()}>
        <AssistantPanel onClose={closeAssistant} />
      </Show>
    </>
  );
};
