import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

import { InitAppProvider } from "containers";
import { theme, defaultProps } from "theme";

import type { AppProps } from "next/app";

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
          <MantineProvider
            theme={theme}
            defaultProps={defaultProps}
            withGlobalStyles
            withNormalizeCSS
          >
            <InitAppProvider>
              <Component {...pageProps} />
            </InitAppProvider>
          </MantineProvider>
        </QueryClientProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
