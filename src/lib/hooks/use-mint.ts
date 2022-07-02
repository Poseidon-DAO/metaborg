import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";

interface IUseMintProps {
  salePrice: number | string;
}

function useMint({ salePrice }: IUseMintProps) {
  const result = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "mintRandomManga",
    params: { _mangaDistributionID: "1" },
    msgValue: salePrice,
  });

  return result;
}

export { useMint };
