import { splitProps, type Component, type JSX } from "solid-js";

export const Textarea: Component<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <textarea
      {...rest}
      class={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition focus:border-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] sm:text-sm ${local.class ?? ""}`}
    />
  );
};
