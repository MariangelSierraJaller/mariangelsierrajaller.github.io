import { createSignal, onMount, type Accessor } from "solid-js";

export function useHydrated(): Accessor<boolean> {
  const [hydrated, setHydrated] = createSignal(false);
  onMount(() => setHydrated(true));
  return hydrated;
}
