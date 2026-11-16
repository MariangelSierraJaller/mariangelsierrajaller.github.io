import type { Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { SITE } from "@/content/shared/site";
import { WhatsAppBrandIcon } from "./BrandIcons";

export const WhatsAppButton: Component = () => {
  const { lang, copy } = useLanguage();
  const presetText = () =>
    lang() === "es"
      ? "Hola Mariangel, visité tu portafolio web y me gustaría conversar contigo."
      : "Hi Mariangel, I visited your portfolio and would like to connect with you.";

  const href = () =>
    `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(presetText())}`;

  return (
    <a
      href={href()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy().ui.whatsappFloatLabel}
      class="fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-[var(--color-on-whatsapp)] shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
    >
      <WhatsAppBrandIcon size={22} />
    </a>
  );
};
