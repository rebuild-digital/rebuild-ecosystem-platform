import { For, Show } from "solid-js";
import Card, { CardMedia } from "~/components/Card";

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
                <Card
                  as="a"
                  variant="plain"
                  href={insight.url}
                  class="group block no-underline"
                >
                  <CardMedia
                    src={insight.featured_image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt={insight.title}
                    class="mb-md"
                  />
                  <h3 class="text-xl md:text-2xl font-normal text-dark group-hover:underline transition-rebuild">
                    {insight.title}
                  </h3>
                </Card>
              )}
            </For>
          </div>
        </Show>
      </div>
    </section>
  );
}
