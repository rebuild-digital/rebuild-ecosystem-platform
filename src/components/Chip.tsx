import { Show } from "solid-js";
import type { JSX } from "solid-js";

export type ChipColor =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "blush"
  | "blonde";

type ChipSize = "sm" | "md" | "lg";

type ChipVariant = "outlined" | "filled";

const sizeMap: Record<ChipSize, string> = {
  sm: "text-xs px-sm py-[4px]",
  md: "text-sm px-sm py-[6px]",
  lg: "text-base px-md py-xs",
};

// Filled: -light default, -tint hover, base when active. Active text follows
// the DESIGN.md contrast table (white on red, dark everywhere else).
const filledColorMap: Record<
  ChipColor,
  { base: string; hover: string; active: string; activeText: string }
> = {
  red: { base: "bg-red-light", hover: "hover:bg-red-tint", active: "bg-red", activeText: "text-white" },
  blue: { base: "bg-blue-light", hover: "hover:bg-blue-tint", active: "bg-blue", activeText: "text-dark" },
  green: { base: "bg-green-light", hover: "hover:bg-green-tint", active: "bg-green", activeText: "text-dark" },
  orange: { base: "bg-orange-light", hover: "hover:bg-orange-tint", active: "bg-orange", activeText: "text-dark" },
  blush: { base: "bg-blush-light", hover: "hover:bg-blush-tint", active: "bg-blush", activeText: "text-dark" },
  blonde: { base: "bg-blonde-light", hover: "hover:bg-blonde-tint", active: "bg-blonde", activeText: "text-dark" },
};

export default function Chip(props: {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  active?: boolean;
  onToggle?: () => void;
  children: JSX.Element;
  class?: string;
}) {
  const variant = () => props.variant ?? "outlined";
  const size = () => sizeMap[props.size ?? "md"];

  const outlinedClasses = () => {
    if (props.active) {
      const color = props.color ?? "blue";
      return `${filledColorMap[color].base} border-2 border-dark text-dark`;
    }
    return "bg-white border-2 border-dark text-dark hover:bg-lighter";
  };

  const filledClasses = () => {
    const color = props.color ?? "blue";
    const map = filledColorMap[color];
    if (props.active) {
      return `${map.active} ${map.activeText} border-0`;
    }
    return `${map.base} ${map.hover} text-dark border-0`;
  };

  const classes = () =>
    variant() === "outlined" ? outlinedClasses() : filledClasses();

  return (
    <button
      type="button"
      class={`inline-flex items-center gap-xs rounded-full leading-none whitespace-nowrap cursor-pointer transition-colors transition-rebuild ${size()} ${classes()} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${props.class ?? ""}`}
      onClick={props.onToggle}
      aria-pressed={props.active}
    >
      <span>{props.children}</span>
      <Show when={props.active}>
        <span class="leading-none" aria-hidden="true">✕</span>
      </Show>
    </button>
  );
}
