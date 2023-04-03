import Head from "next/head";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { PageLayout } from "layout/page-layout";
import { theme } from "theme";

import type { AppProps } from "next/app";

const chainToUse =
  process.env.NEXT_PUBLIC_CHAIN_ID === "0x5" ? chain.goerli : chain.mainnet;

const { provider } = configureChains(
  [chainToUse],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! })]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

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

      <ChakraProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default App;
