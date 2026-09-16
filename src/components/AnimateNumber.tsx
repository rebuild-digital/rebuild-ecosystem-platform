import { createSignal, onMount } from "solid-js";

interface AnimateNumberProps {
  value: string;
  class?: string;
  style?: string;
}

export default function AnimateNumber(props: AnimateNumberProps) {
  let ref!: HTMLParagraphElement;
  const [displayed, setDisplayed] = createSignal(props.value);

  onMount(() => {
    const raw = props.value;
    const prefix = raw.match(/^[^\d]*/)?.[0] || "";
    const suffix = raw.match(/[^\d]*$/)?.[0] || "";
    const numStr = raw.replace(prefix, "").replace(suffix, "");
    const target = parseFloat(numStr);
    if (isNaN(target)) return;

    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const duration = 2400;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(ref);

          let startTime: number | null = null;

          function step(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (eased * target).toFixed(decimals);
            setDisplayed(prefix + current + suffix);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayed(raw);
            }
          }

          setDisplayed(prefix + "0" + suffix);
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(ref);
  });

  return (
    <p ref={ref} class={props.class} style={props.style}>
      {displayed()}
    </p>
  );
}
