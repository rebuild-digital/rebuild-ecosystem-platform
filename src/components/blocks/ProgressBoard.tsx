import { For, Show, createUniqueId } from "solid-js";
import Section from "~/components/Section";
import Card, { CardMedia } from "~/components/Card";
import Badge from "~/components/Badge";
import type { ProgressItem, ProgressStatus } from "~/lib/progressItems";

export interface ProgressBoardProps {
  title: string;
  intro?: string;
  items: ProgressItem[];
}

const STATUS: Record<
  ProgressStatus,
  { label: string; badge: "green" | "orange" | "lighter"; tint: string }
> = {
  done: { label: "Shipped", badge: "green", tint: "bg-green-light" },
  "in-progress": { label: "In progress", badge: "orange", tint: "bg-orange-light" },
  planned: { label: "Planned", badge: "lighter", tint: "bg-white" },
};

/**
 * A grid of outcomes, each marked done, in progress or planned. Items render
 * in the order given (see DESIGN.md §Progress board).
 */
export default function ProgressBoard(props: ProgressBoardProps) {
  const headingId = createUniqueId();

  return (
    <Section aria-labelledby={headingId}>
      <div class="mb-2xl space-y-sm">
        <h2 id={headingId} class="text-4xl md:text-5xl font-normal text-dark">
          {props.title}
        </h2>
        <Show when={props.intro}>
          <p class="text-lg md:text-xl text-dark max-w-[55ch]">{props.intro}</p>
        </Show>
      </div>

      <ol class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-md">
        <For each={props.items}>
          {(item, index) => {
            const status = () => STATUS[item.status];
            return (
              <li class="flex">
                <Card
                  as={item.href ? "a" : "div"}
                  href={item.href}
                  class="group flex flex-col w-full no-underline"
                >
                  <CardMedia
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
                    fallback={
                      <span
                        aria-hidden="true"
                        class={`absolute inset-0 flex items-end p-sm text-5xl leading-none text-dark ${status().tint}`}
                      >
                        {String(index() + 1).padStart(2, "0")}
                      </span>
                    }
                  >
                    <span
                      aria-hidden="true"
                      class="absolute top-sm right-sm size-lg flex items-center justify-center bg-white border-2 border-dark text-xl leading-none text-dark"
                    >
                      {item.status === "done" ? "✓" : ""}
                    </span>
                  </CardMedia>

                  <div class="flex flex-col flex-1 gap-sm p-sm border-t-2 border-dark">
                    <h3 class="text-xl font-normal text-dark group-hover:underline transition-rebuild">
                      {item.title}
                      <Show when={item.href}>
                        <span aria-hidden="true">{"\u00a0→"}</span>
                      </Show>
                    </h3>
                    <div class="mt-auto space-y-xs">
                      <Badge color={status().badge}>
                        {status().label}
                      </Badge>
                      <Show when={item.note}>
                        <p class="text-sm text-darker">{item.note}</p>
                      </Show>
                    </div>
                  </div>
                </Card>
              </li>
            );
          }}
        </For>
      </ol>
    </Section>
  );
}
