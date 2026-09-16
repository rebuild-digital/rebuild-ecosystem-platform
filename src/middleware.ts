import { createMiddleware } from "@solidjs/start/middleware";

const redirects: Record<string, string> = {
  "/forms/newsletter.html": "/",
  "/forms/builder-application.html": "/directory/",
  "/forms/builder-promo.html": "/directory/",
  "/forms/gathering-invitation.html": "/",
  "/forms/gathering-invitation-rebuild3.html": "/",
  "/forms/application-rebuild1.html": "/",
};

export default createMiddleware({
  onRequest: [
    (event) => {
      const url = new URL(event.request.url);
      const target = redirects[url.pathname];
      if (target) {
        return new Response(null, {
          status: 301,
          headers: { Location: target },
        });
      }
    },
  ],
});
