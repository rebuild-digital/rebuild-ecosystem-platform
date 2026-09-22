import type { JSX, ParentProps } from "solid-js";
import { splitProps, Show, type ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const fullBleedStyle: JSX.CSSProperties = {
  "margin-left": "calc(-50vw + 50%)",
  "margin-right": "calc(-50vw + 50%)",
  width: "100vw",
};

type SectionProps = ParentProps<
  {
    fullBleed?: boolean;
    raw?: boolean;
    style?: JSX.CSSProperties;
    class?: string;
    as?: "section" | "div";
  } & Omit<ComponentProps<"section">, "style" | "class">
>;

export default function Section(props: SectionProps) {
  const [local, rest] = splitProps(props, [
    "fullBleed",
    "raw",
    "style",
    "class",
    "children",
    "as",
  ]);

  const outerStyle = () =>
    local.fullBleed
      ? { ...fullBleedStyle, ...local.style }
      : local.style;

  return (
    <Dynamic
      component={local.as ?? "section"}
      class={local.class}
      style={outerStyle()}
      {...rest}
    >
      <Show when={local.fullBleed && !local.raw} fallback={local.children}>
        <div class="max-w-max-width mx-auto px-md">{local.children}</div>
      </Show>
    </Dynamic>
  );
}
