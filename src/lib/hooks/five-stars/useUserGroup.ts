import { useAccount, useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";

const useUserGroup = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const { address } = useAccount();

  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "getUserGroup",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    args: [address],
    enabled: enabled && !!address,
  });

  return {
    userGroup: query.data as string,
    userGroupStatus: query.status,
    userGroupError: query.error,
  };
};

export { useUserGroup };
