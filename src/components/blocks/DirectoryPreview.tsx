import { For, Show } from "solid-js";
import Section from "~/components/Section";
import { buttonClass } from "~/lib/buttonClass";

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
    <Section
      fullBleed
      class="relative w-full py-4xl bg-blue-light"
    >
        <div class="flex justify-between flex-col md:flex-row gap-lg md:gap-md md:items-center mb-2xl">
          <div>
            <h2 class="text-4xl md:text-5xl font-normal text-dark">
              Social Platform Directory
            </h2>
            <p class="text-dark text-sm mt-sm">
              Latest count: {props.totalCount} platforms
            </p>
          </div>
          <a
            href="/directory/"
            class="text-lg md:text-2xl text-dark hover:underline transition-rebuild"
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
                  <h3 class="text-xl md:mb-0 md:text-2xl font-normal text-dark">
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:underline transition-rebuild break-all"
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
          <div class="flex flex-wrap gap-sm md:gap-md">
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
    </Section>
  );
}
