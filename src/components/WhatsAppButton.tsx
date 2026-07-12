import { MessageCircle } from "lucide-react";
import { useLang } from "@/context/language-core";

const PHONE = "573242924705";

export default function WhatsAppButton() {
  const { lang } = useLang();

  const message =
    lang === "es"
      ? "Hola Mariangel, vi tu portafolio y me gustaría conversar sobre una oportunidad."
      : "Hi Mariangel, I saw your portfolio and I'd like to chat about an opportunity.";

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-110 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-30" />
      <span
        className="absolute -inset-1 rounded-full border border-primary/30 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </a>
  );
}
