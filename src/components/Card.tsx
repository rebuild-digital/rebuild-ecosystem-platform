import type { JSX, ParentProps } from "solid-js";
import { splitProps, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { srcSet } from "~/lib/images";

type CardVariant = "outlined" | "filled" | "plain";
type CardPadding = "none" | "md" | "responsive";

const variantMap: Record<CardVariant, string> = {
  outlined: "bg-white border-2 border-dark",
  filled: "bg-lighter",
  plain: "",
};

const paddingMap: Record<CardPadding, string> = {
  none: "",
  md: "p-md",
  responsive: "p-5 lg:p-md",
};

type CardProps = ParentProps<
  {
    as?: "div" | "article" | "li" | "a";
    variant?: CardVariant;
    padding?: CardPadding;
    /** Soften the corners with the `sm` radius token (4px). */
    rounded?: boolean;
    class?: string;
  } & Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "class">
>;

/**
 * Shared card surface. Cards are shadowless and rectangular by default; pass
 * `rounded` for the soft 4px corner (see DESIGN.md §Card Component).
 */
export default function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
    "as",
    "variant",
    "padding",
    "rounded",
    "class",
    "children",
  ]);

  return (
    <Dynamic
      component={local.as ?? "div"}
      class={[
        variantMap[local.variant ?? "outlined"],
        paddingMap[local.padding ?? "none"],
        local.rounded && "rounded-sm",
        local.class,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
}

type CardMediaAspect = "video" | "square";
type CardMediaPlaceholder = "lighter" | "muted";

const aspectMap: Record<CardMediaAspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
};

const placeholderMap: Record<CardMediaPlaceholder, string> = {
  lighter: "bg-lighter",
  muted: "bg-muted",
};

/**
 * Image slot for cards: fixed aspect ratio, cover-cropped, lazy-loaded.
 * Adds a `srcset` automatically for images with web-sized variants (see
 * `srcSet` in `~/lib/images`); pass `sizes` to match the card's grid width.
 * Renders `fallback` in the same box when there is no `src`. Children are
 * layered on top of the image (e.g. `<ImageCredit>`).
 */
export function CardMedia(
  props: ParentProps<{
    src?: string;
    alt: string;
    sizes?: string;
    aspect?: CardMediaAspect;
    placeholder?: CardMediaPlaceholder;
    loading?: "lazy" | "eager";
    fallback?: JSX.Element;
    class?: string;
  }>,
) {
  return (
    <div
      class={`relative w-full overflow-hidden ${aspectMap[props.aspect ?? "video"]} ${placeholderMap[props.placeholder ?? "lighter"]} ${props.class ?? ""}`}
    >
      <Show when={props.src} fallback={props.fallback}>
        {(src) => (
          <img
            src={src()}
            srcset={srcSet(src())}
            sizes={props.sizes}
            alt={props.alt}
            loading={props.loading ?? "lazy"}
            class="w-full h-full object-cover"
          />
        )}
      </Show>
      {props.children}
    </div>
  );
}
