import { Title, Meta } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import type { JSX } from "solid-js";
import PageHeader from "~/components/PageHeader";

// Page-level error states (see DESIGN.md → Error, Empty, and Loading States).
// Plain dark typography — red is reserved for errors the reader can fix.

const primaryButtonClass =
  "inline-block px-md py-2.5 bg-dark text-white text-base leading-none rounded-md no-underline hover:bg-darker transition-rebuild cursor-pointer";

function ErrorLayout(props: {
  status: 404 | 500;
  title: string;
  children: JSX.Element;
  action: JSX.Element;
}) {
  return (
    <div class="pb-3xl md:pb-6xl">
      <HttpStatusCode code={props.status} />
      <Title>{props.title} | Rebuild</Title>
      <Meta name="robots" content="noindex" />
      <PageHeader title={props.title} />
      <div class="max-w-prose space-y-lg">
        <p class="text-lg text-dark">{props.children}</p>
        {props.action}
      </div>
    </div>
  );
}

export function NotFound(props: {
  message?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <ErrorLayout
      status={404}
      title="Page not found"
      action={
        <a href={props.backHref ?? "/"} class={primaryButtonClass}>
          {props.backLabel ?? "Go to the homepage"}
        </a>
      }
    >
      {props.message ??
        "This page doesn't exist, or it has moved. Check the address for typos, or start again from the homepage."}
    </ErrorLayout>
  );
}

export function ServerError() {
  return (
    <ErrorLayout
      status={500}
      title="Something went wrong"
      action={
        <button
          type="button"
          onClick={() => window.location.reload()}
          class={primaryButtonClass}
        >
          Try again
        </button>
      }
    >
      An unexpected error stopped this page from loading — the problem is on
      our side, not yours. Try again, and if it keeps happening,{" "}
      <a href="/get-in-touch/" class="underline">
        get in touch
      </a>
      .
    </ErrorLayout>
  );
}
