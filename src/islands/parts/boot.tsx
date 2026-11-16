import { onCleanup, onMount, type Component } from "solid-js";
import { useLanguage } from "@/context/language";

export const BootIsland: Component = () => {
  const { lang } = useLanguage();

  onMount(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    try {
      localStorage.setItem("portfolio.lang", lang());
    } catch {
      // Storage unavailable
    }
    document.documentElement.dataset.hydrated = "true";

    const prefetched = new Set<string>();

    const maybePrefetch = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.hasAttribute("download") || anchor.target === "_blank") return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (url.pathname.endsWith(".pdf")) return;

      const key = `${url.pathname}${url.search}`;
      if (prefetched.has(key)) return;
      prefetched.add(key);

      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "document";
      link.href = key;
      document.head.appendChild(link);
    };

    const onPointerOver = (e: Event) => maybePrefetch(e.target);
    const onFocusIn = (e: Event) => maybePrefetch(e.target);

    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("focusin", onFocusIn, { passive: true });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    let observer: IntersectionObserver | null = null;

    if (sections.length > 0 && typeof IntersectionObserver !== "undefined") {
      const visibleRatios = new Map<string, number>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = (entry.target as HTMLElement).id;
            if (!id) continue;
            if (entry.isIntersecting) {
              visibleRatios.set(id, entry.intersectionRatio);
            } else {
              visibleRatios.delete(id);
            }
          }

          if (visibleRatios.size === 0) return;

          let topId = "";
          let topRatio = -1;
          for (const [id, ratio] of visibleRatios.entries()) {
            if (ratio > topRatio) {
              topRatio = ratio;
              topId = id;
            }
          }

          if (topId && document.documentElement.dataset.activeSection !== topId) {
            document.documentElement.dataset.activeSection = topId;
            window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: topId }));
          }
        },
        {
          rootMargin: "-18% 0px -52% 0px",
          threshold: [0.05, 0.25, 0.5],
        },
      );

      for (const section of sections) {
        observer.observe(section);
      }
    }

    onCleanup(() => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("focusin", onFocusIn);
      observer?.disconnect();
    });
  });

  return <span hidden aria-hidden="true" data-boot-island="true" />;
};
