import { createSignal, onMount, onCleanup, For } from "solid-js";
import type { CarouselSlide } from "~/data/carousel";

export interface CarouselProps {
  slides: CarouselSlide[];
}

export default function Carousel(props: CarouselProps) {
  const [current, setCurrent] = createSignal(0);
  const [playing, setPlaying] = createSignal(true);
  let timer: ReturnType<typeof setInterval> | undefined;

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => {
      setCurrent((i) => (i + 1) % props.slides.length);
    }, 5000);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  function goTo(index: number) {
    setCurrent(index);
    if (playing()) startAutoplay();
  }

  function togglePlay() {
    if (playing()) {
      stopAutoplay();
      setPlaying(false);
    } else {
      setPlaying(true);
      startAutoplay();
    }
  }

  onMount(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOk) {
      startAutoplay();
    } else {
      setPlaying(false);
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        goTo((current() - 1 + props.slides.length) % props.slides.length);
      } else if (e.key === "ArrowRight") {
        goTo((current() + 1) % props.slides.length);
      } else if (e.key === "Escape" && playing()) {
        stopAutoplay();
        setPlaying(false);
      }
    }
    document.addEventListener("keydown", handleKeydown);
    onCleanup(() => {
      stopAutoplay();
      document.removeEventListener("keydown", handleKeydown);
    });
  });

  return (
    <>
      <section
        class="relative w-full overflow-hidden h-[80vh]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured content"
      >
        <div class="relative w-full h-full">
          <For each={props.slides}>
            {(slide, i) => (
              <div
                class="carousel-slide absolute top-0 left-0 w-full h-full"
                classList={{
                  "opacity-100! visible! pointer-events-auto!": i() === current(),
                  "opacity-0 invisible pointer-events-none": i() !== current(),
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i() + 1} of ${props.slides.length}`}
                style={{ "background-color": slide.bgColor }}
              >
                <div class="w-full max-w-max-width mx-auto h-full">
                  <div class="grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center h-full">
                    <div class="w-full h-full max-h-[40vh] lg:max-h-full order-1">
                      <img
                        src={slide.image}
                        alt=""
                        loading="lazy"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="order-2 flex flex-col justify-center px-lg pt-lg lg:pt-0 lg:px-xl xl:px-3xl">
                      <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal mb-lg text-dark leading-tight">
                        {slide.headline}
                      </h2>
                      <p class="text-base md:text-lg lg:text-xl text-dark mb-xl leading-normal max-w-[65ch]">
                        {slide.subheader}
                      </p>
                      <a
                        href={slide.ctaLink}
                        class="inline-block px-lg py-sm bg-transparent border-2 border-dark text-dark hover:bg-dark hover:text-light transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue no-underline w-fit"
                      >
                        {slide.ctaText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </section>

      <div class="mt-sm md:mt-lg flex justify-center items-center gap-sm z-10 mb-xl md:mb-0">
        <For each={props.slides}>
          {(_, i) => (
            <button
              class="carousel-dot w-3 h-3 border-0 cursor-pointer transition-all duration-fast hover:bg-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              classList={{
                "bg-dark! w-8!": i() === current(),
                "bg-muted": i() !== current(),
              }}
              onClick={() => goTo(i())}
              aria-label={`Go to slide ${i() + 1}`}
              aria-current={i() === current() ? "true" : undefined}
            />
          )}
        </For>
        <button
          class="carousel-pause ml-sm px-sm py-xxs text-xs text-darker bg-transparent border-0 cursor-pointer transition-all duration-fast hover:text-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          onClick={togglePlay}
        >
          {playing() ? "Stop carousel" : "Start carousel"}
        </button>
      </div>
    </>
  );
}
