import { For, Show } from "solid-js";

export interface InsightPreviewItem {
  url: string;
  title: string;
  featured_image?: string;
}

export interface InsightsPreviewProps {
  insights: InsightPreviewItem[];
}

export default function InsightsPreview(props: InsightsPreviewProps) {
  return (
    <section>
      <div class="max-w-max-width mx-auto px-md">
        <div class="flex justify-between items-center mb-2xl">
          <h2 class="text-4xl md:text-5xl font-normal text-dark">Latest</h2>
        </div>

        <Show
          when={props.insights.length > 0}
          fallback={
            <p class="text-lg text-darker">No insights available yet.</p>
          }
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <For each={props.insights.slice(0, 3)}>
              {(insight) => (
                <a href={insight.url} class="group block no-underline">
                  <Show
                    when={insight.featured_image}
                    fallback={
                      <div class="w-full aspect-video bg-lighter mb-md" />
                    }
                  >
                    <img
                      src={insight.featured_image}
                      alt={insight.title}
                      class="w-full aspect-video object-cover mb-md"
                    />
                  </Show>
                  <h3 class="text-xl md:text-2xl font-normal text-dark group-hover:underline transition-rebuild">
                    {insight.title}
                  </h3>
                </a>
              )}
            </For>
          </div>
        </Show>
      </div>
    </section>
  );
}
