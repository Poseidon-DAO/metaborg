import Head from "next/head";
import { type AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { HeaderProvider } from "layout/header-provider";
import { theme } from "theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
        appId={process.env.NEXT_PUBLIC_APP_ID as string}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
      >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <HeaderProvider>
              <Component {...pageProps} />
            </HeaderProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
