import { For, Show, type Component } from "solid-js";

export interface TechListProps {
  items: readonly string[];
  limit?: number;
  class?: string;
}

export const TechList: Component<TechListProps> = (props) => {
  const visible = () =>
    typeof props.limit === "number" ? props.items.slice(0, props.limit) : props.items;
  const remaining = () =>
    typeof props.limit === "number" ? Math.max(0, props.items.length - props.limit) : 0;

  return (
    <ul class={`flex flex-wrap gap-2 ${props.class ?? ""}`}>
      <For each={visible()}>
        {(item) => <li class="tech-badge">{item}</li>}
      </For>
      <Show when={remaining() > 0}>
        <li class="tech-badge text-[var(--color-accent)]">+{remaining()}</li>
      </Show>
    </ul>
  );
};
