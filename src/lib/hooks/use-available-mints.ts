import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { metaborgAddress } from "contracts/addresses/metaborg";
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
    contractAddress: metaborgAddress,
    functionName: "getAvailableMints",
    params: { _mangaDistributionID, _address },
  });

  useEffect(() => {
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    availableMints: data ? (data as object).toString() : "",
    isFetching,
    isLoading,
    error,
  };
}

export { useAvailableMints };
