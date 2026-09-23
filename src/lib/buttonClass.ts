// Button styles from DESIGN.md §Buttons. Returned as a class string so the
// same look can go on a <button>, a data-form trigger, or an <a>.

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor = "dark" | "red" | "blue" | "green" | "orange" | "blush";

// Radius always matches size; line-height 1 so padding alone sets height.
const sizeMap: Record<ButtonSize, string> = {
  sm: "text-sm px-sm py-xs rounded-sm",
  md: "text-base px-md py-[10px] rounded-md",
  lg: "text-lg px-lg py-[14px] rounded-lg",
};

// Hover is gated on not-disabled so a disabled button doesn't react.
const primaryColorMap: Record<ButtonColor, string> = {
  dark: "bg-dark text-white hover:not-disabled:bg-darker",
  red: "bg-red text-white hover:not-disabled:bg-red-tint hover:not-disabled:text-dark",
  blue: "bg-blue text-dark hover:not-disabled:bg-blue-tint",
  green: "bg-green text-dark hover:not-disabled:bg-green-tint",
  orange: "bg-orange text-dark hover:not-disabled:bg-orange-tint",
  blush: "bg-blush text-dark hover:not-disabled:bg-blush-tint",
};

const secondaryClass = "bg-lighter text-dark hover:not-disabled:bg-light";

const baseClass =
  "inline-flex items-center justify-center text-center leading-none no-underline border-0 cursor-pointer transition-colors transition-rebuild focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-shade disabled:opacity-50 disabled:cursor-not-allowed";

export function buttonClass(opts: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  class?: string;
} = {}) {
  const variant = opts.variant ?? "primary";
  const colors =
    variant === "primary" ? primaryColorMap[opts.color ?? "dark"] : secondaryClass;
  return `${baseClass} ${sizeMap[opts.size ?? "md"]} ${colors} ${opts.class ?? ""}`.trim();
}
