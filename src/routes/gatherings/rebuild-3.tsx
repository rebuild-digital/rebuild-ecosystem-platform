import { Title, Meta } from "@solidjs/meta";
import ImageCredit from "~/components/ImageCredit";
import QuoteCarousel from "~/components/QuoteCarousel";
import GatheringCountdown from "~/components/GatheringCountdown";

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

export default function Rebuild3() {
  return (
    <>
      <Title>Rebuild 3 | Rebuild</Title>
      <Meta
        name="description"
        content="The third gathering for the people building Europe's future social platforms."
      />
      <Meta property="og:title" content="Rebuild 3" />
      <Meta property="og:description" content="The third gathering for the people building Europe's future social platforms." />

      {/* Hero header */}
      <section class="pt-xl pb-lg">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-md">
          <div>
            <h1 class="font-normal text-4xl md:text-5xl lg:text-7xl mb-xs">
              Rebuild 3
            </h1>
            <div class="flex gap-8 lg:gap-16">
              <p>Paris, France</p>
              <p>Dec 13 – Dec 15</p>
            </div>
          </div>
          <button
            data-form="gathering-invitation-rebuild3"
            class="w-fit align-bottom px-lg py-sm bg-blush text-dark sm:text-lg lg:text-2xl sm:w-auto sm:self-end sm:px-xl sm:py-md hover:bg-blush-tint hover:text-dark transition-all whitespace-nowrap cursor-pointer border-0"
          >
            Secure your spot
          </button>
        </div>
      </section>

      {/* Hero image */}
      <section class="pb-xl sm:pb-3xl">
        <div class="relative w-full aspect-auto md:aspect-video">
          <img
            src="/assets/images/paris.webp"
            alt="Paris, France"
            class="w-full h-full object-cover"
            style="object-position: center 75%"
          />
          <ImageCredit credit="HANVIN CHEONG" />
        </div>

        {/* Tagline + countdown */}
        <div class="mt-xl flex flex-col space-y-16 lg:space-y-0 lg:flex-row justify-between">
          <h2 class="text-xl md:text-2xl xl:text-3xl max-w-[45ch] leading-tight font-normal">
            The final gathering for the people building Europe's future social
            platforms. The showcase of Europe's next generation of social
            platforms, the takeoff of The Shift.
          </h2>

          <div class="w-51">
            <p class="text-xs tracking-widest uppercase mb-sm">Opening in</p>
            <GatheringCountdown targetDate="2026-12-13T09:00:00Z" />
          </div>
        </div>
      </section>

      {/* Quotes */}
      <QuoteCarousel quotes={quotes} interval={10000} />
    </>
  );
}
