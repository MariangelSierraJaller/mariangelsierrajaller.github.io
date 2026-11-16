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
      idle(cb, { timeout: 600 });
    } else {
      window.setTimeout(cb, 32);
    }
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(scheduleIdle);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(scheduleIdle), {
      once: true,
    });
  }
}

const settledDirective: ClientDirective = (load, opts, el) => {
  const options = (opts.value ?? {}) as SettledOptions;
  let hydrated = false;

  const trigger = async () => {
    if (hydrated) return;
    hydrated = true;
    const hydrate = await load();
    await hydrate();
  };

  waitForSettled(() => {
    if (
      options.rootMargin &&
      typeof IntersectionObserver !== "undefined" &&
      el instanceof Element
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
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
