import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { useEffect } from "react";

interface IUseAvailableMintsProps {
  deps?: any[];
  enabled?: boolean;
  _mangaDistributionID?: number | string;
  _address?: string;
}

function useAvailableMints({
  deps = undefined,
  enabled = true,
  _mangaDistributionID = "",
  _address = "",
}: IUseAvailableMintsProps = {}) {
  const { user } = useMoralis();
  const { fetch, data, isFetching, isLoading, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "getAvailableMints",
    params: {
      _mangaDistributionID:
        _mangaDistributionID ||
        process.env.NEXT_PUBLIC_METABORG_MANGA_DISTRIBUTION_ID,
      _address: _address || user?.get("ethAddress"),
    },
  });

  const dependencies = [...(deps || []), enabled];

  useEffect(() => {
    if (enabled) {
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    availableMints: data ? Number((data as object).toString()) : "",
    isFetching,
    isLoading,
    error,
  };
}

export { useAvailableMints };
