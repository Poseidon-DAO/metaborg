import { useWeb3ExecuteFunction } from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";

function useAvailablePages() {
  const result = useWeb3ExecuteFunction({
    abi: FiveStarsABI,
    contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
    functionName: "pagesAvailable",
  });

  return {
    ...result,
    availablePages: !!result.data ? Number(result.data) : null,
    fetchAvailablePages: result.fetch,
  };
}

export { useAvailablePages };
