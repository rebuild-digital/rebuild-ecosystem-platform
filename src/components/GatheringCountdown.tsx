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
        <div class="flex gap-lg text-center">
          <div>
            <span class="text-4xl md:text-5xl lg:text-6xl font-normal block">
              {r().days}
            </span>
            <span class="text-xs uppercase tracking-widest text-darker">
              Days
            </span>
          </div>
          <div>
            <span class="text-4xl md:text-5xl lg:text-6xl font-normal block">
              {String(r().hours).padStart(2, "0")}
            </span>
            <span class="text-xs uppercase tracking-widest text-darker">
              Hours
            </span>
          </div>
          <div>
            <span class="text-4xl md:text-5xl lg:text-6xl font-normal block">
              {String(r().minutes).padStart(2, "0")}
            </span>
            <span class="text-xs uppercase tracking-widest text-darker">
              Minutes
            </span>
          </div>
          <div>
            <span class="text-4xl md:text-5xl lg:text-6xl font-normal block">
              {String(r().seconds).padStart(2, "0")}
            </span>
            <span class="text-xs uppercase tracking-widest text-darker">
              Seconds
            </span>
          </div>
        </div>
      )}
    </Show>
  );
}
