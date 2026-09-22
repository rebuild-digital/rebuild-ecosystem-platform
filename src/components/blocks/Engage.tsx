import { createSignal } from "solid-js";

const btnBase =
  "px-md py-sm md:px-xl md:py-lg bg-lighter text-dark text-xl md:text-2xl hover:bg-dark hover:text-light transition-all transition-rebuild cursor-pointer border-0 w-fit";

export default function Engage() {
  const [shareLabel, setShareLabel] = createSignal("Share this page");

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareLabel("Copied URL");
      setTimeout(() => setShareLabel("Share this page"), 2000);
    } catch {
      setShareLabel("Copied URL");
      setTimeout(() => setShareLabel("Share this page"), 2000);
    }
  }

  function handleFeedback(e: MouseEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Feedback for ${window.location.href}`);
    window.location.href = `mailto:team@rebuild.net?subject=${subject}`;
  }

  return (
    <section class="relative w-full text-center py-3xl">
      <div class="max-w-max-width mx-auto px-md">
        <h2 class="text-4xl md:text-5xl font-normal text-dark mb-lg md:mb-2xl">
          Engage with us
        </h2>

        <div class="flex flex-wrap justify-center gap-xs md:gap-md">
          <a
            href="mailto:team@rebuild.net?subject=Feedback"
            class={`${btnBase} text-left no-underline`}
            onClick={handleFeedback}
          >
            Share a thought
          </a>
          <button data-form="newsletter" class={`${btnBase} text-center`}>
            Get our newsletter
          </button>
          <button data-form="builder-promo" class={`${btnBase} text-left`}>
            Suggest a platform
          </button>
          <button
            data-form="builder-application"
            class={`${btnBase} text-left`}
          >
            Join the directory
          </button>
          <button
            class={`${btnBase} text-left`}
            aria-live="polite"
            onClick={handleShare}
          >
            {shareLabel()}
          </button>
        </div>
      </div>
    </section>
  );
}
