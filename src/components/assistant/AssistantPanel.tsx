import { createSignal, For, onCleanup, onMount, Show, type Component } from "solid-js";
import type { AssistantActionLink, AssistantMessage, AssistantTopic } from "@/types/assistant";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { useRouter } from "@/routes/router-context";
import { getAssistantKb } from "@/content/assistant";
import { answerAssistantQuery } from "@/lib/assistant/answer";
import { withBase } from "@/lib/base";
import { buildHomePath, withRoleQuery } from "@/lib/paths";
import { ArrowRightIcon, BotIcon, CloseIcon, SendIcon } from "@/components/ui/icons";

export interface AssistantPanelProps {
  onClose: () => void;
}

export const AssistantPanel: Component<AssistantPanelProps> = (props) => {
  const { lang } = useLanguage();
  const { role, locked } = useRole();
  const { route } = useRouter();
  const kb = () => getAssistantKb(lang());

  let panelRef: HTMLElement | undefined;
  let inputRef: HTMLInputElement | undefined;
  let chatScrollRef: HTMLDivElement | undefined;

  const [input, setInput] = createSignal("");
  const [messages, setMessages] = createSignal<AssistantMessage[]>([
    {
      id: "greeting",
      sender: "assistant",
      text: kb().greeting,
    },
  ]);

  const scrollToLatest = () => {
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => {
        if (chatScrollRef) {
          chatScrollRef.scrollTop = chatScrollRef.scrollHeight;
        }
      });
    } else if (chatScrollRef) {
      chatScrollRef.scrollTop = chatScrollRef.scrollHeight;
    }
  };

  onMount(() => {
    inputRef?.focus();
    if (typeof window === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef) return;
      const focusables = Array.from(
        panelRef.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });

  const resolveLinkHref = (link: AssistantActionLink): string => {
    if (link.kind === "external") return link.href;
    if (link.kind === "section") {
      const targetId = link.href.replace(/^#/, "");
      return route().kind === "home"
        ? `#${targetId}`
        : withRoleQuery(buildHomePath(lang(), role(), targetId), undefined, locked());
    }
    const normalized = link.href.startsWith("/") ? link.href : `/${link.href}`;
    const localized = /^\/(es|en)(\/|$)/.test(normalized)
      ? normalized
      : `/${lang()}${normalized}`;
    const isRoleHome = /^\/(es|en)(\/(admin|tech))?$/.test(localized);
    return withRoleQuery(withBase(localized), isRoleHome ? undefined : role(), locked());
  };

  const ask = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const reply = answerAssistantQuery(kb(), trimmed);
    const uid = String(Date.now());
    setMessages((prev) => [
      ...prev,
      { id: `u-${uid}`, sender: "user", text: trimmed },
      {
        id: `a-${uid}`,
        sender: "assistant",
        text: reply.answer,
        highlights: reply.highlights,
        links: reply.links,
      },
    ]);
    setInput("");
    scrollToLatest();
  };

  const askTopic = (topic: AssistantTopic) => {
    const uid = `${topic.id}-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: `u-${uid}`, sender: "user", text: topic.question },
      {
        id: `a-${uid}`,
        sender: "assistant",
        text: topic.answer,
        highlights: topic.highlights,
        links: topic.links,
      },
    ]);
    scrollToLatest();
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => props.onClose()}
        class="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={kb().title}
        class="fixed right-4 bottom-20 z-50 flex max-h-[min(78vh,calc(100dvh-6.5rem))] w-[min(92vw,420px)] flex-col overflow-hidden rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl"
      >
        <div class="flex items-start justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3.5 sm:px-5 sm:py-4">
          <div class="flex min-w-0 items-start gap-3">
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <BotIcon size={18} />
            </span>
            <div class="min-w-0">
              <p class="font-display text-sm leading-snug text-[var(--color-fg)] sm:text-base">
                {kb().title}
              </p>
              <p class="mt-0.5 line-clamp-2 font-mono text-[11px] leading-snug text-[var(--color-accent)]">
                {kb().subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => props.onClose()}
            aria-label={kb().closeLabel}
            class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-fg)]"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Topic Quick Chips */}
        <div class="border-b border-[var(--color-border)] bg-[var(--color-bg)]/60 px-4 py-2.5 sm:py-3">
          <p class="mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
            {kb().suggestedTitle}
          </p>
          <div class="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            <For each={kb().topics.slice(0, 6)}>
              {(topic) => (
                <button
                  type="button"
                  onClick={() => askTopic(topic)}
                  class="min-h-[32px] shrink-0 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-fg)]"
                >
                  {topic.label}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Conversation History */}
        <div ref={chatScrollRef} class="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <For each={messages()}>
            {(msg) => (
              <div
                class={`rounded-2xl p-3.5 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "ml-8 bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "mr-4 border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg)]"
                }`}
              >
                <p>{msg.text}</p>
                <Show when={msg.highlights && msg.highlights.length > 0}>
                  <ul class="mt-2.5 space-y-1 border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-fg-muted)]">
                    <For each={msg.highlights}>
                      {(hl) => (
                        <li class="flex gap-2">
                          <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                          <span>{hl}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </Show>
                <Show when={msg.links && msg.links.length > 0}>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <For each={msg.links}>
                      {(link) => {
                        const href = resolveLinkHref(link);
                        const isExternalHttp =
                          link.kind === "external" && /^https?:\/\//.test(href);
                        return (
                          <a
                            href={href}
                            target={isExternalHttp ? "_blank" : undefined}
                            rel={isExternalHttp ? "noopener noreferrer" : undefined}
                            onClick={() => props.onClose()}
                            class="inline-flex min-h-[28px] items-center gap-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                          >
                            <span>{link.label}</span>
                            <ArrowRightIcon size={11} />
                          </a>
                        );
                      }}
                    </For>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>

        {/* Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input());
          }}
          class="flex items-center gap-2 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input()}
            onInput={(e) => setInput(e.currentTarget.value)}
            placeholder={kb().inputPlaceholder}
            aria-label={kb().inputPlaceholder}
            class="min-w-0 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] focus-visible:border-[var(--color-ring)] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-ring)] sm:text-sm"
          />
          <button
            type="submit"
            aria-label={kb().sendLabel}
            class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
          >
            <SendIcon size={15} />
          </button>
        </form>
      </aside>
    </>
  );
};
