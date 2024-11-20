import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="learn by following your role roadmap consistently"
        />
        <link rel="icon" href="/favicon.ico" />
        <GoogleAnalytics gaId="G-MSJ7HCLK8P" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
