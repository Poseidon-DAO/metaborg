import { useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";

interface IUseVisibilityProps {
  userGroup: string | number;
}

const useVisibility = ({ userGroup }: IUseVisibilityProps) => {
  // Group ID:
  // 0 => open, 1 => whitelisted, 2 => owner, 3 => whitelisted+owner
  // we don't query the visibility at all when open (0)
  const visibilityEnabled =
    !!userGroup && [1, 2, 3].includes(Number(userGroup));

  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "checkVisibility",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    args: [userGroup],
    enabled: visibilityEnabled,
  });

  return {
    isVisibile: visibilityEnabled ? query.data : userGroup == 0 ? true : false,
    visibilityStatus: query.status,
    visibilityError: query.error,
  };
};

export { useVisibility };
