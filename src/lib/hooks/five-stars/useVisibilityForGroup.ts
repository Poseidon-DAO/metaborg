import { useContractRead } from "wagmi";

import FiveStarsABI from "contracts/abis/FiveStars.json";

interface IUseVisibilityForGroupProps {
  userGroup: string | number;
  enabled?: boolean;
}

const useVisibilityForGroup = ({
  userGroup,
  enabled = true,
}: IUseVisibilityForGroupProps) => {
  const query = useContractRead({
    abi: FiveStarsABI,
    functionName: "checkVisibility",
    address: process.env.NEXT_PUBLIC_FIVE_STARS_CONTRAT_ADDRESS!,
    args: [userGroup],
    enabled: enabled,
  });

  return {
    isVisibile: query.data,
    visibilityStatus: query.status,
    visibilityError: query.error,
  };
};

export { useVisibilityForGroup };
