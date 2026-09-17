"use server";

const endpointMap: Record<string, string> = {
  newsletter: "/api/newsletter-signup",
  "builder-application": "/api/builder-application",
  "builder-promo": "/api/builder-promotion",
  "gathering-invitation": "/api/gathering-invitation",
  "gathering-invitation-rebuild3": "/api/gathering-invitation",
  "application-rebuild1": "/api/application-rebuild1",
};

export async function submitForm(
  formId: string,
  data: Record<string, unknown>
): Promise<{ ok: boolean; message?: string }> {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    console.error("API_URL environment variable is not set");
    return { ok: false, message: "Form service is not configured." };
  }

  const endpoint = endpointMap[formId];
  if (!endpoint) {
    return { ok: false, message: "Unknown form." };
  }

  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ).toString(),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`Form submission failed: ${res.status} ${text}`);
      return {
        ok: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("Form submission error:", err);
    return {
      ok: false,
      message: "Could not reach the server. Please try again later.",
    };
  }
}
