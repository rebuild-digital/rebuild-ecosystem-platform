import { Title, Meta } from "@solidjs/meta";
import { Show, For } from "solid-js";
import { events } from "~/data/events";
import ImageCredit from "~/components/ImageCredit";
import QuoteCarousel from "~/components/QuoteCarousel";
import FaqAccordion from "~/components/FaqAccordion";
import GatheringCountdown from "~/components/GatheringCountdown";
import Engage from "~/components/blocks/Engage";

const event = events.find((e) => e.id === "rebuild-2")!;

const quotes = [
  {
    text: "Getting to voice my appreciation [...] as well as sitting in a room full of 200 people who are not only dissenters but changemakers with a vision parallel to ours have been an emotional, activating experience.",
    author: "Participant at Rebuild 1",
  },
  {
    text: "[...] it felt like the kiss of a following wind to meet with more than 200 visionaries, builders, founders, experts, designers, developers and entrepreneurs to form an answer to one major question: How do we rebuild European social platforms?",
    author: "Participant at Rebuild 1",
  },
  {
    text: "It was one of the very few times that I was in an open heart space where people had not only a clear vision but also used their heads.",
    author: "Participant at Rebuild 1",
  },
];

export default function Rebuild2() {
  const isPast = () => new Date(event.endDate) < new Date();

  return (
    <>
      <Title>Rebuild 2 | Rebuild</Title>
      <Meta
        name="description"
        content="The second gathering for the people building Europe's future social platforms. Helsinki, Finland — Aug 30 to Sep 01, 2026."
      />
      <Meta property="og:title" content="Rebuild 2" />
      <Meta property="og:description" content="The second gathering for the people building Europe's future social platforms. Helsinki, Finland — Aug 30 to Sep 01, 2026." />

      {/* Hero header */}
      <section class="pt-xl pb-lg">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-md">
          <div>
            <h1 class="font-normal text-4xl md:text-5xl lg:text-7xl mb-xs">
              Rebuild 2
            </h1>
            <div class="flex gap-lg lg:gap-2xl">
              <p>Helsinki, Finland</p>
              <p>Aug 30 – Sep 01</p>
            </div>
          </div>
          <Show when={!isPast()}>
            <button
              data-form="gathering-invitation"
              class="w-fit align-bottom px-lg py-sm bg-blue text-dark sm:text-lg lg:text-2xl sm:w-auto sm:self-end sm:px-xl sm:py-md hover:bg-blue-tint hover:text-dark transition-all whitespace-nowrap cursor-pointer border-0"
            >
              Secure your spot
            </button>
          </Show>
        </div>
      </section>

      {/* Hero image */}
      <section class="pb-xl sm:pb-3xl">
        <div class="relative w-full aspect-auto md:aspect-video">
          <img
            src="/assets/images/helsinki.webp"
            alt="Helsinki, Finland"
            class="w-full h-full object-cover"
          />
          <ImageCredit credit="Kristaps Grundsteins" />
        </div>

        {/* Tagline + countdown */}
        <div class="mt-xl flex flex-col space-y-2xl lg:space-y-0 lg:flex-row justify-between">
          <h2 class="text-xl md:text-2xl xl:text-3xl max-w-[45ch] leading-tight font-normal">
            The second gathering for the people building Europe's future social
            platforms. The summer camp where we teach each other how to build,
            design, and scale social platforms.
          </h2>

          <Show when={!isPast()}>
            <div class="w-51">
              <p class="text-xs tracking-widest uppercase mb-sm">Opening in</p>
              <GatheringCountdown targetDate="2026-08-30T09:00:00Z" />
            </div>
          </Show>
        </div>
      </section>

      {/* Programme highlights */}
      <section
        class="py-xl sm:py-3xl"
        style={{
          "margin-left": "calc(-50vw + 50%)",
          "margin-right": "calc(-50vw + 50%)",
          width: "100vw",
          "background-color": "rgba(107, 161, 204, 0.1)",
        }}
      >
        <div class="max-w-max-width mx-auto px-md">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-3xl">
            <div class="space-y-2xl pr-lg">
              <h3 class="text-3xl mb-2xl">Programme highlights</h3>
              <For each={event.proofPoints}>
                {(point) => (
                  <div>
                    <h3 class="text-xl mb-sm">{point.headline}</h3>
                    <p class="text-base sm:text-lg">{point.description}</p>
                  </div>
                )}
              </For>
            </div>

            <div class="flex flex-col gap-sm">
              <img
                src="/assets/images/rebuild1-pic.webp"
                alt="Rebuild gathering"
                class="w-full object-cover"
                style="aspect-ratio: 1/1"
              />
              <img
                src="/assets/images/gatherings-main/gatherings-main-5.webp"
                alt="Social lunch from Rebuild 1"
                class="w-full object-cover hidden sm:block"
                style="aspect-ratio: 16/9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <QuoteCarousel quotes={quotes} interval={10000} />

      {/* FAQ */}
      <Show when={event.faq}>
        <section class="py-xl sm:py-3xl">
          <FaqAccordion items={event.faq!} contactEmail="team@rebuild.net" />
        </section>
      </Show>

      {/* Engage */}
      <section class="pb-3xl">
        <Engage />
      </section>
    </>
  );
}
