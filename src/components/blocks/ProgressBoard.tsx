import { For, Show, createUniqueId } from "solid-js";
import Section from "~/components/Section";
import Card, { CardMedia } from "~/components/Card";
import Badge from "~/components/Badge";
import AccordionItem from "~/components/Accordion";
import type { ProgressColor, ProgressItem, ProgressStatus } from "~/lib/progressItems";

// A type, not an interface, so `props: shipping` fits BlockDefinition's
// Record<string, unknown>.
export type ProgressBoardProps = {
  title: string;
  intro?: string;
  items: ProgressItem[];
};

const STATUS: Record<
  ProgressStatus,
  { label: string; badge: "green" | "orange" | "lighter" }
> = {
  done: { label: "Shipped", badge: "green" },
  "in-progress": { label: "In progress", badge: "orange" },
  planned: { label: "Planned", badge: "lighter" },
};

/** Light stop behind the number when a tile has no image. */
const TILE_COLOR: Record<ProgressColor, string> = {
  red: "bg-red-light",
  blue: "bg-blue-light",
  green: "bg-green-light",
  blush: "bg-blush-light",
  blonde: "bg-blonde-light",
  orange: "bg-orange-light",
};

const hasDetails = (item: ProgressItem) =>
  Boolean(item.note || item.href || item.image);

/** Visual marker only; the status badge carries the meaning. */
function Checkbox(props: { done: boolean; class?: string }) {
  return (
    <span
      aria-hidden="true"
      class={`size-lg shrink-0 flex items-center justify-center bg-white border-2 border-dark text-xl leading-none text-dark ${props.class ?? ""}`}
    >
      {props.done ? "✓" : ""}
    </span>
  );
}

function StatusBadge(props: { status: ProgressStatus }) {
  return (
    <Badge color={STATUS[props.status].badge}>
      {STATUS[props.status].label}
    </Badge>
  );
}

/** Phone: a compact list; rows with a note, link or image expand. */
function ProgressRow(props: { item: ProgressItem }) {
  const summary = () => (
    <>
      <Checkbox done={props.item.status === "done"} />
      <span class="flex-1 min-w-0 space-y-xs">
        <span class="block text-lg leading-tight text-dark">
          {props.item.title}
        </span>
        <StatusBadge status={props.item.status} />
      </span>
    </>
  );
  const rowClass = "gap-sm p-sm";

  return (
    <Show
      when={hasDetails(props.item)}
      fallback={<div class={`flex items-center ${rowClass}`}>{summary()}</div>}
    >
      <AccordionItem marker="end" summaryClass={rowClass} summary={summary()}>
        <div class="pl-2xl pr-sm pb-sm space-y-sm">
          <Show when={props.item.image}>
            <CardMedia
              src={props.item.image}
              alt={props.item.imageAlt ?? ""}
              sizes="100vw"
            />
          </Show>
          <Show when={props.item.note}>
            <p class="text-base text-darker">{props.item.note}</p>
          </Show>
          <Show when={props.item.href}>
            <a
              href={props.item.href}
              class="inline-block text-lg text-dark underline hover:text-blue-shade transition-rebuild"
            >
              View {props.item.title}
              <span aria-hidden="true">{" →"}</span>
            </a>
          </Show>
        </div>
      </AccordionItem>
    </Show>
  );
}

/** Tablet and up: a tile grid. */
function ProgressTile(props: { item: ProgressItem; number: number }) {
  // No gap between tiles: the grid draws the top and left edges, and each
  // tile its right and bottom, so neighbouring borders don't double up. A
  // focused tile is lifted so its neighbours don't paint over the focus ring.
  return (
    <Card
      as={props.item.href ? "a" : "div"}
      href={props.item.href}
      variant="plain"
      class="group flex flex-col w-full no-underline bg-white border-r-2 border-b-2 border-dark focus-visible:relative focus-visible:z-10"
    >
      <CardMedia
        src={props.item.image}
        alt={props.item.imageAlt ?? ""}
        sizes="(min-width: 1280px) 20vw, 33vw"
        fallback={
          <span
            aria-hidden="true"
            class={`absolute inset-0 flex items-end p-md text-5xl leading-none text-dark ${TILE_COLOR[props.item.color ?? "blue"]}`}
          >
            {String(props.number).padStart(2, "0")}
          </span>
        }
      >
        <Checkbox
          done={props.item.status === "done"}
          class="absolute top-md right-md"
        />
      </CardMedia>

      <div class="flex flex-col flex-1 gap-sm p-md">
        <h3
          class="text-xl font-normal text-dark"
          classList={{ "group-hover:underline transition-rebuild": Boolean(props.item.href) }}
        >
          {props.item.title}
          <Show when={props.item.href}>
            <span aria-hidden="true">{" →"}</span>
          </Show>
        </h3>
        <div class="mt-auto space-y-xs">
          <StatusBadge status={props.item.status} />
          <Show when={props.item.note}>
            <p class="text-sm text-darker">{props.item.note}</p>
          </Show>
        </div>
      </div>
    </Card>
  );
}

/**
 * A set of outcomes, each marked done, in progress or planned, in the order
 * given: a compact list on phones, a tile grid from `md` (see DESIGN.md
 * §Progress board). Both render on the server; CSS shows one of them.
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

      <ol class="md:hidden border-2 border-dark divide-y-2 divide-dark">
        <For each={props.items}>
          {(item) => (
            <li>
              <ProgressRow item={item} />
            </li>
          )}
        </For>
      </ol>

      <ol class="hidden md:grid md:grid-cols-3 xl:grid-cols-5 border-t-2 border-l-2 border-dark">
        <For each={props.items}>
          {(item, index) => (
            <li class="flex">
              <ProgressTile item={item} number={index() + 1} />
            </li>
          )}
        </For>
      </ol>
    </Section>
  );
}
