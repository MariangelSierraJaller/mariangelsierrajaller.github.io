import { SITE } from "@/content/shared/site";
import type { Lang } from "@/types/content";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(payload: ContactPayload): boolean {
  return (
    payload.name.trim().length >= 2 &&
    EMAIL_RE.test(payload.email.trim()) &&
    payload.message.trim().length >= 8
  );
}

export function buildMailtoHref(payload: ContactPayload, lang: Lang): string {
  const defaultSubject =
    lang === "es"
      ? `Contacto portafolio — ${payload.name.trim() || "Consulta"}`
      : `Portfolio inquiry — ${payload.name.trim() || "Contact"}`;
  const subject = payload.subject.trim() || defaultSubject;
  const body =
    lang === "es"
      ? `Hola Mariangel,\n\nSoy ${payload.name.trim()} (${payload.email.trim()}).\n\n${payload.message.trim()}`
      : `Hi Mariangel,\n\nI'm ${payload.name.trim()} (${payload.email.trim()}).\n\n${payload.message.trim()}`;

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsappHref(payload: ContactPayload, lang: Lang): string {
  const header =
    lang === "es"
      ? "Nuevo mensaje desde tu portafolio web"
      : "New message from your web portfolio";
  const nameLabel = lang === "es" ? "Nombre" : "Name";
  const emailLabel = lang === "es" ? "Correo" : "Email";
  const subjectLabel = lang === "es" ? "Asunto" : "Subject";
  const messageLabel = lang === "es" ? "Mensaje" : "Message";

  const lines = [
    header,
    "",
    `*${nameLabel}:* ${payload.name.trim()}`,
    `*${emailLabel}:* ${payload.email.trim()}`,
  ];
  if (payload.subject.trim()) {
    lines.push(`*${subjectLabel}:* ${payload.subject.trim()}`);
  }
  lines.push(`*${messageLabel}:* ${payload.message.trim()}`);

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
