/// <reference types="astro/client" />

declare const __BUILD_DATE__: string;
declare const __SITE_URL__: string;
declare const __APP_VERSION__: string;

declare module "@astrojs/solid-js/client.js" {
  const client: (
    element: HTMLElement,
  ) => (
    Component: unknown,
    props: Record<string, unknown>,
    slotted: Record<string, string>,
    options: { client: string; name?: string },
  ) => void;
  export default client;
}

