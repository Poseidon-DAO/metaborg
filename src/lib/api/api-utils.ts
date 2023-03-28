import { alchemyRpcUrls } from "wagmi";

const alchemyUrl =
  process.env.NEXT_PUBLIC_CHAIN_ID === "0x1"
    ? "https://eth-mainnet.g.alchemy.com/nft/v2"
    : "https://eth-goerli.g.alchemy.com/nft/v2";

export { alchemyUrl };
