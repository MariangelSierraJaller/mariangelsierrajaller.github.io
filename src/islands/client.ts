import solidClient from "@astrojs/solid-js/client.js";

interface PreloadableComponent {
  preload?: (props: Record<string, unknown>) => Promise<void> | void;
}

export default function hydrateIsland(element: HTMLElement) {
  const mount = solidClient(element);
  return async (
    Component: unknown,
    props: Record<string, unknown>,
    slotted: Record<string, string>,
    options: { client: string; name?: string },
  ) => {
    const preloadable = Component as PreloadableComponent | null;
    if (preloadable && typeof preloadable.preload === "function") {
      await preloadable.preload(props);
    }

    const hy = (globalThis as { _$HY?: { done?: boolean } })._$HY;
    if (hy) {
      hy.done = false;
    }

    mount(Component, props, slotted, options);
  };
}
