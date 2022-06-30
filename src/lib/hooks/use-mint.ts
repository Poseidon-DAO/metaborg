import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { metaborgAddress } from "contracts/addresses/metaborg";

interface IUseMintProps {
  salePrice: number | string;
}

function useMint({ salePrice }: IUseMintProps) {
  const result = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: metaborgAddress,
    functionName: "mintRandomManga",
    params: { _mangaDistributionID: "1" },
    msgValue: salePrice,
  });

  return result;
}

export { useMint };
