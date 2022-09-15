import { useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Issue1.json";
import { DistributionMetaData } from "store/types";

interface IUseDistributionMetaData {
  deps?: any[];
  enabled?: boolean;
  mangaDistributionID: string | number;
  onSuccess?: (data: DistributionMetaData) => void;
  onError?: (error: Error) => void;
}

export const getData = (
  data: any[],
  index: number,
  format: boolean = false
) => {
  if (!data) return format ? 0 : "";

  return format ? Number(data[index].toString()) : data[index];
};

export const getFormatedData = (data: any): DistributionMetaData => {
  return {
    originalData: {
      price: getData(data, 0),
      diamondSupply: getData(data, 4),
      goldSupply: getData(data, 5),
      originlSupply: getData(data, 6),
    },
    formatedData: {
      price: getData(data, 0, true),
      diamondSupply: getData(data, 4, true),
      goldSupply: getData(data, 5, true),
      originlSupply: getData(data, 6, true),
    },
  };
};

function useDistributionMetadata({
  deps = undefined,
  enabled = true,
  mangaDistributionID,
  onSuccess,
  onError,
}: IUseDistributionMetaData) {
  const { fetch, data, isLoading, isFetching, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_ISSUE1_CONTRACT_ADDRESS,
    functionName: "getDistributionMetaData",
    params: {
      _mangaDistributionID: mangaDistributionID,
    },
  });

  const dependencies = [...(deps || []), enabled];

  useEffect(() => {
    if (enabled) {
      fetch({
        onSuccess: (data: any) => onSuccess?.(getFormatedData(data)),
        onError,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    fetch,
    data: getFormatedData(data),
    isLoading,
    isFetching,
    error,
  };
}

export { useDistributionMetadata };
