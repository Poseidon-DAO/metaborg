import { useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";

import MetaborgABI from "contracts/abis/Metaborg.json";
import { DistributionMetaData } from "store/types";

interface IUseDistributionMetaData {
  deps?: any[];
  enabled?: boolean;
  onSuccess: (data: DistributionMetaData) => void;
  onError?: (error: Error) => void;
}

const getData = (data: any[], index: number, format: boolean = false) => {
  if (!data) return format ? 0 : "";

  return format ? Number(data[index].toString()) : data[index];
};

function useDistributionMetadata({
  deps = undefined,
  enabled = true,
  onSuccess,
  onError,
}: IUseDistributionMetaData) {
  const { fetch, data, isLoading, isFetching, error } = useWeb3ExecuteFunction({
    abi: MetaborgABI,
    contractAddress: process.env.NEXT_PUBLIC_METABORG_CONTRACT_ADDRESS,
    functionName: "getDistributionMetaData",
    params: {
      _mangaDistributionID:
        process.env.NEXT_PUBLIC_METABORG_MANGA_DISTRIBUTION_ID,
    },
  });

  const dependencies = [...(deps || []), enabled];

  const getFormatedData = (data: any): DistributionMetaData => {
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
    data: getFormatedData(data),
    isLoading,
    isFetching,
    error,
  };
}

export { useDistributionMetadata };
