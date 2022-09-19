import { useWeb3ExecuteFunction } from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";

interface IUseBlockToExpirationProps {
  tokenId: string;
}

function useBlockToExpiration(
  props: IUseBlockToExpirationProps = { tokenId: "" }
) {
  const result = useWeb3ExecuteFunction({
    abi: FiveStarsABI,
    contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
    functionName: "pagesAvailable",
    params: {
      _tokenId: props?.tokenId,
    },
  });

  return {
    ...result,
    // TODO
  };
}

export { useBlockToExpiration };
