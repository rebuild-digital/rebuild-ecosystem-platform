import { createSignal, onMount, onCleanup, For } from "solid-js";
import ImageCredit from "./ImageCredit";

interface ImageCarouselProps {
  images?: string[];
  credits?: string[];
}

const defaultImages = [
  "/assets/images/social-1.webp",
  "/assets/images/social-2.webp",
  "/assets/images/social-3.webp",
];

const defaultCredits = ["Egor Myznik", "Mathias Reding", "Sebastien Lavalaye"];

export default function ImageCarousel(props: ImageCarouselProps) {
  const images = () => props.images ?? defaultImages;
  const credits = () => props.credits ?? defaultCredits;
  const [current, setCurrent] = createSignal(0);
  const [playing, setPlaying] = createSignal(true);
  let timer: ReturnType<typeof setInterval> | undefined;

  function advance() {
    setCurrent((prev) => (prev + 1) % images().length);
  }

  function startTimer() {
    timer = setInterval(advance, 4000);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  onMount(() => {
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
    <div
      class="image-carousel relative w-full overflow-hidden"
      style="aspect-ratio: 3/4"
      role="region"
      aria-roledescription="carousel"
      aria-label="Image gallery"
    >
      <For each={images()}>
        {(image, i) => (
          <div
            class={`absolute inset-0 transition-opacity duration-1000 ${current() === i() ? "opacity-100" : "opacity-0"}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Image ${i() + 1} of ${images().length}`}
            aria-hidden={current() !== i()}
          >
            <img
              src={image}
              alt={credits()[i()] ? `Photo by ${credits()[i()]}` : ""}
              class="w-full h-full object-cover"
            />
            {credits()[i()] && <ImageCredit credit={credits()[i()]} />}
          </div>
        )}
      </For>
      <button
        class="absolute bottom-sm right-sm z-10 bg-dark/50 text-light border-0 px-sm py-xs text-xs cursor-pointer transition-all duration-fast hover:bg-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
        onClick={togglePlay}
      >
        {playing() ? "Stop carousel" : "Start carousel"}
      </button>
    </div>
  );
}
