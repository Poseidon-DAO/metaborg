export const getTransactionLink = (
  transactionHash: string,
  chainId: string | null
) => {
  const chainName = {
    "0x1": "",
    "0x5": "goerli.",
  }[chainId || ""];

  if (!chainName) return "";

  return `https://${chainName}etherscan.io/tx/${transactionHash}`;
};
