import { For, Show } from "solid-js";

export interface DirectoryPlatform {
  name: string;
  link: string;
  category: string[];
}

export interface DirectoryPreviewProps {
  platforms: DirectoryPlatform[];
  totalCount: number;
}

export default function DirectoryPreview(props: DirectoryPreviewProps) {
  const displayPlatforms = () => props.platforms.slice(0, 10);

  return (
    <section
      class="relative w-full py-4xl"
      style={{
        "margin-left": "calc(-50vw + 50%)",
        "margin-right": "calc(-50vw + 50%)",
        width: "100vw",
        "background-color": "rgba(107, 161, 204, 0.1)",
      }}
    >
      <div class="max-w-[1400px] mx-auto px-md">
        <div class="flex justify-between flex-col md:flex-row gap-lg md:gap-md md:items-center mb-2xl">
          <div>
            <h2 class="text-4xl md:text-5xl font-normal text-dark">
              Social Platform Directory
            </h2>
            <p class="text-dark text-sm mt-4">
              Latest count: {props.totalCount} platforms
            </p>
          </div>
          <a
            href="/directory/"
            class="text-lg md:text-2xl text-dark hover:underline transition-fast"
          >
            View all
          </a>
        </div>

        <Show
          when={displayPlatforms().length > 0}
          fallback={
            <div class="py-xl">
              <p class="text-lg text-dark">
                No platforms available. Total platforms: {props.totalCount}
              </p>
            </div>
          }
        >
          <div class="space-y-0">
            <For each={displayPlatforms()}>
              {(platform) => (
                <div class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-dark py-sm">
                  <h3 class="text-2xl md:mb-0 md:text-4xl font-normal text-dark">
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline transition-fast break-all"
                    >
                      {platform.name}
                    </a>
                  </h3>
                  <div class="flex flex-wrap md:justify-end gap-xs">
                    <For each={platform.category}>
                      {(cat, i) => (
                        <span class="text-sm text-dark">
                          {cat}
                          {i() < platform.category.length - 1 ? ", " : ""}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <div class="mt-xl md:mt-3xl flex flex-col md:flex-row justify-end items-start md:items-center gap-lg">
          <div class="flex gap-sm md:gap-md">
            <button
              data-form="builder-application"
              class="inline-block px-sm md:px-lg py-xs md:py-md bg-dark border-2 border-dark text-light hover:underline transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue cursor-pointer"
            >
              Join the directory
            </button>
            <button
              data-form="builder-promo"
              class="inline-block px-sm md:px-lg py-xs md:py-md bg-transparent border-2 border-dark text-dark hover:underline transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue cursor-pointer"
            >
              Suggest a platform
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
