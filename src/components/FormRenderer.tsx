import { createSignal, createEffect, For, Show, on } from "solid-js";
import type { FormConfig, FormField } from "~/lib/formConfig";
import { submitForm } from "~/lib/formSubmit";

const inputClass =
  "w-full px-sm py-xs border border-dark/30 bg-white text-dark text-base focus:border-dark focus:outline-none transition-fast";
const labelClass = "block text-sm text-darker mb-[4px]";
const errorClass = "text-sm text-red-600 mt-[2px]";

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
        try {
          new URL(String(v));
        } catch {
          errs[f.name] = "Please enter a valid URL (e.g. https://...)";
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
        data[f.name] = !!v;
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
          <p class="text-sm text-red-600 bg-red-50 px-sm py-xs">
            {serverError()}
          </p>
        </Show>

        <button
          type="submit"
          disabled={submitting()}
          class="w-full px-lg py-sm bg-dark text-light text-lg border-2 border-dark hover:bg-darker transition-all duration-fast cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting() ? "Submitting…" : "Submit"}
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
            class="mt-[3px] accent-dark"
          />
          <span class="text-sm text-darker">
            {f().label}
            <Show when={f().required}>
              <span class="text-red-600"> *</span>
            </Show>
          </span>
        </label>
        <Show when={props.error}>
          <p class={errorClass}>{props.error}</p>
        </Show>
      </Show>

      <Show when={f().type !== "checkbox"}>
        <label for={id()} class={labelClass}>
          {f().label}
          <Show when={f().required}>
            <span class="text-red-600"> *</span>
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
            class={`${inputClass} resize-y`}
            classList={{ "border-red-600!": !!props.error }}
          />
        </Show>

        <Show when={f().type === "select"}>
          <select
            id={id()}
            name={f().name}
            value={String(props.value ?? "")}
            onChange={(e) => props.onInput(e.currentTarget.value)}
            class={inputClass}
            classList={{ "border-red-600!": !!props.error }}
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
            class={inputClass}
            classList={{ "border-red-600!": !!props.error }}
          />
        </Show>

        <Show when={props.error}>
          <p class={errorClass}>{props.error}</p>
        </Show>
      </Show>
    </div>
  );
}
