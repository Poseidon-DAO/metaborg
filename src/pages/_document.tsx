import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import { theme } from "theme";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
