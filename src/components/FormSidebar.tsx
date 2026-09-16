import { createSignal, onMount, onCleanup, Show } from "solid-js";
import { formConfigs } from "~/lib/formConfig";
import FormRenderer from "~/components/FormRenderer";

export default function FormSidebar() {
  const [isOpen, setIsOpen] = createSignal(false);
  const [formId, setFormId] = createSignal("");
  const [formKey, setFormKey] = createSignal(0);
  let panelRef: HTMLDivElement | undefined;
  let closeRef: HTMLButtonElement | undefined;

  function open(id: string) {
    setFormId(id);
    setFormKey((k) => k + 1);
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

  const config = () => formConfigs[formId()];

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
        aria-label={config()?.title ?? "Form"}
      >
        <div class="p-md md:p-xl">
          <div class="flex justify-between items-start mb-xl">
            <h2 class="text-2xl md:text-3xl font-normal text-dark">
              {config()?.title ?? formId()}
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

          <Show
            when={config()}
            fallback={
              <p class="text-darker text-lg">
                This form is not available.
              </p>
            }
          >
            {(cfg) => (
              <FormRenderer
                resetKey={formKey()}
                config={cfg()}
              />
            )}
          </Show>
        </div>
      </div>
    </div>
  );
}
