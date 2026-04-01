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
          <title>Mosquito Social - Under Construction</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Ysabeau:ital,wght@0,400;0,900;1,400&family=DM+Sans:wght@400;500&family=Source+Sans+3:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <script innerHTML={foucSnippet} />
          {assets}
        </head>
        <body class="bg-background text-foreground antialiased min-h-screen">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
