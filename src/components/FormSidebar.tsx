import { createSignal, onMount, onCleanup } from "solid-js";

const formTitles: Record<string, string> = {
  newsletter: "Stay involved",
  "builder-promo": "Suggest a platform",
  "builder-application": "Join the directory",
  "gathering-invitation": "Request an invitation",
  "gathering-invitation-rebuild3": "Request an invitation",
};

export default function FormSidebar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [formId, setFormId] = createSignal("");
  let panelRef: HTMLDivElement | undefined;
  let closeRef: HTMLButtonElement | undefined;

  function open(id: string) {
    setFormId(id);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef?.focus());
  }

  function close() {
    setIsOpen(false);
    document.body.style.overflow = "";
  }

  onMount(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("[data-form]");
      if (target) {
        e.preventDefault();
        const id = (target as HTMLElement).dataset.form;
        if (id) open(id);
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen()) {
        close();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    onCleanup(() => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    });
  });

  return (
    <div
      class="fixed inset-0 z-[999] transition-all duration-base"
      classList={{
        "opacity-100 visible pointer-events-auto": isOpen(),
        "opacity-0 invisible pointer-events-none": !isOpen(),
      }}
      aria-hidden={!isOpen()}
    >
      <div class="absolute inset-0 bg-dark/50" onClick={close} />

      <div
        ref={panelRef}
        class="absolute top-0 right-0 h-full w-full max-w-[600px] bg-white overflow-y-auto shadow-2xl transition-transform duration-base"
        classList={{
          "translate-x-0": isOpen(),
          "translate-x-full": !isOpen(),
        }}
        role="dialog"
        aria-modal={isOpen() ? "true" : undefined}
        aria-label={formTitles[formId()] ?? "Form"}
      >
        <div class="p-md md:p-xl">
          <div class="flex justify-between items-start mb-xl">
            <h2 class="text-2xl md:text-3xl font-normal text-dark">
              {formTitles[formId()] ?? formId()}
            </h2>
            <button
              ref={closeRef}
              onClick={close}
              class="text-dark text-2xl p-xs hover:text-darker transition-fast border-0 leading-none"
              aria-label="Close form"
            >
              ✕
            </button>
          </div>
          <p class="text-darker text-lg">
            This form will be connected in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
