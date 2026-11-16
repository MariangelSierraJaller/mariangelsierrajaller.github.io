import type { Component } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IslandComponent = Component<any>;

const registry = new Map<string, IslandComponent>();

export function registerPart(part: string, component: IslandComponent): void {
  registry.set(part, component);
}

export function registerParts(entries: Record<string, IslandComponent>): void {
  for (const [part, component] of Object.entries(entries)) {
    registry.set(part, component);
  }
}

export function registeredPart(part: string): IslandComponent | undefined {
  return registry.get(part);
}
