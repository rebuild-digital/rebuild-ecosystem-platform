import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js";
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

      <h1 class="text-4xl md:text-5xl font-normal text-dark mb-xl">
        Insights
      </h1>

      <Suspense>
        <div
          class="columns-1 md:columns-2 lg:columns-3 pb-6xl"
          style="column-gap: 1.5rem"
        >
          <For each={data() ?? []}>
            {(insight) => (
              <div class="break-inside-avoid mb-lg">
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
                      class="w-full h-auto mb-md"
                    />
                  </Show>
                  <Show when={insight.tags.length > 0}>
                    <div class="flex flex-wrap gap-xs mb-xs">
                      <For each={insight.tags}>
                        {(tag) => (
                          <span class="text-xs text-darker">{tag}</span>
                        )}
                      </For>
                    </div>
                  </Show>
                  <h2 class="text-xl md:text-2xl font-normal text-dark group-hover:underline transition-fast mb-xs">
                    {insight.title}
                  </h2>
                  <p class="text-sm text-darker mb-xs">{insight.excerpt}</p>
                  <p class="text-xs text-muted">
                    {insight.author} · {formatDate(insight.date)}
                  </p>
                </a>
              </div>
            )}
          </For>
        </div>

        <Show when={(data() ?? []).length === 0}>
          <p class="text-lg text-darker py-xl">No insights yet.</p>
        </Show>
      </Suspense>
    </>
  );
}
