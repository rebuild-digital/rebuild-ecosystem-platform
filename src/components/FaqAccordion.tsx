import { For, Show } from "solid-js";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  contactEmail?: string;
}

export default function FaqAccordion(props: FaqAccordionProps) {
  const email = () => props.contactEmail ?? "team@rebuild.net";

  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl lg:gap-3xl items-start">
      <div class="lg:max-w-80">
        <h2 class="text-3xl md:text-4xl font-normal mb-xl">
          Frequently
          <br />
          asked questions
        </h2>
        <p class="text-base text-dark mb-xs">
          Not sure how it works in practice?
        </p>
        <p class="text-base text-dark">
          We'll try to answer the most common questions. If you're still in
          doubt,{" "}
          <a href={`mailto:${email()}`} class="underline">
            send us an email
          </a>
          .
        </p>
      </div>

      <div class="divide-y-2 divide-dark border-2 border-dark">
        <For each={props.items}>
          {(item) => (
            <details class="group">
              <summary class="flex items-center gap-sm sm:gap-lg px-lg py-md cursor-pointer list-none">
                <span
                  class="text-3xl w-6 shrink-0 transition-transform transition-rebuild group-open:hidden"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  class="text-3xl w-6 shrink-0 hidden group-open:inline"
                  aria-hidden="true"
                >
                  −
                </span>
                <span class="text-lg sm:text-xl leading-tight">
                  {item.question}
                </span>
              </summary>
              <div class="px-lg pb-md">
                <p class="text-sm sm:text-base text-dark">{item.answer}</p>
              </div>
            </details>
          )}
        </For>
      </div>
    </div>
  );
}
