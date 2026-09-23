import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { createSignal, createEffect, createMemo, onCleanup, Suspense, For, Show } from "solid-js";
import { getBuilders } from "~/data/builders";
import Badge from "~/components/Badge";
import Chip, { type ChipColor } from "~/components/Chip";
import { buttonClass } from "~/lib/buttonClass";

// One hue per category, shared by the filter chips and the card badges.
const CATEGORY_COLORS: Record<string, ChipColor> = {
  Bundled: "red",
  Community: "blue",
  Groups: "green",
  Networking: "orange",
  Messaging: "blue",
  Microblogging: "red",
  Forum: "red",
  Dating: "blush",
  Events: "orange",
  Location: "green",
  "Resource sharing": "blonde",
  "Photo sharing": "blush",
  "Video sharing": "blonde",
  "Creator platform": "blue",
  "Social marketplace": "orange",
  Other: "blonde",
};

const CATEGORY_ORDER = [
  "Bundled",
  "Social marketplace",
  "Creator platform",
  "Location",
  "Resource sharing",
  "Dating",
  "Networking",
  "Forum",
  "Messaging",
  "Groups",
  "Video sharing",
  "Photo sharing",
  "Microblogging",
  "Community",
  "Events",
  "Other",
];

function getCategoryColor(cat: string): ChipColor {
  return CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["Other"];
}

const getDirectoryData = cache(async () => {
  "use server";
  const builders = await getBuilders();
  return builders.map((b) => ({
    id: b.id,
    name: b.name,
    link: b.link,
    category: b.category,
    description: b.description,
    country: b.country,
  }));
}, "directory-data");

export const route = {
  load: () => getDirectoryData(),
};

