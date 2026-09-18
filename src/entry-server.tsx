// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="preload" as="image" href="/assets/images/splash-7.webp" />
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
