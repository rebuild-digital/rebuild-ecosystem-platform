import { For, Show } from "solid-js";
import type { Gathering } from "~/data/gatherings";

export interface GatheringsPreviewProps {
  gatherings: Gathering[];
}

function ImageCredit(props: { credit: string }) {
  return (
    <div class="absolute bottom-0 left-0 bg-dark/50 text-white text-[10px] px-2 py-1 m-2">
      Photo by: {props.credit}
    </div>
  );
}

export default function GatheringsPreview(props: GatheringsPreviewProps) {
  return (
    <section
      class="relative w-full py-xl md:py-3xl"
      style={{
        "margin-left": "calc(-50vw + 50%)",
        "margin-right": "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      <div class="max-w-[1400px] mx-auto px-md">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-3xl lg:gap-lg mb-2xl">
          <For each={props.gatherings}>
            {(gathering) => (
              <div class="flex flex-col">
                <div class="relative">
                  <div class="relative h-[500px] overflow-hidden">
                    <img
                      src={gathering.image}
                      alt={gathering.title}
                      class="w-full h-full object-cover"
                      loading="lazy"
                      style={
                        gathering.status === "past"
                          ? { filter: "grayscale(100%)" }
                          : {}
                      }
                    />
                    <Show when={gathering.status === "past"}>
                      <div
                        class="absolute inset-0 mix-blend-multiply"
                        style={{
                          "background-color": gathering.titleColor,
                          opacity: "0.4",
                        }}
                      />
                    </Show>
                    <Show when={gathering.imageCredit}>
                      <ImageCredit credit={gathering.imageCredit!} />
                    </Show>
                  </div>
                  <div
                    class="absolute -top-md left-1/2 -translate-x-1/2 px-md py-sm z-10"
                    style={{ "background-color": gathering.titleColor }}
                  >
                    <h3
                      class="text-xl font-normal text-dark text-center whitespace-nowrap"
                      classList={{
                        "line-through": gathering.status === "past",
                      }}
                    >
                      {gathering.overlayText}
                    </h3>
                  </div>
                </div>

                <div class="mt-sm flex justify-between items-center text-sm md:text-md text-dark">
                  <span>{gathering.location}</span>
                  <span>
                    {gathering.startDate} - {gathering.endDate}
                  </span>
                </div>

                <Show when={gathering.ctaPrimary || gathering.ctaSecondary}>
                  <div class="mt-md flex flex-col sm:flex-row gap-xs">
                    <Show when={gathering.ctaPrimary}>
                      <a
                        href={gathering.ctaPrimary!.url}
                        class="flex-1 px-md py-sm text-center bg-dark text-light border-2 border-dark hover:bg-transparent hover:text-dark transition-all text-sm no-underline"
                      >
                        {gathering.ctaPrimary!.text}
                      </a>
                    </Show>
                    <Show when={gathering.ctaSecondary}>
                      <button
                        {...(gathering.ctaSecondary!.dataForm
                          ? { "data-form": gathering.ctaSecondary!.dataForm }
                          : {})}
                        class="flex-1 px-md py-sm text-center bg-transparent text-dark border-2 border-dark hover:bg-dark hover:text-light transition-all text-sm cursor-pointer"
                      >
                        {gathering.ctaSecondary!.text}
                      </button>
                    </Show>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
