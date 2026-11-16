import type { Component } from "solid-js";
import { useLanguage } from "@/context/language";

export const SkipLink: Component = () => {
  const { copy } = useLanguage();
  return (
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-on-primary)] focus:shadow-lg"
    >
      {copy().ui.skipToContent}
    </a>
  );
};
