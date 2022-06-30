import { useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { metaborgAddress } from "contracts/addresses/metaborg";

interface IUseDistributionMetaData {
  onSuccess?: () => void;
  onError?: () => void;
}

function useDistributionMetadata({
  onSuccess,
  onError,
}: IUseDistributionMetaData = {}) {
  const { fetch, data, isLoading, isFetching, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: metaborgAddress,
    functionName: "getDistributionMetaData",
    params: { _mangaDistributionID: "1" },
  });

  useEffect(() => {
    fetch({ onSuccess, onError });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    price: data ? (data as any)[0] : "",
    formatedPrice: data ? (data as any)[0].toString() : "",
    isLoading,
    isFetching,
    error,
  };
}

export { useDistributionMetadata };
