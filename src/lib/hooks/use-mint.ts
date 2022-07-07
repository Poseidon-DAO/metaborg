import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";

interface IUseMintProps {
  salePrice: number | string;
  mangaDistributionID: number | string;
}

function useMint({ salePrice, mangaDistributionID }: IUseMintProps) {
  const result = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "mintRandomManga",
    params: {
      _mangaDistributionID: mangaDistributionID,
    },
    msgValue: salePrice,
  });

  return result;
}

export { useMint };
