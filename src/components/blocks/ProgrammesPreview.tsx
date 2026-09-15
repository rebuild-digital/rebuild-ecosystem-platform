import { For } from "solid-js";
import type { Programme } from "~/data/programmes";

export interface ProgrammesPreviewProps {
  programmes: Programme[];
}

export default function ProgrammesPreview(props: ProgrammesPreviewProps) {
  return (
    <section class="relative w-full py-xl md:py-3xl">
      <div class="max-w-[1400px] mx-auto">
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
            {(programme) => (
              <div class="programme-item flex flex-col md:flex-row md:items-center md:gap-0 gap-md">
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
