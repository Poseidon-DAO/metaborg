import { useWeb3ExecuteFunction } from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";

function usePacksNumber(
  { autoFetch }: { autoFetch: boolean } = { autoFetch: false }
) {
  const result = useWeb3ExecuteFunction(
    {
      contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
      abi: FiveStarsABI,
      functionName: "numberOfPacks",
    },
    { autoFetch }
  );

  return {
    ...result,
    fetchPacksNumber: result.fetch,
    packsNumber: !!result.data ? Number(result.data) : undefined,
  };
}

export { usePacksNumber };
