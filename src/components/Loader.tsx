/**
 * Three-step dot loader (see DESIGN.md → Loading states).
 * Dots light up one after another; static under reduced motion.
 * Pass `decorative` when a visible label already says what is happening
 * (e.g. inside a "Submitting" button) so screen readers don't hear it twice.
 */
export default function Loader(props: {
  label?: string;
  decorative?: boolean;
  class?: string;
}) {
  return (
    <span
      class={`loader inline-flex items-center gap-xxs ${props.class ?? ""}`}
      role={props.decorative ? undefined : "status"}
      aria-hidden={props.decorative ? "true" : undefined}
    >
      <span class="loader-dot" />
      <span class="loader-dot" />
      <span class="loader-dot" />
      {!props.decorative && <span class="sr-only">{props.label ?? "Loading…"}</span>}
    </span>
  );
}
