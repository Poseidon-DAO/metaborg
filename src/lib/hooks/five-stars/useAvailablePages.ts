import { useAccount, useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";

const useAvailablePages = () => {
  const { isConnected } = useAccount();

  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "getAvailablePagesNumber",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    enabled: !!isConnected,
  });

  return {
    ...query,
    availablePages: query.data ? Number(query.data) : (query.data as undefined),
    areAvailablePagesLoading: query.isLoading,
    areAvailablePagesFetching: query.isFetching,
    availablePagesError: query.error,
  };
};

export { useAvailablePages };
