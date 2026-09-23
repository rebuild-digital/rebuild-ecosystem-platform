import { createSignal, createEffect, For, Show, on } from "solid-js";
import type { FormConfig, FormField } from "~/lib/formConfig";
import { submitForm } from "~/lib/formSubmit";
import Loader from "~/components/Loader";

// Border is 2px in every state; only the color changes (see DESIGN.md → Form Input Styles).
const inputBaseClass =
  "w-full px-sm py-xs border-2 bg-white text-dark text-base transition-rebuild focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-shade";
const labelClass = "block text-sm text-darker mb-xxs";
const helpClass = "text-xs text-darker mt-xxs";
const errorClass = "text-sm text-red mt-xxs";

// Empty → muted, filled → darker, active (focus) → dark, error → red (wins over focus).
function inputClass(value: string | boolean, error?: string) {
  if (error) return `${inputBaseClass} border-red`;
  const filled = String(value ?? "").trim() !== "";
  return `${inputBaseClass} ${filled ? "border-darker" : "border-muted"} focus:border-dark`;
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function FormRenderer(props: {
  config: FormConfig;
  resetKey?: number;
  onSuccess?: () => void;
}) {
  const [values, setValues] = createSignal<Record<string, string | boolean>>(
    {}
  );
  const [errors, setErrors] = createSignal<Record<string, string>>({});
  const [submitting, setSubmitting] = createSignal(false);
  const [submitted, setSubmitted] = createSignal(false);
  const [serverError, setServerError] = createSignal("");

  createEffect(
    on(
      () => props.resetKey,
      () => {
        setValues({});
        setErrors({});
        setSubmitting(false);
        setSubmitted(false);
        setServerError("");
      }
    )
  );

  function initValues() {
    const init: Record<string, string | boolean> = {};
    for (const f of props.config.fields) {
      if (f.hidden && f.value != null) {
        init[f.name] = f.value;
      } else if (f.type === "checkbox") {
        init[f.name] = false;
      } else {
        init[f.name] = "";
      }
    }
    return init;
  }

  function setValue(name: string, value: string | boolean) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    const vals = values();

    for (const f of props.config.fields) {
      if (f.hidden) continue;
      const v = vals[f.name];

      if (f.required) {
        if (f.type === "checkbox" && !v) {
          errs[f.name] = "This field is required";
        } else if (f.type !== "checkbox" && (!v || String(v).trim() === "")) {
          errs[f.name] = "This field is required";
        }
      }

      if (f.type === "email" && v && String(v).trim() !== "") {
        if (!validateEmail(String(v))) {
          errs[f.name] = "Please enter a valid email address";
        }
      }

      if (f.type === "url" && v && String(v).trim() !== "") {
        const raw = String(v).trim();
        const testUrl = raw.includes("://") ? raw : `https://${raw}`;
        try {
          new URL(testUrl);
        } catch {
          errs[f.name] = "Please enter a valid URL (e.g. https://... or www.example.com)";
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const current = values();
    const merged = { ...initValues(), ...current };
    setValues(merged);

    if (!validate()) return;

    setSubmitting(true);
    setServerError("");

    const data: Record<string, unknown> = {};
    for (const f of props.config.fields) {
      const v = merged[f.name];
      if (f.type === "checkbox") {
        if (v) data[f.name] = "on";
      } else if (v != null && String(v).trim() !== "") {
        data[f.name] = String(v).trim();
      }
    }

    const result = await submitForm(props.config.id, data);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      props.onSuccess?.();
    } else {
      setServerError(result.message ?? "Something went wrong.");
    }
  }

  return (
    <Show
      when={!submitted()}
      fallback={
        <div class="py-lg">
          <p class="text-lg text-dark">
            {props.config.successMessage ?? "Thank you for your submission!"}
          </p>
        </div>
      }
    >
      <form onSubmit={handleSubmit} novalidate class="space-y-md">
        <For each={props.config.fields}>
          {(field) => (
            <Show when={!field.hidden}>
              <FieldInput
                field={field}
                value={values()[field.name] ?? (field.type === "checkbox" ? false : "")}
                error={errors()[field.name]}
                onInput={(v) => setValue(field.name, v)}
              />
            </Show>
          )}
        </For>

        <Show when={serverError()}>
          <p class="text-sm text-red bg-red-light px-sm py-xs">
            {serverError()}
          </p>
        </Show>

        <button
          type="submit"
          disabled={submitting()}
          class="w-full px-lg py-sm bg-dark text-light text-lg border-2 border-dark hover:bg-darker transition-all transition-rebuild cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Show when={submitting()} fallback="Submit">
            <span class="inline-flex items-center gap-xs">
              Submitting <Loader decorative />
            </span>
          </Show>
        </button>
      </form>
    </Show>
  );
}

function FieldInput(props: {
  field: FormField;
  value: string | boolean;
  error?: string;
  onInput: (v: string | boolean) => void;
}) {
  const f = () => props.field;
  const id = () => `form-field-${f().name}`;

  return (
    <div>
      <Show when={f().type === "checkbox"}>
        <label class="flex items-start gap-xs cursor-pointer">
          <input
            type="checkbox"
            id={id()}
            name={f().name}
            checked={!!props.value}
            onChange={(e) => props.onInput(e.currentTarget.checked)}
            class="mt-0.75 accent-dark"
          />
          <span class="text-sm text-darker">
            {f().label}
            <Show when={f().required}>
              <span class="text-red"> *</span>
            </Show>
          </span>
        </label>
        <Show when={f().helpText}>
          <p class={helpClass}>{f().helpText}</p>
        </Show>
        <Show when={props.error}>
          <p class={errorClass}>{props.error}</p>
        </Show>
      </Show>

      <Show when={f().type !== "checkbox"}>
        <label for={id()} class={labelClass}>
          {f().label}
          <Show when={f().required}>
            <span class="text-red"> *</span>
          </Show>
        </label>

        <Show when={f().type === "textarea"}>
          <textarea
            id={id()}
            name={f().name}
            value={String(props.value ?? "")}
            onInput={(e) => props.onInput(e.currentTarget.value)}
            placeholder={f().placeholder}
            rows={3}
            class={`${inputClass(props.value, props.error)} resize-y`}
            aria-invalid={props.error ? "true" : undefined}
          />
        </Show>

        <Show when={f().type === "select"}>
          <select
            id={id()}
            name={f().name}
            value={String(props.value ?? "")}
            onChange={(e) => props.onInput(e.currentTarget.value)}
            class={inputClass(props.value, props.error)}
            aria-invalid={props.error ? "true" : undefined}
          >
            <For each={f().options}>
              {(opt) => <option value={opt.value}>{opt.label}</option>}
            </For>
          </select>
        </Show>

        <Show
          when={
            f().type !== "textarea" &&
            f().type !== "select" &&
            f().type !== "checkbox"
          }
        >
          <input
            id={id()}
            type={f().type}
            name={f().name}
            value={String(props.value ?? "")}
            onInput={(e) => props.onInput(e.currentTarget.value)}
            placeholder={f().placeholder}
            class={inputClass(props.value, props.error)}
            aria-invalid={props.error ? "true" : undefined}
          />
        </Show>

        <Show when={f().helpText}>
          <p class={helpClass}>{f().helpText}</p>
        </Show>
        <Show when={props.error}>
          <p class={errorClass}>{props.error}</p>
        </Show>
      </Show>
    </div>
  );
}
