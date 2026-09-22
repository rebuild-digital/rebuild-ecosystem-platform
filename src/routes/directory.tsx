import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { createSignal, createMemo, Suspense, For, Show } from "solid-js";
import { getBuilders } from "~/data/builders";
import Badge from "~/components/Badge";

type BadgeColor = "red" | "blue" | "green" | "orange" | "blush" | "blonde" | "dark" | "lighter";

const CATEGORY_COLORS: Record<string, { badge: BadgeColor; bg: string; text: string }> = {
  Bundled: { badge: "red", bg: "bg-red-tint", text: "text-dark" },
  Community: { badge: "blue", bg: "bg-blue-tint", text: "text-dark" },
  Groups: { badge: "green", bg: "bg-green-tint", text: "text-dark" },
  Networking: { badge: "orange", bg: "bg-orange-tint", text: "text-dark" },
  Messaging: { badge: "blue", bg: "bg-blue-tint", text: "text-dark" },
  Microblogging: { badge: "red", bg: "bg-red-tint", text: "text-dark" },
  Forum: { badge: "red", bg: "bg-red-tint", text: "text-dark" },
  Dating: { badge: "blush", bg: "bg-blush-tint", text: "text-dark" },
  Events: { badge: "orange", bg: "bg-orange-tint", text: "text-dark" },
  Location: { badge: "green", bg: "bg-green-tint", text: "text-dark" },
  "Resource sharing": { badge: "blonde", bg: "bg-blonde-tint", text: "text-dark" },
  "Photo sharing": { badge: "blush", bg: "bg-blush-tint", text: "text-dark" },
  "Video sharing": { badge: "blonde", bg: "bg-blonde-tint", text: "text-dark" },
  "Creator platform": { badge: "blue", bg: "bg-blue-tint", text: "text-dark" },
  "Social marketplace": { badge: "orange", bg: "bg-orange-tint", text: "text-dark" },
  Other: { badge: "blonde", bg: "bg-blonde-tint", text: "text-dark" },
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

function getCategoryColors(cat: string) {
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
            <div class="flex justify-end gap-sm md:gap-md md:w-1/2 h-16 md:h-20 leading-tight">
              <button
                data-form="builder-application"
                class="inline-block px-sm md:px-lg py-xs bg-dark text-light hover:bg-darker transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue cursor-pointer"
              >
                Join the directory
              </button>
              <button
                data-form="builder-promo"
                class="inline-block px-sm md:px-lg py-xs md:py-md bg-light hover:bg-lighter text-dark transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue cursor-pointer"
              >
                Suggest a platform
              </button>
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
                      {(cat) => {
                        const colors = getCategoryColors(cat);
                        const isActive = () => activeCategories().includes(cat);
                        return (
                          <button
                            class={`filter-button${isActive() ? ` ${colors.bg} ${colors.text}` : ""}`}
                            onClick={() => toggleCategory(cat)}
                            aria-pressed={isActive()}
                          >
                            <span>{cat}</span>
                            <Show when={isActive()}>
                              <span class="filter-x" aria-hidden="true">
                                ✕
                              </span>
                            </Show>
                          </button>
                        );
                      }}
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
                                {(cat) => {
                                  const colors = getCategoryColors(cat);
                                  return (
                                    <Badge color={colors.badge} size="sm">
                                      {cat}
                                    </Badge>
                                  );
                                }}
                              </For>
                            </div>
                          </Show>
                          <Show
                            when={
                              builder.country && builder.country.length > 0
                            }
                          >
                            <Badge color="lighter" size="sm">
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
