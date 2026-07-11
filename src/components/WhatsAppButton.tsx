import { MessageCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5C] hover:shadow-xl"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
