import { useEffect, useState } from "react";
import { MoralisProvider } from "react-moralis";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";

import { HeaderProvider } from "layout/header-provider";
import { theme } from "theme";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools position="top-right" />
          <Hydrate state={pageProps.dehydratedState}>
            <ChakraProvider theme={theme}>
              <HeaderProvider>
                <Component {...pageProps} />
              </HeaderProvider>
            </ChakraProvider>
          </Hydrate>
        </QueryClientProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
