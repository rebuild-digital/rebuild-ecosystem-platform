import type { JSX, ParentProps } from "solid-js";
import { Show } from "solid-js";

/**
 * One expandable row, built on native <details>/<summary> so it works without
 * JS and the browser handles keyboard and expanded state. The +/− marker sits
 * at the start of the row (FAQ) or the end (progress board rows).
 * Put rows in a `divide-y-2 divide-dark border-2 border-dark` list.
 */
export default function AccordionItem(
  props: ParentProps<{
    summary: JSX.Element;
    marker?: "start" | "end";
    /** Classes for the summary row (padding, gap, alignment). */
    summaryClass?: string;
    class?: string;
  }>,
) {
  const marker = (
    <>
      <span
        class="text-3xl w-6 shrink-0 group-open:hidden"
        aria-hidden="true"
      >
        +
      </span>
      <span
        class="text-3xl w-6 shrink-0 hidden group-open:inline"
        aria-hidden="true"
      >
        −
      </span>
    </>
  );

  return (
    <details class={`group ${props.class ?? ""}`}>
      <summary
        class={`flex items-center cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-shade ${props.summaryClass ?? ""}`}
      >
        <Show when={props.marker !== "end"}>{marker}</Show>
        {props.summary}
        <Show when={props.marker === "end"}>{marker}</Show>
      </summary>
      {props.children}
    </details>
  );
}
