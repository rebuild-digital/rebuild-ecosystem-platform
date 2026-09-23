// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { pageTransitionScript } from "~/lib/pageTransition";

// Applies before the stylesheet loads, so the very first paint of a page is
// already the background color (and hidden while a transition is entering).
const CRITICAL_STYLE =
  "html{background-color:#f7f8f9}" +
  "html.pt-enter:not(.pt-hold) body," +
  "html.pt-hold.pt-enter #app>main,html.pt-hold.pt-enter #app>footer{opacity:0}";

// Prefetch internal pages on hover/pointerdown so navigations don't wait
// on the network (Chromium; other browsers ignore it).
const SPECULATION_RULES = JSON.stringify({
  prefetch: [
    {
      where: {
        and: [{ href_matches: "/*" }, { not: { href_matches: "/*.xml" } }],
      },
      eagerness: "moderate",
    },
  ],
});

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="preload" as="image" href="/assets/images/splash-7.webp" />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/ABCSocialMono-Book.woff2"
            crossorigin="anonymous"
          />
          <style innerHTML={CRITICAL_STYLE} />
          <script innerHTML={pageTransitionScript} />
          <script type="speculationrules" innerHTML={SPECULATION_RULES} />
          {assets}
        </head>
        <body class="bg-white">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
