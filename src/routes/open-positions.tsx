import { Title, Meta } from "@solidjs/meta";
import { For, Show } from "solid-js";
import { jobs } from "~/data/jobs";

export default function OpenPositions() {
  const activeJobs = () => jobs.filter((j) => j.active);

  return (
    <>
      <Title>Open positions | Rebuild</Title>
      <Meta
        name="description"
        content="Rebuild is a twelve-month sprint for European social platforms. We're always open for volunteers and people looking to contribute."
      />
      <Meta property="og:title" content="Open positions" />
      <Meta property="og:description" content="Rebuild is a twelve-month sprint for European social platforms. We're always open for volunteers and people looking to contribute." />

      <Show
        when={activeJobs().length > 0}
        fallback={
          <div class="pb-6xl">
            <h1 class="text-3xl md:text-4xl font-normal mb-lg">
              Open positions
            </h1>
            <p class="text-lg text-dark">
              No open positions at the moment. Check back soon or{" "}
              <a href="mailto:positions@rebuild.net" class="underline">
                get in touch
              </a>
              .
            </p>
          </div>
        }
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-3xl pb-6xl">
          <div>
            <h1 class="text-3xl md:text-4xl font-normal">Open positions</h1>
          </div>
          <div class="flex flex-col gap-xl">
            <For each={activeJobs()}>
              {(job) => (
                <div>
                  <h2 class="text-xl md:text-2xl font-normal mb-md">
                    {job.title}
                  </h2>
                  <div class="rich-text" innerHTML={job.content} />
                  <a
                    href={`mailto:positions@rebuild.net?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    class="inline-block mt-md border-2 border-dark bg-dark text-light px-md py-sm hover:bg-darker transition-fast no-underline"
                  >
                    Apply now
                  </a>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </>
  );
}
