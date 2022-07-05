import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { useEffect } from "react";

interface IUseAvailableMintsProps {
  _mangaDistributionID: number | string;
  _address: string;
}

function useAvailableMints({
  _mangaDistributionID,
  _address,
}: IUseAvailableMintsProps) {
  const { fetch, data, isFetching, isLoading, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "getAvailableMints",
    params: { _mangaDistributionID, _address },
  });

  useEffect(() => {
    if (_mangaDistributionID && _address) {
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_mangaDistributionID, _address]);

  return {
    availableMints: data ? Number((data as object).toString()) : "",
    isFetching,
    isLoading,
    error,
  };
}

export { useAvailableMints };
