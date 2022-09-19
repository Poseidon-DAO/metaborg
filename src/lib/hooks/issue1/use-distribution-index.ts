import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Issue1.json";
import { useEffect } from "react";

interface IUseDistributionIndexProps {
  deps?: any[];
  enabled?: boolean;
}

function useDistributionIndex({
  deps = undefined,
  enabled = true,
}: IUseDistributionIndexProps = {}) {
  const { fetch, data, isFetching, isLoading, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_ISSUE1_CONTRACT_ADDRESS,
    functionName: "mangaDistributionIndex",
  });

  const dependencies = [...(deps || []), enabled];

  useEffect(() => {
    if (enabled) {
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    index: data ? Number((data as object).toString()) - 1 : "",
    isFetching,
    isLoading,
    error,
  };
}

export { useDistributionIndex };
