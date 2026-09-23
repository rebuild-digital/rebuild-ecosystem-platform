import { ErrorBoundary, Suspense, catchError, type JSX } from "solid-js";

/**
 * Error boundary + Suspense that never ship the real error to the browser.
 *
 * Solid serializes caught errors — message and stack, including server file
 * paths — into the hydration payload, both from ErrorBoundary and from a
 * Suspense boundary whose content fails. So the real error is caught and
 * logged *inside* the Suspense, and only a generic, stackless error travels
 * further up to be serialized.
 */
export default function SafeErrorBoundary(props: {
  fallback: JSX.Element;
  children: JSX.Element;
}) {
  return (
    // The fallback must take an argument: Solid calls one-arg fallbacks
    // immediately on both server and client, keeping hydration keys aligned.
    <ErrorBoundary fallback={(_err) => props.fallback}>
      <Suspense>
        {catchError(
          () => props.children,
          (err) => {
            // Errors carry no user data today; once auth lands, log user ids only.
            console.error("[ErrorBoundary]", err);
            const safe = new Error("Page failed to render");
            safe.stack = "";
            throw safe;
          },
        )}
      </Suspense>
    </ErrorBoundary>
  );
}
