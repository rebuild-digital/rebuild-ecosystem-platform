import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js";
import PageHeader from "~/components/PageHeader";
import { getAllInsights } from "~/data/insights";

const getInsightsData = cache(async () => {
  "use server";
  const insights = await getAllInsights();
  return insights.map((i) => ({
    url: i.url,
    title: i.title,
    featured_image: i.featured_image,
  }));
}, "insights-data");

export const route = {
  load: () => getInsightsData(),
};

export default function InsightsListing() {
  const data = createAsync(() => getInsightsData());

  return (
    <>
      <Title>Insights — Rebuild</Title>
      <Meta
        name="description"
        content="Insights, stories, and frameworks from European social platform builders."
      />

      <PageHeader
        title="Insights"
        description="Our growing library of insights. Stories from early founders, current entrepreneurs, and insights from the Rebuild journey."
      />

      <Suspense>
        <div
          class="columns-1 md:columns-2 lg:columns-3 pb-6xl"
          style="column-gap: 1.5rem"
        >
          <For each={data() ?? []}>
            {(insight) => (
              <article class="overflow-hidden mb-xl break-inside-avoid">
                <Show when={insight.featured_image}>
                  <a href={insight.url}>
                    <img
                      src={insight.featured_image}
                      alt={insight.title}
                      loading="lazy"
                      class="w-full object-cover"
                    />
                  </a>
                </Show>
                <div class="mt-md">
                  <h3 class="text-xl lg:text-3xl">
                    <a
                      href={insight.url}
                      class="text-dark no-underline hover:underline"
                    >
                      {insight.title}
                    </a>
                  </h3>
                </div>
              </article>
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
