const readyParts = new Set<string>();

export function markIslandReady(part: string): void {
  readyParts.add(part);
  if (typeof document !== "undefined") {
    document.documentElement.dataset.readyParts = String(readyParts.size);
    if (part === "boot") {
      document.documentElement.dataset.hydrated = "true";
    }
  }
}

export function isIslandReady(part: string): boolean {
  return readyParts.has(part);
}
