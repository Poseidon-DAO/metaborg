import Head from "next/head";
import { useEffect, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from "@chakra-ui/react";

import { PageLayout } from "layout/page-layout";
import { theme } from "theme";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Metaborg</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID!}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL!}
      >
        <ChakraProvider theme={theme}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </ChakraProvider>
      </MoralisProvider>
    </>
  );
}

export default App;
