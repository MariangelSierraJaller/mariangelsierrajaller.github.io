import { splitProps, type Component, type JSX } from "solid-js";

export const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <input
      {...rest}
      class={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition focus:border-[var(--color-primary)] focus:outline-none ${local.class ?? ""}`}
    />
  );
};
