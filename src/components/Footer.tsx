import { For, Show } from "solid-js";
import site from "~/data/site";

export default function Footer() {
  return (
    <footer class="max-w-[800px] md:max-w-full lg:max-w-[1400px] mx-auto px-md pb-md">
      <div class="mx-auto pt-md">
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="flex flex-col">
            <div class="py-2 h-12">
              <img
                class="h-6 w-auto"
                src={site.logo}
                alt="Rebuild logo."
              />
            </div>
            <p class="text-sm">{site.description}</p>
          </div>

          {/* Navigation */}
          <nav
            class="flex text-sm flex-row gap-xl mt-xl lg:mt-0"
            aria-label="Footer Navigation"
          >
            <ul class="flex flex-col gap-sm md:gap-md list-none md:flex-wrap md:justify-top">
              <For each={site.main_navigation}>
                {(item) => (
                  <li>
                    <a
                      href={item.url}
                      class="text-dark hover:underline transition-fast"
                    >
                      {item.name}
                    </a>
                  </li>
                )}
              </For>
            </ul>
            <ul class="flex text-xs flex-col gap-sm list-none md:flex-wrap md:justify-top">
              <For each={site.second_navigation}>
                {(item) => (
                  <li>
                    <Show
                      when={item.clickable}
                      fallback={
                        <span
                          class="text-darker cursor-not-allowed"
                          aria-disabled="true"
                        >
                          {item.name}
                        </span>
                      }
                    >
                      <a
                        href={item.url}
                        class="hover:underline transition-fast"
                      >
                        {item.name}
                      </a>
                    </Show>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>
        <p class="text-dark text-xs mt-xl">
          &copy; {new Date().getFullYear()} {site.title} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
