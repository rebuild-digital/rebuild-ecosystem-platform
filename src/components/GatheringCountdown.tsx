import { createSignal, onMount, onCleanup, Show } from "solid-js";

interface GatheringCountdownProps {
  targetDate: string;
}

function computeRemaining(target: number) {
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function GatheringCountdown(props: GatheringCountdownProps) {
  const target = new Date(props.targetDate).getTime();
  const [remaining, setRemaining] = createSignal(computeRemaining(target));
  let timer: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    timer = setInterval(() => {
      setRemaining(computeRemaining(target));
    }, 1000);
  });

  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  return (
    <Show when={remaining()}>
      {(r) => (
        <div class="flex flex-col gap-xs">
          <p class="text-4xl md:text-5xl font-normal leading-none">
            {r().days} <span class="text-base">days</span>
          </p>
          <p class="text-4xl md:text-5xl font-normal leading-none">
            {String(r().hours).padStart(2, "0")}{" "}
            <span class="text-base">hours</span>
          </p>
          <p class="text-4xl md:text-5xl font-normal leading-none">
            {String(r().minutes).padStart(2, "0")}{" "}
            <span class="text-base">minutes</span>
          </p>
          <p class="text-4xl md:text-5xl font-normal leading-none">
            {String(r().seconds).padStart(2, "0")}{" "}
            <span class="text-base">seconds</span>
          </p>
        </div>
      )}
    </Show>
  );
}
