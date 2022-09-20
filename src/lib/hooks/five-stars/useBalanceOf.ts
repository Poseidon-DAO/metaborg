import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import FiveStarsABI from "contracts/abis/FiveStars.json";

function useBalanceOf() {
  const { user } = useMoralis();

  const result = useWeb3ExecuteFunction({
    abi: FiveStarsABI,
    contractAddress: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS,
    functionName: "balanceOf",
    params: {
      owner: user?.get("ethAddress"),
    },
  });

  return {
    ...result,
    balance: !!result.data ? Number(result.data) : undefined,
    fetchBalance: result.fetch,
  };
}

export { useBalanceOf };
