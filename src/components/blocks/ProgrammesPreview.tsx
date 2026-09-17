import { For, onMount, onCleanup } from "solid-js";
import type { Programme } from "~/data/programmes";

export interface ProgrammesPreviewProps {
  programmes: Programme[];
}

export default function ProgrammesPreview(props: ProgrammesPreviewProps) {
  onMount(() => {
    const items = document.querySelectorAll<HTMLElement>(".programme-item");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const index = parseInt(el.dataset.index ?? "0");
            setTimeout(() => {
              el.classList.add("programme-item-visible");
            }, index * 100);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    onCleanup(() => observer.disconnect());
  });

  return (
    <section class="relative w-full py-xl md:py-3xl">
      <div class="max-w-max-width mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start mb-4xl gap-lg">
          <h2 class="text-4xl md:text-5xl font-normal text-dark">Programmes</h2>
          <p class="text-lg md:text-lg text-dark max-w-[50ch]">
            Programmes build connections and momentum among key actors. Directing
            resources from one track to another. Talents to starts-ups, pioneers
            to board positions, investors to platforms.
          </p>
        </div>

        <div class="space-y-lg">
          <For each={props.programmes}>
            {(programme, i) => (
              <div
                class="programme-item flex flex-col md:flex-row md:items-center md:gap-0 gap-md"
                data-index={String(i())}
              >
                <div
                  class="shrink-0 px-md py-sm w-fit"
                  style={{ "background-color": programme.color }}
                >
                  <h3 class="text-xl md:text-2xl font-normal text-dark whitespace-nowrap">
                    {programme.title}
                  </h3>
                </div>
                <div
                  class="hidden md:block grow h-px mx-md"
                  style={{ "background-color": programme.color }}
                />
                <div class="shrink w-80">
                  <p class="text-sm md:text-lg text-dark">
                    {programme.description}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