export default function Directory() {
  const data = createAsync(() => getDirectoryData());
  const [activeCategories, setActiveCategories] = createSignal<string[]>([]);
  const [tooltipOpen, setTooltipOpen] = createSignal(false);

  const allCategories = createMemo(() => {
    const cats = new Set<string>();
    for (const b of data() ?? []) {
      for (const c of b.category) cats.add(c);
    }
    return [...cats].sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });
  });

  const filtered = createMemo(() => {
    const active = activeCategories();
    const all = data() ?? [];
    if (active.length === 0) return all;
    return all.filter((b) => b.category.some((c) => active.includes(c)));
  });

  createEffect(() => {
    if (!tooltipOpen()) return;
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setTooltipOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    onCleanup(() => document.removeEventListener("keydown", handleKeydown));
  });

  function toggleCategory(cat: string) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  return (
    <>
      <Title>Directory — Rebuild</Title>
      <Meta
        name="description"
        content="We are mapping all the social platforms in Europe. This directory is growing every day based on input from people all around Europe."
      />
      <Meta property="og:title" content="Directory" />
      <Meta property="og:description" content="We are mapping all the social platforms in Europe. This directory is growing every day based on input from people all around Europe." />

      <div class="mb-3xl">
        {/* Header */}
        <section class="md:pt-xl mb-lg lg:mb-4xl">
          <div class="flex flex-col lg:flex-row gap-md">
            {/* Title + tooltip */}
            <div class="flex-col lg:w-1/2">
              <h1 class="font-normal mb-sm lg:mb-0 text-4xl md:text-5xl lg:text-6xl">
                Directory
              </h1>
              <div class="relative mt-md">
                <button
                  class="inline-flex items-center gap-xs text-lg text-dark hover:underline cursor-pointer"
                  aria-label="Show more information"
                  aria-expanded={tooltipOpen()}
                  aria-controls="info-tooltip"
                  onClick={() => setTooltipOpen((v) => !v)}
                >
                  <span class="text-xl leading-none" aria-hidden="true">ⓘ</span>
                  <span>What is this?</span>
                </button>
                <Show when={tooltipOpen()}>
                  <div
                    id="info-tooltip"
                    class="absolute top-full left-0 mt-xs z-10 bg-light border-2 border-dark p-md"
                  >
                    <div class="flex lg:w-[55ch] flex-col gap-md text-lg leading-tight text-dark">
                      <p>
                        We are mapping all the social platforms in Europe. Our
                        directory is growing based on input from people all
                        around Europe. It is a collective piece of work. The
                        platforms mapped are here because someone told us about
                        their existence or directed us to a list, where they
                        were mentioned. All are mapped as precisely as possible
                        based on publicly available information.
                      </p>
                      <p>
                        Is there a platform we should know about, or some
                        information that should be adjusted? Let us know
                      </p>
                    </div>
                  </div>
                </Show>
              </div>
            </div>

            {/* CTAs */}
            <div class="flex lg:justify-end items-start lg:w-1/2">
              <div class="flex flex-col gap-sm">
                <button
                  data-form="builder-application"
                  class={buttonClass({ size: "lg" })}
                >
                  Join the directory
                </button>
                <button
                  data-form="builder-promo"
                  class={buttonClass({ variant: "secondary", size: "lg" })}
                >
                  Suggest a platform
                </button>
              </div>
            </div>
          </div>
        </section>

        <Suspense>
          {/* Filters */}
          <section class="mt-xl">
            <div class="w-full lg:w-2/3">
              <p class="text-sm text-darker">Filter by category</p>
              <Show when={allCategories().length > 0}>
                <div class="mt-lg mb-lg" id="category-filters-wrapper">
                  <div class="flex gap-xs flex-wrap" id="category-filters">
                    <For each={allCategories()}>
                      {(cat) => (
                        <Chip
                          variant="filled"
                          size="lg"
                          color={getCategoryColor(cat)}
                          active={activeCategories().includes(cat)}
                          onToggle={() => toggleCategory(cat)}
                        >
                          {cat}
                        </Chip>
                      )}
                    </For>
                  </div>
                </div>
              </Show>
            </div>
          </section>

          {/* Masonry grid */}
          <section class="mt-0 mb-xl">
            <Show
              when={(data() ?? []).length > 0}
              fallback={
                <p class="text-lg text-darker py-xl">
                  No platforms available. This is definitely an error.
                </p>
              }
            >
              <div
                class="columns-1 md:columns-2 lg:columns-3"
                style="column-gap: 0.5rem;"
              >
                <For each={filtered()}>
                  {(builder) => (
                    <div class="break-inside-avoid mb-xs">
                      <div class="bg-white space-y-md p-5 lg:p-md rounded border-2">
                        {/* Name + URL */}
                        <div class="builder-row-header">
                          <h3 class="text-xl lg:text-2xl">
                            <Show
                              when={builder.link}
                              fallback={
                                <span class="text-dark break-all">
                                  {builder.name}
                                </span>
                              }
                            >
                              <a
                                href={builder.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-dark break-all"
                              >
                                {builder.name}
                              </a>
                            </Show>
                          </h3>
                          <Show when={builder.link}>
                            <div>
                              <a
                                href={builder.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-dark text-xs hover:underline break-all"
                              >
                                {builder.link}
                              </a>
                            </div>
                          </Show>
                        </div>

                        {/* Description */}
                        <Show when={builder.description}>
                          <div class="text-base max-w-[55ch] leading-relaxed">
                            <p>{builder.description}</p>
                          </div>
                        </Show>

                        {/* Category badges + country */}
                        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-xs lg:gap-0">
                          <Show when={builder.category.length > 0}>
                            <div class="flex gap-xs flex-wrap">
                              <For each={builder.category}>
                                {(cat) => (
                                  <Badge color={getCategoryColor(cat)} size="md">
                                    {cat}
                                  </Badge>
                                )}
                              </For>
                            </div>
                          </Show>
                          <Show
                            when={
                              builder.country && builder.country.length > 0
                            }
                          >
                            <Badge color="lighter" size="md">
                              {builder.country.join(", ")}
                            </Badge>
                          </Show>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
                <Show
                  when={
                    filtered().length === 0 && (data() ?? []).length > 0
                  }
                >
                  <p class="text-lg text-darker py-xl">
                    No platforms match the selected filters.
                  </p>
                </Show>
              </div>
            </Show>
          </section>
        </Suspense>
      </div>
    </>
  );
}
