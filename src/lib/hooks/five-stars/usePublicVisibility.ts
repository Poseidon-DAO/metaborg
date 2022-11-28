import { useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";

const usePublicVisibility = () => {
  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "visibility",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
  });

  return {
    publicVisibility: query.data,
    publicVisibilityStatus: query.status,
    publicVisibilityError: query.error,
  };
};

export { usePublicVisibility };
