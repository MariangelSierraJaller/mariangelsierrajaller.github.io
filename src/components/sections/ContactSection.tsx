import { createSignal, Show, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { SITE } from "@/content/shared/site";
import {
  buildMailtoHref,
  buildWhatsappHref,
  validateContact,
} from "@/lib/contact";
import { Section } from "@/components/layout/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GitHubBrandIcon,
  LinkedInBrandIcon,
  MailBrandIcon,
  MapPinBrandIcon,
  PhoneBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/layout/BrandIcons";
import { ArrowUpRightIcon, SendIcon } from "@/components/ui/icons";

export const ContactSection: Component = () => {
  const { lang, copy } = useLanguage();
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [subject, setSubject] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [feedback, setFeedback] = createSignal<{ kind: "error" | "ok"; text: string } | null>(
    null,
  );

  const contact = () => copy().contact;

  const currentPayload = () => ({
    name: name(),
    email: email(),
    subject: subject(),
    message: message(),
  });

  const handleDispatch = (channel: "whatsapp" | "email") => {
    const payload = currentPayload();
    if (!validateContact(payload)) {
      setFeedback({ kind: "error", text: contact().form.validationError });
      return;
    }

    const href =
      channel === "whatsapp"
        ? buildWhatsappHref(payload, lang())
        : buildMailtoHref(payload, lang());

    setFeedback({ kind: "ok", text: contact().form.readyNotice });

    if (typeof window !== "undefined") {
      if (channel === "whatsapp") {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFeedback(null);
  };

  return (
    <Section
      id="contact"
      eyebrow={contact().eyebrow}
      title={contact().title}
      subtitle={contact().subtitle}
      surface="base"
    >
      <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Direct Contact Channels */}
        <div class="space-y-5">
          <div>
            <h3 class="font-display text-2xl text-[var(--color-fg)]">
              {contact().connectTitle}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {contact().connectDescription}
            </p>
          </div>

          <div class="space-y-3">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover-glow"
            >
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <MapPinBrandIcon size={18} />
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                  {contact().cards.locationLabel}
                </p>
                <p class="truncate text-sm font-medium text-[var(--color-fg)]">
                  {contact().cards.locationValue}
                </p>
              </div>
              <ArrowUpRightIcon size={16} class="text-[var(--color-fg-subtle)]" />
            </a>

            <a
              href={`tel:+${SITE.whatsappNumber}`}
              class="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover-glow"
            >
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <PhoneBrandIcon size={18} />
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                  {contact().cards.phoneLabel}
                </p>
                <p class="truncate text-sm font-medium text-[var(--color-fg)]">
                  {SITE.phoneDisplay}
                </p>
              </div>
              <ArrowUpRightIcon size={16} class="text-[var(--color-fg-subtle)]" />
            </a>

            <a
              href={`mailto:${SITE.email}`}
              class="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover-glow"
            >
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <MailBrandIcon size={18} />
              </span>
              <div class="min-w-0 flex-1">
                <p class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                  {contact().cards.emailLabel}
                </p>
                <p class="truncate text-sm font-medium text-[var(--color-fg)]">{SITE.email}</p>
              </div>
              <ArrowUpRightIcon size={16} class="text-[var(--color-fg-subtle)]" />
            </a>

            <div class="grid gap-3 sm:grid-cols-2">
              <a
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover-glow"
              >
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <LinkedInBrandIcon size={17} />
                </span>
                <div class="min-w-0">
                  <p class="font-mono text-[11px] uppercase text-[var(--color-accent)]">
                    {contact().cards.linkedinLabel}
                  </p>
                  <p class="truncate text-xs font-medium text-[var(--color-fg)]">
                    /{SITE.linkedinHandle}
                  </p>
                </div>
              </a>

              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover-glow"
              >
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <GitHubBrandIcon size={17} />
                </span>
                <div class="min-w-0">
                  <p class="font-mono text-[11px] uppercase text-[var(--color-accent)]">
                    {contact().cards.githubLabel}
                  </p>
                  <p class="truncate text-xs font-medium text-[var(--color-fg)]">
                    /{SITE.githubHandle}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDispatch("whatsapp");
          }}
          novalidate
          class="space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
        >
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                for="contact-name"
                class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]"
              >
                {contact().form.nameLabel}
              </label>
              <Input
                id="contact-name"
                type="text"
                required
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder={contact().form.namePlaceholder}
              />
            </div>

            <div>
              <label
                for="contact-email"
                class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]"
              >
                {contact().form.emailLabel}
              </label>
              <Input
                id="contact-email"
                type="email"
                required
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder={contact().form.emailPlaceholder}
              />
            </div>
          </div>

          <div>
            <label
              for="contact-subject"
              class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]"
            >
              {contact().form.subjectLabel}
            </label>
            <Input
              id="contact-subject"
              type="text"
              value={subject()}
              onInput={(e) => setSubject(e.currentTarget.value)}
              placeholder={contact().form.subjectPlaceholder}
            />
          </div>

          <div>
            <label
              for="contact-message"
              class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]"
            >
              {contact().form.messageLabel}
            </label>
            <Textarea
              id="contact-message"
              rows={5}
              required
              value={message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              placeholder={contact().form.messagePlaceholder}
            />
          </div>

          <Show when={feedback()}>
            {(fb) => (
              <p
                role="status"
                aria-live="polite"
                class={`rounded-xl border px-3.5 py-2.5 text-xs ${
                  fb().kind === "error"
                    ? "border-[var(--color-danger)]/50 bg-[var(--color-bg)] text-[var(--color-danger)]"
                    : "border-[var(--color-success)]/50 bg-[var(--color-bg)] text-[var(--color-success)]"
                }`}
              >
                {fb().text}
              </p>
            )}
          </Show>

          <div class="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 py-3 text-sm font-semibold text-[var(--color-on-whatsapp)] transition hover:opacity-90"
            >
              <WhatsAppBrandIcon size={16} />
              <span>{contact().form.sendWhatsapp}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDispatch("email")}
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
            >
              <SendIcon size={15} />
              <span>{contact().form.sendEmail}</span>
            </button>

            <button
              type="button"
              onClick={resetForm}
              class="rounded-full border border-[var(--color-border)] px-4 py-3 text-xs font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
            >
              {contact().form.clear}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
};
