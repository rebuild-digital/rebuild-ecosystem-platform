import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { createSignal, createMemo, Suspense, For, Show } from "solid-js";
import { getAllInsights } from "~/data/insights";

const getInsightsData = cache(async () => {
  "use server";
  const insights = await getAllInsights();
  return insights.map((i) => ({
    slug: i.slug,
    url: i.url,
    title: i.title,
    date: i.date,
    author: i.author,
    tags: i.tags,
    excerpt: i.excerpt,
    featured_image: i.featured_image,
  }));
}, "insights-data");

export const route = {
  load: () => getInsightsData(),
};

export default function InsightsListing() {
  const data = createAsync(() => getInsightsData());
  const [activeTags, setActiveTags] = createSignal<string[]>([]);

  const allTags = createMemo(() => {
    const tags = new Set<string>();
    for (const i of data() ?? []) {
      for (const t of i.tags) tags.add(t);
    }
    return [...tags].sort();
  });

  const filtered = createMemo(() => {
    const active = activeTags();
    const all = data() ?? [];
    if (active.length === 0) return all;
    return all.filter((i) => i.tags.some((t) => active.includes(t)));
  });

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setActiveTags([]);
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <Title>Insights — Rebuild</Title>
      <Meta
        name="description"
        content="Insights, stories, and frameworks from European social platform builders."
      />

      <h1 class="text-4xl md:text-5xl font-normal text-dark mb-md">
        Insights
      </h1>
      <p class="text-darker mb-xl">
        {filtered().length} article{filtered().length !== 1 ? "s" : ""}
        <Show when={activeTags().length > 0}>
          {" "}
          (of {(data() ?? []).length} total)
        </Show>
      </p>

      <Suspense>
        <Show when={allTags().length > 0}>
          <div class="mb-2xl">
            <div class="flex flex-wrap gap-xs">
              <For each={allTags()}>
                {(tag) => (
                  <button
                    class="filter-button"
                    classList={{
                      "bg-dark! text-light!": activeTags().includes(tag),
                    }}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={activeTags().includes(tag)}
                  >
                    {tag}
                    <Show when={activeTags().includes(tag)}>
                      <span class="filter-x" aria-hidden="true">
                        ×
                      </span>
                    </Show>
                  </button>
                )}
              </For>
              <Show when={activeTags().length > 0}>
                <button
                  class="filter-button border-transparent! text-darker hover:text-dark"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
              </Show>
            </div>
          </div>
        </Show>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-3xl">
          <For each={filtered()}>
            {(insight) => (
              <a href={insight.url} class="group block no-underline">
                <Show
                  when={insight.featured_image}
                  fallback={
                    <div class="w-full aspect-4/3 bg-lighter mb-md" />
                  }
                >
                  <img
                    src={insight.featured_image}
                    alt={insight.title}
                    loading="lazy"
                    class="w-full aspect-4/3 object-cover mb-md"
                  />
                </Show>
                <div class="flex flex-wrap gap-xs mb-xs">
                  <For each={insight.tags}>
                    {(tag) => (
                      <span class="text-xs text-darker">{tag}</span>
                    )}
                  </For>
                </div>
                <h2 class="text-xl md:text-2xl font-normal text-dark group-hover:underline transition-fast mb-xs">
                  {insight.title}
                </h2>
                <p class="text-sm text-darker mb-xs">{insight.excerpt}</p>
                <p class="text-xs text-muted">
                  {insight.author} · {formatDate(insight.date)}
                </p>
              </a>
            )}
          </For>
        </div>

        <Show when={filtered().length === 0}>
          <p class="text-lg text-darker py-xl">
            No insights match the selected filters.
          </p>
        </Show>
      </Suspense>
    </>
  );
}
