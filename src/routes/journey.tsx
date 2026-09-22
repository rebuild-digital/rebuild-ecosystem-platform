import { Title, Meta } from "@solidjs/meta";
import { For, Show } from "solid-js";
import HalfCircle from "~/components/blocks/HalfCircle";
import ProgrammesPreview from "~/components/blocks/ProgrammesPreview";
import ImageCredit from "~/components/ImageCredit";
import Section from "~/components/Section";
import { events } from "~/data/events";
import { programmes } from "~/data/programmes";

const bulletPoints = [
  "Each a 48-hour catalyst for the people building the next generation of social platforms in Europe.",
  "The first hands-on assemblies tailored 100% to Europe's future social platform entrepreneurs.",
  "Where the entrepreneurs, investors, pioneers and digital leaders come together to move things forward.",
  "A focused 48-hour format: arrive Sunday afternoon, build hard through Monday, wrap it all Tuesday afternoon with new partners, ideas, and action plans.",
];

const outcomes = [
  {
    headline: "Big Shift Day",
    description: "Where Europeans make a collective shift.",
  },
  {
    headline: "Industry organisation",
    description:
      "Dedicated to becoming the future driver of initiatives for the social platforms of Europe.",
  },
  {
    headline: "Annual Gathering",
    description: "Carrying forward the initiative to assemble yearly.",
  },
];

function isPast(dateStr: string) {
  return new Date(dateStr) < new Date();
}

export default function Journey() {
  return (
    <>
      <Title>Journey | Rebuild</Title>
      <Meta
        name="description"
        content="The core approach to catalysing social platforms in Europe"
      />
      <Meta property="og:title" content="Journey" />
      <Meta property="og:description" content="The core approach to catalysing social platforms in Europe" />

      {/* Page title */}
      <section class="pt-xl md:pb-2xl">
        <header class="mb-sm md:mb-xl text-center w-full">
          <h1 class="font-normal text-4xl md:text-5xl lg:text-6xl">Journey</h1>
        </header>
      </section>

      {/* Intro text */}
      <section class="pb-3xl md:pb-6xl">
        <p class="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[65ch]">
          The Rebuild journey is 12 months to support the new generation of
          social platforms. Through{" "}
          <strong>gatherings, programmes, and tools.</strong>
          <br />
          <br />
          When closing on 15 December 2026, Rebuild will have facilitated
          hundreds of defining new connections for rebuilding social platforms.
        </p>
      </section>

      {/* Diagram */}
      <section class="pb-4xl lg:pb-8xl">
        <div class="overflow-x-scroll md:overflow-hidden">
          <img
            src="/assets/images/kill-slide-graphic.webp"
            alt="The Rebuild approach in one diagram: gatherings, programmes and tools distributed on a one year timeline."
            class="w-full h-auto"
          />
        </div>
      </section>

      {/* Gatherings intro */}
      <section class="pb-3xl md:pb-6xl">
        <div class="mb-2xl md:mb-5xl">
          <h2 id="gatherings" class="text-3xl lg:text-8xl font-bold">
            The beginning.
            <br />
            The boost.
            <br />
            The shift.
          </h2>
          <p class="mt-lg text-xl">
            Three connected gatherings across Europe in 2026
          </p>
        </div>
        <div class="max-w-max-width mx-auto">
          <div class="flex flex-col gap-y-xl lg:gap-y-3xl">
            <For each={bulletPoints}>
              {(point) => (
                <div class="flex flex-row justify-start">
                  <div class="hidden lg:block w-20 h-20 rounded-full bg-dark shrink-0" />
                  <p class="md:text-3xl max-w-200 leading-tight ml-xl">
                    {point}
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Gathering sections — full-bleed, one per event */}
      <For each={events}>
        {(gathering) => (
          <Section
            fullBleed
            id={gathering.id}
            class="relative w-full py-2xl lg:py-4xl"
            style={{ "background-color": gathering.bgColor }}
          >
              {/* Header */}
              <div class="mb-2xl lg:mb-4xl">
                <div class="flex flex-col md:flex-row justify-between">
                  <h2 class="text-3xl lg:text-5xl mb-md font-normal">
                    {gathering.title}
                  </h2>
                  <div class="flex flex-col leading-tight lg:leading-none">
                    <p class="text-base m-0 md:text-lg">{gathering.location}</p>
                    <p class="text-base md:text-lg">
                      {new Date(gathering.startDate).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short" }
                      )}{" "}
                      -{" "}
                      {new Date(gathering.endDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image + proof points grid */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-xl mb-3xl md:mb-6xl">
                <div class="relative">
                  <img
                    src={gathering.image}
                    alt={`${gathering.title} in ${gathering.location}`}
                    class="w-full h-auto"
                  />
                  <Show when={gathering.imageCredit}>
                    <ImageCredit credit={gathering.imageCredit!} />
                  </Show>
                </div>

                <div class="space-y-lg lg:space-y-2xl mx-auto content-center">
                  <For each={gathering.proofPoints}>
                    {(point) => (
                      <div class="max-w-[55ch] mx-auto">
                        <h3 class="text-xl md:text-2xl mb-xs md:mb-sm underline">
                          {point.headline}
                        </h3>
                        <p class="text-base md:text-lg">{point.description}</p>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* CTA for upcoming gatherings */}
              <Show when={!isPast(gathering.endDate)}>
                <hr class="pt-lg lg:hidden" />
                <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-lg">
                  <div>
                    <p class="text-base md:text-lg">
                      {gathering.shortTitle} is happening in...
                    </p>
                  </div>
                  <div class="flex flex-col leading-none">
                    <p class="text-base mb-sm md:text-lg">
                      Want to be part of the gathering?
                    </p>
                    <a
                      href={gathering.cta.url}
                      {...(gathering.cta.dataForm
                        ? { "data-form": gathering.cta.dataForm }
                        : {})}
                      class="inline-block px-md py-sm text-center border-2 border-dark hover:bg-dark hover:text-light text-base md:text-lg transition-all no-underline"
                    >
                      {gathering.cta.text}
                    </a>
                  </div>
                </div>
              </Show>
          </Section>
        )}
      </For>

      {/* Programmes */}
      <section class="pb-3xl md:pb-6xl">
        <ProgrammesPreview programmes={programmes} />
      </section>

      {/* Outcomes */}
      <section class="pb-3xl md:pb-6xl relative w-full lg:py-3xl">
        <div class="max-w-max-width mx-auto">
          <h2 class="text-4xl md:text-5xl font-normal text-dark mb-lg lg:mb-3xl decoration-2 underline-offset-8">
            In the planning for the next chapter:
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <For each={outcomes}>
              {(outcome) => (
                <div>
                  <h3 class="text-xl md:text-2xl font-normal underline text-dark mb-md">
                    {outcome.headline}
                  </h3>
                  <p class="text-xl">{outcome.description}</p>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Half circle */}
      <section class="pb-4xl">
        <HalfCircle />
      </section>
    </>
  );
}
