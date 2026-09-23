/**
 * Run server-side data loading without leaking errors to the browser.
 *
 * Errors thrown from a "use server" query are serialized to the client —
 * message, stack and server file paths — both in the SSR hydration payload
 * and in RPC responses. Call this inside the "use server" body: the real
 * error is logged on the server, and only a generic, stackless error leaves.
 */
export async function guardServer<T>(label: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    // Log ids only, never emails or tokens (see AGENTS.md).
    console.error(`[${label}]`, err);
    const safe = new Error("Failed to load data");
    safe.stack = "";
    throw safe;
  }
}
