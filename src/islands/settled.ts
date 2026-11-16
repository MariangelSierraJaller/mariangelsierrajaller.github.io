import type { ClientDirective } from "astro";

interface SettledOptions {
  rootMargin?: string;
}

function waitForSettled(cb: () => void): void {
  const scheduleIdle = () => {
    const idle = (
      window as unknown as {
        requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (typeof idle === "function") {
      idle(cb, { timeout: 250 });
    } else {
      window.setTimeout(cb, 16);
    }
  };

  if (document.readyState !== "loading") {
    requestAnimationFrame(scheduleIdle);
  } else {
    document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(scheduleIdle), {
      once: true,
    });
  }
}

const settledDirective: ClientDirective = (load, opts, el) => {
  const options = (opts.value ?? {}) as SettledOptions;
  let hydrated = false;
  let observer: IntersectionObserver | null = null;

  const onTouchOrPointer = () => {
    void trigger();
  };

  const trigger = async () => {
    if (hydrated) return;
    hydrated = true;
    observer?.disconnect();
    observer = null;
    if (el instanceof Element) {
      el.removeEventListener("pointerdown", onTouchOrPointer);
      el.removeEventListener("touchstart", onTouchOrPointer);
    }
    const hydrate = await load();
    await hydrate();
  };

  if (el instanceof Element) {
    el.addEventListener("pointerdown", onTouchOrPointer, { once: true, passive: true });
    el.addEventListener("touchstart", onTouchOrPointer, { once: true, passive: true });
  }

  waitForSettled(() => {
    if (hydrated) return;
    if (
      options.rootMargin &&
      typeof IntersectionObserver !== "undefined" &&
      el instanceof Element
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            void trigger();
          }
        },
        { rootMargin: options.rootMargin },
      );
      observer.observe(el);
      return;
    }
    void trigger();
  });
};

export default settledDirective;
