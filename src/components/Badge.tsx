import type { JSX } from "solid-js";

type BadgeColor =
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "blush"
  | "blonde"
  | "dark"
  | "lighter";

type BadgeSize = "sm" | "md" | "lg";

const colorMap: Record<BadgeColor, { bg: string; text: string }> = {
  red: { bg: "bg-red-tint", text: "text-dark" },
  blue: { bg: "bg-blue-tint", text: "text-dark" },
  green: { bg: "bg-green-tint", text: "text-dark" },
  orange: { bg: "bg-orange-tint", text: "text-dark" },
  blush: { bg: "bg-blush-tint", text: "text-dark" },
  blonde: { bg: "bg-blonde-tint", text: "text-dark" },
  dark: { bg: "bg-dark", text: "text-white" },
  lighter: { bg: "bg-lighter", text: "text-dark" },
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "text-xs px-xs py-[4px]",
  md: "text-sm px-3 py-[6px]",
  lg: "text-base px-sm py-xs",
};

export default function Badge(props: {
  color?: BadgeColor;
  size?: BadgeSize;
  children: JSX.Element;
  class?: string;
}) {
  const colors = () => colorMap[props.color ?? "lighter"];
  const size = () => sizeMap[props.size ?? "md"];

  return (
    <span
      class={`inline-block rounded-full whitespace-nowrap leading-[1.2] ${colors().bg} ${colors().text} ${size()} ${props.class ?? ""}`}
    >
      {props.children}
    </span>
  );
}
