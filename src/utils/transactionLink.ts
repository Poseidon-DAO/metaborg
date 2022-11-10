import { etherscanBlockExplorers } from "wagmi";

export const getTransactionLink = (
  transactionHash: string,
  chainId: string | null
) => {
  if (chainId === "5") {
    return `${etherscanBlockExplorers.goerli.url}/tx/${transactionHash}`;
  }

  return `${etherscanBlockExplorers.mainnet.url}/tx/${transactionHash}`;
};
