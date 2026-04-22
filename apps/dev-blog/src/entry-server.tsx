// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { foucSnippet } from "mosquito-design-system/fouc.js";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <script innerHTML={foucSnippet} />
          {assets}
        </head>
        <body class="bg-col-bg text-col-fg font-fam-main antialiased min-h-screen">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
