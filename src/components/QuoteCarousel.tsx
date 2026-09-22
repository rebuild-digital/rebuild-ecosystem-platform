import { createSignal, onMount, onCleanup, For } from "solid-js";
import Section from "~/components/Section";

interface Quote {
  text: string;
  author: string;
}

interface QuoteCarouselProps {
  quotes: Quote[];
  interval?: number;
}

export default function QuoteCarousel(props: QuoteCarouselProps) {
  const [current, setCurrent] = createSignal(0);
  const [playing, setPlaying] = createSignal(true);
  let timer: ReturnType<typeof setInterval> | undefined;
  let slideRefs: HTMLDivElement[] = [];
  const dur = 700;

  function advance() {
    const prev = current();
    const next = (prev + 1) % props.quotes.length;
    setCurrent(next);

    const prevEl = slideRefs[prev];
    const nextEl = slideRefs[next];
    if (!prevEl || !nextEl) return;

    prevEl.style.transition = `opacity ${dur}ms ease`;
    prevEl.style.opacity = "0";
    prevEl.style.pointerEvents = "none";

    nextEl.style.transition = "none";
    nextEl.style.opacity = "0";
    nextEl.style.transform = "translateY(1rem)";
    void nextEl.offsetHeight;
    nextEl.style.transition = `opacity ${dur}ms ease, transform ${dur}ms ease`;
    nextEl.style.opacity = "1";
    nextEl.style.transform = "translateY(0)";
    nextEl.style.pointerEvents = "auto";

    setTimeout(() => {
      prevEl.style.transition = "none";
      prevEl.style.transform = "translateY(1rem)";
    }, dur);
  }

  function startTimer() {
    timer = setInterval(advance, props.interval ?? 10000);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  onMount(() => {
    if (props.quotes.length < 2) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setPlaying(false);
    } else {
      startTimer();
    }
  });

  onCleanup(() => stopTimer());

  function togglePlay() {
    if (playing()) {
      stopTimer();
      setPlaying(false);
    } else {
      startTimer();
      setPlaying(true);
    }
  }

  return (
    <Section
      fullBleed
      raw
      class="relative mt-3xl py-3xl lg:py-6xl overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Quotes"
    >
      {/* SVG circles — desktop only */}
      <svg
        class="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="258" fill="#6ba1cc" fill-opacity="0.10" />
      </svg>
      <svg
        class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="258" fill="#6ba1cc" fill-opacity="0.10" />
      </svg>

      {/* Decorative quote marks */}
      <span
        class="absolute top-0 left-0 lg:top-12 lg:left-8 xl:top-24 xl:left-40 text-[120px] md:text-[240px] lg:text-[320px] text-blue leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {"“"}
      </span>
      <span
        class="absolute bottom-0 right-0 lg:right-8 xl:bottom-12 xl:right-40 text-[120px] md:text-[240px] lg:text-[320px] text-blue leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        {"”"}
      </span>

      <div class="w-full md:w-[70ch] lg:w-[100ch] mx-auto px-lg">
        <div style="display: grid;">
          <For each={props.quotes}>
            {(quote, i) => (
              <div
                ref={(el) => (slideRefs[i()] = el)}
                role="group"
                aria-roledescription="slide"
                aria-label={`Quote ${i() + 1} of ${props.quotes.length}`}
                style={{
                  "grid-area": "1/1",
                  opacity: i() === 0 ? "1" : "0",
                  transform: i() === 0 ? "translateY(0)" : "translateY(1rem)",
                  "pointer-events": i() === 0 ? "auto" : "none",
                }}
                aria-hidden={current() !== i()}
              >
                <p class="text-xl md:text-2xl lg:text-3xl font-normal leading-snug mb-md">
                  {quote.text}
                </p>
                <p class="text-sm tracking-widest uppercase text-darker">
                  — {quote.author}
                </p>
              </div>
            )}
          </For>
        </div>
        <div class="flex justify-center mt-lg">
          <button
            class="bg-transparent border-0 text-darker px-sm py-xxs text-xs cursor-pointer transition-all duration-fast hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            onClick={togglePlay}
          >
            {playing() ? "Stop carousel" : "Start carousel"}
          </button>
        </div>
      </div>
    </Section>
  );
}
