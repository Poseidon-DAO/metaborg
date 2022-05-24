import "styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig } from "wagmi";

import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID),
    apiProvider.fallback(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Metaborg",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  console.log("id", process.env.NEXT_PUBLIC_INFURA_ID);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "var(--red)",
          borderRadius: "none",
        })}
      >
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
