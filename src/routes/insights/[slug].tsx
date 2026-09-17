import { Title, Meta } from "@solidjs/meta";
import { createAsync, cache, useParams } from "@solidjs/router";
import { For, Show, Suspense } from "solid-js";
import { getInsightBySlug } from "~/data/insights";

const getInsightData = cache(async (slug: string) => {
  "use server";
  const insight = await getInsightBySlug(slug);
  if (!insight) return null;
  return {
    title: insight.frontmatter.title,
    date: insight.frontmatter.date,
    author: insight.frontmatter.author,
    tags: insight.frontmatter.tags,
    excerpt: insight.frontmatter.excerpt,
    featured_image: insight.frontmatter.featured_image,
    featured_image_credit: insight.frontmatter.featured_image_credit,
    featured_image_credit_theme: insight.frontmatter.featured_image_credit_theme,
    html: insight.html,
  };
}, "insight-detail");

export const route = {
  load: ({ params }: { params: { slug: string } }) =>
    getInsightData(params.slug),
};

export default function InsightDetail() {
  const params = useParams<{ slug: string }>();
  const data = createAsync(() => getInsightData(params.slug));

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <Suspense>
      <Show
        when={data()}
        fallback={
          <div class="py-xl">
            <h1 class="text-4xl font-normal text-dark mb-md">Not found</h1>
            <p class="text-darker">This insight could not be found.</p>
            <a href="/insights/" class="text-dark underline mt-md inline-block">
              Back to insights
            </a>
          </div>
        }
      >
        {(insight) => (
          <>
            <Title>{insight().title} — Rebuild</Title>
            <Meta name="description" content={insight().excerpt} />
            <Meta property="og:title" content={insight().title} />
            <Meta property="og:description" content={insight().excerpt} />
            <Show when={insight().featured_image}>
              <Meta property="og:image" content={insight().featured_image!} />
            </Show>

            <article class="pb-2xl">
              <a
                href="/insights/"
                class="text-sm text-darker hover:text-dark underline mb-xl inline-block"
              >
                ← Back to insights
              </a>

              {/* Featured image — full container width, before title */}
              <Show when={insight().featured_image}>
                <div class="featured-image mb-xl w-full max-h-225 overflow-hidden relative">
                  <img
                    src={insight().featured_image}
                    alt={insight().title}
                    loading="lazy"
                    class="w-full h-auto object-cover"
                  />
                  <Show when={insight().featured_image_credit}>
                    <div
                      class="absolute bottom-0 left-0 px-2 py-1 m-2 text-[10px]"
                      classList={{
                        "bg-dark/50 text-white":
                          insight().featured_image_credit_theme !== "dark",
                        "bg-white/50 text-dark":
                          insight().featured_image_credit_theme === "dark",
                      }}
                    >
                      Photo by: {insight().featured_image_credit}
                    </div>
                  </Show>
                </div>
              </Show>

              <div class="mx-auto max-w-[75ch]">
                <header>
                  <h1 class="text-3xl md:text-5xl leading-none mb-md">
                    {insight().title}
                  </h1>

                  <div class="flex gap-md text-sm items-center mb-md text-darker">
                    <Show when={insight().date}>
                      <time>{formatDate(insight().date)}</time>
                    </Show>
                    <Show when={insight().author}>
                      <span>|</span>
                      <span>By {insight().author}</span>
                    </Show>
                  </div>

                  <Show when={insight().tags.length > 0}>
                    <div class="flex gap-xs flex-wrap mb-2xl">
                      <For each={insight().tags}>
                        {(tag) => (
                          <span class="p-xs bg-light border border-dark text-xs">
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>
                  </Show>
                </header>

                <div class="rich-text" innerHTML={insight().html} />
              </div>
            </article>
          </>
        )}
      </Show>
    </Suspense>
  );
}
